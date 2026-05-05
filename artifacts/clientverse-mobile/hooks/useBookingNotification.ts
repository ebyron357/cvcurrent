import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const CONFIRMATION_STORAGE_KEY = "booking_confirmation_ids";
const REMINDER_STORAGE_KEY = "booking_reminder_ids";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function requestPermission(): Promise<boolean> {
  if (Platform.OS === "web") return false;
  try {
    const { status: existing } = await Notifications.getPermissionsAsync();
    if (existing === "granted") return true;
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  } catch (err) {
    console.warn("[useBookingNotification] Permission request failed:", err);
    return false;
  }
}

async function appendStoredId(key: string, id: string): Promise<void> {
  try {
    const raw = await AsyncStorage.getItem(key);
    const ids: string[] = raw ? (JSON.parse(raw) as string[]) : [];
    await AsyncStorage.setItem(key, JSON.stringify([...ids, id]));
  } catch (err) {
    console.warn("[useBookingNotification] Failed to store notification ID:", err);
  }
}

async function cancelStoredIds(key: string): Promise<void> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return;
    const ids: string[] = JSON.parse(raw) as string[];
    await Promise.all(
      ids.map((id) => Notifications.cancelScheduledNotificationAsync(id))
    );
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.warn("[useBookingNotification] Failed to cancel stored notifications:", err);
  }
}

/**
 * Fire an immediate confirmation notification when the booking CTA is tapped.
 * This is decoupled from reminder scheduling — it fires regardless of whether
 * the user sets a reminder.
 */
export async function scheduleBookingConfirmation(): Promise<void> {
  const granted = await requestPermission();
  if (!granted) return;
  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Systems Review Requested",
        body: "You are booking a Systems Review with ClientVerse. Check your email for the calendar invite after completing your booking.",
        sound: true,
      },
      trigger: null,
    });
    await appendStoredId(CONFIRMATION_STORAGE_KEY, id);
  } catch (err) {
    console.warn("[useBookingNotification] Failed to schedule confirmation notification:", err);
  }
}

export type ReminderResult =
  | { success: true }
  | { success: false; reason: "permission_denied" | "time_in_past" | "scheduling_error" };

/**
 * Schedule a reminder 24 hours before the provided appointment time.
 * Uses a separate storage key from confirmations so cancelling a reminder
 * never affects the confirmation notification.
 *
 * Note: In the absence of a Calendly webhook, this is called with the
 * appointment time that the user manually enters in BookingReminderModal.
 */
export async function scheduleAppointmentReminder(
  appointmentTime: Date
): Promise<ReminderResult> {
  if (Platform.OS === "web") {
    return { success: false, reason: "scheduling_error" };
  }

  const reminderTime = new Date(appointmentTime.getTime() - 24 * 60 * 60 * 1000);
  const now = new Date();

  if (reminderTime <= now) {
    console.warn(
      "[useBookingNotification] Reminder time is in the past. reminderTime:",
      reminderTime.toISOString(),
      "now:",
      now.toISOString()
    );
    return { success: false, reason: "time_in_past" };
  }

  const granted = await requestPermission();
  if (!granted) {
    return { success: false, reason: "permission_denied" };
  }

  await cancelStoredIds(REMINDER_STORAGE_KEY);

  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Systems Review Tomorrow",
        body: "Your ClientVerse Systems Review call is tomorrow. Be ready — we will map your operations and give you a clear path forward.",
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: reminderTime,
      },
    });
    await appendStoredId(REMINDER_STORAGE_KEY, id);
    return { success: true };
  } catch (err) {
    console.warn("[useBookingNotification] Failed to schedule reminder notification:", err);
    return { success: false, reason: "scheduling_error" };
  }
}
