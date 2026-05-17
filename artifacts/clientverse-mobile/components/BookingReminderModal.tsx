import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { scheduleAppointmentReminder } from "@/hooks/useBookingNotification";
import { useColors } from "@/hooks/useColors";

function buildDays(count: number): Array<{ label: string; short: string; date: Date }> {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const result: Array<{ label: string; short: string; date: Date }> = [];
  for (let i = 1; i <= count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    d.setHours(0, 0, 0, 0);
    const short = i === 1 ? "Tmrw" : dayNames[d.getDay()];
    const label =
      i === 1
        ? `Tomorrow · ${monthNames[d.getMonth()]} ${d.getDate()}`
        : `${dayNames[d.getDay()]} · ${monthNames[d.getMonth()]} ${d.getDate()}`;
    result.push({ label, short, date: d });
  }
  return result;
}

// 30-minute time slots: 12:00 AM, 12:30 AM, 1:00 AM ... 11:30 PM
const ALL_SLOTS: Array<{ hour: number; minute: number }> = Array.from(
  { length: 48 },
  (_, i) => ({ hour: Math.floor(i / 2), minute: (i % 2) * 30 })
);

function slotLabel(hour: number, minute: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const displayH = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  const mm = String(minute).padStart(2, "0");
  return `${displayH}:${mm} ${period}`;
}

function buildAppointmentDate(dayDate: Date, hour: number, minute: number): Date {
  const d = new Date(dayDate);
  d.setHours(hour, minute, 0, 0);
  return d;
}

function formatApptDateTime(date: Date): string {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const h = date.getHours();
  const m = date.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
  const mm = String(m).padStart(2, "0");
  return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()} at ${displayH}:${mm} ${ampm}`;
}

type ModalState = "picking" | "submitting" | "success" | "error";

interface BookingReminderModalProps {
  visible: boolean;
  onClose: () => void;
}

export function BookingReminderModal({ visible, onClose }: BookingReminderModalProps) {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const [selectedDayIdx, setSelectedDayIdx] = useState<number | null>(null);
  const [selectedSlotIdx, setSelectedSlotIdx] = useState<number | null>(null);
  const [modalState, setModalState] = useState<ModalState>("picking");
  const [errorMsg, setErrorMsg] = useState("");

  const days = useMemo(() => buildDays(60), []);

  const appointmentTime = useMemo<Date | null>(() => {
    if (selectedDayIdx === null || selectedSlotIdx === null) return null;
    const slot = ALL_SLOTS[selectedSlotIdx];
    return buildAppointmentDate(days[selectedDayIdx].date, slot.hour, slot.minute);
  }, [selectedDayIdx, selectedSlotIdx, days]);

  const reminderTime = useMemo<Date | null>(() => {
    if (!appointmentTime) return null;
    return new Date(appointmentTime.getTime() - 24 * 60 * 60 * 1000);
  }, [appointmentTime]);

  const isPastReminder = useMemo<boolean>(() => {
    if (!reminderTime) return false;
    return reminderTime <= new Date();
  }, [reminderTime]);

  const canConfirm =
    selectedDayIdx !== null &&
    selectedSlotIdx !== null &&
    !isPastReminder &&
    modalState === "picking";

  const handleConfirm = async () => {
    if (!appointmentTime || !canConfirm) return;
    setModalState("submitting");
    setErrorMsg("");

    const result = await scheduleAppointmentReminder(appointmentTime);

    if (result.success) {
      setModalState("success");
      setTimeout(() => resetAndClose(), 1800);
    } else {
      if (result.reason === "permission_denied") {
        setErrorMsg(
          "Notification permission was denied. Enable notifications in your device settings to receive reminders."
        );
      } else if (result.reason === "time_in_past") {
        setErrorMsg(
          "The reminder time has already passed. Please pick a later date or time."
        );
      } else {
        setErrorMsg("Could not schedule the reminder. Please try again.");
      }
      setModalState("error");
    }
  };

  const resetAndClose = () => {
    setSelectedDayIdx(null);
    setSelectedSlotIdx(null);
    setModalState("picking");
    setErrorMsg("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={resetAndClose}
    >
      <Pressable style={styles.backdrop} onPress={resetAndClose} />
      <View
        style={[
          styles.sheet,
          {
            backgroundColor: colors.card,
            paddingBottom: Platform.OS === "web" ? 34 : insets.bottom + 16,
          },
        ]}
      >
        <View style={[styles.handle, { backgroundColor: colors.border }]} />

        {modalState === "success" ? (
          <View style={styles.feedbackBox}>
            <View style={[styles.feedbackIcon, { backgroundColor: colors.primary + "20" }]}>
              <Ionicons name="checkmark-circle" size={40} color={colors.primary} />
            </View>
            <Text style={[styles.feedbackTitle, { color: colors.foreground }]}>
              Reminder Set!
            </Text>
            <Text style={[styles.feedbackSub, { color: colors.mutedForeground }]}>
              {appointmentTime
                ? `We will remind you 24 hours before your ${formatApptDateTime(appointmentTime)} call.`
                : "We will remind you 24 hours before your call."}
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.header}>
              <View style={[styles.headerIcon, { backgroundColor: colors.primary + "18" }]}>
                <Ionicons name="alarm-outline" size={22} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.title, { color: colors.foreground }]}>
                  Set a 24-Hour Reminder
                </Text>
                <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
                  When is your Systems Review? Pick the exact date and time — we will
                  remind you the day before.
                </Text>
              </View>
            </View>

            {/* Date picker */}
            <View>
              <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
                DATE
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipRow}
              >
                {days.map((day, i) => {
                  const isSelected = selectedDayIdx === i;
                  return (
                    <Pressable
                      key={day.label}
                      testID={`day-slot-${i}`}
                      onPress={() => {
                        setSelectedDayIdx(i);
                        if (modalState === "error") setModalState("picking");
                      }}
                      style={({ pressed }) => [
                        styles.chip,
                        {
                          borderColor: isSelected ? colors.primary : colors.border,
                          backgroundColor: isSelected
                            ? colors.primary + "14"
                            : colors.background,
                          opacity: pressed ? 0.7 : 1,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.chipTop,
                          { color: isSelected ? colors.primary : colors.mutedForeground },
                        ]}
                      >
                        {day.short}
                      </Text>
                      <Text
                        style={[
                          styles.chipBottom,
                          { color: isSelected ? colors.primary : colors.foreground },
                        ]}
                      >
                        {day.date.getDate()}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            {/* Time picker — 30-minute slots */}
            <View>
              <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
                TIME
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipRow}
              >
                {ALL_SLOTS.map((slot, idx) => {
                  const isSelected = selectedSlotIdx === idx;
                  return (
                    <Pressable
                      key={idx}
                      testID={`time-slot-${idx}`}
                      onPress={() => {
                        setSelectedSlotIdx(idx);
                        if (modalState === "error") setModalState("picking");
                      }}
                      style={({ pressed }) => [
                        styles.timeChip,
                        {
                          borderColor: isSelected ? colors.primary : colors.border,
                          backgroundColor: isSelected
                            ? colors.primary + "14"
                            : colors.background,
                          opacity: pressed ? 0.7 : 1,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.timeChipText,
                          { color: isSelected ? colors.primary : colors.foreground },
                        ]}
                      >
                        {slotLabel(slot.hour, slot.minute)}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            {isPastReminder && selectedDayIdx !== null && selectedSlotIdx !== null && (
              <View
                style={[
                  styles.warnBox,
                  {
                    backgroundColor: colors.destructive + "14",
                    borderColor: colors.destructive + "40",
                  },
                ]}
              >
                <Ionicons name="warning-outline" size={16} color={colors.destructive} />
                <Text style={[styles.warnText, { color: colors.destructive }]}>
                  Your appointment is less than 24 hours away — the reminder would fire
                  in the past. Please pick a later slot.
                </Text>
              </View>
            )}

            {modalState === "error" && errorMsg ? (
              <View
                style={[
                  styles.warnBox,
                  {
                    backgroundColor: colors.destructive + "14",
                    borderColor: colors.destructive + "40",
                  },
                ]}
              >
                <Ionicons name="alert-circle-outline" size={16} color={colors.destructive} />
                <Text style={[styles.warnText, { color: colors.destructive }]}>
                  {errorMsg}
                </Text>
              </View>
            ) : null}

            <Pressable
              testID="reminder-confirm"
              onPress={handleConfirm}
              disabled={!canConfirm}
              style={({ pressed }) => [
                styles.confirmButton,
                {
                  backgroundColor: canConfirm ? colors.primary : colors.border,
                  opacity: pressed || modalState === "submitting" ? 0.75 : 1,
                },
              ]}
            >
              <Ionicons
                name="alarm-outline"
                size={18}
                color={canConfirm ? colors.primaryForeground : colors.mutedForeground}
              />
              <Text
                style={[
                  styles.confirmText,
                  {
                    color: canConfirm
                      ? colors.primaryForeground
                      : colors.mutedForeground,
                  },
                ]}
              >
                {modalState === "submitting" ? "Setting Reminder…" : "Set Reminder"}
              </Text>
            </Pressable>

            <Pressable
              testID="reminder-skip"
              onPress={resetAndClose}
              style={({ pressed }) => [styles.skipButton, { opacity: pressed ? 0.6 : 1 }]}
            >
              <Text style={[styles.skipText, { color: colors.mutedForeground }]}>
                Skip for now
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 16,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
  },
  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  title: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 19,
  },
  sectionLabel: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  chipRow: {
    flexDirection: "row",
    gap: 8,
    paddingRight: 4,
  },
  chip: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    minWidth: 52,
    gap: 2,
  },
  chipTop: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.2,
  },
  chipBottom: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  timeChip: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 12,
  },
  timeChipText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  warnBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  warnText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 19,
    flex: 1,
  },
  confirmButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 12,
    paddingVertical: 15,
  },
  confirmText: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  skipButton: {
    alignItems: "center",
    paddingVertical: 8,
    marginTop: -4,
    marginBottom: 4,
  },
  skipText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  feedbackBox: {
    alignItems: "center",
    gap: 12,
    paddingVertical: 28,
  },
  feedbackIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  feedbackTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  feedbackSub: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 12,
  },
});
