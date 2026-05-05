const base = import.meta.env.BASE_URL;

export default function Slide01Title() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "linear-gradient(135deg, #050d1a 0%, #0A1628 50%, #0d1f3a 100%)" }}>
      <img
        src={`${base}hero-bg.png`}
        crossOrigin="anonymous"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.18 }}
      />

      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(74,196,224,0.08) 0%, transparent 60%)" }} />

      <div
        className="absolute"
        style={{ top: "5vh", left: "5vw", right: "5vw", bottom: "0" }}
      >
        <div className="flex flex-col justify-between h-full pb-[8vh]">
          <div>
            <p className="font-display font-bold tracking-widest" style={{ fontSize: "1.1vw", color: "#4AC4E0", letterSpacing: "0.2em" }}>
              CLIENTVERSE
            </p>
          </div>

          <div style={{ maxWidth: "65vw" }}>
            <div className="flex items-center gap-[1.5vw] mb-[2.5vh]">
              <div style={{ width: "4vw", height: "0.25vh", background: "#4AC4E0" }} />
              <p className="font-body font-medium tracking-widest" style={{ fontSize: "1.1vw", color: "#4AC4E0", letterSpacing: "0.15em" }}>
                COMPANY OVERVIEW
              </p>
            </div>

            <h1 className="font-display font-black leading-none tracking-tight" style={{ fontSize: "6.5vw", color: "#ffffff", textWrap: "balance" }}>
              The Operational Backbone
            </h1>
            <h1 className="font-display font-black leading-none tracking-tight" style={{ fontSize: "6.5vw", color: "#4AC4E0", textWrap: "balance" }}>
              Your Company Has Been Missing.
            </h1>

            <p className="font-body font-medium mt-[3.5vh]" style={{ fontSize: "1.8vw", color: "rgba(255,255,255,0.70)" }}>
              Systems. Automation. AI. Operations. One partner.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div style={{ width: "100%", height: "1px", background: "rgba(74,196,224,0.25)" }} />
          </div>
        </div>
      </div>

      <div
        className="absolute font-body font-medium"
        style={{ bottom: "4vh", right: "5vw", fontSize: "1.3vw", color: "rgba(255,255,255,0.40)" }}
      >
        clientverse.io · 2026
      </div>
    </div>
  );
}
