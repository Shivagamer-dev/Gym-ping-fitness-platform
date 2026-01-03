// src/components/TutorialModal.tsx
import { useMemo } from "react";
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
}: {
  videoUrl: string | null;
  tutName: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: 22,
        background:
          "radial-gradient(circle at 0 0,#eef2ff,#f5f3ff 40%,#faf5ff 100%)",
        boxShadow:
          "0 18px 40px rgba(129,140,248,0.22), 0 0 0 1px rgba(209,213,219,0.75)",
        overflow: "hidden",
        padding: 12,
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
            Visual walkthrough placeholder. In the app, this module appears as an
            interactive screen.
          </div>
        )}
      </div>
    </div>
  );
}

function StepCard({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        borderRadius: 16,
        background: "rgba(255,255,255,0.92)",
        boxShadow:
          "0 12px 28px rgba(15,23,42,0.08), 0 0 0 1px rgba(226,232,240,0.95)",
        padding: "12px 12px 12px",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 999,
          background: "linear-gradient(135deg,#8b5cf6,#4c1d95)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: 12,
          boxShadow: "0 10px 22px rgba(79,70,229,0.35)",
          flex: "0 0 auto",
          marginTop: 1,
        }}
      >
        {index}
      </div>

      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontWeight: 800,
            color: "#111827",
            fontSize: "0.95rem",
            lineHeight: 1.25,
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: "rgba(55,65,81,0.88)",
            fontSize: "0.92rem",
            lineHeight: 1.55,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}

function BenefitsCard({ benefits }: { benefits: string[] }) {
  return (
    <div
      style={{
        borderRadius: 18,
        background: "rgba(255,255,255,0.92)",
        boxShadow:
          "0 12px 28px rgba(15,23,42,0.08), 0 0 0 1px rgba(226,232,240,0.95)",
        padding: "14px 14px 12px",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 10px",
          borderRadius: 999,
          background: "rgba(15,118,110,0.10)",
          color: "#0f766e",
          fontWeight: 900,
          fontSize: 12,
          letterSpacing: 0.08,
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        Benefits
      </div>

      <ul
        style={{
          margin: 0,
          paddingLeft: 18,
          color: "#374151",
          lineHeight: 1.7,
          fontSize: "0.94rem",
        }}
      >
        {benefits.map((b, i) => (
          <li key={i} style={{ marginBottom: 6 }}>
            {b}
          </li>
        ))}
      </ul>
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
  const modules = useMemo(() => {
    if (!tutorials || tutorials.length === 0) return [];
    return tutorials.slice(0, 4);
  }, [tutorials]);

  return (
    <section className="bb-section bb-section-alt bb-modules">
      <div className="bb-section-shell bb-anim-fade-up" style={{ maxWidth: 1180 }}>

        {loading && (
          <div style={{ textAlign: "center", padding: 18, color: "var(--bb-muted)" }}>
            Loading tutorials…
          </div>
        )}

        {error && (
          <div style={{ textAlign: "center", color: "#9b1c1c", padding: "8px 0 18px" }}>
            {error}
          </div>
        )}

        {!loading && !error && modules.length > 0 ? (
          modules.map((tut, idx) => {
            const isEven = idx % 2 === 1;
            const videoUrl = getVideoUrl(tut);

            return (
              <article
                key={tut.name + idx}
                className="bb-feature-row-alt bb-card-hover bb-anim-fade-up"
                style={{
                  marginBottom: 22,
                  borderRadius: isMobile ? 22 : 28,
                  padding: isMobile ? 14 : 22,
                  background: "linear-gradient(135deg,#fbf5ff,#f5f3ff,#ffffff 48%)",
                  boxShadow:
                    "0 22px 55px rgba(15,23,42,0.12), 0 0 0 1px rgba(226,232,240,0.9)",
                }}
              >
                {/* ✅ MOBILE: EXACT SAME FLOW AS BEFORE */}
                {isMobile ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
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
                          fontWeight: 800,
                        }}
                      >
                        Module {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3
                      style={{
                        margin: 0,
                        fontSize: "clamp(1.18rem, 5vw, 1.35rem)",
                        fontWeight: 900,
                        color: "#111827",
                      }}
                    >
                      {tut.name}
                    </h3>

                    {tut.subtitle && (
                      <div style={{ color: "rgba(55,65,81,0.86)", lineHeight: 1.7 }}>
                        {tut.subtitle}
                      </div>
                    )}

                    {tut.description && (
                      <div
                        style={{
                          borderRadius: 18,
                          background: "rgba(255,255,255,0.92)",
                          boxShadow:
                            "0 12px 28px rgba(15,23,42,0.08), 0 0 0 1px rgba(226,232,240,0.95)",
                          padding: "14px 14px 12px",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 900,
                            color: "#374151",
                            marginBottom: 8,
                          }}
                        >
                          {tut.subtitle ? "Overview" : "What it does"}
                        </div>
                        <div style={{ color: "#374151", lineHeight: 1.75 }}>
                          {tut.description}
                        </div>
                      </div>
                    )}

                    {/* ✅ Video ABOVE steps */}
                    <VideoCard videoUrl={videoUrl} tutName={tut.name} />

                    {/* Steps */}
                    {tut.steps && tut.steps.length > 0 && (
                      <div>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "6px 10px",
                            borderRadius: 999,
                            background: "rgba(107,33,168,0.10)",
                            color: "#6b21a8",
                            fontWeight: 900,
                            fontSize: 12,
                            letterSpacing: 0.08,
                            textTransform: "uppercase",
                            marginBottom: 10,
                          }}
                        >
                          Steps
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
                          {tut.steps.map((s, i) => (
                            <StepCard
                              key={s.title + i}
                              index={i + 1}
                              title={s.title}
                              description={s.description}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ✅ Benefits LAST */}
                    {tut.benefits && tut.benefits.length > 0 && (
                      <BenefitsCard benefits={tut.benefits} />
                    )}
                  </div>
                ) : (
                  /* ✅ DESKTOP: Use empty space (2-column) */
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isEven ? "row-reverse" : "row",
                      gap: 22,
                      alignItems: "stretch",
                    }}
                  >
                    {/* LEFT: Copy + Benefits */}
                    <div style={{ flex: 1.05, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          marginBottom: 8,
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
                            fontWeight: 800,
                          }}
                        >
                          Module {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3
                        style={{
                          marginBottom: 6,
                          fontSize: "clamp(1.18rem, 2.2vw, 1.35rem)",
                          fontWeight: 900,
                          color: "#111827",
                        }}
                      >
                        {tut.name}
                      </h3>

                      {tut.subtitle && (
                        <div
                          style={{
                            color: "rgba(55,65,81,0.86)",
                            fontSize: "0.98rem",
                            lineHeight: 1.7,
                            marginBottom: 10,
                          }}
                        >
                          {tut.subtitle}
                        </div>
                      )}

                      {tut.description && (
                        <div
                          style={{
                            borderRadius: 18,
                            background: "rgba(255,255,255,0.92)",
                            boxShadow:
                              "0 12px 28px rgba(15,23,42,0.08), 0 0 0 1px rgba(226,232,240,0.95)",
                            padding: "14px 14px 12px",
                            marginBottom:
                              tut.benefits && tut.benefits.length > 0 ? 12 : 0,
                          }}
                        >
                          <div
                            style={{
                              fontWeight: 900,
                              color: "#374151",
                              marginBottom: 8,
                            }}
                          >
                            {tut.subtitle ? "Overview" : "What it does"}
                          </div>
                          <div style={{ color: "#374151", lineHeight: 1.75 }}>
                            {tut.description}
                          </div>
                        </div>
                      )}

                      {tut.benefits && tut.benefits.length > 0 && (
                        <BenefitsCard benefits={tut.benefits} />
                      )}
                    </div>

                    {/* RIGHT: Video + Steps */}
                    <div style={{ flex: 0.95, minWidth: 360 }}>
                      <div style={{ marginBottom: 12 }}>
                        <VideoCard videoUrl={videoUrl} tutName={tut.name} />
                      </div>

                      {tut.steps && tut.steps.length > 0 && (
                        <div>
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 8,
                              padding: "6px 10px",
                              borderRadius: 999,
                              background: "rgba(107,33,168,0.10)",
                              color: "#6b21a8",
                              fontWeight: 900,
                              fontSize: 12,
                              letterSpacing: 0.08,
                              textTransform: "uppercase",
                              marginBottom: 10,
                            }}
                          >
                            Steps
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
                            {tut.steps.map((s, i) => (
                              <StepCard
                                key={s.title + i}
                                index={i + 1}
                                title={s.title}
                                description={s.description}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })
        ) : !loading && !error ? (
          <div style={{ textAlign: "center", padding: 18 }}>No modules available.</div>
        ) : null}
      </div>
    </section>
  );
}
