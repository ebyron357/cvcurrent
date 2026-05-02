import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <Navbar />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Disclaimer</h1>
          <p className="text-[#4AC4E0] mb-12 text-lg">Last updated: January 2025</p>

          <div className="prose prose-invert max-w-none space-y-10 text-white/75 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">General Information</h2>
              <p>
                The information provided on this website is for general informational purposes only. All information on this site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">No Professional Advice</h2>
              <p>
                The content on this website does not constitute legal, financial, technical, or other professional advice. Any reliance you place on such information is strictly at your own risk. Before acting on any information found on this website, consult with a qualified professional in the relevant field.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Results Disclaimer</h2>
              <p>
                ClientVerse does not guarantee specific business outcomes or results from its services. Business performance depends on many factors outside ClientVerse's control, including market conditions, client implementation, team execution, and other variables. No claims of specific revenue increases, efficiency gains, or other measurable outcomes should be interpreted as guarantees.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Links</h2>
              <p>
                This website may contain links to external websites. These links are provided for convenience and do not constitute an endorsement of the content, products, or services on those sites. ClientVerse has no control over the content or availability of linked sites and accepts no responsibility for them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Platform References</h2>
              <p>
                References to any platforms, software, or tools on this website are for informational purposes. ClientVerse is platform-agnostic and does not have any affiliation with, or act as an authorized reseller for, any specific software platform unless explicitly stated in a service agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
              <p>
                If you have questions about this Disclaimer, please contact us at{" "}
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
