// src/Home/TutorialPage.tsx
import { useEffect, useMemo, useState } from "react";
import "../App.css";
import TutorialModal from "../components/TutorialModal";

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

const DATA_URL =
  "https://raw.githubusercontent.com/BUTDRILL1/backnbone-data/main/tutorials.json";

export default function TutorialPage(): JSX.Element {
  const [tutorials, setTutorials] = useState<Tutorial[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 820px)");
    const update = () => setIsMobile(mq.matches);
    update();

    if (mq.addEventListener) mq.addEventListener("change", update);
    else (mq as any).addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else (mq as any).removeListener(update);
    };
  }, []);

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
        if (Array.isArray(data)) parsed = data as Tutorial[];
        else if (Array.isArray((data as any).features))
          parsed = (data as any).features as Tutorial[];

        if (!parsed.length) throw new Error("Tutorials JSON has no features array");

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

  const shellMax = useMemo(() => (isMobile ? 980 : 1180), [isMobile]);

  return (
    <div className="bb-page" style={{ paddingTop: "86px", overflowX: "hidden" }}>
      {/* HERO / INTRO */}
      <section className="bb-section bb-hero-section bb-anim-fade-up">
        <div className="bb-section-shell" style={{ maxWidth: 980 }}>
          <div
            style={{
              borderRadius: isMobile ? 24 : 32,
              padding: isMobile ? "22px 16px 24px" : "30px 26px 32px",
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
                  fontSize: "clamp(2rem, 6vw, 2.9rem)",
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
                  fontSize: "clamp(0.98rem, 2.6vw, 1.02rem)",
                  color: "#111827",
                  lineHeight: 1.7,
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

      {/* ✅ MODULES SECTION (no button, shown here) */}
      <TutorialModal
        tutorials={tutorials}
        loading={loading}
        error={error}
        isMobile={isMobile}
      />

      {/* STATUS (kept) */}
      <section className="bb-section" style={{ paddingTop: 8, paddingBottom: 0 }}>
        <div className="bb-section-shell" style={{ maxWidth: shellMax }}>
          {loading && (
            <div style={{ textAlign: "center", padding: 24, color: "var(--bb-muted)" }}>
              Loading tutorials…
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
              fontSize: "clamp(1.35rem, 4vw, 1.8rem)",
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
              lineHeight: 1.7,
              padding: isMobile ? "0 10px" : 0,
            }}
          >
            New to Back&Bone? Follow these basics to get set up before you
            dive into each feature tutorial.
          </p>

          <div
            className="bb-steps-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
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
                  padding: isMobile ? "18px 16px 18px" : "22px 22px 24px",
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
                <h3 style={{ fontSize: "1.05rem", marginBottom: 6 }}>{step.title}</h3>
                <p style={{ color: "var(--bb-muted)", lineHeight: 1.7, margin: 0 }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
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
              borderRadius: isMobile ? 24 : 32,
              padding: isMobile ? "22px 16px 22px" : "30px 24px 32px",
              boxShadow:
                "0 20px 50px rgba(15,23,42,0.16), 0 0 0 1px rgba(148,163,184,0.28)",
            }}
          >
            <h3
              className="bb-section-title"
              style={{
                marginBottom: 8,
                fontSize: "clamp(1.35rem, 4vw, 1.8rem)",
              }}
            >
              Need a Hand?
            </h3>

            <p
              className="bb-section-subtitle"
              style={{
                marginBottom: 18,
                color: "var(--bb-muted)",
                fontSize: "0.98rem",
                lineHeight: 1.7,
              }}
            >
              Stuck anywhere in the app? Reach out and we&apos;ll walk you
              through the right module or send a quick loom recording.
            </p>

            <div
              className="bb-cta-actions"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 12,
                marginBottom: 8,
                flexWrap: "wrap",
              }}
            >
              <button
                className="bb-btn bb-btn-primary bb-btn-animated"
                style={{
                  padding: "12px 26px",
                  borderRadius: 999,
                  fontSize: "0.98rem",
                  width: isMobile ? "100%" : "auto",
                  maxWidth: 360,
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
                  width: isMobile ? "100%" : "auto",
                  maxWidth: 360,
                }}
              >
                Email Us
              </a>
            </div>

            <p style={{ marginTop: 6, fontSize: "0.85rem", color: "#6b7280" }}>
              We typically respond within 24 hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
