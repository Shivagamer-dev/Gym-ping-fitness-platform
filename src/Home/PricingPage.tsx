// src/Home/PricingPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../App.css";
import NeedHand from "../components/NeedHand";

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

function clsx(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

export default function PricingPage(): JSX.Element {
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const [faqs, setFaqs] = useState<FAQ[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ page-enter animation (runs every time you come to /pricing)
  const location = useLocation();
  const [pageEnter, setPageEnter] = useState(false);
  useEffect(() => {
    setPageEnter(false);
    const t = window.setTimeout(() => setPageEnter(true), 20);
    return () => window.clearTimeout(t);
  }, [location.key]);

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
      if (key.includes("free")) icon = "✓";
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
    <>
      <Helmet>
        <title>Back&Bone Pricing - Choose Your Plan</title>
        <meta name="description" content="Choose the perfect Back&Bone fitness plan. Free tier available, Pro features for serious athletes, family plans for the whole household. Start your fitness journey today." />
        <meta name="keywords" content="fitness pricing, subscription plans, Back&Bone pro, family fitness plan, gym app pricing" />
        <link rel="canonical" href="https://backandbone.com/pricing" />
        <meta property="og:title" content="Back&Bone Pricing - Choose Your Plan" />
        <meta property="og:description" content="Choose the perfect Back&Bone fitness plan. Free tier available, Pro features for serious athletes, family plans for the whole household." />
        <meta property="og:image" content="https://backandbone.com/src/assets/images/CircLogo.png" />
        <meta property="og:url" content="https://backandbone.com/pricing" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Back&Bone Pricing - Choose Your Plan" />
        <meta name="twitter:description" content="Choose the perfect Back&Bone fitness plan. Free tier available, Pro features for serious athletes." />
        <meta name="twitter:image" content="https://backandbone.com/src/assets/images/CircLogo.png" />
      </Helmet>
      <div
        className={clsx(
          "bb-page bb-pricing-page overflow-x-hidden pt-5",
          // ✅ smooth enter
          "transition-all duration-700 ease-out",
          pageEnter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        )}
      >
      {/* HERO / INTRO */}
      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-5">
          <header className="text-center">
            <p className="text-xs font-extrabold tracking-[0.16em] text-slate-500">
              Choose a plan
            </p>

            <h1 className="mt-2 text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.05] text-slate-900">
              Find Your Perfect Fitness Plan
            </h1>

            <p className="mx-auto mt-3 max-w-[760px] text-[1.03rem] leading-7 text-slate-600">
              From personal plans to family memberships, choose the path that fits your goals and
              lifestyle.
            </p>
          </header>

          {loading && (
            <div className="py-9 text-center">
              <div className="animate-[bbFadeUp_520ms_ease-out_both] text-slate-600">
                Loading pricing…
              </div>
            </div>
          )}

          {error && <div className="mt-6 text-center text-sm text-slate-500">{error}</div>}

          {/* TOP PRICING CARDS */}
          {!loading && !error && (
            <div
              className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7 xl:grid-cols-3 xl:gap-9"
              aria-live="polite"
            >
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
                    className={clsx(
                      "bb-plan-card group relative overflow-hidden rounded-[28px] px-[26px] pb-6 pt-7 text-slate-900",
                      "shadow-[0_24px_60px_rgba(148,163,184,0.35),0_0_0_1px_rgba(148,163,184,0.12)]",
                      "transition-transform duration-300 ease-out hover:-translate-y-2",
                      isPro
                        ? "bg-[linear-gradient(145deg,#eef2ff,#f5f3ff)] hover:bg-[linear-gradient(145deg,#e0e7ff,#f3f4ff)] hover:shadow-[0_30px_80px_rgba(129,140,248,0.55),0_0_0_1px_rgba(129,140,248,0.35)]"
                        : "bg-[linear-gradient(145deg,#f8fbff,#f3f7ff)] hover:bg-[linear-gradient(145deg,#f3f7ff,#eef3ff)] hover:shadow-[0_30px_80px_rgba(129,140,248,0.55),0_0_0_1px_rgba(129,140,248,0.35)]"
                    )}
                  >
                    {/* gradient border (pure tailwind) */}
                    <div className="pointer-events-none absolute inset-0 rounded-[28px] p-[1px] opacity-55 [background:linear-gradient(135deg,#e6efff,#dfe9ff,#f1f5ff)] [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [mask-composite:exclude]" />

                    {isPro && (
                      <div
                        className="absolute right-5 top-3 text-[1.9rem] text-yellow-400 drop-shadow-[0_8px_20px_rgba(250,204,21,0.7)]"
                        aria-hidden="true"
                      >
                        ★
                      </div>
                    )}

                    <div className="relative z-10 flex h-full min-w-0 flex-col gap-2">
                      {/* icon (same block for ALL plans) */}
                      <div className="mb-2 flex">
                        <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[radial-gradient(circle_at_0_0,#5b8cff,#7aa2ff)] text-[1.7rem] text-white shadow-[0_10px_30px_rgba(129,140,248,0.7)]">
                          {isFree ? "✓" : plan.icon ?? "⚡"}
                        </div>
                      </div>

                      <h3 className="m-0 text-[1.4rem] font-bold text-slate-900">{plan.name}</h3>

                      {plan.tagline && (
                        <p className="m-0 text-[0.92rem] text-slate-500">{plan.tagline}</p>
                      )}

                      <div className="mt-2 flex flex-wrap items-baseline gap-1">
                        {!isFree && displayValue !== "—" && (
                          <span className="text-[1.15rem] text-violet-700">₹</span>
                        )}
                        <span className="text-[2.4rem] font-extrabold leading-none text-slate-900">
                          {displayValue}
                        </span>
                        {!isFree && displaySuffix && (
                          <span className="ml-1 text-[0.96rem] text-slate-500">{displaySuffix}</span>
                        )}
                      </div>

                      {isFamily && (
                        <p className="m-0 text-[0.9rem] text-slate-500">
                          {featureLabel(familyMembers)}
                        </p>
                      )}

                      <button
                        className={clsx(
                          "mt-1 w-full rounded-full px-4 py-[11px] text-[0.97rem] font-semibold text-white",
                          "bg-[linear-gradient(135deg,#4f7df3,#5b8cff)] shadow-[0_12px_28px_rgba(79,125,243,0.25)]",
                          "transition duration-200 hover:-translate-y-[1px] hover:shadow-[0_18px_38px_rgba(236,72,153,0.7)] hover:brightness-[1.05] active:translate-y-0"
                        )}
                        onClick={() => {
                          if (isFree) navigate("/signup");
                          else navigate("/app-download");
                        }}
                      >
                        {buttonLabel}
                      </button>

                      {/* Family counter (hover reveal on desktop, always visible on mobile) */}
                      {isFamily && (
                        <div
                          className={clsx(
                            "mt-3 overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,#f3e8ff,#e0f2fe)] p-4 text-slate-900",
                            "transition-all duration-300",
                            "max-h-0 opacity-0 translate-y-2 group-hover:max-h-[240px] group-hover:opacity-100 group-hover:translate-y-0",
                            "md:group-hover:max-h-[240px]",
                            "max-md:max-h-[240px] max-md:opacity-100 max-md:translate-y-0"
                          )}
                        >
                          <div className="text-[0.95rem] font-semibold">Number of Family Members</div>

                          <div className="mt-2 flex items-center justify-center gap-4">
                            <button
                              type="button"
                              onClick={handleFamilyMinus}
                              disabled={familyMembers <= FAMILY_MIN}
                              aria-label="Decrease family members"
                              className={clsx(
                                "flex h-10 w-10 items-center justify-center rounded-full text-[1.4rem] leading-none text-white",
                                "bg-violet-500 shadow-[0_10px_24px_rgba(139,92,246,0.4)] transition",
                                "hover:-translate-y-[1px] hover:bg-violet-600 hover:shadow-[0_14px_30px_rgba(124,58,237,0.45)]",
                                "disabled:cursor-default disabled:opacity-45 disabled:shadow-none disabled:hover:translate-y-0"
                              )}
                            >
                              -
                            </button>

                            <span className="min-w-7 text-center text-[1.2rem] font-semibold text-slate-900">
                              {familyMembers}
                            </span>

                            <button
                              type="button"
                              onClick={handleFamilyPlus}
                              disabled={familyMembers >= FAMILY_MAX}
                              aria-label="Increase family members"
                              className={clsx(
                                "flex h-10 w-10 items-center justify-center rounded-full text-[1.4rem] leading-none text-white",
                                "bg-violet-500 shadow-[0_10px_24px_rgba(139,92,246,0.4)] transition",
                                "hover:-translate-y-[1px] hover:bg-violet-600 hover:shadow-[0_14px_30px_rgba(124,58,237,0.45)]",
                                "disabled:cursor-default disabled:opacity-45 disabled:shadow-none disabled:hover:translate-y-0"
                              )}
                            >
                              +
                            </button>
                          </div>

                          <div className="mt-2 text-[0.9rem] text-slate-500">
                            ₹{FAMILY_PER_MEMBER} per member/month
                          </div>
                        </div>
                      )}

                      <div className="my-4 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(148,163,184,0.6),transparent)]" />

                      {/* Features (hover reveal on desktop, always visible on mobile) */}
                      <div
                        className={clsx(
                          "overflow-hidden pt-1 transition-all duration-300",
                          "max-h-0 opacity-0 translate-y-2 group-hover:max-h-[520px] group-hover:opacity-100 group-hover:translate-y-0",
                          "max-md:max-h-[520px] max-md:opacity-100 max-md:translate-y-0"
                        )}
                      >
                        <h4 className="m-0 mb-2 text-[0.9rem] font-semibold text-slate-600">
                          Features
                        </h4>

                        <ul className="m-0 flex list-none flex-col gap-1 p-0 text-[0.87rem]">
                          {(plan.features ?? []).map((feature, idx) => {
                            const isIncluded = feature.included === true;
                            return (
                              <li key={idx} className="flex items-center gap-2">
                                <span
                                  className={clsx(
                                    "text-[1rem] font-extrabold",
                                    isIncluded ? "text-emerald-500" : "text-red-500"
                                  )}
                                >
                                  {isIncluded ? "✓" : "✕"}
                                </span>
                                <span className="text-slate-700">{feature.name}</span>
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

        {/* tiny CSS only for a small fade-up (kept) */}
        <style>{`
          @keyframes bbFadeUp { from{opacity:0; transform:translateY(10px)} to{opacity:1; transform:translateY(0)} }
          @media (prefers-reduced-motion: reduce){
            *{ animation: none !important; transition: none !important; }
          }
        `}</style>
      </section>

      {/* DETAILED FEATURE COMPARISON */}
      {!loading && !error && (
        <section className="bg-[linear-gradient(180deg,rgba(99,102,241,0.06),rgba(255,255,255,0))] py-12 sm:py-14">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="text-left text-2xl font-extrabold tracking-tight text-slate-900">
              Detailed Plan Comparison
            </h2>

            <p className="mt-2 max-w-[720px] text-left text-[0.98rem] leading-7 text-slate-600">
              Compare features across plans and choose the level of support that matches your
              journey.
            </p>

            <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/70 shadow-[0_18px_55px_rgba(17,24,39,0.06)] backdrop-blur-sm">
              <div
                className="min-w-[760px]"
                style={{
                  display: "grid",
                  gridTemplateColumns: `minmax(200px, 1fr) repeat(${(plans ?? []).length}, minmax(180px, 1fr))`,
                  gap: 12,
                  alignItems: "start",
                }}
              >
                <div className="px-5 py-4 font-extrabold text-slate-900">Feature</div>

                {(plans ?? []).map((p) => (
                  <div
                    key={`col-${p.id}`}
                    className="px-5 py-4 text-center font-extrabold text-slate-900"
                  >
                    {p.name}
                  </div>
                ))}

                {featureNames.length === 0 ? (
                  <div className="col-span-full px-5 pb-5 text-sm text-slate-600">
                    No detailed features available.
                  </div>
                ) : (
                  featureNames.map((fname) => (
                    <React.Fragment key={fname}>
                      <div className="border-t border-slate-200/60 px-5 py-3">
                        <div className="font-semibold text-slate-800">{fname}</div>
                      </div>

                      {(plans ?? []).map((p) => {
                        const feat = (p.features ?? []).find(
                          (f) => (f.name || f.description) === fname
                        );
                        const included = feat?.included ?? false;

                        return (
                          <div
                            key={`${p.id}-${fname}`}
                            className="border-t border-slate-200/60 px-5 py-3 text-center"
                          >
                            {included ? (
                              <span className="inline-block text-[18px] font-extrabold text-emerald-500">
                                ✓
                              </span>
                            ) : (
                              <span className="inline-block text-[18px] font-extrabold text-red-500">
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
        <section className="py-12 sm:py-14">
          <div className="mx-auto max-w-6xl px-5">
            <div className="text-center">
              <h2 className="text-center text-2xl font-extrabold tracking-tight text-slate-900">
                Frequently Asked Questions
              </h2>
              <p className="mx-auto mt-2 max-w-[720px] text-center text-[1.02rem] leading-7 text-slate-600">
                Everything you need to know before choosing your plan.
              </p>
            </div>

            <div className="mx-auto mt-6 flex max-w-[900px] flex-col gap-4">
              {(faqs ?? []).map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white px-5 py-4 shadow-[0_10px_26px_rgba(15,23,42,0.06),0_0_0_1px_rgba(226,232,240,0.9)] transition-transform duration-200 hover:-translate-y-[2px]"
                >
                  <h4 className="m-0 mb-2 font-extrabold text-slate-900">{faq.question}</h4>
                  <p className="m-0 leading-7 text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RISK-FREE CTA */}
      <section className="pt-6 pb-6 sm:pt-8 sm:pb-8">
        <div className="mx-auto max-w-6xl px-5">
          <div className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(145deg,#faf5ff,#fdf2ff)] p-5 shadow-[0_22px_55px_rgba(148,163,184,0.22),0_0_0_1px_rgba(168,85,247,0.18)]">
            <div className="pointer-events-none absolute -inset-2 bg-[radial-gradient(circle_at_15%_0%,rgba(168,85,247,0.26),transparent_52%),radial-gradient(circle_at_85%_100%,rgba(236,72,153,0.22),transparent_52%)]" />
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 text-center">
              <p className="m-0 text-[1.02rem] font-semibold leading-7 text-slate-900">
                Try <span className="font-extrabold">Back&Bone</span> risk-free ·{" "}
                <span className="font-extrabold">30-day</span> money-back guarantee · Cancel
                anytime, no setup fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEED A HAND CTA (moved to component) */}
      <NeedHand />
    </div>
  </>
  );
}
