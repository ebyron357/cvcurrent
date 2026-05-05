export default function Slide05Services() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#0A1628" }}>
      <div
        className="absolute"
        style={{ bottom: 0, left: "50%", transform: "translateX(-50%)", width: "80vw", height: "40vh", background: "radial-gradient(ellipse at bottom, rgba(74,196,224,0.04) 0%, transparent 70%)" }}
      />

      <div className="absolute inset-0 flex flex-col" style={{ padding: "5vh 7vw" }}>
        <div className="flex items-center gap-[1.2vw] mb-[1.5vh]">
          <div style={{ width: "3vw", height: "0.25vh", background: "#4AC4E0" }} />
          <p className="font-display font-bold tracking-widest" style={{ fontSize: "1.1vw", color: "#4AC4E0", letterSpacing: "0.15em" }}>
            SERVICES
          </p>
        </div>

        <h2 className="font-display font-black tracking-tight leading-tight mb-[4vh]" style={{ fontSize: "3.5vw", color: "#ffffff" }}>
          What We Build, Repair, and Operate.
        </h2>

        <div className="flex gap-[1.5vw] mb-[1.5vh]">
          <div style={{ flex: 1, background: "#132038", border: "1px solid #1E2D4A", borderRadius: "0.6vh", padding: "2vh 1.8vw" }}>
            <p className="font-display font-bold mb-[0.5vh]" style={{ fontSize: "1.6vw", color: "#4AC4E0" }}>Growth Systems</p>
            <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)" }}>CRM · Lead Scoring · Pipeline Automation</p>
          </div>
          <div style={{ flex: 1, background: "#132038", border: "1px solid #1E2D4A", borderRadius: "0.6vh", padding: "2vh 1.8vw" }}>
            <p className="font-display font-bold mb-[0.5vh]" style={{ fontSize: "1.6vw", color: "#4AC4E0" }}>Scale Systems</p>
            <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)" }}>Process Standardization · Fulfillment Workflows</p>
          </div>
          <div style={{ flex: 1, background: "#132038", border: "1px solid #1E2D4A", borderRadius: "0.6vh", padding: "2vh 1.8vw" }}>
            <p className="font-display font-bold mb-[0.5vh]" style={{ fontSize: "1.6vw", color: "#4AC4E0" }}>Enterprise Systems</p>
            <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)" }}>ERP Integration · Custom Applications</p>
          </div>
          <div style={{ flex: 1, background: "#132038", border: "1px solid #1E2D4A", borderRadius: "0.6vh", padding: "2vh 1.8vw" }}>
            <p className="font-display font-bold mb-[0.5vh]" style={{ fontSize: "1.6vw", color: "#4AC4E0" }}>AI Services</p>
            <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)" }}>Custom AI Agents · Support Automation</p>
          </div>
          <div style={{ flex: 1, background: "#132038", border: "1px solid #1E2D4A", borderRadius: "0.6vh", padding: "2vh 1.8vw" }}>
            <p className="font-display font-bold mb-[0.5vh]" style={{ fontSize: "1.6vw", color: "#4AC4E0" }}>System Rescue™</p>
            <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)" }}>Audit · Cleanup · Rebuild · Migration</p>
          </div>
        </div>

        <div className="flex gap-[1.5vw]">
          <div style={{ flex: 1, background: "#132038", border: "1px solid #1E2D4A", borderRadius: "0.6vh", padding: "2vh 1.8vw" }}>
            <p className="font-display font-bold mb-[0.5vh]" style={{ fontSize: "1.6vw", color: "#4AC4E0" }}>Content & Social</p>
            <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)" }}>Distribution Workflows · Asset Management</p>
          </div>
          <div style={{ flex: 1, background: "#132038", border: "1px solid #1E2D4A", borderRadius: "0.6vh", padding: "2vh 1.8vw" }}>
            <p className="font-display font-bold mb-[0.5vh]" style={{ fontSize: "1.6vw", color: "#4AC4E0" }}>Web & Funnels</p>
            <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)" }}>Conversion Optimization · E-commerce</p>
          </div>
          <div style={{ flex: 1, background: "#132038", border: "1px solid #1E2D4A", borderRadius: "0.6vh", padding: "2vh 1.8vw" }}>
            <p className="font-display font-bold mb-[0.5vh]" style={{ fontSize: "1.6vw", color: "#4AC4E0" }}>Consulting</p>
            <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)" }}>Tech Stack Audits · Process Mapping</p>
          </div>
          <div style={{ flex: 1, background: "#132038", border: "1px solid #1E2D4A", borderRadius: "0.6vh", padding: "2vh 1.8vw" }}>
            <p className="font-display font-bold mb-[0.5vh]" style={{ fontSize: "1.6vw", color: "#4AC4E0" }}>Outsourcing</p>
            <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)" }}>BPO Integration · SOP Documentation</p>
          </div>
          <div style={{ flex: 1, background: "#132038", border: "1px solid #1E2D4A", borderRadius: "0.6vh", padding: "2vh 1.8vw" }}>
            <p className="font-display font-bold mb-[0.5vh]" style={{ fontSize: "1.6vw", color: "#4AC4E0" }}>Ongoing Support</p>
            <p className="font-body" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)" }}>System Monitoring · Iterative Improvements</p>
          </div>
        </div>
      </div>
    </div>
  );
}
