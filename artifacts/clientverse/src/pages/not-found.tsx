import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A1628] text-white flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-[#4AC4E0] rounded-sm flex items-center justify-center font-bold text-[#0A1628] text-2xl mx-auto mb-8">
          CV
        </div>
        <p className="text-[#4AC4E0] font-semibold uppercase tracking-widest text-sm mb-4">404</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Page Not Found</h1>
        <p className="text-white/60 mb-10 leading-relaxed">
          That page doesn't exist or has moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#4AC4E0] text-[#0A1628] font-bold px-8 py-4 rounded-lg hover:bg-[#3bb1cc] transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-lg hover:border-[#4AC4E0]/40 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
