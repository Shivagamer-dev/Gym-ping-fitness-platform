// src/components/TutorialModal.tsx
import { useEffect, useMemo, useState } from "react";
import "../App.css";

type TutorialStep = {
  title: string;
  description: string;
};

type Tutorial = {
  id?: string;
  name: string;
  subtitle?: string;
  description?: string;
  videoId?: string;
  videoUrl?: string;
  steps?: TutorialStep[];
  benefits?: string[];
};

function getVideoUrl(tut: Tutorial): string | null {
  if (tut.videoUrl && tut.videoUrl.trim()) return tut.videoUrl.trim();

  if (tut.videoId && tut.videoId.trim()) {
    const id = tut.videoId.trim();
    if (id.startsWith("http://") || id.startsWith("https://")) return id;
    return `https://www.youtube.com/embed/${id}`;
  }
  return null;
}

function VideoCard({
  videoUrl,
  tutName,
  isMobile,
}: {
  videoUrl: string | null;
  tutName: string;
  isMobile: boolean;
}) {
  return (
    <div
      className="bb-feature-image-shell"
      style={{
        flex: isMobile ? "0 0 auto" : 0.9,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="bb-feature-image"
        style={{
          width: "100%",
          maxWidth: isMobile ? "100%" : 420,
          borderRadius: 22,
          background:
            "radial-gradient(circle at 0 0,#eef2ff,#f5f3ff 40%,#faf5ff 100%)",
          boxShadow:
            "0 22px 50px rgba(129,140,248,0.30), 0 0 0 1px rgba(209,213,219,0.8)",
          position: "relative",
          overflow: "hidden",
          padding: isMobile ? 10 : 12,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            borderRadius: 18,
            overflow: "hidden",
            background: "rgba(255,255,255,0.7)",
            aspectRatio: "16 / 9",
          }}
        >
          {videoUrl ? (
            <iframe
              src={videoUrl}
              title={`${tutName} walkthrough`}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                borderRadius: 18,
                border: "none",
              }}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 18,
                border: "1px dashed rgba(148,163,184,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                color: "rgba(55,65,81,0.85)",
                textAlign: "center",
                padding: "0 18px",
              }}
            >
              Visual walkthrough placeholder. In the app, this module appears as
              an interactive screen.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TutorialModal({
  tutorials,
  loading,
  error,
  isMobile,
}: {
  tutorials: Tutorial[] | null;
  loading: boolean;
  error: string | null;
  isMobile: boolean;
}): JSX.Element {
  const [open, setOpen] = useState(false);

  // only 4 modules
  const modules = useMemo(() => {
    if (!tutorials || tutorials.length === 0) return [];
    return tutorials.slice(0, 4);
  }, [tutorials]);

  // lock body scroll + ESC close (same “modal behavior” style)
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      {/* Trigger button (kept simple, matches your UI style) */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
        <button
          className="bb-btn bb-btn-primary bb-btn-animated"
          style={{
            padding: "12px 22px",
            borderRadius: 999,
            fontSize: "0.98rem",
            width: isMobile ? "100%" : "auto",
            maxWidth: 420,
          }}
          onClick={() => setOpen(true)}
          disabled={loading}
        >
          Explore Modules (1–4)
        </button>
      </div>

      {/* Optional error under button (keep) */}
      {error && (
        <div style={{ textAlign: "center", marginTop: 10, color: "#9b1c1c" }}>
          {error}
        </div>
      )}

      {/* Modal / Bottom Sheet */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(2,6,23,0.55)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: isMobile ? "flex-end" : "center", // ✅ bottom sheet on mobile
            justifyContent: "center",
            padding: isMobile ? 10 : 18,
          }}
        >
          {/* Sheet / Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(1100px, 100%)",
              maxHeight: isMobile ? "88vh" : "86vh",
              overflow: "hidden",
              borderRadius: isMobile ? "22px 22px 16px 16px" : 22,
              background:
                "linear-gradient(135deg,#ffffff, #fbf5ff 55%, #f5f3ff)",
              boxShadow:
                "0 30px 90px rgba(0,0,0,0.35), 0 0 0 1px rgba(226,232,240,0.95)",
              transform: isMobile ? "translateY(0)" : "translateY(0)",
            }}
          >
            {/* Mobile drag handle (Pricing-fix style) */}
            {isMobile && (
              <div
                style={{
                  paddingTop: 10,
                  paddingBottom: 6,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 5,
                    borderRadius: 999,
                    background: "rgba(15,23,42,0.18)",
                  }}
                />
              </div>
            )}

            {/* Header (sticky) */}
            <div
              style={{
                position: "sticky",
                top: 0,
                zIndex: 2,
                padding: isMobile ? "10px 14px 12px" : "14px 18px 14px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.72))",
                backdropFilter: "blur(8px)",
                borderBottom: "1px solid rgba(226,232,240,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    display: "inline-flex",
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: "rgba(79,70,229,0.10)",
                    color: "#4c1d95",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 0.06,
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Tutorials
                </div>

                <div
                  style={{
                    fontSize: isMobile ? 16 : 18,
                    fontWeight: 800,
                    color: "#0b1120",
                    lineHeight: 1.15,
                  }}
                >
                  Explore Each Back&amp;Bone Module (01–04)
                </div>

                <div
                  style={{
                    marginTop: 6,
                    fontSize: 13,
                    color: "rgba(55,65,81,0.9)",
                    lineHeight: 1.5,
                  }}
                >
                  Each module unlocks a different part of your fitness routine.
                </div>
              </div>

              <button
                className="bb-btn bb-btn-ghost bb-btn-animated"
                style={{
                  borderRadius: 999,
                  padding: "10px 14px",
                  whiteSpace: "nowrap",
                }}
                onClick={() => setOpen(false)}
              >
                Close ✕
              </button>
            </div>

            {/* Scroll area (important for bottom sheet) */}
            <div
              style={{
                overflow: "auto",
                maxHeight: isMobile ? "calc(88vh - 90px)" : "calc(86vh - 84px)",
                padding: isMobile ? "12px 12px 16px" : "16px 18px 20px",
              }}
            >
              {loading && (
                <div style={{ textAlign: "center", padding: 18, color: "var(--bb-muted)" }}>
                  Loading tutorials…
                </div>
              )}

              {!loading && !error && modules.length > 0 ? (
                modules.map((tut, idx) => {
                  const isEven = idx % 2 === 1;
                  const videoUrl = getVideoUrl(tut);

                  const rowDirection = isMobile
                    ? ("column" as const)
                    : isEven
                    ? ("row-reverse" as const)
                    : ("row" as const);

                  // ✅ BELOW is your SAME module card UI (unchanged)
                  return (
                    <article
                      key={tut.name + idx}
                      className="bb-feature-row-alt bb-card-hover bb-anim-fade-up"
                      style={{
                        marginBottom: 18,
                        borderRadius: isMobile ? 22 : 28,
                        padding: isMobile ? 14 : 22,
                        background: "linear-gradient(135deg,#fbf5ff,#f5f3ff,#ffffff 48%)",
                        boxShadow:
                          "0 22px 55px rgba(15,23,42,0.12), 0 0 0 1px rgba(226,232,240,0.9)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: rowDirection,
                          gap: isMobile ? 14 : 26,
                          alignItems: "stretch",
                        }}
                      >
                        {/* TEXT COLUMN */}
                        <div className="bb-feature-copy-alt" style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              marginBottom: 6,
                              flexWrap: "wrap",
                            }}
                          >
                            <span
                              style={{
                                padding: "4px 10px",
                                borderRadius: 999,
                                fontSize: 11,
                                letterSpacing: 0.08,
                                textTransform: "uppercase",
                                background: "rgba(79,70,229,0.08)",
                                color: "#4c1d95",
                                fontWeight: 700,
                              }}
                            >
                              Module {String(idx + 1).padStart(2, "0")}
                            </span>
                          </div>

                          <h3
                            style={{
                              marginBottom: 6,
                              fontSize: "clamp(1.15rem, 3.6vw, 1.25rem)",
                              fontWeight: 700,
                              color: "#111827",
                            }}
                          >
                            {tut.name}
                          </h3>

                          {tut.subtitle && (
                            <p
                              style={{
                                marginBottom: 10,
                                color: "var(--bb-muted)",
                                fontSize: "0.98rem",
                                lineHeight: 1.7,
                              }}
                            >
                              {tut.subtitle}
                            </p>
                          )}

                          {tut.description && (
                            <p
                              style={{
                                marginBottom: 12,
                                lineHeight: 1.75,
                                color: "#374151",
                                fontSize: "0.96rem",
                              }}
                            >
                              {tut.description}
                            </p>
                          )}

                          {/* ✅ MOBILE: VIDEO ABOVE STEPS */}
                          {isMobile && (
                            <div style={{ marginTop: 10, marginBottom: 6 }}>
                              <VideoCard
                                videoUrl={videoUrl}
                                tutName={tut.name}
                                isMobile={isMobile}
                              />
                            </div>
                          )}

                          {/* Steps */}
                          {tut.steps && tut.steps.length > 0 && (
                            <div style={{ marginTop: 8 }}>
                              <div
                                style={{
                                  fontWeight: 700,
                                  margin: "10px 0 6px",
                                  fontSize: "0.9rem",
                                  textTransform: "uppercase",
                                  letterSpacing: 0.08,
                                  color: "#6b21a8",
                                }}
                              >
                                Steps
                              </div>
                              <ul
                                style={{
                                  marginTop: 4,
                                  marginLeft: 16,
                                  paddingLeft: 4,
                                  lineHeight: 1.75,
                                  color: "#374151",
                                  fontSize: "0.95rem",
                                }}
                              >
                                {tut.steps.map((s, i) => (
                                  <li key={s.title + i} style={{ marginBottom: 8 }}>
                                    <strong>{s.title}:</strong> {s.description}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Benefits */}
                          {tut.benefits && tut.benefits.length > 0 && (
                            <div style={{ marginTop: 12 }}>
                              <div
                                style={{
                                  fontWeight: 700,
                                  margin: "6px 0 6px",
                                  fontSize: "0.9rem",
                                  textTransform: "uppercase",
                                  letterSpacing: 0.08,
                                  color: "#0f766e",
                                }}
                              >
                                Benefits
                              </div>
                              <ul
                                style={{
                                  marginTop: 4,
                                  marginLeft: 16,
                                  paddingLeft: 4,
                                  lineHeight: 1.75,
                                  color: "#374151",
                                  fontSize: "0.95rem",
                                }}
                              >
                                {tut.benefits.map((b, bi) => (
                                  <li key={bi} style={{ marginBottom: 6 }}>
                                    {b}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* ✅ DESKTOP: VIDEO COLUMN */}
                        {!isMobile && (
                          <VideoCard
                            videoUrl={videoUrl}
                            tutName={tut.name}
                            isMobile={isMobile}
                          />
                        )}
                      </div>
                    </article>
                  );
                })
              ) : !loading && !error ? (
                <div style={{ textAlign: "center", padding: 18 }}>
                  No modules available.
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
