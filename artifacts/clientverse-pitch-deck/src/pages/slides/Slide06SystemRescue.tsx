export default function Slide06SystemRescue() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#4AC4E0" }}>
      <div
        className="absolute"
        style={{ top: 0, left: 0, width: "100%", height: "100%", background: "radial-gradient(ellipse at 20% 50%, rgba(0,0,0,0.10) 0%, transparent 60%)" }}
      />
      <div
        className="absolute"
        style={{ bottom: 0, right: 0, width: "50vw", height: "60vh", background: "radial-gradient(ellipse at bottom right, rgba(0,0,0,0.08) 0%, transparent 70%)" }}
      />

      <div className="absolute inset-0 flex flex-col justify-center" style={{ padding: "0 7vw" }}>
        <p className="font-display font-bold tracking-widest mb-[2vh]" style={{ fontSize: "1.1vw", color: "rgba(10,22,40,0.60)", letterSpacing: "0.15em" }}>
          FLAGSHIP OFFERING
        </p>

        <h2 className="font-display font-black tracking-tight leading-none mb-[2.5vh]" style={{ fontSize: "7vw", color: "#0A1628" }}>
          System Rescue™
        </h2>

        <p className="font-body font-medium mb-[6vh]" style={{ fontSize: "2vw", color: "rgba(10,22,40,0.70)", maxWidth: "55vw", lineHeight: 1.5 }}>
          Your tech stack is broken. We fix it — completely.
        </p>

        <div className="flex gap-[2vw]">
          <div style={{ flex: 1, background: "rgba(10,22,40,0.10)", borderRadius: "0.8vh", padding: "2.5vh 2vw", borderTop: "3px solid rgba(10,22,40,0.25)" }}>
            <p className="font-display font-bold mb-[1vh]" style={{ fontSize: "1.8vw", color: "#0A1628" }}>Audit™</p>
            <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(10,22,40,0.65)", lineHeight: 1.5 }}>
              Full diagnostic of your current systems, automations, and data flows.
            </p>
          </div>
          <div style={{ flex: 1, background: "rgba(10,22,40,0.10)", borderRadius: "0.8vh", padding: "2.5vh 2vw", borderTop: "3px solid rgba(10,22,40,0.25)" }}>
            <p className="font-display font-bold mb-[1vh]" style={{ fontSize: "1.8vw", color: "#0A1628" }}>Cleanup™</p>
            <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(10,22,40,0.65)", lineHeight: 1.5 }}>
              Removal of dead automations, duplicate records, and broken integrations.
            </p>
          </div>
          <div style={{ flex: 1, background: "rgba(10,22,40,0.10)", borderRadius: "0.8vh", padding: "2.5vh 2vw", borderTop: "3px solid rgba(10,22,40,0.25)" }}>
            <p className="font-display font-bold mb-[1vh]" style={{ fontSize: "1.8vw", color: "#0A1628" }}>Rebuild™</p>
            <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(10,22,40,0.65)", lineHeight: 1.5 }}>
              Re-architecture of core workflows on a stable, documented foundation.
            </p>
          </div>
          <div style={{ flex: 1, background: "rgba(10,22,40,0.10)", borderRadius: "0.8vh", padding: "2.5vh 2vw", borderTop: "3px solid rgba(10,22,40,0.25)" }}>
            <p className="font-display font-bold mb-[1vh]" style={{ fontSize: "1.8vw", color: "#0A1628" }}>Migration™</p>
            <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(10,22,40,0.65)", lineHeight: 1.5 }}>
              Clean platform migrations with no data loss and no operational downtime.
            </p>
          </div>
          <div style={{ flex: 1, background: "rgba(10,22,40,0.10)", borderRadius: "0.8vh", padding: "2.5vh 2vw", borderTop: "3px solid rgba(10,22,40,0.25)" }}>
            <p className="font-display font-bold mb-[1vh]" style={{ fontSize: "1.8vw", color: "#0A1628" }}>Optimization™</p>
            <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(10,22,40,0.65)", lineHeight: 1.5 }}>
              Continuous performance improvements after your system is stabilized.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
