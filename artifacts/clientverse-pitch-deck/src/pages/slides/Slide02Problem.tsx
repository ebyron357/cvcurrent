export default function Slide02Problem() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#0A1628" }}>
      <div
        className="absolute"
        style={{ top: 0, left: 0, width: "40vw", height: "100vh", background: "linear-gradient(90deg, rgba(74,196,224,0.04) 0%, transparent 100%)" }}
      />
      <div
        className="absolute"
        style={{ bottom: 0, right: 0, width: "50vw", height: "60vh", background: "radial-gradient(ellipse at bottom right, rgba(19,32,56,0.8) 0%, transparent 70%)" }}
      />

      <div className="absolute inset-0 flex flex-col justify-center" style={{ padding: "0 7vw" }}>
        <div className="flex items-center gap-[1.2vw] mb-[2vh]">
          <div style={{ width: "3vw", height: "0.25vh", background: "#4AC4E0" }} />
          <p className="font-display font-bold tracking-widest" style={{ fontSize: "1.1vw", color: "#4AC4E0", letterSpacing: "0.15em" }}>
            THE CHALLENGE
          </p>
        </div>

        <h2 className="font-display font-black tracking-tight leading-tight mb-[5vh]" style={{ fontSize: "4vw", color: "#ffffff", maxWidth: "55vw", textWrap: "balance" }}>
          Scaling breaks systems that were never built to scale.
        </h2>

        <div className="flex gap-[2.5vw]">
          <div style={{ flex: 1, background: "#132038", border: "1px solid #1E2D4A", borderRadius: "0.8vh", padding: "3.5vh 2.5vw" }}>
            <p className="font-display font-bold mb-[1.5vh]" style={{ fontSize: "2.8vw", color: "#4AC4E0" }}>01</p>
            <p className="font-display font-bold mb-[1vh]" style={{ fontSize: "1.6vw", color: "#ffffff" }}>Tech debt compounds silently.</p>
            <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.60)", lineHeight: 1.5 }}>
              Patched automations and disconnected tools accumulate until one failure cascades into many.
            </p>
          </div>
          <div style={{ flex: 1, background: "#132038", border: "1px solid #1E2D4A", borderRadius: "0.8vh", padding: "3.5vh 2.5vw" }}>
            <p className="font-display font-bold mb-[1.5vh]" style={{ fontSize: "2.8vw", color: "#4AC4E0" }}>02</p>
            <p className="font-display font-bold mb-[1vh]" style={{ fontSize: "1.6vw", color: "#ffffff" }}>No one owns operations.</p>
            <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.60)", lineHeight: 1.5 }}>
              Growth teams sell. Fulfillment ships. Nobody is accountable for the infrastructure holding it together.
            </p>
          </div>
          <div style={{ flex: 1, background: "#132038", border: "1px solid #1E2D4A", borderRadius: "0.8vh", padding: "3.5vh 2.5vw" }}>
            <p className="font-display font-bold mb-[1.5vh]" style={{ fontSize: "2.8vw", color: "#4AC4E0" }}>03</p>
            <p className="font-display font-bold mb-[1vh]" style={{ fontSize: "1.6vw", color: "#ffffff" }}>Headcount cannot solve it.</p>
            <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.60)", lineHeight: 1.5 }}>
              Hiring more people into a broken system produces more chaos. The architecture needs fixing first.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
