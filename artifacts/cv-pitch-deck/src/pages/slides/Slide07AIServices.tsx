export default function Slide07AIServices() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#0A1628" }}>
      <div
        className="absolute inset-0 flex"
      >
        <div className="flex flex-col justify-center" style={{ width: "52vw", padding: "0 7vw 0 7vw" }}>
          <div className="flex items-center gap-[1.2vw] mb-[2vh]">
            <div style={{ width: "3vw", height: "0.25vh", background: "#4AC4E0" }} />
            <p className="font-display font-bold tracking-widest" style={{ fontSize: "1.1vw", color: "#4AC4E0", letterSpacing: "0.15em" }}>
              AI SERVICES
            </p>
          </div>

          <h2 className="font-display font-black tracking-tight leading-tight mb-[2.5vh]" style={{ fontSize: "4vw", color: "#ffffff", textWrap: "balance" }}>
            Practical AI. Deployed to Production.
          </h2>

          <p className="font-body mb-[4vh]" style={{ fontSize: "1.6vw", color: "rgba(255,255,255,0.60)", lineHeight: 1.6 }}>
            We deploy AI where it creates real operational value — not as a demo, but as production infrastructure.
          </p>

          <div className="flex flex-col gap-[2vh]">
            <div className="flex items-start gap-[1.5vw]">
              <div style={{ width: "0.4vw", height: "3vh", background: "#4AC4E0", marginTop: "0.3vh", flexShrink: 0 }} />
              <div>
                <p className="font-display font-bold mb-[0.3vh]" style={{ fontSize: "1.7vw", color: "#ffffff" }}>Custom AI Agents</p>
                <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)" }}>Purpose-built agents that handle specific workflows autonomously.</p>
              </div>
            </div>
            <div className="flex items-start gap-[1.5vw]">
              <div style={{ width: "0.4vw", height: "3vh", background: "#4AC4E0", marginTop: "0.3vh", flexShrink: 0 }} />
              <div>
                <p className="font-display font-bold mb-[0.3vh]" style={{ fontSize: "1.7vw", color: "#ffffff" }}>Support Automation</p>
                <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)" }}>Reduce support volume without reducing response quality.</p>
              </div>
            </div>
            <div className="flex items-start gap-[1.5vw]">
              <div style={{ width: "0.4vw", height: "3vh", background: "#4AC4E0", marginTop: "0.3vh", flexShrink: 0 }} />
              <div>
                <p className="font-display font-bold mb-[0.3vh]" style={{ fontSize: "1.7vw", color: "#ffffff" }}>Content Generation</p>
                <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)" }}>Automated content pipelines integrated directly into your CMS.</p>
              </div>
            </div>
            <div className="flex items-start gap-[1.5vw]">
              <div style={{ width: "0.4vw", height: "3vh", background: "#4AC4E0", marginTop: "0.3vh", flexShrink: 0 }} />
              <div>
                <p className="font-display font-bold mb-[0.3vh]" style={{ fontSize: "1.7vw", color: "#ffffff" }}>Data Analysis</p>
                <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)" }}>Automated reporting and insight extraction from operational data.</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-center"
          style={{ flex: 1, background: "linear-gradient(135deg, #132038 0%, #0d1a2e 100%)", borderLeft: "1px solid #1E2D4A", position: "relative", overflow: "hidden" }}
        >
          <div
            className="absolute"
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "30vw", height: "30vw", background: "radial-gradient(ellipse, rgba(74,196,224,0.10) 0%, transparent 65%)" }}
          />
          <p className="font-display font-black text-center" style={{ fontSize: "5.5vw", color: "rgba(74,196,224,0.15)", lineHeight: 1, letterSpacing: "-0.02em" }}>AI</p>
          <p className="font-display font-bold text-center mt-[2vh]" style={{ fontSize: "1.8vw", color: "rgba(255,255,255,0.40)" }}>
            Deployed.
          </p>
          <p className="font-display font-bold text-center" style={{ fontSize: "1.8vw", color: "rgba(255,255,255,0.40)" }}>
            Documented.
          </p>
          <p className="font-display font-bold text-center" style={{ fontSize: "1.8vw", color: "rgba(255,255,255,0.40)" }}>
            Operational.
          </p>
        </div>
      </div>
    </div>
  );
}
