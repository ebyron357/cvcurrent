import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <Navbar />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-[#4AC4E0] mb-12 text-lg">Last updated: January 2025</p>

          <div className="prose prose-invert max-w-none space-y-10 text-white/75 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
              <p>
                ClientVerse collects information you provide directly to us, such as when you fill out a contact form, book a consultation, or communicate with us via email. This may include your name, email address, phone number, company name, and any other details you choose to share.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Respond to your inquiries and provide requested services</li>
                <li>Schedule and conduct consultations and strategy sessions</li>
                <li>Send you relevant information about our services</li>
                <li>Improve our website and service offerings</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
              <p>
                ClientVerse does not sell, trade, or otherwise transfer your personally identifiable information to outside parties. We may share information with trusted third-party service providers who assist us in operating our website and conducting our business, provided those parties agree to keep this information confidential.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Cookies</h2>
              <p>
                Our website may use cookies to enhance your browsing experience. You can set your browser to refuse cookies or to alert you when cookies are being sent. Some features of the site may not function properly without cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party sites such as Calendly for booking. These sites have their own privacy policies, and we do not accept any responsibility for them. Please review the privacy policy of any third-party site you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Your Rights</h2>
              <p>
                You have the right to request access to the personal data we hold about you, to request correction of inaccurate data, and to request deletion of your data subject to applicable law. To exercise these rights, contact us at support@clientverse.io.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Changes to This Policy</h2>
              <p>
                We reserve the right to update this privacy policy at any time. We will notify you of any changes by posting the new policy on this page. Your continued use of our services after changes are made constitutes your acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:support@clientverse.io" className="text-[#4AC4E0] hover:underline">
                  support@clientverse.io
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
