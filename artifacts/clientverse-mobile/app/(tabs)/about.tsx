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

const beliefs = [
  {
    title: "Simplicity scales. Complexity breaks.",
    description:
      "We ruthlessly eliminate redundant tools and convoluted workflows. If it takes 5 steps to do what could be done in 1, it's broken.",
    icon: "git-branch-outline" as const,
  },
  {
    title: "Data must be sovereign.",
    description:
      "Your systems should have a single source of truth. Siloed data is useless data. We ensure information flows freely and accurately.",
    icon: "shield-checkmark-outline" as const,
  },
  {
    title: "AI is a tool, not magic.",
    description:
      "We deploy AI where it actually saves time and money, not just for the sake of using a buzzword. Practical application over hype.",
    icon: "sparkles-outline" as const,
  },
  {
    title: "Operators, not just architects.",
    description:
      "A system is only as good as its maintenance. We stand by what we build and ensure it continues to run smoothly under pressure.",
    icon: "hammer-outline" as const,
  },
];

export default function AboutScreen() {
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
        A Full Operational Ecosystem.{" "}
        <Text style={{ color: colors.primary }}>Built to Run.</Text>
      </Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
        We exist to solve the fundamental scaling problem: growing revenue faster
        than operational chaos.
      </Text>

      {/* The Problem */}
      <View
        style={[
          styles.section,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.sectionLabel, { color: colors.primary }]}>
          THE PROBLEM
        </Text>
        <Text style={[styles.sectionHeading, { color: colors.foreground }]}>
          Companies outgrow their infrastructure before they realize it.
        </Text>
        <Text style={[styles.sectionBody, { color: colors.mutedForeground }]}>
          It usually starts small. A few missed follow-ups. A zap that silently
          breaks. A spreadsheet that gets too heavy.
        </Text>
        <Text style={[styles.sectionBody, { color: colors.mutedForeground }]}>
          Suddenly, your team is spending 40% of their week doing manual data
          entry, fighting with incompatible software, and patching leaks in your
          funnel. Growth stalls not because you can't sell, but because your
          operations can't deliver.
        </Text>
      </View>

      {/* Our Mission */}
      <View
        style={[
          styles.section,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.sectionLabel, { color: colors.primary }]}>
          OUR MISSION
        </Text>
        <Text style={[styles.sectionHeading, { color: colors.foreground }]}>
          To be the operational backbone for ambitious companies.
        </Text>
        <Text style={[styles.sectionBody, { color: colors.mutedForeground }]}>
          ClientVerse doesn't just "set up software." We architect resilient
          ecosystems that handle volume effortlessly. We turn fragile,
          human-dependent processes into robust, automated machinery.
        </Text>
      </View>

      {/* Core Beliefs */}
      <Text style={[styles.beliefHeader, { color: colors.foreground }]}>
        Our Core Beliefs
      </Text>
      {beliefs.map((belief) => (
        <View
          key={belief.title}
          style={[
            styles.beliefCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View
            style={[
              styles.beliefIcon,
              { backgroundColor: colors.primary + "18" },
            ]}
          >
            <Ionicons name={belief.icon} size={20} color={colors.primary} />
          </View>
          <Text style={[styles.beliefTitle, { color: colors.foreground }]}>
            {belief.title}
          </Text>
          <Text style={[styles.beliefDesc, { color: colors.mutedForeground }]}>
            {belief.description}
          </Text>
        </View>
      ))}

      {/* Who We Serve */}
      <View
        style={[
          styles.whoSection,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.whoTitle, { color: colors.foreground }]}>
          Who We Serve
        </Text>
        <Text style={[styles.whoBody, { color: colors.mutedForeground }]}>
          We partner with B2B companies, agencies, high-ticket services, and
          scaling e-commerce brands doing $1M–$50M in revenue who realize their
          internal operations are the bottleneck to their next milestone.
        </Text>
        <Pressable
          onPress={handleBooking}
          style={({ pressed }) => [
            styles.ctaButton,
            { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Text style={[styles.ctaText, { color: colors.primaryForeground }]}>
            Book a Systems Review
          </Text>
          <Ionicons
            name="calendar-outline"
            size={18}
            color={colors.primaryForeground}
          />
        </Pressable>
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
  section: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 20,
    gap: 10,
  },
  sectionLabel: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1.5,
  },
  sectionHeading: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    lineHeight: 26,
  },
  sectionBody: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  beliefHeader: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    marginTop: 4,
  },
  beliefCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 18,
    gap: 10,
  },
  beliefIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  beliefTitle: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    lineHeight: 22,
  },
  beliefDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 21,
  },
  whoSection: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    gap: 12,
    marginTop: 4,
  },
  whoTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  whoBody: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 4,
  },
  ctaText: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
  },
});
