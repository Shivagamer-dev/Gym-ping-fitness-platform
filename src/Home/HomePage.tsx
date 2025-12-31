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
    navigate("/app-download");
  };

  return (
    <div className="bb-page bb-home" style={{ overflowX: "hidden" }}>
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
          <div className="bb-hero-text">
            <p className="bb-hero-kicker">YOUR AI FITNESS PARTNER,</p>
            <h1>
              Every Step of the <span>Way.</span>
            </h1>
            <p className="bb-hero-body">
              Back&Bone helps you stay consistent, track progress, and
              overcome every hurdle on your way to achieving your dream fitness
              goals.
            </p>

            <div className="bb-hero-actions" style={{ gap: 14 }}>
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
            Every Back&Bone module focuses on a different part of your
            journey – learning exercises, finding gyms, getting coaching, and
            tracking data.
          </p>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
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
        <div className="bb-section-shell bb-how-shell">
          <h2 className="bb-section-title bb-how-title">How it Works</h2>

          <p className="bb-section-subtitle bb-how-subtitle">
            Back&Bone keeps things simple: a clear journey from sign-up to
            long-term progress — with your data always under your control.
          </p>

          <div className="bb-how-grid">
            {[
              {
                title: "1. Create Your Account",
                body: "Sign up in seconds and keep your fitness data safe and private.",
              },
              {
                title: "2. Start Exploring",
                body: "Find workouts with Spotter and discover nearby gyms or fitness spaces that match your style.",
              },
              {
                title: "3. Get Your Personalized Plan",
                body: "Chat with RepBot for AI guidance tailored to your goals and lifestyle.",
              },
              {
                title: "4. Track Your Progress",
                body: "Connect your wearables and see all your data in one powerful dashboard.",
              },
              {
                title: "5. Stay in Control",
                body: "Manage permissions, update preferences, and stay in charge of your privacy anytime.",
              },
            ].map((item, i) => (
              <article key={i} className="bb-how-item bb-card-hover">
                <h4 className="bb-how-item-title">{item.title}</h4>
                <p className="bb-how-item-body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>

        <style>
          {`
            .bb-how-shell{ max-width: 1200px; margin: 0 auto; }
            .bb-how-title{ text-align:center; font-size: 2.25rem; line-height: 1.12; margin-bottom: 8px; }
            .bb-how-subtitle{ text-align:center; max-width: 760px; margin: 0 auto 28px; font-size: 1.05rem; color: var(--bb-muted, #6b7280); line-height: 1.6; }
            .bb-how-grid{ display:grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 24px; align-items: stretch; }
            .bb-how-item{ background: var(--bb-surface, #fff); border-radius: 14px; padding: 20px 22px; box-shadow: 0 8px 22px rgba(16,24,40,0.06); min-height: 190px; display:flex; flex-direction:column; justify-content:flex-start; transition: transform .28s ease, box-shadow .28s ease; }
            .bb-how-item-title{ margin: 0 0 10px 0; font-size: 1.02rem; font-weight: 800; color: var(--bb-heading, #111827); line-height: 1.25; }
            .bb-how-item-body{ margin: 0; color: var(--bb-muted, #6b7280); font-size: 0.95rem; line-height: 1.65; }

            @media (max-width: 1200px){ .bb-how-grid{ grid-template-columns: repeat(3, minmax(0, 1fr)); } }
            @media (max-width: 800px){ .bb-how-grid{ grid-template-columns: repeat(2, minmax(0, 1fr)); } }
            @media (max-width: 520px){
              .bb-how-grid{ grid-template-columns: 1fr; }
              .bb-how-title{ font-size: 1.85rem; }
              .bb-how-subtitle{ font-size: 0.98rem; margin-bottom: 18px; }
              .bb-how-item{ min-height: auto; }
            }
          `}
        </style>
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
              <p>Your health data is locked and protected with end-to-end encryption.</p>
            </div>
            <div className="bb-data-card bb-card-hover">
              <h4>Decentralized and Secure</h4>
              <p>No single point of risk – your information stays safely yours.</p>
            </div>
            <div className="bb-data-card bb-card-hover">
              <h4>You're in Charge</h4>
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
          <p className="bb-section-subtitle" style={{ textAlign: "center", marginTop: 8 }}>
            The passionate minds revolutionizing fitness technology.
          </p>

          <div className="bb-founders-grid">
            {FOUNDERS.map((founder) => (
              <article
                key={founder.id}
                className="bb-founder-card-v2"
                tabIndex={0}
                style={{ ["--accent" as any]: founder.accent }}
              >
                <div className="bb-founder-bg" />
                <span className="bb-dot bb-dot-tr" />
                <span className="bb-dot bb-dot-bl" />

                <div className="bb-founder-avatar-v2">
                  <div className="bb-founder-avatar-inner">
                    <img
                      src={founder.photo}
                      alt={founder.name}
                      className="bb-founder-avatar-img"
                    />
                  </div>
                </div>

                <h3 className="bb-founder-name">{founder.name}</h3>
                <p className="bb-founder-role">{founder.role}</p>

                <div className="bb-founder-tags">
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
            .bb-founders-grid{
              display:grid;
              grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
              column-gap: 32px;
              row-gap: 64px;
              margin-top: 40px;
            }

            .bb-founder-card-v2{
              position: relative;
              border-radius: 28px;
              padding: 84px 32px 28px;
              background: #ffffff;
              box-shadow: 0 26px 60px rgba(148,163,184,0.35), 0 0 0 1px rgba(148,163,184,0.25);
              color: #111827;
              outline: none;
              transition: transform 220ms ease, box-shadow 220ms ease;
              overflow: visible;
              isolation: isolate;
            }

            .bb-founder-card-v2:hover,
            .bb-founder-card-v2:focus-within{
              transform: translateY(-8px);
              box-shadow: 0 32px 80px rgba(148,163,184,0.55);
            }

            .bb-founder-bg{
              position:absolute;
              inset:-16px;
              border-radius:36px;
              background:
                radial-gradient(circle at 0 0, var(--accent)1f 0, transparent 55%),
                radial-gradient(circle at 100% 100%, var(--accent)17 0, transparent 55%);
              z-index:-1;
            }

            .bb-dot{
              position:absolute;
              width:10px;
              height:10px;
              border-radius:999px;
              background: var(--accent);
              box-shadow: 0 0 16px var(--accent);
              opacity: 0.95;
              z-index: -1;
              pointer-events:none;
            }
            .bb-dot-tr{ top:22px; right:26px; }
            .bb-dot-bl{ bottom:22px; left:26px; }

            .bb-founder-avatar-v2{
              position:absolute;
              left:50%;
              top:0;
              transform: translate(-50%, -50%);
              width:156px;
              height:156px;
              border-radius:999px;
              padding:5px;
              background: linear-gradient(135deg, var(--accent), #a855f7);
              box-shadow: 0 20px 55px var(--accent)50;
              display:flex;
              align-items:center;
              justify-content:center;
            }

            .bb-founder-avatar-inner{
              width:100%;
              height:100%;
              border-radius:999px;
              overflow:hidden;
              background:#f9fafb;
              border:4px solid #f9fafb;
              display:flex;
              align-items:center;
              justify-content:center;
            }

            .bb-founder-avatar-img{
              width:100%;
              height:100%;
              object-fit:cover;
            }

            .bb-founder-name{
              text-align:center;
              margin: 32px 0 4px;
              font-size: 1.6rem;
              font-weight: 800;
              color:#111827;
            }

            .bb-founder-role{
              text-align:center;
              margin: 0 0 18px 0;
              font-size: 0.98rem;
              color:#6b7280;
            }

            .bb-founder-tags{
              display:flex;
              justify-content:center;
              flex-wrap:wrap;
              gap:12px;
              margin-bottom: 0;
            }

            .bb-founder-chip-v2{
              display:inline-flex;
              align-items:center;
              justify-content:center;
              padding: 8px 16px;
              border-radius:999px;
              border: 1px solid rgba(139,92,246,0.28);
              background: rgba(139,92,246,0.05);
              color: var(--bb-accent, #5b21b6);
              font-size: 0.9rem;
              font-weight: 500;
              box-shadow: 0 8px 20px rgba(148,163,184,0.25);
            }

            .bb-founder-bio-v2{
              margin: 0;
              margin-top: 0;
              color:#4b5563;
              font-size:0.95rem;
              line-height:1.7;
              max-height:0;
              opacity:0;
              overflow:hidden;
              transition: max-height 360ms ease, opacity 220ms ease, margin-top 220ms ease;
            }

            .bb-founder-card-v2:hover .bb-founder-bio-v2,
            .bb-founder-card-v2:focus-within .bb-founder-bio-v2{
              max-height: 260px;
              opacity: 1;
              margin-top: 16px;
            }

            @media (hover: none){
              .bb-founder-bio-v2{
                max-height: 260px;
                opacity: 1;
                margin-top: 16px;
              }
            }

            @media (max-width: 520px){
              .bb-founders-grid{ row-gap: 28px; }
              .bb-founder-card-v2{
                overflow:hidden;
                padding: 28px 22px 22px;
              }
              .bb-founder-avatar-v2{
                position: relative;
                left: auto;
                top: auto;
                transform: none;
                margin: 6px auto 14px;
                width: 128px;
                height: 128px;
              }
              .bb-founder-name{ margin-top: 6px; font-size: 1.45rem; }
            }
          `}
        </style>
      </section>

      {/* ===== FINAL CTA (FIXED RESPONSIVE) ===== */}
      <section className="bb-section bb-cta">
        <div className="bb-section-shell">
          <div className="bb-cta-panel bb-card-hover">
            <h2 className="bb-cta-title">Start Your Fitness Journey Today</h2>
            <p className="bb-cta-subtitle">
              Join a growing community building consistency with Back&Bone.
            </p>

            <div className="bb-cta-actions-fixed">
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
        </div>

        <style>
          {`
            .bb-cta-panel{
              background: rgba(255,255,255,0.7);
              border: 1px solid rgba(139,92,246,0.25);
              border-radius: 22px;
              padding: 34px 26px;
              box-shadow: 0 18px 55px rgba(17,24,39,0.10);
              text-align: center;
              backdrop-filter: blur(10px);
            }

            .bb-cta-title{
              margin: 0;
              font-size: clamp(1.4rem, 3.2vw, 2rem);
              font-weight: 900;
              line-height: 1.12;
              color: #111827;
            }

            .bb-cta-subtitle{
              margin: 12px auto 0;
              max-width: 620px;
              color: #6b7280;
              font-size: 1rem;
              line-height: 1.6;
            }

            .bb-cta-actions-fixed{
              margin-top: 22px;
              display: flex;
              gap: 14px;
              justify-content: center;
              align-items: center;
              flex-wrap: wrap;
            }

            /* ✅ Mobile: stack buttons full width */
            @media (max-width: 520px){
              .bb-cta-panel{ padding: 26px 18px; }
              .bb-cta-actions-fixed{
                flex-direction: column;
                gap: 12px;
              }
              .bb-cta-actions-fixed .bb-btn{
                width: 100%;
                max-width: 320px;
                justify-content: center;
              }
            }
          `}
        </style>
      </section>

      {/* ===== BETA SIGNUP POPUP ===== */}
      {isBetaOpen && <BetaSignupPopup onClose={() => setIsBetaOpen(false)} />}
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
