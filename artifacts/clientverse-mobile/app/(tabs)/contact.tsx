import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

const CALENDLY_URL = "https://calendly.com/clientverse/strategy-call";
const EMAIL = "support@clientverse.io";

function getApiBaseUrl(): string {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    return `${window.location.origin}/api`;
  }
  return process.env.EXPO_PUBLIC_API_BASE_URL ?? "https://clientverse.replit.app/api";
}

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

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function ContactForm() {
  const colors = useColors();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch(`${getApiBaseUrl()}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });

      const data = await res.json() as { success?: boolean; error?: string };

      if (!res.ok || !data.success) {
        setServerError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      setServerError("Unable to send your message. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <View
        style={[
          styles.successBox,
          { backgroundColor: colors.card, borderColor: colors.primary + "40" },
        ]}
      >
        <View style={[styles.successIconWrap, { backgroundColor: colors.primary + "20" }]}>
          <Ionicons name="checkmark-circle" size={32} color={colors.primary} />
        </View>
        <Text style={[styles.successTitle, { color: colors.foreground }]}>
          Message Sent!
        </Text>
        <Text style={[styles.successBody, { color: colors.mutedForeground }]}>
          We received your message and will be in touch within 24 hours.
        </Text>
        <Pressable
          onPress={() => setStatus("idle")}
          style={({ pressed }) => [
            styles.resetButton,
            { borderColor: colors.border, opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Text style={[styles.resetButtonText, { color: colors.mutedForeground }]}>
            Send another message
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.formBox,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <Text style={[styles.formTitle, { color: colors.foreground }]}>
        Send Us a Message
      </Text>
      <Text style={[styles.formSubtitle, { color: colors.mutedForeground }]}>
        Not ready to book? Drop us a note and we will follow up.
      </Text>

      {/* Name */}
      <View style={styles.fieldGroup}>
        <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>
          Full Name <Text style={{ color: colors.destructive }}>*</Text>
        </Text>
        <TextInput
          testID="contact-form-name"
          value={name}
          onChangeText={(t) => {
            setName(t);
            if (errors.name) setErrors((e) => ({ ...e, name: undefined }));
          }}
          placeholder="Jane Smith"
          placeholderTextColor={colors.mutedForeground + "80"}
          style={[
            styles.input,
            {
              color: colors.foreground,
              backgroundColor: colors.background,
              borderColor: errors.name ? colors.destructive : colors.border,
            },
          ]}
          autoCapitalize="words"
          returnKeyType="next"
          editable={status !== "loading"}
        />
        {errors.name ? (
          <Text style={[styles.errorText, { color: colors.destructive }]}>
            {errors.name}
          </Text>
        ) : null}
      </View>

      {/* Email */}
      <View style={styles.fieldGroup}>
        <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>
          Email Address <Text style={{ color: colors.destructive }}>*</Text>
        </Text>
        <TextInput
          testID="contact-form-email"
          value={email}
          onChangeText={(t) => {
            setEmail(t);
            if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
          }}
          placeholder="jane@company.com"
          placeholderTextColor={colors.mutedForeground + "80"}
          style={[
            styles.input,
            {
              color: colors.foreground,
              backgroundColor: colors.background,
              borderColor: errors.email ? colors.destructive : colors.border,
            },
          ]}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          editable={status !== "loading"}
        />
        {errors.email ? (
          <Text style={[styles.errorText, { color: colors.destructive }]}>
            {errors.email}
          </Text>
        ) : null}
      </View>

      {/* Message */}
      <View style={styles.fieldGroup}>
        <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>
          Message <Text style={{ color: colors.destructive }}>*</Text>
        </Text>
        <TextInput
          testID="contact-form-message"
          value={message}
          onChangeText={(t) => {
            setMessage(t);
            if (errors.message) setErrors((e) => ({ ...e, message: undefined }));
          }}
          placeholder="Tell us about your situation..."
          placeholderTextColor={colors.mutedForeground + "80"}
          style={[
            styles.input,
            styles.textArea,
            {
              color: colors.foreground,
              backgroundColor: colors.background,
              borderColor: errors.message ? colors.destructive : colors.border,
            },
          ]}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          returnKeyType="default"
          editable={status !== "loading"}
        />
        {errors.message ? (
          <Text style={[styles.errorText, { color: colors.destructive }]}>
            {errors.message}
          </Text>
        ) : null}
      </View>

      {/* Server error */}
      {status === "error" && serverError ? (
        <View
          style={[
            styles.serverErrorBox,
            { backgroundColor: colors.destructive + "18", borderColor: colors.destructive + "40" },
          ]}
        >
          <Ionicons name="alert-circle-outline" size={16} color={colors.destructive} />
          <Text style={[styles.serverErrorText, { color: colors.destructive }]}>
            {serverError}
          </Text>
        </View>
      ) : null}

      {/* Submit button */}
      <Pressable
        testID="contact-form-submit"
        onPress={handleSubmit}
        disabled={status === "loading"}
        style={({ pressed }) => [
          styles.submitButton,
          {
            backgroundColor: colors.primary,
            opacity: pressed || status === "loading" ? 0.75 : 1,
          },
        ]}
      >
        {status === "loading" ? (
          <ActivityIndicator size="small" color={colors.primaryForeground} />
        ) : (
          <>
            <Ionicons name="send-outline" size={18} color={colors.primaryForeground} />
            <Text style={[styles.submitButtonText, { color: colors.primaryForeground }]}>
              Send Message
            </Text>
          </>
        )}
      </Pressable>
    </View>
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

      {/* Contact Form */}
      <ContactForm />

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
  formBox: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 20,
    gap: 16,
  },
  formTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
  },
  formSubtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 21,
    marginTop: -8,
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  errorText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  serverErrorBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  serverErrorText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
    flex: 1,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 4,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  successBox: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 24,
    alignItems: "center",
    gap: 12,
  },
  successIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  successTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  successBody: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
    textAlign: "center",
  },
  resetButton: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 4,
  },
  resetButtonText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
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
