import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import React, { useState } from "react";
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
const EMAIL = "support@clientverse.io";

const faqs = [
  {
    q: "Are you a GoHighLevel agency?",
    a: "No, we are strictly platform-agnostic. While we are highly capable in platforms like GoHighLevel, HubSpot, Salesforce, and others, our job is to architect the best system for your specific operational needs — not force you into a specific software ecosystem.",
  },
  {
    q: "Do you do custom software development?",
    a: "We build custom integrations, complex API bridges, and middleware to connect your existing tools. For full-stack native applications from scratch, we consult on architecture and can partner with development firms, but our core focus is operational orchestration and automation.",
  },
  {
    q: "How long does an engagement typically take?",
    a: "A System Rescue™ or initial Build project typically takes 4–8 weeks depending on complexity. Operate engagements are ongoing monthly partnerships.",
  },
];

function FAQItem({ faq }: { faq: { q: string; a: string } }) {
  const colors = useColors();
  const [open, setOpen] = useState(false);

  return (
    <Pressable
      onPress={() => setOpen((v) => !v)}
      style={[
        styles.faqItem,
        { borderColor: colors.border },
      ]}
    >
      <View style={styles.faqHeader}>
        <Text
          style={[styles.faqQuestion, { color: colors.foreground }]}
          numberOfLines={open ? undefined : 2}
        >
          {faq.q}
        </Text>
        <Ionicons
          name={open ? "remove-circle-outline" : "add-circle-outline"}
          size={20}
          color={colors.primary}
          style={{ flexShrink: 0 }}
        />
      </View>
      {open && (
        <Text style={[styles.faqAnswer, { color: colors.mutedForeground }]}>
          {faq.a}
        </Text>
      )}
    </Pressable>
  );
}

export default function ContactScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topPadding = isWeb ? 67 : insets.top;

  const handleBooking = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await Linking.openURL(CALENDLY_URL);
  };

  const handleEmail = async () => {
    await Linking.openURL(`mailto:${EMAIL}`);
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
        Start With a{" "}
        <Text style={{ color: colors.primary }}>Systems Review.</Text>
      </Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
        Stop guessing where the bottleneck is. We will map your operations and
        give you a technical diagnosis.
      </Text>

      {/* Primary CTA */}
      <Pressable
        testID="contact-book-cta"
        onPress={handleBooking}
        style={({ pressed }) => [
          styles.ctaButton,
          { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <Ionicons
          name="calendar-outline"
          size={22}
          color={colors.primaryForeground}
        />
        <View>
          <Text style={[styles.ctaTitle, { color: colors.primaryForeground }]}>
            Book a Systems Review
          </Text>
          <Text style={[styles.ctaHint, { color: colors.primaryForeground + "CC" }]}>
            via Calendly
          </Text>
        </View>
        <Ionicons
          name="arrow-forward"
          size={18}
          color={colors.primaryForeground}
          style={{ marginLeft: "auto" }}
        />
      </Pressable>

      {/* Email CTA */}
      <Pressable
        onPress={handleEmail}
        style={({ pressed }) => [
          styles.emailButton,
          {
            borderColor: colors.border,
            backgroundColor: colors.card,
            opacity: pressed ? 0.8 : 1,
          },
        ]}
      >
        <Ionicons name="mail-outline" size={20} color={colors.primary} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.emailLabel, { color: colors.mutedForeground }]}>
            Or email us at
          </Text>
          <Text style={[styles.emailAddress, { color: colors.primary }]}>
            {EMAIL}
          </Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={16}
          color={colors.mutedForeground}
        />
      </Pressable>

      {/* What to Expect */}
      <View
        style={[
          styles.expectBox,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.expectTitle, { color: colors.foreground }]}>
          What happens in a Systems Review?
        </Text>
        {[
          { icon: "search-outline" as const, text: "We audit your current tech stack and automations" },
          { icon: "map-outline" as const, text: "We map your operational failure points" },
          { icon: "document-text-outline" as const, text: "You get a concrete diagnosis and path forward" },
          { icon: "time-outline" as const, text: "Takes 45–60 minutes, no obligation" },
        ].map((item) => (
          <View key={item.text} style={styles.expectRow}>
            <View
              style={[
                styles.expectIconWrapper,
                { backgroundColor: colors.primary + "18" },
              ]}
            >
              <Ionicons name={item.icon} size={16} color={colors.primary} />
            </View>
            <Text
              style={[styles.expectText, { color: colors.mutedForeground }]}
            >
              {item.text}
            </Text>
          </View>
        ))}
      </View>

      {/* FAQ */}
      <Text style={[styles.faqTitle, { color: colors.foreground }]}>
        Frequently Asked Questions
      </Text>
      {faqs.map((faq) => (
        <FAQItem key={faq.q} faq={faq} />
      ))}
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
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 14,
    padding: 20,
    marginTop: 4,
  },
  ctaTitle: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  ctaHint: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  emailButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  emailLabel: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  emailAddress: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  expectBox: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 20,
    gap: 14,
  },
  expectTitle: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    marginBottom: 2,
  },
  expectRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  expectIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  expectText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 21,
    flex: 1,
  },
  faqTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    marginTop: 4,
  },
  faqItem: {
    borderBottomWidth: 1,
    paddingVertical: 16,
    gap: 10,
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    justifyContent: "space-between",
  },
  faqQuestion: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    lineHeight: 22,
    flex: 1,
  },
  faqAnswer: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
});
