export default function Slide04HowWeWork() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#0A1628" }}>
      <div
        className="absolute"
        style={{ top: 0, right: 0, width: "40vw", height: "50vh", background: "radial-gradient(ellipse at top right, rgba(74,196,224,0.05) 0%, transparent 70%)" }}
      />

      <div className="absolute inset-0 flex flex-col justify-center" style={{ padding: "0 7vw" }}>
        <div className="flex items-center gap-[1.2vw] mb-[2vh]">
          <div style={{ width: "3vw", height: "0.25vh", background: "#4AC4E0" }} />
          <p className="font-display font-bold tracking-widest" style={{ fontSize: "1.1vw", color: "#4AC4E0", letterSpacing: "0.15em" }}>
            HOW WE WORK
          </p>
        </div>

        <h2 className="font-display font-black tracking-tight leading-tight mb-[5vh]" style={{ fontSize: "3.8vw", color: "#ffffff", maxWidth: "55vw", textWrap: "balance" }}>
          Every engagement follows a deliberate mode.
        </h2>

        <div className="flex gap-[2vw]">
          <div style={{ flex: 1, borderTop: "3px solid #4AC4E0", paddingTop: "3vh", paddingRight: "1.5vw" }}>
            <p className="font-display font-black mb-[1.5vh]" style={{ fontSize: "4.5vw", color: "rgba(74,196,224,0.20)" }}>01</p>
            <p className="font-display font-bold mb-[1.5vh]" style={{ fontSize: "2vw", color: "#ffffff" }}>Build</p>
            <p className="font-body mb-[2.5vh]" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.60)", lineHeight: 1.6 }}>
              We construct scalable, reliable systems from the ground up — tailored to your operational requirements. No off-the-shelf compromises.
            </p>
            <p className="font-body font-medium" style={{ fontSize: "1.5vw", color: "#4AC4E0" }}>
              Ideal for: New divisions, specific isolated processes, rapid deployments.
            </p>
          </div>
          <div style={{ flex: 1, borderTop: "3px solid rgba(74,196,224,0.35)", paddingTop: "3vh", paddingRight: "1.5vw" }}>
            <p className="font-display font-black mb-[1.5vh]" style={{ fontSize: "4.5vw", color: "rgba(74,196,224,0.20)" }}>02</p>
            <p className="font-display font-bold mb-[1.5vh]" style={{ fontSize: "2vw", color: "#ffffff" }}>Repair</p>
            <p className="font-body mb-[2.5vh]" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.60)", lineHeight: 1.6 }}>
              Through our System Rescue™ protocol, we untangle messy tech stacks, fix broken automations, and restore order to your backend.
            </p>
            <p className="font-body font-medium" style={{ fontSize: "1.5vw", color: "#4AC4E0" }}>
              Ideal for: Companies stuck in technical debt, messy CRM migrations.
            </p>
          </div>
          <div style={{ flex: 1, borderTop: "3px solid rgba(74,196,224,0.35)", paddingTop: "3vh" }}>
            <p className="font-display font-black mb-[1.5vh]" style={{ fontSize: "4.5vw", color: "rgba(74,196,224,0.20)" }}>03</p>
            <p className="font-display font-bold mb-[1.5vh]" style={{ fontSize: "2vw", color: "#ffffff" }}>Operate</p>
            <p className="font-body mb-[2.5vh]" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.60)", lineHeight: 1.6 }}>
              We maintain, optimize, and run the infrastructure on a retained basis so you can focus on growth, not firefighting.
            </p>
            <p className="font-body font-medium" style={{ fontSize: "1.5vw", color: "#4AC4E0" }}>
              Ideal for: Companies without an internal operations or RevOps team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
