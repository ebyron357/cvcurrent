export default function Slide10CTA() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "linear-gradient(160deg, #060f1d 0%, #0A1628 50%, #0d1f3a 100%)" }}>
      <div
        className="absolute"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "70vw", height: "70vh", background: "radial-gradient(ellipse, rgba(74,196,224,0.09) 0%, transparent 65%)" }}
      />

      <div
        className="absolute"
        style={{ top: 0, left: "50%", transform: "translateX(-50%)", width: "1px", height: "20vh", background: "linear-gradient(180deg, transparent 0%, rgba(74,196,224,0.40) 100%)" }}
      />
      <div
        className="absolute"
        style={{ bottom: 0, left: "50%", transform: "translateX(-50%)", width: "1px", height: "20vh", background: "linear-gradient(180deg, rgba(74,196,224,0.40) 0%, transparent 100%)" }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ padding: "0 10vw" }}>
        <p className="font-display font-bold tracking-widest mb-[4vh] text-center" style={{ fontSize: "1.1vw", color: "#4AC4E0", letterSpacing: "0.20em" }}>
          NEXT STEP
        </p>

        <h2 className="font-display font-black tracking-tight leading-tight text-center mb-[3vh]" style={{ fontSize: "6vw", color: "#ffffff", textWrap: "balance" }}>
          Start With a Systems Review.
        </h2>

        <p className="font-body font-medium text-center mb-[6vh]" style={{ fontSize: "1.8vw", color: "rgba(255,255,255,0.60)", maxWidth: "50vw", lineHeight: 1.6 }}>
          We diagnose your bottleneck and scope a precise engagement — no generic proposals, no subscription tiers.
        </p>

        <div style={{ background: "#4AC4E0", borderRadius: "0.5vh", padding: "2vh 3.5vw", marginBottom: "5vh" }}>
          <p className="font-display font-bold text-center" style={{ fontSize: "1.8vw", color: "#0A1628" }}>
            calendly.com/clientverse/strategy-call
          </p>
        </div>

        <div style={{ height: "1px", width: "20vw", background: "rgba(74,196,224,0.25)", marginBottom: "3vh" }} />

        <p className="font-body text-center" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.35)" }}>
          support@clientverse.io
        </p>

        <p className="font-display font-black text-center mt-[4vh]" style={{ fontSize: "2.2vw", color: "rgba(255,255,255,0.15)", letterSpacing: "0.1em" }}>
          CLIENTVERSE
        </p>
      </div>
    </div>
  );
}
