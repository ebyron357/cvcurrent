import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <Navbar />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-[#4AC4E0] mb-12 text-lg">Last updated: January 2025</p>

          <div className="prose prose-invert max-w-none space-y-10 text-white/75 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using ClientVerse's website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Services Description</h2>
              <p>
                ClientVerse provides operational consulting, systems engineering, automation, AI integration, and related business services. The specific scope, deliverables, timelines, and pricing for any engagement are defined in individual service agreements or statements of work.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Client Responsibilities</h2>
              <p>Clients engaging ClientVerse agree to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Provide accurate and complete information necessary for service delivery</li>
                <li>Grant access to systems, tools, and personnel required for the engagement</li>
                <li>Review and provide timely feedback on deliverables</li>
                <li>Make payments as outlined in the service agreement</li>
                <li>Maintain confidentiality of any proprietary processes or methodologies shared</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Intellectual Property</h2>
              <p>
                Unless otherwise specified in a service agreement, ClientVerse retains ownership of its methodologies, frameworks, and proprietary processes. Custom work product developed specifically for a client becomes the client's property upon full payment. General tools and frameworks developed by ClientVerse remain ClientVerse's property.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Confidentiality</h2>
              <p>
                Both parties agree to maintain the confidentiality of sensitive information shared during an engagement. ClientVerse will not disclose client information to third parties without consent, except as required by law. This obligation survives termination of the engagement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
              <p>
                ClientVerse's liability for any claim arising from services is limited to the amount paid for those specific services. ClientVerse is not liable for indirect, incidental, special, or consequential damages. Clients are responsible for maintaining adequate backups of data before any system modifications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Termination</h2>
              <p>
                Either party may terminate a service engagement with written notice as specified in the service agreement. Obligations accrued prior to termination remain in effect. Fees for work completed prior to termination are due and payable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Governing Law</h2>
              <p>
                These terms are governed by applicable law. Any disputes arising from these terms or related services will be resolved through good-faith negotiation, and if necessary, binding arbitration.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Contact</h2>
              <p>
                Questions about these Terms of Service should be sent to{" "}
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
