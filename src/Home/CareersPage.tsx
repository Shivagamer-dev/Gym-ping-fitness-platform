// src/Home/CareersPage.tsx
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import ApplyPopup from "../components/ApplyPopup";

/* ---------- Types ---------- */
type Job = {
  title: string;
  role?: string;
  description?: string;
  type?: string;
  location?: string;
  exReq?: string[];
};

const RAW_JSON_URL =
  "https://raw.githubusercontent.com/BUTDRILL1/backnbone-data/main/careers.json";

export default function CareersPage(): JSX.Element {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedJob, setSelectedJob] =
    useState<{ title: string; role?: string } | null>(null);

  /* ---------- Fetch careers.json ---------- */
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetch(RAW_JSON_URL)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to fetch careers.json (${res.status})`);
        const data = await res.json();
        if (!mounted) return;

        const maybeJobs: Job[] = Array.isArray(data)
          ? data
          : (data.openings as Job[]) ?? (data.jobs as Job[]) ?? [];

        setJobs(maybeJobs || []);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error("Error fetching careers.json", err);
        setError("Could not load job listings right now. Please check back in a bit.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  /* ---------- Popup handlers ---------- */
  const openPopup = (title: string, role?: string) => {
    setSelectedJob({ title, role });
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedJob(null);
  };

  /* ---------- Motion variants (simple but premium) ---------- */
  const easeOut = [0.16, 1, 0.3, 1] as const;

  const pageIn = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.45, ease: easeOut },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  const floaty = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const bgStyle = useMemo(
    () => ({
      background:
        "radial-gradient(circle at 0% 0%, #ede9fe 0, #fdf4ff 40%, #f5f3ff 100%)",
    }),
    []
  );

  return (
    <motion.div
      className="bb-page bb-careers-page min-h-screen pt-[90px] sm:pt-[64px]"
      style={bgStyle}
      initial="hidden"
      animate="show"
      variants={pageIn}
    >
      <Helmet>
        <title>Careers · Back&Bone</title>
      </Helmet>

      {/* Popup form */}
      <ApplyPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        jobTitle={selectedJob?.title}
        jobRole={selectedJob?.role}
      />

      <main className="pb-20 pt-12 text-slate-900" role="main">
        {/* ================= HERO ================= */}
        <section className="px-4 pb-10">
          <div className="mx-auto max-w-[1080px]">
            <motion.div
              variants={floaty}
              className="relative rounded-[32px] bg-white px-6 py-10 shadow-[0_32px_90px_rgba(148,163,184,0.45),0_0_0_1px_rgba(179,144,255,0.35)] sm:px-10 sm:py-10"
            >
              {/* Soft glow backdrop (keeps UI same, adds depth) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-10 -z-10 rounded-[48px] opacity-90"
                style={{
                  background:
                    "radial-gradient(circle at 0 0, rgba(139, 92, 246, 0.22), transparent 55%)," +
                    "radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.18), transparent 55%)",
                }}
              />

              {/* Floating sparkles (very subtle) */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute right-8 top-8 hidden h-32 w-32 rounded-full blur-2xl md:block"
                style={{ background: "rgba(139,92,246,0.18)" }}
                animate={{ y: [0, -10, 0], opacity: [0.55, 0.75, 0.55] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-10 left-10 hidden h-28 w-28 rounded-full blur-2xl md:block"
                style={{ background: "rgba(236,72,153,0.16)" }}
                animate={{ y: [0, 12, 0], opacity: [0.5, 0.72, 0.5] }}
                transition={{ duration: 6.1, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.header
                variants={stagger}
                initial="hidden"
                animate="show"
                className="text-center"
              >
                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.45, ease: easeOut }}
                  className="mb-2 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-violet-600"
                >
                  Careers at Back&Bone
                </motion.p>

                <motion.h1
                  variants={fadeUp}
                  transition={{ duration: 0.55, ease: easeOut }}
                  className="mb-3 text-[2.1rem] font-extrabold leading-tight text-zinc-900 md:text-[2.6rem]"
                >
                  Shape the Future of Fitness
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.55, ease: easeOut, delay: 0.05 }}
                  className="mx-auto mb-6 max-w-[760px] text-[1.02rem] leading-relaxed text-slate-600"
                >
                  Join a team that's building the next generation of AI-powered
                  fitness experiences. With people at the center and privacy by
                  design, Back&Bone is where innovation meets impact.
                </motion.p>
              </motion.header>

              {/* Badges */}
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="mb-7 flex flex-wrap justify-center gap-3"
              >
                {["Remote-first", "Competitive benefits", "Growth opportunities"].map(
                  (b) => (
                    <motion.span
                      key={b}
                      variants={fadeUp}
                      transition={{ duration: 0.45, ease: easeOut }}
                      className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-violet-900"
                    >
                      {b}
                    </motion.span>
                  )
                )}
              </motion.div>

              {/* 3 hero cards */}
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-5 md:grid-cols-3"
              >
                {[
                  {
                    h: "Innovation-driven",
                    p: "Work with advanced AI, ML, and product analytics to shape tools used by real people every day.",
                  },
                  {
                    h: "Collaborative culture",
                    p: "Join a tight-knit, diverse team where every idea is heard and ownership is shared.",
                  },
                  {
                    h: "Career growth",
                    p: "Learn fast with mentorship, feedback, and opportunities to ship meaningful work early.",
                  },
                ].map((c) => (
                  <motion.article
                    key={c.h}
                    variants={fadeUp}
                    transition={{ duration: 0.5, ease: easeOut }}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl bg-[#f6f0ff] p-5 text-indigo-950 shadow-[0_14px_28px_rgba(148,163,184,0.25)]"
                  >
                    <h3 className="mb-2 text-[1rem] font-bold">{c.h}</h3>
                    <p className="m-0 text-[0.92rem] leading-relaxed text-indigo-900/90">
                      {c.p}
                    </p>
                  </motion.article>
                ))}
              </motion.div>

              {/* CTA line */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5, ease: easeOut }}
                className="mt-6 text-center text-[0.96rem] text-slate-600"
              >
                <a
                  className="font-semibold text-violet-600 underline decoration-[1.5px] underline-offset-[3px] transition hover:text-violet-700"
                  href="#openings"
                >
                  View openings
                </a>{" "}
                <span className="font-semibold text-pink-500">and apply today.</span>
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ================= OPENINGS ================= */}
        <section id="openings" className="px-4 pt-2">
          <div className="mx-auto max-w-[1080px]">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.55, ease: easeOut }}
              className="rounded-[28px] bg-white px-5 py-6 shadow-[0_22px_65px_rgba(148,163,184,0.45),0_0_0_1px_rgba(148,163,184,0.25)] sm:px-8 sm:py-7"
            >
              <h2 className="mb-5 text-[1.8rem] font-bold text-slate-900">
                Current Opportunities
              </h2>

              {loading && (
                <p className="text-[0.94rem] text-violet-600">Loading openings…</p>
              )}

              {error && (
                <p className="text-[0.94rem] font-medium text-red-700">{error}</p>
              )}

              {!loading && !error && jobs.length === 0 && (
                <p className="text-[0.94rem] text-slate-500">
                  No openings available right now. Please check back later.
                </p>
              )}

              {/* Jobs list */}
              {!loading && !error && jobs.length > 0 && (
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.15 }}
                  className="space-y-5"
                >
                  {jobs.map((job, idx) => (
                    <motion.article
                      key={`${job.title}-${idx}`}
                      variants={fadeUp}
                      transition={{ duration: 0.5, ease: easeOut }}
                      whileHover={{ y: -4 }}
                      className="rounded-[22px] border border-indigo-200/70 bg-gradient-to-br from-slate-50 to-violet-50 p-5 shadow-[0_14px_40px_rgba(148,163,184,0.35)] transition hover:border-indigo-400 hover:bg-gradient-to-br hover:from-purple-100 hover:to-fuchsia-50 hover:shadow-[0_22px_60px_rgba(129,140,248,0.60)] sm:p-6"
                    >
                      <header className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="m-0 text-[1.25rem] font-bold text-slate-900">
                            {job.title}
                          </h3>

                          <p className="mt-2 flex flex-wrap items-center gap-2 text-[0.9rem] text-slate-600">
                            {job.role && (
                              <span className="font-semibold text-indigo-600">
                                {job.role}
                              </span>
                            )}
                            {job.type && (
                              <span className="inline-flex items-center rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-[0.78rem] font-semibold uppercase tracking-[0.04em] text-violet-900">
                                {job.type}
                              </span>
                            )}
                            {job.location && (
                              <span className="inline-flex items-center rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1 text-[0.78rem] font-semibold uppercase tracking-[0.04em] text-sky-700">
                                {job.location}
                              </span>
                            )}
                          </p>
                        </div>
                      </header>

                      {job.description && (
                        <>
                          <p className="mt-4 text-[0.84rem] font-semibold uppercase tracking-[0.08em] text-purple-700">
                            About the role
                          </p>
                          <p className="m-0 text-[0.95rem] leading-relaxed text-slate-700">
                            {job.description}
                          </p>
                        </>
                      )}

                      {job.exReq && job.exReq.length > 0 && (
                        <>
                          <p className="mt-4 text-[0.84rem] font-semibold uppercase tracking-[0.08em] text-purple-700">
                            What we're looking for
                          </p>
                          <ul className="mt-2 list-disc space-y-2 pl-5 text-[0.93rem] leading-relaxed text-slate-700">
                            {job.exReq.map((req, i) => (
                              <li key={i}>{req}</li>
                            ))}
                          </ul>
                        </>
                      )}

                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          onClick={() => openPopup(job.title, job.role)}
                          className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 px-6 py-2.5 text-[0.95rem] font-semibold text-slate-50 shadow-[0_16px_38px_rgba(236,72,153,0.55)] transition hover:shadow-[0_20px_46px_rgba(236,72,153,0.70)]"
                        >
                          Apply Now
                        </motion.button>

                        <span className="text-[0.83rem] text-slate-500">
                          Send your resume and a short note about why you'd be a
                          great fit.
                        </span>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              )}
            </motion.div>

            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOut }}
              className="mt-5 text-center text-[0.9rem] text-slate-600"
            >
              Prefer email? Share your resume and cover letter with our talent team at{" "}
              <span className="font-semibold text-violet-600">
                careers@backandbone.com
              </span>
              .
            </motion.p>
          </div>
        </section>
      </main>
    </motion.div>
  );
}
