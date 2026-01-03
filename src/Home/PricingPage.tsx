// src/Home/PricingPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

type Feature = {
  name: string;
  included?: boolean;
  description?: string;
};

type Plan = {
  id: string;
  name: string;
  tagline?: string;
  price?: {
    monthly?: number | string;
    annual?: number | string;
  };
  buttonText?: string;
  buttonStyle?: string;
  features?: Feature[];
  highlights?: string[];
  icon?: string;
  [k: string]: any;
};

type FAQ = {
  question: string;
  answer: string;
};

const PRICING_JSON_RAW =
  "https://raw.githubusercontent.com/BUTDRILL1/backnbone-data/main/pricing.json";

const renderPricePieces = (p: Plan) => {
  const monthly = p.price?.monthly;
  if (monthly === null || monthly === undefined) return { value: "—", suffix: "" };
  if (typeof monthly === "number") return { value: monthly.toString(), suffix: "/month" };
  return { value: monthly.toString(), suffix: "/month" };
};

export default function PricingPage(): JSX.Element {
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const [faqs, setFaqs] = useState<FAQ[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Family-plan state
  const [familyMembers, setFamilyMembers] = useState<number>(2);
  const FAMILY_MIN = 2;
  const FAMILY_MAX = 8;
  const FAMILY_PER_MEMBER = 150;

  const navigate = useNavigate();

  function addDefaultIcons(source: Plan[]): Plan[] {
    return source.map((p) => {
      const key = (p.id || p.name || "").toString().toLowerCase();
      let icon = "✔";
      if (key.includes("pro")) icon = "⚡";
      if (key.includes("family")) icon = "👪";
      return { ...p, icon };
    });
  }

  useEffect(() => {
    let mounted = true;

    const loadPricing = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(PRICING_JSON_RAW, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to fetch pricing (${res.status})`);

        const data = await res.json();
        const rawPlans: Plan[] = Array.isArray(data) ? data : data.plans ?? [];
        const rawFaqs: FAQ[] = data.faqs ?? [];

        const filtered = rawPlans.filter((p) => {
          const key = (p.id || p.name || "").toString().toLowerCase();
          return key.includes("free") || key.includes("pro") || key.includes("family");
        });

        const baseWithIcons = addDefaultIcons(filtered.length ? filtered : rawPlans);

        if (!mounted) return;
        setPlans(baseWithIcons);
        setFaqs(rawFaqs);
      } catch (err) {
        if (!mounted) return;
        console.error(err);
        setError("Check your connection and try again later");
        setPlans(null);
        setFaqs(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadPricing();
    return () => {
      mounted = false;
    };
  }, []);

  const featureNames = useMemo(() => {
    if (!plans) return [];
    const set = new Set<string>();
    plans.forEach((p) => {
      (p.features ?? []).forEach((f) => set.add(f.name || f.description || "Feature"));
    });
    return Array.from(set);
  }, [plans]);

  const featureLabel = (count: number) =>
    `Total for ${count} ${count === 1 ? "member" : "members"}`;

  const handleFamilyMinus = () => setFamilyMembers((prev) => Math.max(FAMILY_MIN, prev - 1));
  const handleFamilyPlus = () => setFamilyMembers((prev) => Math.min(FAMILY_MAX, prev + 1));

  return (
    <div className="bb-page bb-pricing-page" style={{ paddingTop: "20px" }}>
      {/* HERO / INTRO */}
      <section className="bb-section">
        <div className="bb-section-shell">
          <header style={{ textAlign: "center", marginBottom: "32px" }}>
            <p className="bb-hero-kicker">Choose a plan</p>
            <h1
              style={{
                fontSize: "3rem",
                lineHeight: 1.05,
                fontWeight: 800,
                marginBottom: "12px",
              }}
            >
              Find Your Perfect Fitness Plan
            </h1>
            <p
              className="bb-section-subtitle"
              style={{
                textAlign: "center",
                maxWidth: "760px",
                margin: "0 auto",
                fontSize: "1.05rem",
              }}
            >
              From personal plans to family memberships, choose the path that fits your goals and
              lifestyle.
            </p>
          </header>

          {loading && (
            <div style={{ textAlign: "center", padding: 36 }}>
              <div className="bb-anim-fade-up">Loading pricing…</div>
            </div>
          )}

          {error && (
            <div style={{ textAlign: "center", color: "#6b7280", marginBottom: 14 }}>
              {error}
            </div>
          )}

          {/* TOP PRICING CARDS */}
          {!loading && !error && (
            <div className="bb-pricing-row" aria-live="polite">
              {(plans ?? []).map((plan) => {
                const { value, suffix } = renderPricePieces(plan);
                const key = (plan.id || plan.name || "").toString().toLowerCase();

                const isFree = key.includes("free");
                const isPro =
                  key.includes("pro") || (plan.name || "").toString().toLowerCase() === "pro";
                const isFamily = key.includes("family");

                let displayValue = value;
                let displaySuffix = suffix;

                if (isFamily) {
                  const familyTotal = familyMembers * FAMILY_PER_MEMBER;
                  displayValue = familyTotal.toString();
                  displaySuffix = "/month";
                }

                if (isFree) {
                  displayValue = "Free";
                  displaySuffix = "";
                }

                let buttonLabel: string;
                if (isFree) buttonLabel = "Get Started";
                else if (plan.buttonText) buttonLabel = plan.buttonText;
                else if (isPro) buttonLabel = "Upgrade to Pro";
                else buttonLabel = `Choose ${plan.name}`;

                return (
                  <article
                    key={plan.id}
                    className={`bb-plan-card bb-card-hover bb-anim-fade-up ${
                      isPro ? "bb-plan-card-pro" : ""
                    } ${isFamily ? "bb-plan-card-family" : ""}`}
                  >
                    {isPro && (
                      <div className="bb-plan-star" aria-hidden="true">
                        ★
                      </div>
                    )}

                    <div className="bb-plan-inner">
                      {/* ✅ Same icon block for ALL plans (Free now matches exactly) */}
                      <div className="bb-plan-icon">{isFree ? "✓" : plan.icon ?? "⚡"}</div>

                      <h3 className="bb-plan-name">{plan.name}</h3>

                      {plan.tagline && <p className="bb-plan-tagline">{plan.tagline}</p>}

                      <div className="bb-plan-price">
                        {!isFree && displayValue !== "—" && (
                          <span className="bb-plan-price-currency">₹</span>
                        )}
                        <span className="bb-plan-price-value">{displayValue}</span>
                        {!isFree && displaySuffix && (
                          <span className="bb-plan-price-suffix">{displaySuffix}</span>
                        )}
                      </div>

                      {isFamily && (
                        <p className="bb-family-total-note">{featureLabel(familyMembers)}</p>
                      )}

                      <button className="bb-plan-button">{buttonLabel}</button>

                      {isFamily && (
                        <div className="bb-family-counter-card">
                          <div className="bb-family-counter-label">Number of Family Members</div>

                          <div className="bb-family-counter-controls">
                            <button
                              type="button"
                              onClick={handleFamilyMinus}
                              disabled={familyMembers <= FAMILY_MIN}
                              aria-label="Decrease family members"
                            >
                              -
                            </button>
                            <span className="bb-family-counter-value">{familyMembers}</span>
                            <button
                              type="button"
                              onClick={handleFamilyPlus}
                              disabled={familyMembers >= FAMILY_MAX}
                              aria-label="Increase family members"
                            >
                              +
                            </button>
                          </div>

                          <div className="bb-family-counter-note">
                            ₹{FAMILY_PER_MEMBER} per member/month
                          </div>
                        </div>
                      )}

                      <div className="bb-plan-divider" />

                      <div className="bb-plan-features">
                        <h4 className="bb-plan-features-title">Features</h4>
                        <ul className="bb-plan-features-list">
                          {(plan.features ?? []).map((feature, idx) => {
                            const isIncluded = feature.included === true;
                            return (
                              <li
                                key={idx}
                                style={{ display: "flex", gap: "6px", alignItems: "center" }}
                              >
                                <span
                                  style={{
                                    fontSize: "1rem",
                                    fontWeight: 700,
                                    color: isIncluded ? "#10B981" : "#EF4444",
                                  }}
                                >
                                  {isIncluded ? "✓" : "✕"}
                                </span>
                                <span style={{ color: "#374151" }}>{feature.name}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* STYLES */}
        <style>
          {`
            .bb-pricing-page { overflow-x: visible; }

            .bb-pricing-row {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 34px;
              align-items: stretch;
            }

            @media (max-width: 1100px) {
              .bb-pricing-row { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 26px; }
            }

            @media (max-width: 760px) {
              .bb-pricing-row { grid-template-columns: 1fr; gap: 18px; }
            }

            .bb-plan-card {
              position: relative;
              border-radius: 28px;
              background: linear-gradient(145deg, #faf5ff, #f4f4ff);
              padding: 28px 26px 24px;
              color: #111827;
              overflow: hidden;
              min-width: 0;
              box-shadow:
                0 24px 60px rgba(148,163,184,0.35),
                0 0 0 1px rgba(148,163,184,0.12);
              transition: transform 260ms ease, box-shadow 260ms ease, background 260ms ease;
              display: flex;
              flex-direction: column;
            }

            .bb-plan-card::before {
              content: "";
              position: absolute;
              inset: 0;
              border-radius: 28px;
              padding: 1px;
              background: linear-gradient(135deg, #a855f7, #8b5cf6, #ec4899);
              -webkit-mask:
                linear-gradient(#000 0 0) content-box,
                linear-gradient(#000 0 0);
              -webkit-mask-composite: xor;
              mask-composite: exclude;
              opacity: 0.55;
              pointer-events: none;
            }

            .bb-plan-card-pro {
              background: linear-gradient(145deg, #f5f3ff, #fef3ff);
              box-shadow:
                0 28px 80px rgba(129,140,248,0.55),
                0 0 0 1px rgba(129,140,248,0.35);
            }

            .bb-plan-card:hover {
              transform: translateY(-10px);
              box-shadow:
                0 30px 80px rgba(129,140,248,0.55),
                0 0 0 1px rgba(129,140,248,0.35);
              background: linear-gradient(145deg, #ede9fe, #fdf2ff);
            }

            .bb-plan-card-pro:hover {
              transform: translateY(-14px);
              background: linear-gradient(145deg, #e0e7ff, #fdf2ff);
            }

            .bb-plan-inner {
              position: relative;
              z-index: 1;
              display: flex;
              flex-direction: column;
              gap: 10px;
              height: 100%;
              min-width: 0;
            }

            .bb-plan-icon {
              width: 56px;
              height: 56px;
              border-radius: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.7rem;
              background: radial-gradient(circle at 0 0, #a855f7, #6366f1);
              color: white;
              margin-bottom: 12px;
              box-shadow: 0 10px 30px rgba(129,140,248,0.7);
            }

            .bb-plan-name {
              margin: 0;
              font-size: 1.4rem;
              font-weight: 700;
              color: #0f172a;
            }

            .bb-plan-tagline {
              margin: 0 0 4px;
              font-size: 0.92rem;
              color: #6b7280;
            }

            .bb-plan-price {
              display: flex;
              align-items: baseline;
              gap: 4px;
              margin-top: 8px;
              margin-bottom: 6px;
              flex-wrap: wrap;
            }

            .bb-plan-price-currency {
              font-size: 1.15rem;
              margin-right: 2px;
              color: #7c3aed;
            }

            .bb-plan-price-value {
              font-size: 2.4rem;
              font-weight: 800;
              color: #111827;
            }

            .bb-plan-price-suffix {
              font-size: 0.96rem;
              color: #6b7280;
              margin-left: 2px;
            }

            .bb-plan-button {
              margin-top: 4px;
              padding: 11px 16px;
              border-radius: 999px;
              border: none;
              outline: none;
              cursor: pointer;
              width: 100%;
              font-weight: 600;
              font-size: 0.97rem;
              color: #f9fafb;
              background: linear-gradient(135deg, #8b5cf6, #ec4899);
              box-shadow: 0 14px 32px rgba(236,72,153,0.55);
              transition: transform 200ms ease, box-shadow 200ms ease, filter 180ms ease;
            }

            .bb-plan-button:hover {
              transform: translateY(-1px);
              box-shadow: 0 18px 38px rgba(236,72,153,0.7);
              filter: brightness(1.05);
            }

            .bb-plan-divider {
              height: 1px;
              width: 100%;
              margin: 18px 0 8px;
              background: linear-gradient(to right, transparent, rgba(148,163,184,0.6), transparent);
            }

            .bb-plan-features {
              margin-top: 6px;
              padding-top: 4px;
              max-height: 0;
              opacity: 0;
              transform: translateY(10px);
              overflow: hidden;
              transition: max-height 340ms ease, opacity 260ms ease, transform 340ms ease;
            }

            .bb-plan-card:hover .bb-plan-features {
              max-height: 520px;
              opacity: 1;
              transform: translateY(0);
            }

            @media (max-width: 760px) {
              .bb-plan-features {
                max-height: 520px;
                opacity: 1;
                transform: none;
              }
            }

            .bb-plan-features-title {
              margin: 0 0 6px;
              font-size: 0.9rem;
              font-weight: 600;
              color: #4b5563;
            }

            .bb-plan-features-list {
              list-style: none;
              padding: 0;
              margin: 0;
              display: flex;
              flex-direction: column;
              gap: 4px;
              font-size: 0.87rem;
            }

            .bb-plan-star {
              position: absolute;
              top: 14px;
              right: 20px;
              font-size: 1.9rem;
              color: #facc15;
              text-shadow: 0 8px 20px rgba(250,204,21,0.7);
            }

            .bb-family-total-note {
              margin: 0 0 10px;
              font-size: 0.9rem;
              color: #6b7280;
            }

            .bb-plan-card-family .bb-family-counter-card {
              margin-top: 14px;
              padding: 16px 20px 14px;
              border-radius: 22px;
              background: linear-gradient(135deg, #f3e8ff, #e0f2fe);
              color: #111827;
              display: flex;
              flex-direction: column;
              gap: 10px;

              max-height: 0;
              opacity: 0;
              transform: translateY(8px);
              overflow: hidden;
              transition: max-height 260ms ease, opacity 200ms ease, transform 260ms ease;
            }

            .bb-plan-card-family:hover .bb-family-counter-card {
              max-height: 220px;
              opacity: 1;
              transform: translateY(0);
            }

            @media (max-width: 760px) {
              .bb-plan-card-family .bb-family-counter-card {
                max-height: 240px;
                opacity: 1;
                transform: none;
              }
            }

            .bb-family-counter-label { font-size: 0.95rem; font-weight: 600; }

            .bb-family-counter-controls {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 18px;
            }

            .bb-family-counter-controls button {
              width: 40px;
              height: 40px;
              border-radius: 999px;
              border: none;
              background: #8b5cf6;
              color: #f9fafb;
              font-size: 1.4rem;
              line-height: 1;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 10px 24px rgba(139,92,246,0.4);
              transition: background 160ms ease, transform 160ms ease, box-shadow 160ms ease;
            }

            .bb-family-counter-controls button:hover:not(:disabled) {
              background: #7c3aed;
              transform: translateY(-1px);
              box-shadow: 0 14px 30px rgba(124,58,237,0.45);
            }

            .bb-family-counter-controls button:disabled {
              opacity: 0.45;
              cursor: default;
              transform: none;
              box-shadow: none;
            }

            .bb-family-counter-value {
              min-width: 28px;
              text-align: center;
              font-size: 1.2rem;
              font-weight: 600;
              color: #111827;
            }

            .bb-family-counter-note { font-size: 0.9rem; color: #6b7280; }

            .bb-compare-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; border-radius: 16px; }
            .bb-compare-grid { min-width: 760px; }

            .bb-riskfree {
              max-width: 980px;
              margin: 0 auto;
              border-radius: 26px;
              padding: 18px 18px;
              background: linear-gradient(145deg, #faf5ff, #fdf2ff);
              box-shadow: 0 22px 55px rgba(148,163,184,0.22), 0 0 0 1px rgba(168,85,247,0.18);
              position: relative;
              overflow: hidden;
            }

            .bb-riskfree::before {
              content: "";
              position: absolute;
              inset: -2px;
              background: radial-gradient(circle at 15% 0%, rgba(168,85,247,0.26), transparent 52%),
                          radial-gradient(circle at 85% 100%, rgba(236,72,153,0.22), transparent 52%);
              pointer-events: none;
            }

            .bb-riskfree-inner {
              position: relative;
              z-index: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 12px;
              text-align: center;
              flex-wrap: wrap;
            }

            .bb-riskfree-badge { display: none; }

            .bb-riskfree-text {
              font-size: 1.02rem;
              color: #0f172a;
              font-weight: 600;
              line-height: 1.5;
              text-align: center;
            }

            .bb-riskfree-text span { font-weight: 800; }

            .bb-riskfree-lines { display: inline; }
            .bb-riskfree-line { display: inline; }

            @media (max-width: 760px) {
              .bb-riskfree { padding: 16px 14px; border-radius: 22px; }
              .bb-riskfree-text { font-size: 0.98rem; }

              .bb-riskfree-lines {
                display: flex;
                flex-direction: column;
                gap: 6px;
                align-items: center;
              }

              .bb-riskfree-line {
                display: block;
                width: 100%;
                text-align: center;
              }
            }

            .bb-help-card {
              max-width: 980px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 34px;
              padding: 38px 22px;
              text-align: center;
              box-shadow: 0 26px 70px rgba(15,23,42,0.12);
              border: 1px solid rgba(148,163,184,0.35);
            }

            .bb-help-title {
              margin: 0 0 10px;
              font-size: clamp(1.5rem, 4vw, 2.05rem);
              font-weight: 900;
              color: #0b1120;
              letter-spacing: -0.02em;
            }

            .bb-help-subtitle {
              max-width: 900px;
              margin: 0 auto 18px;
              color: #6b7280;
              line-height: 1.85;
              font-size: 1.02rem;
              text-align: center;
              text-wrap: balance;
            }

            .bb-help-actions {
              display: flex;
              justify-content: center;
              gap: 14px;
              flex-wrap: wrap;
              margin: 8px 0 10px;
            }

            .bb-help-btn-primary {
              border: none;
              cursor: pointer;
              border-radius: 999px;
              padding: 12px 26px;
              font-weight: 700;
              font-size: 0.98rem;
              color: #fff;
              background: #0b0b0f;
              box-shadow: 0 16px 40px rgba(2,6,23,0.25);
              transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
              min-width: 220px;
            }

            .bb-help-btn-primary:hover {
              transform: translateY(-1px);
              box-shadow: 0 18px 46px rgba(2,6,23,0.3);
              filter: brightness(1.05);
            }

            .bb-help-btn-ghost {
              border-radius: 999px;
              padding: 12px 26px;
              font-weight: 700;
              font-size: 0.98rem;
              color: #111827;
              background: #ffffff;
              border: 1px solid rgba(226,232,240,0.95);
              box-shadow: 0 14px 34px rgba(15,23,42,0.08);
              text-decoration: none;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              min-width: 140px;
              transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
            }

            .bb-help-btn-ghost:hover {
              transform: translateY(-1px);
              box-shadow: 0 16px 40px rgba(15,23,42,0.10);
              filter: brightness(1.02);
            }

            .bb-help-footnote {
              margin: 0;
              color: #9ca3af;
              font-size: 0.92rem;
            }

            @media (max-width: 760px) {
              .bb-help-card { border-radius: 26px; padding: 22px 14px; }
              .bb-help-actions > * { width: 100%; max-width: 420px; }
              .bb-help-btn-primary, .bb-help-btn-ghost { min-width: unset; }
              .bb-help-subtitle { font-size: 0.98rem; }
            }
          `}
        </style>
      </section>

      {/* DETAILED FEATURE COMPARISON */}
      {!loading && !error && (
        <section className="bb-section bb-section-alt">
          <div className="bb-section-shell">
            <h2 className="bb-section-title" style={{ textAlign: "left", marginBottom: "18px" }}>
              Detailed Plan Comparison
            </h2>

            <p
              className="bb-section-subtitle"
              style={{
                textAlign: "left",
                maxWidth: "720px",
                margin: "0 0 24px",
                fontSize: "0.98rem",
              }}
            >
              Compare features across plans and choose the level of support that matches your journey.
            </p>

            <div className="bb-compare-scroll">
              <div
                className="bb-compare-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: `minmax(200px, 1fr) repeat(${(plans ?? []).length}, minmax(180px, 1fr))`,
                  gap: 12,
                  alignItems: "start",
                }}
              >
                <div style={{ fontWeight: 700, padding: "14px 18px" }}>Feature</div>

                {(plans ?? []).map((p) => (
                  <div
                    key={`col-${p.id}`}
                    style={{ fontWeight: 700, padding: "14px 18px", textAlign: "center" }}
                  >
                    {p.name}
                  </div>
                ))}

                {featureNames.length === 0 ? (
                  <div style={{ gridColumn: `1 / -1`, padding: 8 }}>No detailed features available.</div>
                ) : (
                  featureNames.map((fname) => (
                    <React.Fragment key={fname}>
                      <div style={{ padding: "12px 18px", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                        <div style={{ fontWeight: 600 }}>{fname}</div>
                      </div>

                      {(plans ?? []).map((p) => {
                        const feat = (p.features ?? []).find(
                          (f) => (f.name || f.description) === fname
                        );
                        const included = feat?.included ?? false;

                        return (
                          <div
                            key={`${p.id}-${fname}`}
                            style={{
                              padding: "12px 18px",
                              borderTop: "1px solid rgba(0,0,0,0.04)",
                              textAlign: "center",
                            }}
                          >
                            {included ? (
                              <span style={{ display: "inline-block", fontSize: 18, color: "#10B981" }}>
                                ✓
                              </span>
                            ) : (
                              <span style={{ display: "inline-block", fontSize: 18, color: "#EF4444" }}>
                                ✕
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {!loading && !error && (
        <section className="bb-section">
          <div className="bb-section-shell">
            <div style={{ textAlign: "center", marginBottom: "18px" }}>
              <h2 className="bb-section-title" style={{ textAlign: "center", marginBottom: "10px" }}>
                Frequently Asked Questions
              </h2>
              <p
                className="bb-section-subtitle"
                style={{ textAlign: "center", margin: "0 auto", maxWidth: "720px" }}
              >
                Everything you need to know before choosing your plan.
              </p>
            </div>

            <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "14px" }}>
              {(faqs ?? []).map((faq, idx) => (
                <div
                  key={idx}
                  className="bb-card-hover"
                  style={{
                    background: "#fff",
                    borderRadius: 18,
                    padding: "16px 18px",
                    boxShadow: "0 10px 26px rgba(15,23,42,0.06), 0 0 0 1px rgba(226,232,240,0.9)",
                  }}
                >
                  <h4 style={{ margin: "0 0 6px", fontWeight: 800, color: "#0f172a" }}>{faq.question}</h4>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.6 }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RISK-FREE CTA */}
      <section className="bb-section">
        <div className="bb-section-shell">
          <div className="bb-riskfree bb-card-hover">
            <div className="bb-riskfree-inner">
              <div className="bb-riskfree-text">
                <span className="bb-riskfree-lines">
                  <span className="bb-riskfree-line">
                    Try <span>Back&Bone</span> risk-free
                  </span>
                  <span className="bb-riskfree-line"> · <span>30-day</span> money-back guarantee</span>
                  <span className="bb-riskfree-line"> · Cancel anytime, no setup fees.</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEED A HAND CTA */}
      <section className="bb-section bb-cta">
        <div className="bb-section-shell">
          <div className="bb-help-card bb-anim-fade-up">
            <h3 className="bb-help-title">Need a Hand?</h3>

            <p className="bb-help-subtitle">
              Stuck anywhere in the app? Reach out and we&apos;ll walk you through the right module
              or send a quick loom recording.
            </p>

            <div className="bb-help-actions">
              <button className="bb-help-btn-primary" onClick={() => navigate("/support")}>
                Visit Support Center
              </button>

              <a href="mailto:support@backnbone.com" className="bb-help-btn-ghost">
                Email Us
              </a>
            </div>

            <p className="bb-help-footnote">We typically respond within 24 hours.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
