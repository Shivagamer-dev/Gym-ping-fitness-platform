// src/Home/TutorialPage.tsx
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import TutorialModal from "../components/TutorialModal";
import NeedHand from "../components/NeedHand";

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

function clsx(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-bb-reveal]")
    );

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
  }, []);
}

export default function TutorialPage(): JSX.Element {
  const [tutorials, setTutorials] = useState<Tutorial[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  useRevealOnScroll();

  // detect mobile (keeps your original behavior)
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

  // kept (even if not used elsewhere, safe + matches your original code intent)
  const shellMax = useMemo(() => (isMobile ? 980 : 1180), [isMobile]);

  return (
    <>
      <Helmet>
        <title>Back&Bone Tutorials - Master Every Feature</title>
        <meta name="description" content="Learn how to use Back&Bone with our comprehensive tutorials. Master Spotter, Locator, RepBot, and Dashboard features for the ultimate fitness experience." />
        <meta name="keywords" content="Back&Bone tutorials, fitness app guide, workout tutorials, fitness features, app walkthrough" />
        <link rel="canonical" href="https://backandbone.com/tutorial" />
        <meta property="og:title" content="Back&Bone Tutorials - Master Every Feature" />
        <meta property="og:description" content="Learn how to use Back&Bone with our comprehensive tutorials. Master all features for the ultimate fitness experience." />
        <meta property="og:image" content="https://backandbone.com/src/assets/images/CircLogo.png" />
        <meta property="og:url" content="https://backandbone.com/tutorial" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Back&Bone Tutorials - Master Every Feature" />
        <meta name="twitter:description" content="Learn how to use Back&Bone with our comprehensive tutorials. Master all features for the ultimate fitness experience." />
        <meta name="twitter:image" content="https://backandbone.com/src/assets/images/CircLogo.png" />
      </Helmet>
      <div
        className={clsx(
          "bb-page min-h-screen w-full overflow-x-hidden bg-white",
          isMobile ? "pt-[110px]" : "pt-[110px]"
        )}
        style={{ maxWidth: "100%" }}
      >
      {/* HERO / INTRO (no big purple card, clean like you wanted) */}
      <section className="py-4 sm:py-6">
        <div className="mx-auto px-5" style={{ maxWidth: shellMax }}>
          <div className="text-center">
            <h1
              data-bb-reveal
              className={clsx(
                "opacity-0 translate-y-3 transition-all duration-500",
                "text-[clamp(2rem,6vw,2.6rem)] font-black leading-[1.08] text-slate-950"
              )}
            >
              Back&Bone Tutorials
            </h1>

            <p
              data-bb-reveal
              style={{ transitionDelay: "100ms" }}
              className={clsx(
                "opacity-0 translate-y-3 transition-all duration-500",
                "mx-auto mt-3 max-w-[760px] text-[clamp(0.98rem,2.6vw,1.02rem)] leading-7 text-slate-600"
              )}
            >
              Each module unlocks a different part of your fitness routine. Use these tutorials as
              a quick guide while you explore the app.
            </p>

            {/* subtle animated underline */}
            <div
              data-bb-reveal
              style={{ transitionDelay: "170ms" }}
              className="opacity-0 translate-y-3 mx-auto mt-5 h-[3px] w-[120px] rounded-full bg-[linear-gradient(90deg,rgba(79,70,229,0.0),rgba(79,70,229,0.55),rgba(236,72,153,0.55),rgba(79,70,229,0.0))] animate-[bbShimmerLine_2.6s_ease-in-out_infinite] transition-all duration-500"
            />
          </div>
        </div>
      </section>

      {/* Modules section (your component, no button) */}
      <div
        data-bb-reveal
        className="opacity-0 translate-y-3 transition-all duration-500"
        style={{ transitionDelay: "160ms" }}
      >
        <TutorialModal
          tutorials={tutorials}
          loading={loading}
          error={error}
          isMobile={isMobile}
        />
      </div>

      {/* 3-STEP ONBOARDING */}
      <section className="py-6 sm:py-10">
        <div className="mx-auto max-w-[1050px] px-5 text-center">
          <h2
            data-bb-reveal
            className="opacity-0 translate-y-3 text-[clamp(1.35rem,4vw,1.8rem)] font-extrabold tracking-tight text-slate-900 transition-all duration-500"
          >
            Start in 3 Simple Steps
          </h2>

          <p
            data-bb-reveal
            style={{ transitionDelay: "100ms" }}
            className={clsx(
              "opacity-0 translate-y-3 transition-all duration-500",
              "mx-auto mt-2 max-w-[640px] leading-7 text-slate-600",
              isMobile ? "px-2" : ""
            )}
          >
            New to Back&Bone? Follow these basics to get set up before you dive into each
            feature tutorial.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            ].map((step, i) => (
              <div
                key={step.num}
                data-bb-reveal
                style={{ transitionDelay: `${i * 90}ms` }}
                className={clsx(
                  "opacity-0 translate-y-3 transition-all duration-500",
                  "group relative overflow-hidden rounded-3xl bg-white/95",
                  "p-5 sm:p-6",
                  "shadow-[0_18px_40px_rgba(15,23,42,0.10),0_0_0_1px_rgba(226,232,240,0.9)]",
                  "hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(15,23,42,0.14)]"
                )}
              >
                {/* animated soft corner glow */}
                <div className="pointer-events-none absolute -inset-10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.22),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.16),transparent_55%)]" />

                <div className="relative flex flex-col items-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#8b5cf6,#4c1d95)] text-[18px] font-extrabold text-white shadow-[0_12px_24px_rgba(79,70,229,0.45)] transition-transform duration-300 group-hover:scale-[1.05] animate-[bbPop_900ms_ease-out_both]">
                    {step.num}
                  </div>

                  <h3 className="text-[1.05rem] font-extrabold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-2 max-w-[360px] leading-7 text-slate-600">
                    {step.body}
                  </p>
                </div>

                {/* tiny floating dots */}
                <span className="pointer-events-none absolute right-5 top-5 h-2 w-2 rounded-full bg-violet-400/60 shadow-[0_0_18px_rgba(139,92,246,0.45)] animate-[bbDot_6s_ease-in-out_infinite]" />
                <span className="pointer-events-none absolute bottom-5 left-6 h-2 w-2 rounded-full bg-fuchsia-400/50 shadow-[0_0_18px_rgba(236,72,153,0.38)] animate-[bbDot_7.5s_ease-in-out_infinite]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ NEED A HAND (imported component) */}
      <NeedHand />

      {/* Animations only (safe + doesn’t affect layout) */}
      <style>{`
        @keyframes bbPop { 0%{opacity:0; transform:translateY(10px) scale(.96)} 100%{opacity:1; transform:translateY(0) scale(1)} }
        @keyframes bbShimmerLine { 0%{filter:blur(0px); opacity:.55} 50%{filter:blur(.2px); opacity:1} 100%{filter:blur(0px); opacity:.55} }
        @keyframes bbDot { 0%{transform:translate(0,0); opacity:.6} 50%{transform:translate(8px,6px); opacity:.9} 100%{transform:translate(0,0); opacity:.6} }

        @media (prefers-reduced-motion: reduce){
          *{ animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  </>
  );
}
