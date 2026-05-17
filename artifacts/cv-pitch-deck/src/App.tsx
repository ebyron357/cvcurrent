/**
 * Platform contract file — do not restructure.
 *
 * This file is part of the contract between the slides artifact and
 * the surrounding workspace tooling (preview, thumbnails, exports).
 * Reorganizing it, swapping the router, or changing the structure
 * of `AllSlides` can quietly break that tooling even when the page
 * still looks correct in the preview.
 *
 * Agents: see the slides skill `<workspace_contract>` for the full
 * rules, and `references/visual_qa.md` → "Platform contract sanity
 * check" if this file has been hand-edited and needs repair.
 */

import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

import { slides } from "@/slideLoader";

function getSlideIndex(pathname: string): number {
  const match = pathname.match(/^\/slide(\d+)$/);
  if (!match) return -1;
  const position = parseInt(match[1], 10);
  return slides.findIndex((s) => s.position === position);
}

function SlideEditor() {
  const [location, navigate] = useLocation();
  const currentIndex = getSlideIndex(location);

  // In the workspace, the slide iframe is nested inside another iframe,
  // so window.parent !== window.parent.parent. In the deployed SlideViewer,
  // the parent is the top-level window, so they're equal. Disable local
  // navigation only in the workspace — the parent owns it there.
  const navigationDisabledRef = useRef(window.parent !== window.parent.parent);
  const touchHandledRefStable = useRef(false);

  useEffect(() => {
    if (currentIndex === -1) return;

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (navigationDisabledRef.current) return;
      if (event.key === " ") {
        event.preventDefault();
      }
      if ((event.key === "ArrowLeft" || event.key === "ArrowUp") && currentIndex > 0) {
        navigate(`/slide${slides[currentIndex - 1].position}`);
      }
      if (
        (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === " ") &&
        currentIndex < slides.length - 1
      ) {
        navigate(`/slide${slides[currentIndex + 1].position}`);
      }
    };

    const INTERACTIVE =
      "a,button,video,audio,input,select,textarea,details,summary,iframe,svg,canvas," +
      '[role="button"],[contenteditable="true"]';

    const isInteractive = (target: EventTarget | null) =>
      (target as HTMLElement | null)?.closest?.(INTERACTIVE);

    const touchHandledRef = touchHandledRefStable;

    const onClick = (event: MouseEvent) => {
      if (touchHandledRef.current) {
        touchHandledRef.current = false;
        return;
      }
      if (event.button !== 0 || event.metaKey || event.ctrlKey) return;
      if (isInteractive(event.target)) return;

      if (navigationDisabledRef.current) {
        window.parent.postMessage({ type: "advanceSlide" }, "*");
        return;
      }

      if (currentIndex < slides.length - 1) {
        navigate(`/slide${slides[currentIndex + 1].position}`);
      }
    };

    let touchStartX = 0;
    let touchStartY = 0;
    let touchTarget: EventTarget | null = null;

    const onTouchStart = (event: TouchEvent) => {
      touchHandledRef.current = false;
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
      touchTarget = event.target;
    };

    const onTouchEnd = (event: TouchEvent) => {
      const dx = event.changedTouches[0].clientX - touchStartX;
      const dy = event.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) >= 10 || Math.abs(dy) >= 10) return;
      if (isInteractive(touchTarget)) return;
      touchHandledRef.current = true;

      if (navigationDisabledRef.current) {
        window.parent.postMessage({ type: "advanceSlide" }, "*");
        return;
      }

      const fraction = touchStartX / window.innerWidth;
      if (fraction < 0.4 && currentIndex > 0) {
        navigate(`/slide${slides[currentIndex - 1].position}`);
      } else if (fraction >= 0.4 && currentIndex < slides.length - 1) {
        navigate(`/slide${slides[currentIndex + 1].position}`);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("click", onClick);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [currentIndex, navigate]);

  return (
    <div className="select-none">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          style={{ display: index === currentIndex ? "block" : "none" }}
        >
          <slide.Component />
        </div>
      ))}
    </div>
  );
}

// Do not rewrite this component. Each slide must remain wrapped in
// `<div className="slide">` sized 1920×1080 — the class name and
// dimensions are part of the platform contract. See the file-level
// banner above for context.
function AllSlides() {
  return (
    <div className="bg-black">
      {slides.map((slide) => (
        <div
          key={slide.id}
          className="slide relative aspect-video overflow-hidden"
          style={{ width: "1920px", height: "1080px" }}
        >
          <div className="h-full w-full [&_.h-screen]:!h-full [&_.w-screen]:!w-full">
            <slide.Component />
          </div>
        </div>
      ))}
    </div>
  );
}

// Presenter view — shown at /present. Side-by-side: slide iframe + speaker notes panel.
function PresenterView() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const slide = slides[currentIndex];
  const speakerNotes: string = (slide as any)?.speakerNotes ?? "No notes for this slide.";

  const navigateTo = (index: number) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, index));
    setCurrentIndex(clamped);
    iframeRef.current?.contentWindow?.postMessage(
      { type: "navigateToSlide", position: slides[clamped].position },
      "*"
    );
  };

  // Forward arrow keys and also track local index
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", " "].includes(e.key)) {
        e.preventDefault();
        setCurrentIndex(i => {
          const next = Math.min(i + 1, slides.length - 1);
          iframeRef.current?.contentWindow?.postMessage(
            { type: "navigateToSlide", position: slides[next].position }, "*"
          );
          return next;
        });
      } else if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        setCurrentIndex(i => {
          const prev = Math.max(i - 1, 0);
          iframeRef.current?.contentWindow?.postMessage(
            { type: "navigateToSlide", position: slides[prev].position }, "*"
          );
          return prev;
        });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const navBtnStyle = (disabled: boolean): React.CSSProperties => ({
    background: "none",
    border: "1px solid " + (disabled ? "rgba(74,196,224,0.15)" : "rgba(74,196,224,0.35)"),
    borderRadius: "8px",
    padding: "6px 16px",
    color: disabled ? "rgba(74,196,224,0.3)" : "#4AC4E0",
    fontFamily: "Inter, sans-serif",
    fontSize: "13px",
    cursor: disabled ? "not-allowed" : "pointer",
    letterSpacing: "0.04em",
    whiteSpace: "nowrap" as const,
  });

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", background: "#040b18", overflow: "hidden" }}>
      {/* Left: slide iframe */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid rgba(74,196,224,0.1)", flexShrink: 0 }}>
          <a
            href={base + "/"}
            style={{ color: "rgba(74,196,224,0.55)", fontSize: "12px", fontFamily: "Inter, sans-serif", textDecoration: "none", letterSpacing: "0.06em" }}
          >
            ← Exit Presenter
          </a>
          <span style={{ color: "#4AC4E0", fontSize: "11px", fontFamily: "Inter, sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Presenter View
          </span>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontFamily: "Inter, sans-serif" }}>
            {currentIndex + 1} / {slides.length}
          </span>
        </div>

        {/* Slide area */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#050d1a", padding: "12px" }}>
          <iframe
            ref={iframeRef}
            src={`${base}/slide${slides[0]?.position ?? 1}`}
            style={{ width: "100%", aspectRatio: "16 / 9", border: "none", maxHeight: "100%", borderRadius: "4px" }}
            title="Slide preview"
            onLoad={() => {
              setIframeLoaded(true);
              if (currentIndex > 0 && slide) {
                iframeRef.current?.contentWindow?.postMessage(
                  { type: "navigateToSlide", position: slide.position }, "*"
                );
              }
            }}
          />
          {!iframeLoaded && (
            <div style={{ position: "absolute", color: "rgba(74,196,224,0.4)", fontFamily: "Inter, sans-serif", fontSize: "13px" }}>
              Loading…
            </div>
          )}
        </div>

        {/* Nav bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", padding: "12px 16px", borderTop: "1px solid rgba(74,196,224,0.1)", flexShrink: 0 }}>
          <button style={navBtnStyle(currentIndex === 0)} disabled={currentIndex === 0} onClick={() => navigateTo(currentIndex - 1)}>
            ← Prev
          </button>
          <span style={{ color: "rgba(200,220,240,0.7)", fontFamily: "Inter, sans-serif", fontSize: "13px", minWidth: "80px", textAlign: "center" }}>
            {slide?.title ?? ""}
          </span>
          <button style={navBtnStyle(currentIndex === slides.length - 1)} disabled={currentIndex === slides.length - 1} onClick={() => navigateTo(currentIndex + 1)}>
            Next →
          </button>
        </div>
      </div>

      {/* Right: notes panel */}
      <div style={{ width: "320px", flexShrink: 0, borderLeft: "1px solid rgba(74,196,224,0.1)", display: "flex", flexDirection: "column", background: "#0A1628" }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(74,196,224,0.1)", flexShrink: 0 }}>
          <p style={{ margin: 0, color: "#4AC4E0", fontSize: "10px", fontFamily: "Inter, sans-serif", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "4px" }}>
            Speaker Notes
          </p>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.9)", fontSize: "14px", fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
            {slide?.title ?? ""}
          </p>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          <p style={{ margin: 0, color: "rgba(190,215,235,0.85)", fontSize: "14px", fontFamily: "Inter, sans-serif", lineHeight: "1.75" }}>
            {speakerNotes}
          </p>
        </div>
        {/* Slide thumbnail strip */}
        <div style={{ borderTop: "1px solid rgba(74,196,224,0.1)", padding: "12px 16px", flexShrink: 0 }}>
          <p style={{ margin: "0 0 8px", color: "rgba(74,196,224,0.5)", fontSize: "10px", fontFamily: "Inter, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            All Slides
          </p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => navigateTo(i)}
                style={{
                  width: "26px",
                  height: "18px",
                  borderRadius: "3px",
                  border: i === currentIndex ? "1.5px solid #4AC4E0" : "1px solid rgba(74,196,224,0.2)",
                  background: i === currentIndex ? "rgba(74,196,224,0.18)" : "rgba(74,196,224,0.05)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: i === currentIndex ? "#4AC4E0" : "rgba(74,196,224,0.4)",
                  fontSize: "8px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  padding: 0,
                }}
                title={s.title}
              >
                {s.position}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// This component is used for the deployed view at `/`
function SlideViewer() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dims, setDims] = useState(() => ({
    width: Math.min(window.innerWidth, window.innerHeight * (16 / 9)),
    height: Math.min(window.innerHeight, window.innerWidth * (9 / 16)),
  }));

  useEffect(() => {
    const update = () => {
      setDims({
        width: Math.min(window.innerWidth, window.innerHeight * (16 / 9)),
        height: Math.min(window.innerHeight, window.innerWidth * (9 / 16)),
      });
    };
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== " ") return;
      if (event.key === " ") event.preventDefault();
      iframeRef.current?.contentWindow?.dispatchEvent(
        new KeyboardEvent("keydown", { key: event.key, code: event.code, bubbles: true }),
      );
      // Track local index in sync with key presses
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        setCurrentIndex(i => Math.max(0, i - 1));
      } else {
        setCurrentIndex(i => Math.min(slides.length - 1, i + 1));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Also track slide advancement from iframe postMessage (advanceSlide)
  useEffect(() => {
    const onMsg = (event: MessageEvent) => {
      if (event.data?.type === "advanceSlide") {
        setCurrentIndex(i => Math.min(slides.length - 1, i + 1));
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const firstPosition = slides.length > 0 ? slides[0].position : 1;

  const navigate = (newIndex: number) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, newIndex));
    setCurrentIndex(clamped);
    iframeRef.current?.contentWindow?.postMessage(
      { type: "navigateToSlide", position: slides[clamped].position }, "*"
    );
  };

  return (
    <div
      className="slide-viewer h-screen w-screen overflow-hidden bg-black flex flex-col items-center justify-center"
    >
      <div style={{ position: "relative" }} onClick={() => iframeRef.current?.focus()}>
        <iframe
          ref={iframeRef}
          src={`${base}/slide${firstPosition}`}
          style={{ width: dims.width, height: dims.height, border: "none", display: "block" }}
          onLoad={() => iframeRef.current?.focus()}
          title="Slide viewer"
        />
      </div>

      {/* Slide counter + presenter link */}
      <div style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "rgba(10,22,40,0.85)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(74,196,224,0.18)",
        borderRadius: "24px",
        padding: "8px 16px",
        zIndex: 50,
        userSelect: "none",
      }}>
        <button
          onClick={() => navigate(currentIndex - 1)}
          disabled={currentIndex === 0}
          style={{ background: "none", border: "none", cursor: currentIndex === 0 ? "not-allowed" : "pointer", color: currentIndex === 0 ? "rgba(74,196,224,0.2)" : "rgba(74,196,224,0.7)", fontSize: "16px", padding: "0 4px", lineHeight: 1 }}
        >
          ‹
        </button>
        <span style={{ color: "rgba(200,220,240,0.7)", fontFamily: "Inter, sans-serif", fontSize: "12px", minWidth: "40px", textAlign: "center", letterSpacing: "0.06em" }}>
          {currentIndex + 1} / {slides.length}
        </span>
        <button
          onClick={() => navigate(currentIndex + 1)}
          disabled={currentIndex === slides.length - 1}
          style={{ background: "none", border: "none", cursor: currentIndex === slides.length - 1 ? "not-allowed" : "pointer", color: currentIndex === slides.length - 1 ? "rgba(74,196,224,0.2)" : "rgba(74,196,224,0.7)", fontSize: "16px", padding: "0 4px", lineHeight: 1 }}
        >
          ›
        </button>
        <div style={{ width: "1px", height: "16px", background: "rgba(74,196,224,0.2)" }} />
        <a
          href={`${base}/present`}
          target="_blank"
          rel="noreferrer"
          style={{ color: "rgba(74,196,224,0.6)", fontFamily: "Inter, sans-serif", fontSize: "11px", textDecoration: "none", letterSpacing: "0.08em", whiteSpace: "nowrap" }}
        >
          Presenter Mode
        </a>
      </div>
    </div>
  );
}

export default function App() {
  const [location, navigate] = useLocation();

  // DO NOT edit this useEffect - redirects unknown routes to the first slide.
  // The "/" and "/allslides" routes are handled separately below.
  useEffect(() => {
    if (
      location !== "/" &&
      location !== "/allslides" &&
      location !== "/present" &&
      getSlideIndex(location) === -1
    ) {
      if (slides.length > 0) {
        navigate(`/slide${slides[0].position}`, { replace: true });
      }
    }
  }, [location, navigate]);

  // DO NOT edit this useEffect - allows the parent frame to navigate
  // between slides via postMessage so it can avoid changing the iframe
  // src (which causes a white flash).
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (
        event.data?.type === "navigateToSlide" &&
        typeof event.data.position === "number" &&
        slides.some((s) => s.position === event.data.position)
      ) {
        navigate(`/slide${event.data.position}`);
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [navigate]);

  if (location === "/") return <SlideViewer />;
  if (location === "/allslides") return <AllSlides />;
  if (location === "/present") return <PresenterView />;
  return <SlideEditor />;
}
