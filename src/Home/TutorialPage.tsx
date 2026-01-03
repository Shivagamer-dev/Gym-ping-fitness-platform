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
    <div
      className="bb-page"
      style={{
        // ✅ keep reduced top space
        paddingTop: isMobile ? "70px" : "76px",
        overflowX: "hidden",
      }}
    >
      {/* ✅ HERO / INTRO (UPDATED: remove big purple hero background card) */}
      <section
        className="bb-section bb-anim-fade-up"
        style={{
          paddingTop: 6,
          paddingBottom: 18,
        }}
      >
        <div className="bb-section-shell" style={{ maxWidth: 980 }}>
          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                fontSize: "clamp(2rem, 6vw, 2.6rem)",
                lineHeight: 1.08,
                fontWeight: 900,
                margin: "0px 0 15px",
                color: "#0b1120",
              }}
            >
              Back&Bone Tutorials
            </h1>

            <p
              className="bb-section-subtitle"
              style={{
                maxWidth: 760,
                margin: "0 auto 10px",
                fontSize: "clamp(0.98rem, 2.6vw, 1.02rem)",
                color: "#4b5563",
                lineHeight: 1.75,
              }}
            >
              Each module unlocks a different part of your fitness routine. Use these
              tutorials as a quick guide while you explore the app.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ Modules section (NO BUTTON) sits between header and steps */}
      <TutorialModal
        tutorials={tutorials}
        loading={loading}
        error={error}
        isMobile={isMobile}
      />

      {/* 3-STEP ONBOARDING */}
      <section className="bb-section bb-anim-fade-up" style={{ paddingTop: 10 }}>
        <div
          className="bb-section-shell bb-steps-wrap"
          style={{ textAlign: "center", maxWidth: 1050 }}
        >
          <h2
            style={{
              fontSize: "clamp(1.35rem, 4vw, 1.8rem)",
              fontWeight: 800,
              marginBottom: 8,
              marginTop: 12,
            }}
          >
            Start in 3 Simple Steps
          </h2>

          <p
            className="bb-section-subtitle"
            style={{
              maxWidth: 640,
              margin: "0 auto 18px",
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

                  // ✅ CHANGE: center all content inside each box (desktop + mobile)
                  textAlign: "center",

                  // ✅ CHANGE: make inner layout feel truly centered vertically too
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
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
                    margin: "0 auto 12px",
                    fontSize: 18,
                    boxShadow: "0 12px 24px rgba(79,70,229,0.45)",
                  }}
                >
                  {step.num}
                </div>

                <h3
                  style={{
                    fontSize: "1.05rem",
                    marginBottom: 6,
                    fontWeight: 800,
                    textAlign: "center",
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    color: "var(--bb-muted)",
                    lineHeight: 1.7,
                    margin: 0,
                    textAlign: "center",
                    maxWidth: 360, // keeps lines looking centered and neat
                  }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORT CTA */}
      <section
        className="bb-section bb-cta"
        style={{ paddingTop: 18, paddingBottom: 24 }}
      >
        <div className="bb-section-shell bb-anim-fade-up">
          <div
            style={{
              maxWidth: 920,
              margin: "0 auto",
              textAlign: "center",
              background: "#ffffff",
              borderRadius: isMobile ? 24 : 32,
              padding: isMobile ? "18px 16px 18px" : "24px 24px 26px",
              boxShadow:
                "0 20px 50px rgba(15,23,42,0.16), 0 0 0 1px rgba(148,163,184,0.28)",
            }}
          >
            <h3
              className="bb-section-title"
              style={{
                marginBottom: 8,
                fontSize: "clamp(1.35rem, 4vw, 1.8rem)",
                fontWeight: 900,
              }}
            >
              Need a Hand?
            </h3>

            <p
              className="bb-section-subtitle"
              style={{
                maxWidth: 860,
                margin: "0 auto 16px",
                color: "var(--bb-muted)",
                fontSize: "0.98rem",
                lineHeight: 1.75,
                textAlign: "center",
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
