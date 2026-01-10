// src/Home/HomePage.tsx
import { useEffect, useRef, useState } from "react";
import "../App.css";

import heroImg from "../assets/images/hero.png";
import spotterImg from "../assets/images/spotter.png";
import locatorImg from "../assets/images/locator.png";
import repbotImg from "../assets/images/repbot.png";
import dashboardImg from "../assets/images/dashboard.png";

import amitFounderImg from "../assets/images/no_phtoto.jpg";
import omFounderImg from "../assets/images/om-founder.png";

import BetaSignupPopup from "./BetaSignupPopup";
import CTA from "../components/CTA";

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
    id: "om",
    name: "Om M. Dashasahastra",
    role: "Co-Founder, COO & CFO",
    bio: "Om drives the operational excellence and financial strategy of Back&Bone. His expertise in business management ensures smooth execution and sustainable growth, bringing the vision to life.",
    tags: ["Operations", "Finance", "Strategic Planning"],
    photo: omFounderImg,
    accent: "#ec4899",
  },
  {
    id: "-- --",
    name: "-- --",
    role: "Co-Founder, CEO & CTO",
    bio: "He is the visionary behind Back&Bone's technological innovations and strategic direction. With a strong background in AI and software development, he leads the team in creating cutting-edge fitness solutions.",
    tags: ["AI & ML", "Software Architecture", "Product Strategy"],
    photo: amitFounderImg,
    accent: "#4f46e5",
  },
];

/**
 * ✅ ensures reveal animation runs EVERY time you land on Home page
 */
function useRevealOnScroll(deps: any[] = []) {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-bb-reveal]")
    );

    // Reset to hidden
    for (const el of els) {
      el.classList.add("opacity-0", "translate-y-3");
      el.classList.remove("opacity-100", "translate-y-0");
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.remove("opacity-0", "translate-y-3");
          el.classList.add("opacity-100", "translate-y-0");
          io.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default function HomePage() {
  const featureIntroRef = useRef<HTMLDivElement | null>(null);
  const [isBetaOpen, setIsBetaOpen] = useState(false);

  // page mount fade-in
  const [pageReady, setPageReady] = useState(false);
  useEffect(() => {
    setPageReady(false);
    const t = requestAnimationFrame(() => setPageReady(true));
    return () => cancelAnimationFrame(t);
  }, []);
  useRevealOnScroll([pageReady]);

  const scrollToFeatures = () => {
    featureIntroRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div
      className={[
        "bb-page bb-home overflow-x-hidden",
        pageReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        "transition-all duration-500",
      ].join(" ")}
    >
      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full overflow-visible bg-[radial-gradient(circle_at_0%_0%,#8b5cf6_0,#4c1d95_40%,#2e1065_100%)]">
        {/* ambient blobs */}
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <span className="absolute -left-44 -top-56 h-[520px] w-[520px] rounded-full blur-[28px] bg-[radial-gradient(circle_at_30%_30%,rgba(236,72,153,0.35),transparent_60%)] animate-[bbBlobA_12s_ease-in-out_infinite]" />
          <span className="absolute -right-60 -top-40 h-[520px] w-[520px] rounded-full blur-[28px] bg-[radial-gradient(circle_at_35%_35%,rgba(34,211,238,0.22),transparent_62%)] animate-[bbBlobB_14s_ease-in-out_infinite]" />
          <span className="absolute left-[35%] -bottom-80 h-[520px] w-[520px] rounded-full blur-[28px] bg-[radial-gradient(circle_at_40%_40%,rgba(255,255,255,0.10),transparent_65%)] animate-[bbBlobC_16s_ease-in-out_infinite]" />
        </div>

        {/* ✅ reduced top padding on mobile only */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 pb-8 pt-14 sm:pt-16 sm:pb-10 md:grid-cols-2 md:gap-12 md:pb-14 md:pt-24">
          {/* left */}
          <div
            data-bb-reveal
            className="opacity-0 translate-y-3 transition-all duration-700 text-center md:text-left"
          >
            <p className="mb-3 text-xs font-extrabold tracking-[0.16em] text-white/80">
              YOUR AI FITNESS PARTNER,
            </p>

            <h1 className="text-4xl sm:text-5xl font-black leading-[1.12] pb-1 overflow-visible text-white">
              Every Step of the{" "}
              <span className="inline-block overflow-visible leading-[1.12] bg-gradient-to-r from-white via-cyan-200 to-pink-200 bg-clip-text text-transparent animate-[bbTextShine_3.8s_ease-in-out_infinite]">
                Way.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-white/80 md:mx-0">
              Back&amp;Bone helps you stay consistent, track progress, and
              overcome every hurdle on your way to achieving your dream fitness
              goals.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row md:justify-start">
              <button
                className="rounded-full bg-gradient-to-r from-pink-500 via-orange-500 to-orange-500 px-9 py-3.5 text-base font-bold text-white shadow-[0_18px_40px_rgba(248,113,113,0.45)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                onClick={() => setIsBetaOpen(true)}
              >
                Signup for Beta
              </button>

              <button
                className="rounded-full border border-white/25 bg-white/10 px-9 py-3.5 text-base font-bold text-white/90 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-md transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/15 active:translate-y-0"
                onClick={scrollToFeatures}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* right */}
          <div
            data-bb-reveal
            style={{ transitionDelay: "120ms" }}
            className="opacity-0 translate-y-3 transition-all duration-700 flex justify-center md:justify-end"
          >
            <div className="relative w-full max-w-md rounded-2xl bg-white/10 p-2 shadow-[0_22px_60px_rgba(0,0,0,0.18)] backdrop-blur-md animate-[bbFloat_6.5s_ease-in-out_infinite]">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={heroImg}
                  alt="Athlete training"
                  className="h-auto w-full object-cover"
                />
                <span className="pointer-events-none absolute -inset-1 rounded-xl bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.12)_35%,transparent_70%)] translate-x-[-60%] animate-[bbShimmer_3.6s_ease-in-out_infinite] mix-blend-screen" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURE INTRO ===== */}
      <section id="features" className="py-10 sm:py-12" ref={featureIntroRef}>
        <div className="mx-auto max-w-6xl px-5">
          <h2
            data-bb-reveal
            className="opacity-0 translate-y-3 text-center text-3xl font-extrabold tracking-tight text-slate-900 transition-all duration-700"
          >
            Designed to Help You Grow Stronger
          </h2>

          <p
            data-bb-reveal
            style={{ transitionDelay: "110ms" }}
            className="opacity-0 translate-y-3 mx-auto mt-4 max-w-[720px] text-center text-[1.02rem] leading-7 text-slate-600 transition-all duration-700"
          >
            Every Back&amp;Bone module focuses on a different part of your
            journey – learning exercises, finding gyms, getting coaching, and
            tracking data.
          </p>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-6xl space-y-6 px-5">
          <FeatureRow
            title="Spotter"
            subtitle="Master Every Move"
            description="Learn and perform exercises with confidence. Access thousands of guided workout videos with step-by-step instructions and proper form demonstrations."
            img={spotterImg}
            imgAlt="Spotter feature"
          />

          <FeatureRow
            title="Locator"
            subtitle="Find Your Fitness Hub"
            description="Never miss a workout. Discover nearby gyms and fitness centers with real-time ratings, amenities, and directions so you can train wherever you are."
            img={locatorImg}
            imgAlt="Locator feature"
            reversed
          />

          <FeatureRow
            title="RepBot"
            subtitle="Your AI Fitness Partner"
            description="Get personalized plans and advice tailored to your goals, pace, and lifestyle, making fitness simple and effective – without overthinking your routine."
            img={repbotImg}
            imgAlt="RepBot feature"
          />

          <FeatureRow
            title="Dashboard"
            subtitle="Complete Health Overview"
            description="See your progress at a glance. Track key metrics, monitor improvements, and integrate data from your favorite wearables in one unified dashboard."
            img={dashboardImg}
            imgAlt="Dashboard feature"
            reversed
          />
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-[linear-gradient(180deg,rgba(99,102,241,0.06),rgba(255,255,255,0))] py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-5">
          <h2
            data-bb-reveal
            className="opacity-0 translate-y-3 text-center text-3xl font-extrabold tracking-tight text-slate-900 transition-all duration-700"
          >
            How it Works
          </h2>

          <p
            data-bb-reveal
            style={{ transitionDelay: "110ms" }}
            className="opacity-0 translate-y-3 mx-auto mt-3 max-w-[760px] text-center text-[1.02rem] leading-7 text-slate-600 transition-all duration-700"
          >
            Back&amp;Bone keeps things simple: a clear journey from sign-up to
            long-term progress — with your data always under your control.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
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
              <article
                key={i}
                data-bb-reveal
                style={{ transitionDelay: `${i * 70}ms` }}
                className="opacity-0 translate-y-3 rounded-2xl bg-white p-5 shadow-[0_8px_22px_rgba(16,24,40,0.06)] ring-1 ring-slate-200/60 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(16,24,40,0.10)]"
              >
                <h4 className="text-[1.02rem] font-extrabold leading-6 text-slate-900">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DATA / PRIVACY ===== */}
      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-5">
          <h2
            data-bb-reveal
            className="opacity-0 translate-y-3 text-center text-3xl font-extrabold tracking-tight text-slate-900 transition-all duration-700"
          >
            Your Data, Your Control
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "Private by Design",
                b: "Everything is built with your privacy in mind, from day one.",
              },
              {
                t: "Fully Encrypted",
                b: "Your health data is locked and protected with end-to-end encryption.",
              },
              {
                t: "Decentralized and Secure",
                b: "No single point of risk – your information stays safely yours.",
              },
              { t: "You're in Charge", b: "Decide what to share, when, and with whom. Total control." },
            ].map((x, i) => (
              <div
                key={x.t}
                data-bb-reveal
                style={{ transitionDelay: `${i * 70}ms` }}
                className="opacity-0 translate-y-3 rounded-2xl bg-white p-5 shadow-[0_10px_26px_rgba(148,163,184,0.28)] ring-1 ring-slate-200/60 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(148,163,184,0.35)]"
              >
                <h4 className="text-base font-extrabold text-slate-900">{x.t}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">{x.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOUNDERS ===== */}
      <section className="bg-[linear-gradient(180deg,rgba(99,102,241,0.06),rgba(255,255,255,0))] py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2
            data-bb-reveal
            className="opacity-0 translate-y-3 text-center text-3xl font-extrabold tracking-tight text-slate-900 transition-all duration-700"
          >
            Meet The Innovators
          </h2>

          <p
            data-bb-reveal
            style={{ transitionDelay: "110ms" }}
            className="opacity-0 translate-y-3 mx-auto mt-2 max-w-[720px] text-center text-[1.02rem] leading-7 text-slate-600 transition-all duration-700"
          >
            The passionate minds revolutionizing fitness technology.
          </p>

          <div className="mt-20 grid grid-cols-1 place-items-center gap-x-8 gap-y-16 md:grid-cols-2">
            {FOUNDERS.map((founder, i) => (
              <article
                key={founder.id}
                data-bb-reveal
                style={{
                  transitionDelay: `${i * 80}ms`,
                  ["--accent" as any]: founder.accent,
                }}
                className={[
                  "opacity-0 translate-y-3 group relative",
                  "max-w-[520px] w-full",
                  "rounded-[28px] bg-white px-7 pb-7",
                  "pt-10 md:pt-[132px]",
                  "shadow-[0_26px_60px_rgba(148,163,184,0.35)]",
                  "ring-1 ring-slate-200/60",
                  "transition-all duration-700",
                  "hover:-translate-y-2 hover:shadow-[0_32px_80px_rgba(148,163,184,0.55)]",
                  "outline-none",
                ].join(" ")}
                tabIndex={0}
              >
                <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[36px] bg-[radial-gradient(circle_at_0_0,color-mix(in_srgb,var(--accent)_12%,transparent)_0,transparent_55%),radial-gradient(circle_at_100%_100%,color-mix(in_srgb,var(--accent)_10%,transparent)_0,transparent_55%)]" />

                <span className="pointer-events-none absolute right-6 top-6 h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_16px_var(--accent)] opacity-90" />
                <span className="pointer-events-none absolute bottom-6 left-6 h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_16px_var(--accent)] opacity-90" />

                <div className="absolute inset-x-0 -top-10 hidden md:flex justify-center">
                  <div className="h-[156px] w-[156px] rounded-full bg-[linear-gradient(135deg,var(--accent),#a855f7)] p-[5px] shadow-[0_20px_55px_rgba(0,0,0,0.22)] animate-[bbFloat_6.5s_ease-in-out_infinite]">
                    <div className="h-full w-full overflow-hidden rounded-full border-4 border-slate-50 bg-slate-50">
                      <img
                        src={founder.photo}
                        alt={founder.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="mx-auto mb-4 flex h-[128px] w-[128px] items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent),#a855f7)] p-[5px] shadow-[0_20px_55px_rgba(0,0,0,0.18)] md:hidden">
                  <div className="h-full w-full overflow-hidden rounded-full border-4 border-slate-50 bg-slate-50">
                    <img
                      src={founder.photo}
                      alt={founder.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-center text-2xl font-extrabold text-slate-900">
                  {founder.name}
                </h3>

                <p className="mt-1 text-center text-sm text-slate-500">
                  {founder.role}
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  {founder.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-violet-300/40 bg-violet-500/5 px-4 py-2 text-sm font-medium text-violet-900 shadow-[0_8px_20px_rgba(148,163,184,0.20)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-4 max-h-64 overflow-hidden text-sm leading-7 text-slate-600 opacity-100 transition-all duration-300 md:mt-0 md:max-h-0 md:opacity-0 md:group-hover:mt-4 md:group-hover:max-h-64 md:group-hover:opacity-100 md:group-focus-within:mt-4 md:group-focus-within:max-h-64 md:group-focus-within:opacity-100">
                  {founder.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />

      {isBetaOpen && <BetaSignupPopup onClose={() => setIsBetaOpen(false)} />}

      <style>{`
        @keyframes bbBlobA { 0%{transform:translate(0,0) scale(1)} 50%{transform:translate(50px,30px) scale(1.05)} 100%{transform:translate(0,0) scale(1)} }
        @keyframes bbBlobB { 0%{transform:translate(0,0) scale(1)} 50%{transform:translate(-40px,40px) scale(1.06)} 100%{transform:translate(0,0) scale(1)} }
        @keyframes bbBlobC { 0%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-30px) scale(1.06)} 100%{transform:translate(0,0) scale(1)} }
        @keyframes bbFloat { 0%{transform:translate3d(0,0,0)} 50%{transform:translate3d(0,-10px,0)} 100%{transform:translate3d(0,0,0)} }
        @keyframes bbShimmer { 0%{transform:translateX(-60%); opacity:.35} 50%{transform:translateX(60%); opacity:.55} 100%{transform:translateX(60%); opacity:0} }
        @keyframes bbTextShine { 0%{filter:drop-shadow(0 0 0 rgba(34,211,238,0))} 50%{filter:drop-shadow(0 10px 22px rgba(34,211,238,0.22))} 100%{filter:drop-shadow(0 0 0 rgba(34,211,238,0))} }

        @media (prefers-reduced-motion: reduce){
          *{ animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}

/* === FeatureRow === */
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
      data-bb-reveal
      className={[
        "opacity-0 translate-y-3 rounded-3xl border border-slate-200/60 bg-white/90 shadow-[0_18px_54px_rgba(2,6,23,0.07)]",
        "p-6 sm:p-7 md:p-8 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(2,6,23,0.10)]",
        "flex flex-col gap-6 md:items-center md:gap-10",
        reversed ? "md:flex-row-reverse" : "md:flex-row",
      ].join(" ")}
    >
      <div className="w-full md:w-[52%]">
        <h3 className="text-2xl font-extrabold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm font-semibold text-violet-700">{subtitle}</p>
        <p className="mt-3 text-[0.98rem] leading-7 text-slate-600">
          {description}
        </p>
      </div>

      <div className="w-full md:w-[48%]">
        <div className="overflow-hidden rounded-2xl bg-slate-100 shadow-[0_16px_44px_rgba(2,6,23,0.10)]">
          <img
            src={img}
            alt={imgAlt}
            className="h-auto w-full object-cover transition-transform duration-300 md:hover:scale-[1.02]"
          />
        </div>
      </div>
    </div>
  );
}
