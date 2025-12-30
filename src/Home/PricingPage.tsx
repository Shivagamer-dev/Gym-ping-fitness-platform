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

        const res = await fetch(PRICING_JSON_RAW);
        if (!res.ok) throw new Error(`Failed to fetch pricing (${res.status})`);

        const data = await res.json();
        const rawPlans: Plan[] = Array.isArray(data) ? data : data.plans ?? [];
        const rawFaqs: FAQ[] = data.faqs ?? [];

        // Show Free, Pro, Family
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
        setError("Could not load pricing data. Showing default plans.");

        // Fallback plans (only used if GitHub JSON fails completely)
        const fallback: Plan[] = addDefaultIcons([
          {
            id: "free",
            name: "Free",
            tagline: "Essential features to get started",
            price: { monthly: 0 },
            features: [
              { name: "Exercise Library & Form Guide", included: true },
              { name: "Spotter, Locator & basic Dashboard", included: true },
              { name: "Basic Progress Tracking", included: true },
              { name: "Nutrition Tracking (limited)", included: true },
              { name: "Custom Workout Plans", included: false, description: "Available in Pro & Family" },
              { name: "Advanced AI Coaching", included: false, description: "Available in Pro & Family" },
            ],
          },
          {
            id: "pro",
            name: "Pro",
            tagline: "Most popular for serious fitness enthusiasts",
            price: { monthly: 165 },
            buttonText: "Upgrade to Pro",
            features: [
              { name: "Spotter, Locator, RepBot, Dashboard", included: true },
              { name: "Wearable Device Integration", included: true },
              { name: "Nutrition Tracking", included: true },
              { name: "Custom Workout Plans", included: true },
              { name: "Advanced AI Coaching", included: true },
              { name: "Priority Support", included: true },
              { name: "1-on-1 Coaching Sessions", included: false, description: "Included in Family" },
            ],
          },
          {
            id: "family",
            name: "Family",
            tagline: "Perfect for families (2–8 members)",
            price: { monthly: 400 },
            buttonText: "Go Family",
            features: [
              { name: "Spotter, Locator, RepBot, Dashboard", included: true },
              { name: "Wearable Device Integration", included: true },
              { name: "Nutrition Tracking", included: true },
              { name: "Custom Workout Plans", included: true },
              { name: "Advanced AI Coaching", included: true },
              { name: "Priority Support", included: true },
              { name: "1-on-1 Coaching Sessions", included: true },
              { name: "Family Member Support", included: true },
            ],
          },
        ]);

        setPlans(fallback);

        // Fallback FAQs
        const fallbackFaqs: FAQ[] = [
          {
            question: "Can I change my plan anytime?",
            answer: "Yes. You can upgrade or downgrade whenever you like. Changes take effect immediately.",
          },
          {
            question: "How does the Family Plan work?",
            answer: "Add up to 8 family members with separate profiles and shared progress. Pricing is shown on each plan card.",
          },
          {
            question: "What devices are supported?",
            answer: "Back&Bone works across iOS and Android, and integrates with many popular wearables.",
          },
        ];

        setFaqs(fallbackFaqs);
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
    <div className="bb-page bb-pricing-page" style={{ paddingTop: "104px" }}>
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
            <div style={{ textAlign: "center", color: "#b91c1c", marginBottom: 12 }}>
              {error}
            </div>
          )}

          {/* TOP PRICING CARDS */}
          <div className="bb-pricing-row" aria-live="polite">
            {(plans ?? []).map((plan) => {
              const { value, suffix } = renderPricePieces(plan);
              const key = (plan.id || plan.name || "").toString().toLowerCase();

              const isFree = key.includes("free");
              const isPro = key.includes("pro") || (plan.name || "").toString().toLowerCase() === "pro";
              const isFamily = key.includes("family");

              // PRICE DISPLAY LOGIC
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

              // Button text
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
                    <div className="bb-plan-icon">{plan.icon ?? "⚡"}</div>

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

                    {isFamily && <p className="bb-family-total-note">{featureLabel(familyMembers)}</p>}

                    <button className="bb-plan-button">{buttonLabel}</button>

                    {/* FAMILY COUNTER – visible only on hover (desktop). On mobile it stays visible. */}
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
                            –
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

                        <div className="bb-family-counter-note">₹{FAMILY_PER_MEMBER} per member/month</div>
                      </div>
                    )}

                    <div className="bb-plan-divider" />

                    {/* FEATURES WITH TICK / CROSS */}
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
                              {!isIncluded && feature.description && (
                                <span style={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                                  ({feature.description})
                                </span>
                              )}
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
        </div>

        {/* STYLES */}
        <style>
          {`
            /* IMPORTANT: remove the "only Free visible" issue by making pricing grid responsive
               and preventing overflow clipping */
            .bb-pricing-page {
              overflow-x: visible;
            }

            .bb-pricing-row {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 24px;
              align-items: stretch;
            }

            @media (max-width: 1100px) {
              .bb-pricing-row {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }
            }

            @media (max-width: 760px) {
              .bb-pricing-row {
                grid-template-columns: 1fr;
              }
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
              transition:
                transform 260ms ease,
                box-shadow 260ms ease,
                background 260ms ease;
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
              transition:
                transform 200ms ease,
                box-shadow 200ms ease,
                filter 180ms ease;
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
              background: linear-gradient(
                to right,
                transparent,
                rgba(148,163,184,0.6),
                transparent
              );
            }

            /* Features: show on hover for desktop; always show on mobile */
            .bb-plan-features {
              margin-top: 6px;
              padding-top: 4px;
              max-height: 0;
              opacity: 0;
              transform: translateY(10px);
              overflow: hidden;
              transition:
                max-height 340ms ease,
                opacity 260ms ease,
                transform 340ms ease;
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
              transition:
                max-height 260ms ease,
                opacity 200ms ease,
                transform 260ms ease;
            }

            .bb-plan-card-family:hover .bb-family-counter-card {
              max-height: 220px;
              opacity: 1;
              transform: translateY(0);
            }

            /* On mobile: keep the family counter visible (no hover) */
            @media (max-width: 760px) {
              .bb-plan-card-family .bb-family-counter-card {
                max-height: 240px;
                opacity: 1;
                transform: none;
              }
            }

            .bb-family-counter-label {
              font-size: 0.95rem;
              font-weight: 600;
            }

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

            .bb-family-counter-note {
              font-size: 0.9rem;
              color: #6b7280;
            }

            /* Comparison table scroll wrapper for mobile */
            .bb-compare-scroll {
              overflow-x: auto;
              -webkit-overflow-scrolling: touch;
              border-radius: 16px;
            }

            .bb-compare-grid {
              min-width: 760px; /* allows smooth horizontal scroll on mobile */
            }
          `}
        </style>
      </section>

      {/* DETAILED FEATURE COMPARISON */}
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
                    <div
                      style={{
                        padding: "12px 18px",
                        borderTop: "1px solid rgba(0,0,0,0.04)",
                      }}
                    >
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

      {/* FAQ */}
      <section className="bb-section">
        <div className="bb-section-shell">
          <h2 className="bb-section-title" style={{ textAlign: "left", marginBottom: "18px" }}>
            Frequently Asked Questions
          </h2>
          <p
            className="bb-section-subtitle"
            style={{ textAlign: "left", maxWidth: "720px", margin: "0 0 24px", fontSize: "0.98rem" }}
          >
            Everything you need to know before choosing your plan.
          </p>

          <div className="bb-faq-list">
            {(faqs ?? []).map((faq, idx) => (
              <div key={idx} className="bb-faq-item bb-card-hover">
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RISK-FREE CTA */}
      <section className="bb-section">
        <div className="bb-section-shell">
          <div className="bb-cta-panel bb-center-text bb-card-hover" style={{ fontSize: "1.02rem" }}>
            <p>Try Back&Bone risk-free · 30-day money-back guarantee · Cancel anytime, no setup fees.</p>
          </div>
        </div>
      </section>

      {/* NEED A HAND CTA */}
      <section className="bb-section bb-cta">
        <div className="bb-section-shell">
          <h3 className="bb-section-title" style={{ textAlign: "center", marginBottom: "10px" }}>
            Need a Hand?
          </h3>
          <p className="bb-section-subtitle" style={{ textAlign: "center", marginBottom: "18px" }}>
            We're here to help you every step of the way.
          </p>
          <div className="bb-cta-actions">
            <button className="bb-btn bb-btn-primary bb-btn-animated" onClick={() => navigate("/support")}>
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
        </div>
      </section>
    </div>
  );
}
