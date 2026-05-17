import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  cancelAllReminders,
  cancelReminderById,
  getAllReminderDetails,
  type ReminderDetail,
} from "@/hooks/useBookingNotification";
import { useColors } from "@/hooks/useColors";

function formatReminderDate(date: Date | null): string {
  if (!date) return "Scheduled";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const h = date.getHours();
  const ampm = h >= 12 ? "PM" : "AM";
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()} at ${displayH}:${m} ${ampm}`;
}

export default function RemindersScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [reminders, setReminders] = useState<ReminderDetail[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReminders = useCallback(async () => {
    setLoading(true);
    const details = await getAllReminderDetails();
    setReminders(details);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadReminders();
    }, [loadReminders])
  );

  const handleCancel = useCallback(
    (id: string) => {
      if (Platform.OS === "web") return;
      Alert.alert(
        "Cancel Reminder",
        "Are you sure you want to cancel this reminder?",
        [
          { text: "Keep It", style: "cancel" },
          {
            text: "Cancel Reminder",
            style: "destructive",
            onPress: async () => {
              await cancelReminderById(id);
              setReminders((prev) => prev.filter((r) => r.id !== id));
            },
          },
        ]
      );
    },
    []
  );

  const handleCancelAll = useCallback(() => {
    if (Platform.OS === "web") return;
    Alert.alert(
      "Cancel All Reminders",
      "This will cancel all scheduled appointment reminders. Continue?",
      [
        { text: "Keep Them", style: "cancel" },
        {
          text: "Cancel All",
          style: "destructive",
          onPress: async () => {
            await cancelAllReminders();
            setReminders([]);
          },
        },
      ]
    );
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top + 16 }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={[styles.headerIcon, { backgroundColor: colors.primary + "18" }]}>
          <Ionicons name="alarm" size={20} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>
            My Reminders
          </Text>
          <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>
            Upcoming appointment reminders
          </Text>
        </View>
        {reminders.length > 0 && (
          <Pressable
            onPress={handleCancelAll}
            style={({ pressed }) => [styles.cancelAllBtn, { opacity: pressed ? 0.65 : 1, borderColor: colors.destructive + "50" }]}
          >
            <Text style={[styles.cancelAllText, { color: colors.destructive }]}>
              Clear All
            </Text>
          </Pressable>
        )}
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : reminders.length === 0 ? (
        <View style={styles.center}>
          <View style={[styles.emptyIcon, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="alarm-outline" size={36} color={colors.mutedForeground} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
            No Reminders Scheduled
          </Text>
          <Text style={[styles.emptySub, { color: colors.mutedForeground }]}>
            Book a Systems Review and set a reminder — we will notify you 24 hours before your call.
          </Text>
        </View>
      ) : (
        <FlatList
          data={reminders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[styles.cardIcon, { backgroundColor: colors.primary + "14" }]}>
                <Ionicons name="notifications" size={18} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.cardTitle, { color: colors.foreground }]}>
                  {item.title}
                </Text>
                {item.triggerDate && (
                  <Text style={[styles.cardDate, { color: colors.primary }]}>
                    Fires: {formatReminderDate(item.triggerDate)}
                  </Text>
                )}
                <Text style={[styles.cardBody, { color: colors.mutedForeground }]} numberOfLines={2}>
                  {item.body}
                </Text>
              </View>
              <Pressable
                onPress={() => handleCancel(item.id)}
                style={({ pressed }) => [styles.deleteBtn, { opacity: pressed ? 0.6 : 1 }]}
              >
                <Ionicons name="trash-outline" size={18} color={colors.destructive} />
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    marginBottom: 4,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
  },
  headerSub: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 1,
  },
  cancelAllBtn: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  cancelAllText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 12,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
  },
  emptySub: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 20,
  },
  list: {
    padding: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
  },
  cardIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
    marginBottom: 2,
  },
  cardDate: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 3,
  },
  cardBody: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
  deleteBtn: {
    padding: 6,
    flexShrink: 0,
  },
});
