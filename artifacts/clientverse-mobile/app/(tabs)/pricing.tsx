import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

const CALENDLY_URL = "https://calendly.com/clientverse/strategy-call";

const models = [
  {
    title: "Build",
    icon: "construct-outline" as const,
    description:
      "For companies that need a specific system built from scratch and handed over.",
    ideal: "New divisions, specific isolated processes, rapid deployments.",
  },
  {
    title: "System Rescue™",
    icon: "medkit-outline" as const,
    description:
      "For established companies with tangled, broken, or undocumented legacy systems.",
    ideal: "Companies stuck in technical debt, messy CRM migrations.",
  },
  {
    title: "Operate",
    icon: "settings-outline" as const,
    description:
      "Retained partnership where we manage, monitor, and optimize your systems continually.",
    ideal: "Companies without an internal operations or RevOps team.",
  },
  {
    title: "Enterprise Systems",
    icon: "business-outline" as const,
    description:
      "Complex, multi-department operational architecture with deep custom engineering.",
    ideal: "$10M+ companies requiring stringent compliance and massive scale.",
  },
];

export default function PricingScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topPadding = isWeb ? 67 : insets.top;

  const handleBooking = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await Linking.openURL(CALENDLY_URL);
  };

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: topPadding + 24, paddingBottom: isWeb ? 34 : 24 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <Text style={[styles.headline, { color: colors.foreground }]}>
        Scoped to Your Operation.{" "}
        <Text style={{ color: colors.primary }}>Not Off a Menu.</Text>
      </Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
        We don't sell generic subscription tiers. We diagnose your bottleneck
        and scope a precise engineering engagement.
      </Text>

      {/* Pricing Cards */}
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
        Engagement Models
      </Text>

      {models.map((model) => (
        <View
          key={model.title}
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          {/* Accent corner decoration */}
          <View
            style={[
              styles.accentCorner,
              { backgroundColor: colors.primary + "18" },
            ]}
          />
          <View style={styles.cardIconRow}>
            <View
              style={[
                styles.cardIconWrapper,
                { backgroundColor: colors.primary + "18" },
              ]}
            >
              <Ionicons name={model.icon} size={22} color={colors.primary} />
            </View>
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>
              {model.title}
            </Text>
          </View>
          <Text style={[styles.cardDesc, { color: colors.mutedForeground }]}>
            {model.description}
          </Text>
          <View
            style={[styles.idealRow, { borderTopColor: colors.border }]}
          >
            <Text style={[styles.idealLabel, { color: colors.primary }]}>
              Ideal for:{" "}
            </Text>
            <Text style={[styles.idealText, { color: colors.foreground }]}>
              {model.ideal}
            </Text>
          </View>
        </View>
      ))}

      {/* Scope CTA */}
      <View
        style={[
          styles.scopeBox,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.scopeTitle, { color: colors.foreground }]}>
          Let's scope your project.
        </Text>
        <Text style={[styles.scopeBody, { color: colors.mutedForeground }]}>
          Everything begins with a Systems Review. We look at your current
          architecture, map the failure points, and propose a concrete path
          forward.
        </Text>
        <Pressable
          testID="pricing-book-cta"
          onPress={handleBooking}
          style={({ pressed }) => [
            styles.ctaButton,
            { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Ionicons
            name="calendar-outline"
            size={18}
            color={colors.primaryForeground}
          />
          <Text style={[styles.ctaText, { color: colors.primaryForeground }]}>
            Book a Systems Review
          </Text>
        </Pressable>

        <View style={styles.noPriceRow}>
          <Ionicons
            name="information-circle-outline"
            size={15}
            color={colors.mutedForeground}
          />
          <Text style={[styles.noPriceText, { color: colors.mutedForeground }]}>
            No fixed pricing — every project is scoped to your needs.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, gap: 16 },
  headline: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    lineHeight: 36,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    lineHeight: 23,
    marginTop: -4,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    marginTop: 4,
  },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 20,
    gap: 12,
    overflow: "hidden",
  },
  accentCorner: {
    position: "absolute",
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cardIconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    flex: 1,
  },
  cardDesc: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  idealRow: {
    borderTopWidth: 1,
    paddingTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 2,
  },
  idealLabel: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  idealText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
    flex: 1,
  },
  scopeBox: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    gap: 12,
    marginTop: 4,
  },
  scopeTitle: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
  },
  scopeBody: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 4,
  },
  ctaText: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  noPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  noPriceText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    flex: 1,
    lineHeight: 18,
  },
});
