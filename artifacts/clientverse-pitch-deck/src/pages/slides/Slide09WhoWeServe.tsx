export default function Slide09WhoWeServe() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#0A1628" }}>
      <div
        className="absolute"
        style={{ top: 0, right: 0, width: "45vw", height: "100%", background: "linear-gradient(90deg, transparent 0%, rgba(19,32,56,0.60) 40%, #132038 100%)" }}
      />
      <div
        className="absolute"
        style={{ top: 0, right: 0, width: "45vw", height: "100%", borderLeft: "1px solid #1E2D4A" }}
      />

      <div className="absolute inset-0 flex">
        <div className="flex flex-col justify-center" style={{ width: "55vw", padding: "0 7vw" }}>
          <div className="flex items-center gap-[1.2vw] mb-[2vh]">
            <div style={{ width: "3vw", height: "0.25vh", background: "#4AC4E0" }} />
            <p className="font-display font-bold tracking-widest" style={{ fontSize: "1.1vw", color: "#4AC4E0", letterSpacing: "0.15em" }}>
              WHO WE SERVE
            </p>
          </div>

          <h2 className="font-display font-black tracking-tight leading-tight mb-[4vh]" style={{ fontSize: "4vw", color: "#ffffff", maxWidth: "45vw", textWrap: "balance" }}>
            Companies building for serious scale.
          </h2>

          <div className="flex flex-col gap-[2.5vh]">
            <div className="flex items-start gap-[2vw]">
              <p className="font-display font-black" style={{ fontSize: "3vw", color: "rgba(74,196,224,0.30)", lineHeight: 1, flexShrink: 0 }}>01</p>
              <div>
                <p className="font-display font-bold mb-[0.5vh]" style={{ fontSize: "1.7vw", color: "#ffffff" }}>Revenue-generating, operationally overwhelmed</p>
                <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>Companies with proven revenue and growing teams whose backend systems cannot keep pace.</p>
              </div>
            </div>
            <div style={{ height: "1px", background: "#1E2D4A" }} />
            <div className="flex items-start gap-[2vw]">
              <p className="font-display font-black" style={{ fontSize: "3vw", color: "rgba(74,196,224,0.30)", lineHeight: 1, flexShrink: 0 }}>02</p>
              <div>
                <p className="font-display font-bold mb-[0.5vh]" style={{ fontSize: "1.7vw", color: "#ffffff" }}>No dedicated operations function</p>
                <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>Founders or sales leaders who are currently filling the ops role themselves and need to stop.</p>
              </div>
            </div>
            <div style={{ height: "1px", background: "#1E2D4A" }} />
            <div className="flex items-start gap-[2vw]">
              <p className="font-display font-black" style={{ fontSize: "3vw", color: "rgba(74,196,224,0.30)", lineHeight: 1, flexShrink: 0 }}>03</p>
              <div>
                <p className="font-display font-bold mb-[0.5vh]" style={{ fontSize: "1.7vw", color: "#ffffff" }}>Platform-agnostic infrastructure needs</p>
                <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>Organizations needing an independent partner — not a software vendor or a reseller.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center" style={{ flex: 1, padding: "0 3vw" }}>
          <p className="font-display font-black text-center leading-tight mb-[3vh]" style={{ fontSize: "2.2vw", color: "#ffffff" }}>
            Not the right fit if you're looking for
          </p>
          <div className="flex flex-col gap-[1.5vh] w-full">
            <div style={{ background: "rgba(10,22,40,0.60)", borderRadius: "0.6vh", padding: "1.5vh 2vw", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.50)" }}>Generic subscription software</p>
            </div>
            <div style={{ background: "rgba(10,22,40,0.60)", borderRadius: "0.6vh", padding: "1.5vh 2vw", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.50)" }}>A platform reseller or white-label agency</p>
            </div>
            <div style={{ background: "rgba(10,22,40,0.60)", borderRadius: "0.6vh", padding: "1.5vh 2vw", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.50)" }}>Off-the-shelf process templates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
