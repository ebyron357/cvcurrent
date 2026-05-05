export default function Slide03WhatWeDo() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "linear-gradient(160deg, #0d1f3a 0%, #0A1628 60%, #060f1d 100%)" }}>
      <div
        className="absolute"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "60vw", height: "60vh", background: "radial-gradient(ellipse, rgba(74,196,224,0.06) 0%, transparent 70%)", pointerEvents: "none" }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ padding: "0 8vw" }}>
        <div className="flex items-center gap-[1.2vw] mb-[3vh]">
          <div style={{ width: "3vw", height: "0.25vh", background: "#4AC4E0" }} />
          <p className="font-display font-bold tracking-widest" style={{ fontSize: "1.1vw", color: "#4AC4E0", letterSpacing: "0.15em" }}>
            WHAT WE DO
          </p>
          <div style={{ width: "3vw", height: "0.25vh", background: "#4AC4E0" }} />
        </div>

        <h2 className="font-display font-black tracking-tight leading-tight text-center mb-[5vh]" style={{ fontSize: "5.5vw", color: "#ffffff", maxWidth: "75vw", textWrap: "balance" }}>
          A Full Operational Ecosystem.
          <span style={{ color: "#4AC4E0" }}> Built to Run.</span>
        </h2>

        <p className="font-body font-medium text-center mb-[6vh]" style={{ fontSize: "1.8vw", color: "rgba(255,255,255,0.65)", maxWidth: "55vw", lineHeight: 1.6 }}>
          We build, repair, and operate the systems, automation, AI, and infrastructure that scaling companies need but rarely have.
        </p>

        <div className="flex items-stretch gap-[0]">
          <div className="flex flex-col items-center" style={{ padding: "3vh 4vw", borderRight: "1px solid #1E2D4A" }}>
            <p className="font-display font-black mb-[1vh]" style={{ fontSize: "2.8vw", color: "#4AC4E0" }}>Build</p>
            <p className="font-body text-center" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)" }}>From the ground up</p>
          </div>
          <div className="flex flex-col items-center" style={{ padding: "3vh 4vw", borderRight: "1px solid #1E2D4A" }}>
            <p className="font-display font-black mb-[1vh]" style={{ fontSize: "2.8vw", color: "#4AC4E0" }}>Repair</p>
            <p className="font-body text-center" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)" }}>System Rescue™</p>
          </div>
          <div className="flex flex-col items-center" style={{ padding: "3vh 4vw" }}>
            <p className="font-display font-black mb-[1vh]" style={{ fontSize: "2.8vw", color: "#4AC4E0" }}>Operate</p>
            <p className="font-body text-center" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)" }}>Ongoing partnership</p>
          </div>
        </div>
      </div>
    </div>
  );
}
