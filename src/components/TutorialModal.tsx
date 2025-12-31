// src/components/TutorialModal.tsx
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

// Helper to build a usable video URL
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
  const modules = (tutorials ?? []).slice(0, 4);

  return (
    <section
      className="bb-section bb-section-alt bb-modules"
      style={{ paddingTop: 6 }}
    >
      <div
        className="bb-section-shell bb-anim-fade-up"
        style={{ maxWidth: 1180 }}
      >
        <h2
          className="bb-section-title"
          style={{ textAlign: "center", marginBottom: 6 }}
        >
          Explore Each Back&Bone Module
        </h2>

        <p
          className="bb-section-subtitle"
          style={{
            textAlign: "center",
            maxWidth: 720,
            margin: "0 auto 28px",
          }}
        >
          Each module unlocks a different part of your fitness routine. Use
          these tutorials as a quick guide while you explore the app.
        </p>

        {loading && (
          <div style={{ textAlign: "center", padding: 18, color: "var(--bb-muted)" }}>
            Loading modules…
          </div>
        )}

        {!loading && error && (
          <div style={{ textAlign: "center", padding: "6px 0 18px", color: "#9b1c1c" }}>
            {error}
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

            return (
              <article
                key={tut.name + idx}
                className="bb-feature-row-alt bb-card-hover bb-anim-fade-up"
                style={{
                  marginBottom: 26,
                  borderRadius: isMobile ? 22 : 28,
                  padding: isMobile ? 14 : 22,
                  background:
                    "linear-gradient(135deg,#fbf5ff,#f5f3ff,#ffffff 48%)",
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
                  <div
                    className="bb-feature-copy-alt"
                    style={{ flex: 1, minWidth: 0, maxWidth: 680 }}
                  >
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
                        marginBottom: 8,
                        fontSize: "clamp(1.15rem, 3.6vw, 1.25rem)",
                        fontWeight: 800,
                        color: "#111827",
                        lineHeight: 1.2,
                      }}
                    >
                      {tut.name}
                    </h3>

                    {/* subtitle + description in a soft info card */}
                    {(tut.subtitle || tut.description) && (
                      <div
                        style={{
                          borderRadius: 18,
                          padding: isMobile ? "12px 12px" : "14px 14px",
                          background: "rgba(255,255,255,0.72)",
                          border: "1px solid rgba(226,232,240,0.95)",
                          boxShadow: "0 10px 22px rgba(15,23,42,0.05)",
                          marginBottom: 12,
                        }}
                      >
                        {tut.subtitle && (
                          <div
                            style={{
                              color: "rgba(55,65,81,0.92)",
                              fontSize: "0.98rem",
                              fontWeight: 700,
                              marginBottom: 6,
                            }}
                          >
                            {tut.subtitle}
                          </div>
                        )}

                        {tut.description && (
                          <div
                            style={{
                              color: "#374151",
                              fontSize: "0.96rem",
                              lineHeight: 1.75,
                            }}
                          >
                            {tut.description}
                          </div>
                        )}
                      </div>
                    )}

                    {/* ✅ MOBILE: VIDEO ABOVE STEPS */}
                    {isMobile && (
                      <div style={{ marginTop: 8, marginBottom: 10 }}>
                        <VideoCard
                          videoUrl={videoUrl}
                          tutName={tut.name}
                          isMobile={isMobile}
                        />
                      </div>
                    )}

                    {/* Steps (new better styling) */}
                    {tut.steps && tut.steps.length > 0 && (
                      <div style={{ marginTop: 14 }}>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            fontWeight: 800,
                            padding: "6px 12px",
                            borderRadius: 999,
                            fontSize: 12,
                            textTransform: "uppercase",
                            letterSpacing: 0.1,
                            color: "#5b21b6",
                            background: "rgba(139,92,246,0.10)",
                            border: "1px solid rgba(139,92,246,0.18)",
                          }}
                        >
                          Steps
                        </div>

                        <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                          {tut.steps.map((s, i) => (
                            <div
                              key={s.title + i}
                              style={{
                                display: "flex",
                                gap: 12,
                                alignItems: "flex-start",
                                padding: "12px 12px",
                                borderRadius: 16,
                                background: "rgba(255,255,255,0.75)",
                                border: "1px solid rgba(226,232,240,0.95)",
                                boxShadow: "0 10px 22px rgba(15,23,42,0.05)",
                              }}
                            >
                              <div
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: 999,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: 900,
                                  fontSize: 13,
                                  color: "#fff",
                                  background:
                                    "linear-gradient(135deg,#8b5cf6,#4c1d95)",
                                  flex: "0 0 auto",
                                  marginTop: 1,
                                }}
                              >
                                {i + 1}
                              </div>

                              <div style={{ minWidth: 0 }}>
                                <div
                                  style={{
                                    fontWeight: 800,
                                    color: "#111827",
                                    marginBottom: 4,
                                    lineHeight: 1.25,
                                  }}
                                >
                                  {s.title}
                                </div>
                                <div
                                  style={{
                                    color: "#374151",
                                    lineHeight: 1.7,
                                    fontSize: "0.95rem",
                                  }}
                                >
                                  {s.description}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Benefits (new better styling) */}
                    {tut.benefits && tut.benefits.length > 0 && (
                      <div style={{ marginTop: 14 }}>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            fontWeight: 800,
                            padding: "6px 12px",
                            borderRadius: 999,
                            fontSize: 12,
                            textTransform: "uppercase",
                            letterSpacing: 0.1,
                            color: "#0f766e",
                            background: "rgba(13,148,136,0.10)",
                            border: "1px solid rgba(13,148,136,0.18)",
                          }}
                        >
                          Benefits
                        </div>

                        <div
                          style={{
                            marginTop: 10,
                            display: "grid",
                            gap: 8,
                          }}
                        >
                          {tut.benefits.map((b, bi) => (
                            <div
                              key={bi}
                              style={{
                                padding: "10px 12px",
                                borderRadius: 14,
                                background: "rgba(255,255,255,0.75)",
                                border: "1px solid rgba(226,232,240,0.95)",
                                boxShadow: "0 10px 22px rgba(15,23,42,0.05)",
                                display: "flex",
                                gap: 10,
                                alignItems: "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  width: 10,
                                  height: 10,
                                  borderRadius: 999,
                                  background:
                                    "linear-gradient(135deg,#0ea5e9,#10b981)",
                                  marginTop: 6,
                                  flex: "0 0 auto",
                                }}
                              />
                              <div
                                style={{
                                  color: "#374151",
                                  lineHeight: 1.7,
                                  fontSize: "0.95rem",
                                }}
                              >
                                {b}
                              </div>
                            </div>
                          ))}
                        </div>
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
    </section>
  );
}
