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

const pillars = [
  {
    number: "01",
    title: "Build",
    description:
      "We construct scalable, reliable systems from the ground up, tailored perfectly to your operational needs. No off-the-shelf compromises.",
    icon: "construct-outline" as const,
  },
  {
    number: "02",
    title: "Repair",
    description:
      "Through our System Rescue™ protocol, we untangle messy tech stacks, fix broken automations, and restore order to your backend.",
    icon: "build-outline" as const,
  },
  {
    number: "03",
    title: "Operate",
    description:
      "We don't just hand you the keys and leave. We maintain, optimize, and run the infrastructure so you can focus on growth.",
    icon: "settings-outline" as const,
  },
];

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";

  const handleBooking = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await Linking.openURL(CALENDLY_URL);
  };

  const topPadding = isWeb ? 67 : insets.top;

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: topPadding + 24, paddingBottom: isWeb ? 34 : 24 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Badge */}
      <View style={[styles.badge, { borderColor: colors.border }]}>
        <View style={[styles.badgeDot, { backgroundColor: colors.primary }]} />
        <Text style={[styles.badgeText, { color: colors.mutedForeground }]}>
          Operational Systems Partner
        </Text>
      </View>

      {/* Hero */}
      <Text style={[styles.headline, { color: colors.foreground }]}>
        The Operational Backbone{" "}
        <Text style={{ color: colors.primary }}>
          Your Company Has Been Missing.
        </Text>
      </Text>

      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
        We build, repair, and operate business systems, automation, AI, and
        infrastructure for companies ready to scale.
      </Text>

      {/* CTA */}
      <Pressable
        testID="book-cta"
        onPress={handleBooking}
        style={({ pressed }) => [
          styles.ctaButton,
          { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <Ionicons name="calendar-outline" size={20} color={colors.primaryForeground} />
        <Text style={[styles.ctaText, { color: colors.primaryForeground }]}>
          Book a Systems Review
        </Text>
      </Pressable>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      {/* Value Pillars */}
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
        How We Work
      </Text>
      {pillars.map((pillar) => (
        <View
          key={pillar.number}
          style={[
            styles.pillarCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.pillarHeader}>
            <View
              style={[
                styles.pillarIconWrapper,
                { backgroundColor: colors.primary + "18" },
              ]}
            >
              <Ionicons name={pillar.icon} size={22} color={colors.primary} />
            </View>
            <View style={styles.pillarTitleRow}>
              <Text style={[styles.pillarNumber, { color: colors.primary }]}>
                {pillar.number}
              </Text>
              <Text style={[styles.pillarTitle, { color: colors.foreground }]}>
                {pillar.title}
              </Text>
            </View>
          </View>
          <Text style={[styles.pillarDesc, { color: colors.mutedForeground }]}>
            {pillar.description}
          </Text>
        </View>
      ))}

      {/* Bottom CTA */}
      <View
        style={[
          styles.bottomCta,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.bottomCtaTitle, { color: colors.foreground }]}>
          Ready to engineer your operations?
        </Text>
        <Text
          style={[styles.bottomCtaSubtitle, { color: colors.mutedForeground }]}
        >
          Start with a free Systems Review — we diagnose your bottleneck and
          map a path forward.
        </Text>
        <Pressable
          onPress={handleBooking}
          style={({ pressed }) => [
            styles.outlineButton,
            { borderColor: colors.primary, opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Text style={[styles.outlineButtonText, { color: colors.primary }]}>
            Book Now
          </Text>
          <Ionicons name="arrow-forward" size={16} color={colors.primary} />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    gap: 20,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    letterSpacing: 0.3,
  },
  headline: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    lineHeight: 24,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  ctaText: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.2,
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  pillarCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    gap: 12,
  },
  pillarHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pillarIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  pillarTitleRow: {
    flex: 1,
  },
  pillarNumber: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  pillarTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
  },
  pillarDesc: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  bottomCta: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    gap: 12,
    marginTop: 4,
  },
  bottomCtaTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    lineHeight: 28,
  },
  bottomCtaSubtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  outlineButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderRadius: 8,
    marginTop: 4,
  },
  outlineButtonText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
});
