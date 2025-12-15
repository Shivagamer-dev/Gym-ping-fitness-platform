// src/Home/TutorialPage.tsx
import { useEffect, useState } from "react";
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
  // From JSON
  videoId?: string;      // e.g. "dQw4w9WgXcQ"
  videoUrl?: string;     // e.g. "https://www.youtube.com/embed/..."
  steps?: TutorialStep[];
  benefits?: string[];
};

const DATA_URL =
  "https://raw.githubusercontent.com/BUTDRILL1/backnbone-data/main/tutorials.json";

// Helper to build a usable video URL
function getVideoUrl(tut: Tutorial): string | null {
  if (tut.videoUrl && tut.videoUrl.trim()) {
    return tut.videoUrl.trim();
  }

  if (tut.videoId && tut.videoId.trim()) {
    const id = tut.videoId.trim();
    // If user accidentally puts a full URL in videoId, just use it
    if (id.startsWith("http://") || id.startsWith("https://")) {
      return id;
    }
    // Otherwise treat it as a YouTube video id
    return `https://www.youtube.com/embed/${id}`;
  }

  return null;
}

export default function TutorialPage(): JSX.Element {
  const [tutorials, setTutorials] = useState<Tutorial[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadTutorials() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(DATA_URL, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch tutorials JSON");

        const data = await res.json();

        if (!mounted) return;

        let parsed: Tutorial[] = [];

        // JSON on GitHub is: { "features": [ ... ] }
        if (Array.isArray(data)) {
          parsed = data as Tutorial[];
        } else if (Array.isArray((data as any).features)) {
          parsed = (data as any).features as Tutorial[];
        }

        if (!parsed.length) {
          throw new Error("Tutorials JSON has no features array");
        }

        setTutorials(parsed);
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setError("Could not load tutorial content. Please try again later.");
        setTutorials(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadTutorials();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      className="bb-page"
      style={{
        paddingTop: "86px",
        overflowX: "hidden",
      }}
    >
      {/* HERO / INTRO */}
      <section className="bb-section bb-hero-section bb-anim-fade-up">
        <div className="bb-section-shell" style={{ maxWidth: 980 }}>
          <div
            style={{
              borderRadius: 32,
              padding: "30px 26px 32px",
              background:
                "radial-gradient(circle at 0 0, #a855f7 0, #6366f1 18%, #f9f5ff 52%, #ffffff 100%)",
              boxShadow:
                "0 28px 70px rgba(79,70,229,0.40), 0 0 0 1px rgba(148,163,184,0.30)",
              textAlign: "center",
              color: "#0f172a",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "-40%",
                background:
                  "radial-gradient(circle at 10% 0, rgba(244,244,255,0.9), transparent 50%)",
                opacity: 0.7,
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "inline-flex",
                  padding: "4px 12px",
                  borderRadius: 999,
                  background: "rgba(15,23,42,0.85)",
                  color: "#e5e7eb",
                  fontSize: 12,
                  letterSpacing: 0.09,
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                Product Tutorials
              </div>

              <h1
                style={{
                  fontSize: "2.9rem",
                  lineHeight: 1.06,
                  fontWeight: 800,
                  margin: "6px 0 10px",
                  color: "#0b1120",
                }}
              >
                Back&Bone Tutorials
              </h1>

              <p
                className="bb-section-subtitle"
                style={{
                  maxWidth: 760,
                  margin: "0 auto 14px",
                  fontSize: "1.02rem",
                  color: "#111827",
                }}
              >
                Learn how every Back&Bone module works, step by step. From
                exercise discovery to smart gym tools, this page walks you
                through the entire experience.
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 10,
                  flexWrap: "wrap",
                  marginTop: 8,
                  fontSize: 12,
                }}
              >
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: 999,
                    background: "rgba(15,23,42,0.08)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  App walkthroughs
                </span>
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: 999,
                    background: "rgba(15,23,42,0.08)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  Feature deep-dives
                </span>
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: 999,
                    background: "rgba(15,23,42,0.08)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  Quick, practical tips
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATUS */}
      <section className="bb-section" style={{ paddingTop: 8, paddingBottom: 0 }}>
        <div className="bb-section-shell" style={{ maxWidth: 1180 }}>
          {loading && (
            <div style={{ textAlign: "center", padding: 24, color: "var(--bb-muted)" }}>
              Loading tutorials…
            </div>
          )}
          {error && (
            <div
              style={{
                textAlign: "center",
                color: "#9b1c1c",
                padding: "10px 0 22px",
              }}
            >
              {error}
            </div>
          )}
        </div>
      </section>

      {/* 3-STEP ONBOARDING */}
      <section className="bb-section bb-anim-fade-up">
        <div
          className="bb-section-shell bb-steps-wrap"
          style={{ textAlign: "center", maxWidth: 1050 }}
        >
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Start in 3 Simple Steps
          </h2>

          <p
            className="bb-section-subtitle"
            style={{
              maxWidth: 640,
              margin: "0 auto 22px",
              color: "var(--bb-muted)",
            }}
          >
            New to Back&Bone? Follow these basics to get set up before you
            dive into each feature tutorial.
          </p>

          <div
            className="bb-steps-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
              alignItems: "stretch",
            }}
          >
            {[
              {
                num: 1,
                title: "Download & Install",
                body: "Get Back&Bone from your favourite app store and sign in to begin your journey.",
              },
              {
                num: 2,
                title: "Create Your Profile",
                body: "Set your goals, fitness level, and preferences so Back&Bone can personalise every workout.",
              },
              {
                num: 3,
                title: "Start Your Journey",
                body: "Explore workouts, discover gyms, and let RepBot support every rep while your dashboard tracks progress.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="bb-card-hover bb-anim-card"
                style={{
                  padding: "22px 22px 24px",
                  borderRadius: 24,
                  background: "rgba(255,255,255,0.96)",
                  boxShadow:
                    "0 18px 40px rgba(15,23,42,0.10), 0 0 0 1px rgba(226,232,240,0.9)",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 999,
                    background: "linear-gradient(135deg,#8b5cf6,#4c1d95)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 800,
                    marginBottom: 12,
                    fontSize: 18,
                    boxShadow: "0 12px 24px rgba(79,70,229,0.45)",
                  }}
                >
                  {step.num}
                </div>
                <h3 style={{ fontSize: "1.05rem", marginBottom: 6 }}>
                  {step.title}
                </h3>
                <p style={{ color: "var(--bb-muted)", lineHeight: 1.6 }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE WALKTHROUGH (dynamic from JSON) */}
      <section className="bb-section bb-section-alt bb-modules">
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

          {tutorials && tutorials.length > 0 ? (
            tutorials.map((tut, idx) => {
              const isEven = idx % 2 === 1;
              const videoUrl = getVideoUrl(tut);

              return (
                <article
                  key={tut.name + idx}
                  className="bb-feature-row-alt bb-card-hover bb-anim-fade-up"
                  style={{
                    marginBottom: 26,
                    borderRadius: 28,
                    padding: 22,
                    background:
                      "linear-gradient(135deg,#fbf5ff,#f5f3ff,#ffffff 48%)",
                    boxShadow:
                      "0 22px 55px rgba(15,23,42,0.12), 0 0 0 1px rgba(226,232,240,0.9)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isEven ? ("row-reverse" as const) : ("row" as const),
                      gap: 26,
                      alignItems: "stretch",
                    }}
                  >
                    {/* TEXT COLUMN */}
                    <div
                      className="bb-feature-copy-alt"
                      style={{ flex: 1, minWidth: 0 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          marginBottom: 4,
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
                          fontSize: "1.25rem",
                          fontWeight: 700,
                          color: "#111827",
                        }}
                      >
                        {tut.name}
                      </h3>

                      {tut.subtitle && (
                        <p
                          style={{
                            marginBottom: 8,
                            color: "var(--bb-muted)",
                            fontSize: "0.96rem",
                          }}
                        >
                          {tut.subtitle}
                        </p>
                      )}

                      {tut.description && (
                        <p
                          style={{
                            marginBottom: 12,
                            lineHeight: 1.7,
                            color: "#374151",
                            fontSize: "0.95rem",
                          }}
                        >
                          {tut.description}
                        </p>
                      )}

                      {/* Steps */}
                      {tut.steps && tut.steps.length > 0 && (
                        <div style={{ marginTop: 6 }}>
                          <div
                            style={{
                              fontWeight: 700,
                              margin: "8px 0 4px",
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
                              lineHeight: 1.6,
                              color: "#374151",
                              fontSize: "0.93rem",
                            }}
                          >
                            {tut.steps.map((s, i) => (
                              <li key={s.title + i} style={{ marginBottom: 4 }}>
                                <strong>{s.title}:</strong> {s.description}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Benefits */}
                      {tut.benefits && tut.benefits.length > 0 && (
                        <div style={{ marginTop: 10 }}>
                          <div
                            style={{
                              fontWeight: 700,
                              margin: "6px 0 4px",
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
                              lineHeight: 1.6,
                              color: "#374151",
                              fontSize: "0.93rem",
                            }}
                          >
                            {tut.benefits.map((b, bi) => (
                              <li key={bi} style={{ marginBottom: 3 }}>
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* VISUAL COLUMN / VIDEO */}
                    <div
                      className="bb-feature-image-shell"
                      style={{
                        flex: 0.9,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        className="bb-feature-image"
                        style={{
                          width: "100%",
                          maxWidth: 420,
                          height: 230,
                          borderRadius: 22,
                          background:
                            "radial-gradient(circle at 0 0,#eef2ff,#f5f3ff 40%,#faf5ff 100%)",
                          boxShadow:
                            "0 22px 50px rgba(129,140,248,0.30), 0 0 0 1px rgba(209,213,219,0.8)",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        {videoUrl ? (
                          <iframe
                            src={videoUrl}
                            title={`${tut.name} walkthrough`}
                            style={{
                              position: "absolute",
                              inset: 12,
                              width: "calc(100% - 24px)",
                              height: "calc(100% - 24px)",
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
                              inset: 12,
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
                            Visual walkthrough placeholder. In the app, this
                            module appears as an interactive screen.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          ) : !loading && !error ? (
            <div style={{ textAlign: "center", padding: 24 }}>
              No modules available.
            </div>
          ) : null}
        </div>
      </section>

      {/* SUPPORT CTA */}
      <section className="bb-section bb-cta" style={{ paddingBottom: 40 }}>
        <div className="bb-section-shell bb-anim-fade-up">
          <div
            style={{
              maxWidth: 820,
              margin: "0 auto",
              textAlign: "center",
              background: "#ffffff",
              borderRadius: 32,
              padding: "30px 24px 32px",
              boxShadow:
                "0 20px 50px rgba(15,23,42,0.16), 0 0 0 1px rgba(148,163,184,0.28)",
            }}
          >
            <h3
              className="bb-section-title"
              style={{ marginBottom: 8, fontSize: "1.8rem" }}
            >
              Need a Hand?
            </h3>

            <p
              className="bb-section-subtitle"
              style={{
                marginBottom: 22,
                color: "var(--bb-muted)",
                fontSize: "0.98rem",
              }}
            >
              Stuck anywhere in the app? Reach out and we'll walk you
              through the right module or send a quick loom recording.
            </p>

            <div
              className="bb-cta-actions"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 12,
                marginBottom: 8,
              }}
            >
              <button
                className="bb-btn bb-btn-primary bb-btn-animated"
                style={{
                  padding: "12px 26px",
                  borderRadius: 999,
                  fontSize: "0.98rem",
                }}
                onClick={() => {
                  window.location.href = "/support";
                }}
              >
                Visit Support Center
              </button>

              <a
                href="mailto:support@backnbone.com"
                className="bb-btn bb-btn-ghost bb-btn-animated"
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Email Us
              </a>

            </div>

            <p
              className="bb-cta-note"
              style={{ marginTop: 6, fontSize: "0.85rem", color: "#6b7280" }}
            >
              We typically respond within 24 hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
