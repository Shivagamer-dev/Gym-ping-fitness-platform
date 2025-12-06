// src/Home/HomePage.tsx
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

import heroImg from "../assets/images/hero.png";
import spotterImg from "../assets/images/spotter.png";
import locatorImg from "../assets/images/locator.png";
import repbotImg from "../assets/images/repbot.png";
import dashboardImg from "../assets/images/dashboard.png";

import amitFounderImg from "../assets/images/no_phtoto.jpg";
import omFounderImg from "../assets/images/om-founder.png";

// ✅ use your existing BetaSignupPopup component
import BetaSignupPopup from "./BetaSignupPopup";

type Founder = {
  id: string;
  name: string;
  role: string;
  bio: string;
  tags: string[];
  photo: string;
  accent: string;
};

const FOUNDERS: Founder[] = [
  {
    id: "amit",
    name: "-- --",
    role: "Co-Founder, CEO & CTO",
    bio: "He is the visionary behind Back&Bone's technological innovations and strategic direction. With a strong background in AI and software development, he leads the team in creating cutting-edge fitness solutions.",
    tags: ["AI & ML", "Software Architecture", "Product Strategy"],
    photo: amitFounderImg,
    accent: "#4f46e5",
  },
  {
    id: "om",
    name: "Om M. Dashasahastra",
    role: "Co-Founder, COO & CFO",
    bio: "Om drives the operational excellence and financial strategy of Back&Bone. His expertise in business management ensures smooth execution and sustainable growth, bringing the vision to life.",
    tags: ["Operations", "Finance", "Strategic Planning"],
    photo: omFounderImg,
    accent: "#ec4899",
  },
];

export default function HomePage() {
  const featureIntroRef = useRef<HTMLDivElement | null>(null);
  const [isBetaOpen, setIsBetaOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    featureIntroRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goToDownloadPage = () => {
    // Adjust this path if your router uses a different route for DownloadPage
    navigate("/app-download");
  };

  return (
    <div
      className="bb-page bb-home"
      style={{
        overflowX: "hidden",
      }}
    >
      {/* ===== HERO SECTION ===== */}
      <section
        className="bb-hero-strip"
        style={{
          width: "100%",
          marginTop: 0,
          background:
            "radial-gradient(circle at 0% 0%, #8b5cf6 0, #4c1d95 40%, #2e1065 100%)",
        }}
      >
        <div className="bb-hero-shell">
          {/* Left copy */}
          <div className="bb-hero-text">
            <p className="bb-hero-kicker">YOUR AI FITNESS PARTNER,</p>
            <h1>
              Every Step of the <span>Way.</span>
            </h1>
            <p className="bb-hero-body">
              Back &amp; Bone helps you stay consistent, track progress, and
              overcome every hurdle on your way to achieving your dream fitness
              goals.
            </p>

            <div className="bb-hero-actions" style={{ gap: 14 }}>
              {/* Signup for Beta – opens BetaSignupPopup */}
              <button
                className="bb-btn bb-btn-animated"
                style={{
                  padding: "14px 36px",
                  borderRadius: 999,
                  border: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, #ec4899 0%, #f97316 50%, #f97316 100%)",
                  boxShadow: "0 18px 40px rgba(248,113,113,0.45)",
                  cursor: "pointer",
                }}
                onClick={() => setIsBetaOpen(true)}
              >
                Signup for Beta
              </button>

              <button
                className="bb-btn bb-btn-ghost bb-btn-animated"
                onClick={scrollToFeatures}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right image */}
          <div className="bb-hero-media">
            <div className="bb-hero-image-shell bb-card-hover">
              <img
                src={heroImg}
                alt="Athlete training"
                className="bb-hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURE INTRO ===== */}
      <section className="bb-section" ref={featureIntroRef}>
        <div className="bb-section-shell">
          <h2 className="bb-section-title" style={{ textAlign: "center" }}>
            Designed to Help You Grow Stronger
          </h2>
          <p
            className="bb-section-subtitle"
            style={{
              textAlign: "center",
              maxWidth: "720px",
              margin: "14px auto 0",
            }}
          >
            Every Back&amp;Bone module focuses on a different part of your
            journey – learning exercises, finding gyms, getting coaching, and
            tracking data.
          </p>
        </div>
      </section>

      {/* ===== FEATURES: SPOTTER / LOCATOR / REPBOT / DASHBOARD ===== */}
      <section className="bb-section">
        <div className="bb-section-shell">
          <FeatureRow
            title="Spotter"
            subtitle="Master Every Move"
            description="Learn and perform exercises with confidence. Access thousands of guided workout videos with step-by-step instructions and proper form demonstrations."
            img={spotterImg}
            imgAlt="Spotter feature"
            reversed={false}
          />

          <FeatureRow
            title="Locator"
            subtitle="Find Your Fitness Hub"
            description="Never miss a workout. Discover nearby gyms and fitness centers with real-time ratings, amenities, and directions so you can train wherever you are."
            img={locatorImg}
            imgAlt="Locator feature"
            reversed={true}
          />

          <FeatureRow
            title="RepBot"
            subtitle="Your AI Fitness Partner"
            description="Get personalized plans and advice tailored to your goals, pace, and lifestyle, making fitness simple and effective – without overthinking your routine."
            img={repbotImg}
            imgAlt="RepBot feature"
            reversed={false}
          />

          <FeatureRow
            title="Dashboard"
            subtitle="Complete Health Overview"
            description="See your progress at a glance. Track key metrics, monitor improvements, and integrate data from your favorite wearables in one unified dashboard."
            img={dashboardImg}
            imgAlt="Dashboard feature"
            reversed={true}
          />
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bb-section bb-section-alt">
        <div
          className="bb-section-shell"
          style={{ maxWidth: 1200, margin: "0 auto" }}
        >
          <h2
            className="bb-section-title"
            style={{
              textAlign: "center",
              fontSize: "2.25rem",
              lineHeight: 1.12,
              marginBottom: 8,
            }}
          >
            How it Works
          </h2>

          <p
            className="bb-section-subtitle"
            style={{
              textAlign: "center",
              maxWidth: 760,
              margin: "0 auto 28px",
              fontSize: "1.05rem",
              color: "var(--bb-muted, #6b7280)",
              lineHeight: 1.6,
            }}
          >
            Back&amp;Bone keeps things simple: a clear journey from sign-up to
            long-term progress — with your data always under your control.
          </p>

          <div
            className="bb-how-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 24,
              alignItems: "stretch",
            }}
          >
            {[
              {
                title: "1. Create Your Account",
                body: "Sign up in seconds and keep your fitness data safe and private.",
              },
              {
                title: "2. Start Exploring",
                body:
                  "Find workouts with Spotter and discover nearby gyms or fitness spaces that match your style.",
              },
              {
                title: "3. Get Your Personalized Plan",
                body:
                  "Chat with RepBot for AI guidance tailored to your goals and lifestyle.",
              },
              {
                title: "4. Track Your Progress",
                body:
                  "Connect your wearables and see all your data in one powerful dashboard.",
              },
              {
                title: "5. Stay in Control",
                body:
                  "Manage permissions, update preferences, and stay in charge of your privacy anytime.",
              },
            ].map((item, i) => (
              <article
                key={i}
                className="bb-how-item bb-card-hover"
                style={{
                  background: "var(--bb-surface, #fff)",
                  borderRadius: 14,
                  padding: "20px 22px",
                  boxShadow: "0 8px 22px rgba(16,24,40,0.06)",
                  minHeight: 180,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  transition: "transform .28s ease, box-shadow .28s ease",
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    marginBottom: 8,
                    fontSize: "1.02rem",
                    fontWeight: 700,
                    color: "var(--bb-heading, #111827)",
                    lineHeight: 1.2,
                    minHeight: "48px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    margin: 0,
                    color: "var(--bb-muted, #6b7280)",
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    marginTop: 4,
                  }}
                >
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DATA / PRIVACY ===== */}
      <section className="bb-section">
        <div className="bb-section-shell">
          <h2 className="bb-section-title" style={{ textAlign: "center" }}>
            Your Data, Your Control
          </h2>

          <div
            className="bb-data-row"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 20,
              marginTop: 24,
            }}
          >
            <div className="bb-data-card bb-card-hover">
              <h4>Private by Design</h4>
              <p>Everything is built with your privacy in mind, from day one.</p>
            </div>
            <div className="bb-data-card bb-card-hover">
              <h4>Fully Encrypted</h4>
              <p>
                Your health data is locked and protected with end-to-end
                encryption.
              </p>
            </div>
            <div className="bb-data-card bb-card-hover">
              <h4>Decentralized &amp; Secure</h4>
              <p>No single point of risk – your information stays safely yours.</p>
            </div>
            <div className="bb-data-card bb-card-hover">
              <h4>You&apos;re in Charge</h4>
              <p>Decide what to share, when, and with whom. Total control.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOUNDERS ===== */}
      <section className="bb-section bb-section-alt">
        <div className="bb-section-shell">
          <h2 className="bb-section-title" style={{ textAlign: "center" }}>
            Meet The Innovators
          </h2>
          <p
            className="bb-section-subtitle"
            style={{ textAlign: "center", marginTop: "8px" }}
          >
            The passionate minds revolutionizing fitness technology.
          </p>

          <div
            className="bb-founders-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 32,
              marginTop: 40,
            }}
          >
            {FOUNDERS.map((founder) => (
              <article
                key={founder.id}
                className="bb-founder-card-v2"
                style={{
                  position: "relative",
                  borderRadius: 28,
                  padding: "72px 32px 28px",
                  background: "#ffffff",
                  boxShadow:
                    "0 26px 60px rgba(148,163,184,0.35), 0 0 0 1px rgba(148,163,184,0.25)",
                  overflow: "visible",
                  color: "#111827",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: "-16px",
                    borderRadius: 36,
                    background: `radial-gradient(circle at 0 0, ${founder.accent}1f 0, transparent 55%), radial-gradient(circle at 100% 100%, ${founder.accent}17 0, transparent 55%)`,

                    zIndex: -1,
                  }}
                />

                <span
                  style={{
                    position: "absolute",
                    top: 22,
                    right: 26,
                    width: 10,
                    height: 10,
                    borderRadius: "999px",
                    background: founder.accent,
                    boxShadow: `0 0 16px ${founder.accent}`,
                  }}
                />

                <span
                  style={{
                    position: "absolute",
                    bottom: 22,
                    left: 26,
                    width: 10,
                    height: 10,
                    borderRadius: "999px",
                    background: founder.accent,
                    boxShadow: `0 0 16px ${founder.accent}`,
                  }}
                />

                <div
                  className="bb-founder-avatar-v2"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 0,
                    transform: "translate(-50%, -50%)",
                    width: 156,
                    height: 156,
                    borderRadius: "999px",
                    padding: 5,
                    background: `linear-gradient(135deg, ${founder.accent}, #a855f7)`,
                    boxShadow: `0 20px 55px ${founder.accent}50`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "999px",
                      overflow: "hidden",
                      background: "#f9fafb",
                      border: "4px solid #f9fafb",
                    }}
                  >
                    <img
                      src={founder.photo}
                      alt={founder.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>

                <h3
                  style={{
                    textAlign: "center",
                    marginTop: 32,
                    marginBottom: 4,
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  {founder.name}
                </h3>
                <p
                  style={{
                    textAlign: "center",
                    margin: 0,
                    marginBottom: 22,
                    fontSize: "0.98rem",
                    color: "#6b7280",
                  }}
                >
                  {founder.role}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  {founder.tags.map((tag) => (
                    <span key={tag} className="bb-founder-chip-v2">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="bb-founder-bio-v2">{founder.bio}</p>
              </article>
            ))}
          </div>
        </div>

        <style>
          {`
            .bb-founder-card-v2 {
              transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease;
            }

            .bb-founder-card-v2:hover,
            .bb-founder-card-v2:focus-within {
              transform: translateY(-8px);
              box-shadow: 0 32px 80px rgba(148,163,184,0.55);
            }

            .bb-founder-chip-v2 {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              padding: 8px 16px;
              border-radius: 999px;
              border: 1px solid rgba(139,92,246,0.28);
              background: rgba(139,92,246,0.05);
              color: var(--bb-accent, #5b21b6);
              font-size: 0.9rem;
              font-weight: 500;
              box-shadow: 0 8px 20px rgba(148,163,184,0.25);
            }

            .bb-founder-bio-v2 {
              margin-top: 0;
              margin-bottom: 0;
              color: #4b5563;
              font-size: 0.95rem;
              line-height: 1.7;
              max-height: 0;
              opacity: 0;
              overflow: hidden;
              transition:
                max-height 360ms ease,
                opacity 220ms ease,
                margin-top 220ms ease;
            }

            .bb-founder-card-v2:hover .bb-founder-bio-v2,
            .bb-founder-card-v2:focus-within .bb-founder-bio-v2 {
              max-height: 260px;
              opacity: 1;
              margin-top: 16px;
            }

            @media (max-width: 880px) {
              .bb-founders-grid {
                grid-template-columns: 1fr;
              }
            }
          `}
        </style>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bb-section bb-cta">
        <div className="bb-section-shell bb-cta-panel bb-card-hover">
          <h2 className="bb-section-title">Start Your Fitness Journey Today</h2>
          <p className="bb-section-subtitle" style={{ marginTop: "8px" }}>
            Join a growing community building consistency with Back&amp;Bone.
          </p>

          <div className="bb-cta-actions">
            <button
              className="bb-btn bb-btn-primary bb-btn-animated"
              onClick={goToDownloadPage}
            >
              Download the app
            </button>
            <button
              className="bb-btn bb-btn-ghost bb-btn-animated"
              onClick={scrollToFeatures}
            >
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* ===== BETA SIGNUP POPUP ===== */}
      {isBetaOpen && (
        <BetaSignupPopup onClose={() => setIsBetaOpen(false)} />
      )}
    </div>
  );
}

/* === Helper for alternating feature rows === */
type FeatureRowProps = {
  title: string;
  subtitle: string;
  description: string;
  img: string;
  imgAlt: string;
  reversed?: boolean;
};

function FeatureRow({
  title,
  subtitle,
  description,
  img,
  imgAlt,
  reversed,
}: FeatureRowProps) {
  return (
    <div
      className="bb-feature-row-alt bb-card-hover"
      style={{
        flexDirection: reversed ? "row-reverse" : "row",
      }}
    >
      <div className="bb-feature-copy-alt">
        <h3 style={{ marginBottom: 8 }}>{title}</h3>
        <p className="bb-feature-subtitle" style={{ marginBottom: 10 }}>
          {subtitle}
        </p>
        <p style={{ color: "var(--bb-muted, #555)", lineHeight: 1.6 }}>
          {description}
        </p>
      </div>

      <div className="bb-feature-image-shell">
        <img src={img} alt={imgAlt} className="bb-feature-image" />
      </div>
    </div>
  );
}
