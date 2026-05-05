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

const rescueItems = [
  { title: "Audit™", desc: "Comprehensive review of existing broken systems to identify bottlenecks and failure points." },
  { title: "Cleanup™", desc: "Data sanitization, removing redundant tools, and simplifying complex automations." },
  { title: "Rebuild™", desc: "Re-engineering processes from the ground up using best-in-class architecture." },
  { title: "Migration™ & Optimization™", desc: "Moving data safely to new platforms and continuously tuning for peak performance." },
];

const serviceCategories = [
  {
    id: "growth",
    title: "Growth Systems",
    icon: "trending-up-outline" as const,
    description: "Systems designed to generate pipeline, track leads, and close deals predictably.",
    features: ["CRM Implementation", "Lead Scoring", "Pipeline Automation", "Sales Dashboards"],
  },
  {
    id: "scale",
    title: "Scale Systems",
    icon: "layers-outline" as const,
    description: "Infrastructure that handles increasing volume without breaking or requiring more headcount.",
    features: ["Process Standardization", "Capacity Planning", "Automated Onboarding", "Fulfillment Workflows"],
  },
  {
    id: "enterprise",
    title: "Enterprise Systems",
    icon: "business-outline" as const,
    description: "Custom, complex operational ecosystems for mature organizations.",
    features: ["ERP Integration", "Data Warehousing", "Custom Applications", "Security Compliance"],
  },
  {
    id: "ai",
    title: "AI Services",
    icon: "sparkles-outline" as const,
    description: "Practical artificial intelligence deployment to reduce manual work.",
    features: ["Custom AI Agents", "Support Automation", "Content Generation", "Data Analysis"],
  },
  {
    id: "content",
    title: "Content & Social Media",
    icon: "megaphone-outline" as const,
    description: "Engines that distribute your message across channels automatically.",
    features: ["Distribution Workflows", "Asset Management", "Scheduling Systems", "Performance Tracking"],
  },
  {
    id: "web",
    title: "Websites, Funnels & E-commerce",
    icon: "globe-outline" as const,
    description: "High-converting digital storefronts connected directly to your operations.",
    features: ["Conversion Optimization", "Payment Infrastructure", "Inventory Sync", "Analytics Setup"],
  },
  {
    id: "consulting",
    title: "Business Systems & Consulting",
    icon: "bar-chart-outline" as const,
    description: "Strategic guidance on how to architect your company for maximum efficiency.",
    features: ["Tech Stack Audits", "Process Mapping", "Vendor Selection", "Change Management"],
  },
  {
    id: "outsourcing",
    title: "Outsourcing & Partnerships",
    icon: "people-outline" as const,
    description: "Connecting your automated systems with reliable human operators.",
    features: ["BPO Integration", "SOP Documentation", "Quality Assurance", "Communication Hubs"],
  },
  {
    id: "support",
    title: "Ongoing Support & Optimization",
    icon: "refresh-outline" as const,
    description: "Continuous improvement and maintenance of your operational backbone.",
    features: ["System Monitoring", "Iterative Improvements", "Helpdesk Support", "Performance Reviews"],
  },
];

function ServiceCard({
  service,
}: {
  service: (typeof serviceCategories)[0];
}) {
  const colors = useColors();
  const [expanded, setExpanded] = useState(false);

  return (
    <Pressable
      onPress={() => setExpanded((v) => !v)}
      style={[
        styles.serviceCard,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View style={styles.serviceCardHeader}>
        <View
          style={[
            styles.serviceIconWrapper,
            { backgroundColor: colors.primary + "18" },
          ]}
        >
          <Ionicons name={service.icon} size={20} color={colors.primary} />
        </View>
        <View style={styles.serviceTitleWrapper}>
          <Text style={[styles.serviceTitle, { color: colors.foreground }]}>
            {service.title}
          </Text>
          <Text
            style={[styles.serviceDesc, { color: colors.mutedForeground }]}
            numberOfLines={expanded ? undefined : 2}
          >
            {service.description}
          </Text>
        </View>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={16}
          color={colors.mutedForeground}
        />
      </View>
      {expanded && (
        <View style={[styles.featureList, { borderTopColor: colors.border }]}>
          {service.features.map((f) => (
            <View key={f} style={styles.featureRow}>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={colors.primary}
              />
              <Text
                style={[styles.featureText, { color: colors.foreground }]}
              >
                {f}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Pressable>
  );
}

export default function ServicesScreen() {
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
        What We Build, Repair, and{" "}
        <Text style={{ color: colors.primary }}>Operate.</Text>
      </Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
        Comprehensive operational engineering — from the front-end funnel to the
        back-office database.
      </Text>

      {/* System Rescue Banner */}
      <View style={[styles.rescueBanner, { backgroundColor: colors.primary }]}>
        <Text style={[styles.rescueTitle, { color: colors.primaryForeground }]}>
          System Rescue™
        </Text>
        <Text style={[styles.rescueSubtitle, { color: colors.primaryForeground + "CC" }]}>
          Is your tech stack a mess? We specialize in untangling, fixing, and
          migrating broken operations.
        </Text>
        <View style={styles.rescueGrid}>
          {rescueItems.map((item) => (
            <View
              key={item.title}
              style={[
                styles.rescueItem,
                { backgroundColor: colors.primaryForeground + "18" },
              ]}
            >
              <Text
                style={[
                  styles.rescueItemTitle,
                  { color: colors.primaryForeground },
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  styles.rescueItemDesc,
                  { color: colors.primaryForeground + "CC" },
                ]}
              >
                {item.desc}
              </Text>
            </View>
          ))}
        </View>
        <Pressable
          onPress={handleBooking}
          style={({ pressed }) => [
            styles.rescueButton,
            {
              backgroundColor: colors.primaryForeground,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <Text
            style={[styles.rescueButtonText, { color: colors.primary }]}
          >
            Request a Rescue Audit
          </Text>
          <Ionicons name="arrow-forward" size={16} color={colors.primary} />
        </Pressable>
      </View>

      {/* Services */}
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
        All Services
      </Text>
      {serviceCategories.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}

      {/* Bottom CTA */}
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
  rescueBanner: {
    borderRadius: 16,
    padding: 20,
    gap: 12,
    marginTop: 4,
  },
  rescueTitle: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
  },
  rescueSubtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  rescueGrid: {
    gap: 8,
    marginTop: 4,
  },
  rescueItem: {
    borderRadius: 10,
    padding: 14,
    gap: 4,
  },
  rescueItemTitle: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
  },
  rescueItemDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },
  rescueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 4,
  },
  rescueButtonText: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    marginTop: 4,
  },
  serviceCard: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  serviceCardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 16,
  },
  serviceIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  serviceTitleWrapper: {
    flex: 1,
    gap: 4,
  },
  serviceTitle: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  serviceDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },
  featureList: {
    borderTopWidth: 1,
    padding: 16,
    gap: 10,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  featureText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
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
});
