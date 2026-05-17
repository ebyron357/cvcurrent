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

export interface ReminderDetail {
  id: string;
  triggerDate: Date | null;
  title: string;
  body: string;
}

/**
 * Returns all scheduled reminders that were created by this app.
 */
export async function getAllReminderDetails(): Promise<ReminderDetail[]> {
  if (Platform.OS === "web") return [];
  try {
    const [scheduled, raw] = await Promise.all([
      Notifications.getAllScheduledNotificationsAsync(),
      AsyncStorage.getItem(REMINDER_STORAGE_KEY),
    ]);
    const storedIds: string[] = raw ? (JSON.parse(raw) as string[]) : [];
    return scheduled
      .filter((n) => storedIds.includes(n.identifier))
      .map((n) => {
        const trigger = n.trigger as Record<string, unknown> | null;
        let triggerDate: Date | null = null;
        if (trigger) {
          if (typeof trigger["value"] === "number") {
            triggerDate = new Date(trigger["value"] as number);
          } else if (trigger["dateComponents"] && typeof trigger["seconds"] === "number") {
            triggerDate = new Date(Date.now() + (trigger["seconds"] as number) * 1000);
          }
        }
        return {
          id: n.identifier,
          triggerDate,
          title: String(n.content.title ?? "Reminder"),
          body: String(n.content.body ?? ""),
        };
      });
  } catch (err) {
    console.warn("[useBookingNotification] Failed to get reminder details:", err);
    return [];
  }
}

/**
 * Cancel a single reminder by its notification ID and remove it from storage.
 */
export async function cancelReminderById(id: string): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
    const raw = await AsyncStorage.getItem(REMINDER_STORAGE_KEY);
    if (!raw) return;
    const ids: string[] = JSON.parse(raw) as string[];
    await AsyncStorage.setItem(
      REMINDER_STORAGE_KEY,
      JSON.stringify(ids.filter((i) => i !== id))
    );
  } catch (err) {
    console.warn("[useBookingNotification] Failed to cancel reminder by ID:", err);
  }
}

/**
 * Cancel ALL scheduled reminders.
 */
export async function cancelAllReminders(): Promise<void> {
  await cancelStoredIds(REMINDER_STORAGE_KEY);
}
