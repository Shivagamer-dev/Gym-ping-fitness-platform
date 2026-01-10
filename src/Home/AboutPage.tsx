// src/Home/AboutPage.tsx
import { useEffect } from "react";
import { motion } from "framer-motion";
import communityImage from "../assets/images/bb-community-gesture.jpg";
import CTA from "../components/CTA";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 86; // navbar offset
    window.scrollTo({ top, behavior: "smooth" });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  return (
    <div
      className="min-h-screen text-slate-900"
      style={{
        background:
          "radial-gradient(1200px 380px at 20% -10%, rgba(99,102,241,0.16), transparent 60%)," +
          "radial-gradient(900px 320px at 85% 0%, rgba(34,211,238,0.12), transparent 55%)," +
          "linear-gradient(180deg, rgba(99,102,241,0.06), rgba(255,255,255,0) 32%)," +
          "#ffffff",
      }}
    >
      {/* HERO */}
      <header className="pt-14 pb-4 sm:pt-11 sm:pb-4">
        <div className="mx-auto max-w-[1120px] px-5">
          <div className="flex flex-col items-center gap-3">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-[920px] rounded-[26px] border border-slate-900/10 bg-white/90 px-6 py-7 text-center shadow-[0_26px_80px_rgba(2,6,23,0.10)]"
            >
              {/* Chips (kept empty like your code, but layout remains) */}
              <div className="mb-2 flex flex-wrap justify-center gap-2" />

              <h1 className="m-0 text-[2.55rem] sm:text-[3.35rem] font-[950] leading-[1.02] tracking-[-0.6px] sm:tracking-[-0.8px] text-slate-950 drop-shadow-[0_10px_36px_rgba(2,6,23,0.10)]">
                Our Story
              </h1>

              {/* Quick nav (kept optional like your code) */}
              <div
                className="mt-3 flex flex-wrap justify-center gap-2"
                role="navigation"
                aria-label="About sections"
              >
                {/* Example buttons (optional)
                <button
                  type="button"
                  onClick={() => scrollToId("bb-story")}
                  className="rounded-full border border-slate-900/10 bg-white/80 px-3 py-2 text-[0.95rem] font-extrabold text-slate-900 transition hover:-translate-y-0.5 hover:bg-indigo-500/10"
                >
                  Story
                </button>
                */}
              </div>

              <div className="mx-auto my-4 h-px w-full max-w-[820px] bg-slate-900/10" />

              {/* Pillars */}
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="mx-auto grid max-w-[860px] grid-cols-1 gap-3 text-left lg:grid-cols-3"
              >
                {[
                  { top: "Guidance", text: "Clear workouts, not confusing advice." },
                  { top: "Consistency", text: "Progress that’s sustainable and realistic." },
                  { top: "Support", text: "Tools and community that keep you going." },
                ].map((p) => (
                  <motion.div
                    key={p.top}
                    variants={fadeUp}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="rounded-2xl border border-slate-900/10 bg-slate-900/[0.03] p-4 transition hover:-translate-y-0.5 hover:bg-indigo-500/[0.06] hover:shadow-[0_14px_30px_rgba(2,6,23,0.08)]"
                  >
                    <div className="mb-1 font-[950] text-slate-900">{p.top}</div>
                    <div className="text-[0.98rem] leading-snug text-slate-600">{p.text}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Scroll hint */}
            <motion.button
              type="button"
              onClick={() => scrollToId("bb-story")}
              aria-label="Scroll to story section"
              title="Scroll"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.45, ease: "easeOut" }}
              className="flex items-center gap-2 rounded-full bg-transparent px-3 py-2 text-slate-500 transition hover:bg-slate-900/5"
            >
              <span className="relative h-4 w-2.5 rounded-full border-2 border-indigo-500/60">
                <span className="absolute left-1/2 top-1 h-1 w-1 -translate-x-1/2 rounded-full bg-indigo-500/80 motion-safe:animate-bounce" />
              </span>
              <span className="text-[0.95rem] font-extrabold">Scroll</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* STORY + IMAGE */}
      <section className="py-8" id="bb-story">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-4 px-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)] lg:gap-[18px]">
          {/* Copy card */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-2xl border border-slate-900/10 bg-white/95 p-6 shadow-[0_18px_54px_rgba(2,6,23,0.07)]"
          >
            <h2 className="mb-3 text-[2.05rem] font-black tracking-[-0.35px]">
              Why We Started Back&amp;Bone
            </h2>

            <p className="my-2 text-[1.05rem] leading-[1.78] text-slate-900">
              Back&amp;Bone began with a simple frustration: starting a fitness
              journey shouldn’t feel so hard.
            </p>

            <p className="my-2 text-[1.05rem] leading-[1.78] text-slate-900">
              When our founders stepped into fitness, they faced the same beginner
              problems most people face:
            </p>

            <ul className="my-3 list-disc pl-5 text-[1.03rem] leading-[1.75] text-slate-900">
              <li className="my-2">Which gym is right for me?</li>
              <li className="my-2">What workouts should I actually follow?</li>
              <li className="my-2">
                How do I get proper guidance without spending a fortune?
              </li>
            </ul>

            <p className="my-2 text-[1.05rem] leading-[1.78] text-slate-900">
              Motivation might be free, but the right support often isn’t. Personal
              trainers are expensive, advice is scattered, and staying consistent
              is tough.
            </p>

            <p className="my-2 text-[1.05rem] leading-[1.78] font-[645] text-slate-900">
              So we built something better- smart guidance that’s affordable,
              accessible, and designed for real life.
            </p>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
              {[
                { num: "1+", label: "Journey, many paths" },
                { num: "3", label: "Core pillars" },
                { num: "100%", label: "Beginner friendly" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-3"
                >
                  <div className="text-[1.5rem] font-black leading-none">{s.num}</div>
                  <div className="mt-2 text-[0.98rem] leading-snug text-slate-700">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual stack */}
          <div className="flex flex-col gap-3">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative h-[320px] overflow-hidden rounded-2xl border border-slate-900/10 bg-white/95 shadow-[0_18px_54px_rgba(2,6,23,0.07)] lg:h-[360px]"
            >
              <img
                src={communityImage}
                alt="Community fitness unity"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-14"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(99,102,241,0.20), transparent 60%)",
                }}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
              className="flex gap-3 rounded-2xl border border-slate-900/10 bg-slate-900/[0.02] p-4 shadow-[0_18px_54px_rgba(2,6,23,0.07)]"
            >
              <div className="mt-[-2px] text-[1.9rem] font-black leading-none text-indigo-500/95">
                “
              </div>
              <p className="m-0 text-[1.02rem] leading-relaxed text-slate-700">
                Fitness should feel doable. We’re here to make the next step clear.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section
        className="py-[34px]"
        id="bb-ecosystem"
        style={{
          background:
            "linear-gradient(180deg, rgba(99,102,241,0.06), rgba(255,255,255,0))",
        }}
      >
        <div className="mx-auto max-w-[1120px] px-5">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto mb-4 max-w-[860px] text-center"
          >
            <h2 className="m-0 text-[2.05rem] font-black tracking-[-0.35px]">
              More Than A Fitness App
            </h2>
            <p className="mx-auto mt-2 max-w-[70ch] text-[1.08rem] leading-relaxed text-slate-600">
              A complete fitness ecosystem, guiding you from where you are to where
              you want to be.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 gap-4 lg:grid-cols-3"
          >
            {[
              {
                h: "Personalized guidance",
                p: "Plans and direction that adapt to your goals and your schedule.",
              },
              {
                h: "Progress you can track",
                p: "Stay consistent with simple milestones and clear next actions.",
              },
              {
                h: "Support that stays",
                p: "Less noise, more clarity, and motivation that lasts.",
              },
            ].map((c) => (
              <motion.div
                key={c.h}
                variants={fadeUp}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="rounded-2xl border border-slate-900/10 bg-white/95 p-5 shadow-[0_18px_54px_rgba(2,6,23,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(2,6,23,0.10)]"
              >
                <h3 className="mb-2 text-[1.18rem] font-extrabold text-slate-900">
                  {c.h}
                </h3>
                <p className="m-0 text-[1.02rem] leading-relaxed text-slate-700">
                  {c.p}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-8" id="bb-mission">
        <div className="mx-auto max-w-[1120px] px-5">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto mb-4 max-w-[860px] text-center"
          >
            <h2 className="m-0 text-[2.05rem] font-black tracking-[-0.35px]">
              Our Mission
            </h2>
            <p className="mx-auto mt-2 max-w-[70ch] text-[1.08rem] leading-relaxed text-slate-600">
              To make fitness simple, affordable, and accessible to everyone.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 gap-4 lg:grid-cols-3"
          >
            {[
              { h: "Simple", p: "Clear steps, clean workouts, less confusion." },
              { h: "Affordable", p: "Real support without premium pressure." },
              { h: "Accessible", p: "Built for beginners and busy schedules." },
            ].map((c) => (
              <motion.div
                key={c.h}
                variants={fadeUp}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.06] p-5 shadow-[0_18px_54px_rgba(2,6,23,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(2,6,23,0.10)]"
              >
                <h3 className="mb-2 text-[1.18rem] font-extrabold text-slate-900">
                  {c.h}
                </h3>
                <p className="m-0 text-[1.02rem] leading-relaxed text-slate-700">
                  {c.p}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ✅ CTA (imported from components, removed the hardcoded CTA section) */}
      <CTA />
    </div>
  );
}
