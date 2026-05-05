export default function Slide08Engagement() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#0A1628" }}>
      <div
        className="absolute"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "70vw", height: "70vh", background: "radial-gradient(ellipse, rgba(74,196,224,0.04) 0%, transparent 65%)" }}
      />

      <div className="absolute inset-0 flex flex-col" style={{ padding: "5vh 7vw" }}>
        <div className="flex items-center gap-[1.2vw] mb-[1.5vh]">
          <div style={{ width: "3vw", height: "0.25vh", background: "#4AC4E0" }} />
          <p className="font-display font-bold tracking-widest" style={{ fontSize: "1.1vw", color: "#4AC4E0", letterSpacing: "0.15em" }}>
            ENGAGEMENT MODELS
          </p>
        </div>

        <h2 className="font-display font-black tracking-tight leading-tight mb-[4vh]" style={{ fontSize: "3.5vw", color: "#ffffff" }}>
          Scoped to Your Operation.
        </h2>

        <div className="grid gap-[2vh]" style={{ gridTemplateColumns: "1fr 1fr", flex: 1 }}>
          <div style={{ background: "#132038", border: "1px solid #1E2D4A", borderRadius: "0.8vh", padding: "3vh 2.5vw", borderTop: "3px solid #4AC4E0" }}>
            <p className="font-display font-bold mb-[1.5vh]" style={{ fontSize: "2.2vw", color: "#ffffff" }}>Build</p>
            <p className="font-body mb-[2vh]" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.60)", lineHeight: 1.5 }}>
              A specific system built from scratch and handed over. Project-scoped. Documented on delivery.
            </p>
            <p className="font-body font-medium" style={{ fontSize: "1.5vw", color: "#4AC4E0" }}>
              New divisions · Rapid deployments · Isolated processes
            </p>
          </div>
          <div style={{ background: "#132038", border: "1px solid #1E2D4A", borderRadius: "0.8vh", padding: "3vh 2.5vw", borderTop: "3px solid rgba(74,196,224,0.35)" }}>
            <p className="font-display font-bold mb-[1.5vh]" style={{ fontSize: "2.2vw", color: "#ffffff" }}>System Rescue™</p>
            <p className="font-body mb-[2vh]" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.60)", lineHeight: 1.5 }}>
              For companies with tangled, broken, or undocumented legacy systems. We audit, clean, and rebuild.
            </p>
            <p className="font-body font-medium" style={{ fontSize: "1.5vw", color: "#4AC4E0" }}>
              Technical debt · CRM migrations · Broken automations
            </p>
          </div>
          <div style={{ background: "#132038", border: "1px solid #1E2D4A", borderRadius: "0.8vh", padding: "3vh 2.5vw", borderTop: "3px solid rgba(74,196,224,0.35)" }}>
            <p className="font-display font-bold mb-[1.5vh]" style={{ fontSize: "2.2vw", color: "#ffffff" }}>Operate</p>
            <p className="font-body mb-[2vh]" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.60)", lineHeight: 1.5 }}>
              Retained partnership. We manage, monitor, and optimize your systems on an ongoing basis.
            </p>
            <p className="font-body font-medium" style={{ fontSize: "1.5vw", color: "#4AC4E0" }}>
              No internal RevOps team · Long-term infrastructure
            </p>
          </div>
          <div style={{ background: "#132038", border: "1px solid #1E2D4A", borderRadius: "0.8vh", padding: "3vh 2.5vw", borderTop: "3px solid rgba(74,196,224,0.35)" }}>
            <p className="font-display font-bold mb-[1.5vh]" style={{ fontSize: "2.2vw", color: "#ffffff" }}>Enterprise Systems</p>
            <p className="font-body mb-[2vh]" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.60)", lineHeight: 1.5 }}>
              Multi-department operational architecture with deep custom engineering and compliance requirements.
            </p>
            <p className="font-body font-medium" style={{ fontSize: "1.5vw", color: "#4AC4E0" }}>
              $10M+ companies · Stringent compliance · Massive scale
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
