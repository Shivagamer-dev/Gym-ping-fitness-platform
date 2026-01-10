// src/Home/HelpCenterPage.tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";
import Contact from "../components/contact";

type FaqItem = {
  question: string;
  answer: string;
};

export default function HelpCenterPage(): JSX.Element {
  const [faqs, setFaqs] = useState<FaqItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();

  const faqJsonUrl =
    "https://raw.githubusercontent.com/BUTDRILL1/backnbone-data/main/faq.json";

  useEffect(() => {
    let cancelled = false;

    async function fetchFaqs() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(faqJsonUrl, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to fetch faq.json (${res.status})`);
        const data = (await res.json()) as FaqItem[];
        if (!cancelled) setFaqs(Array.isArray(data) ? data : []);
      } catch (err: any) {
        if (!cancelled) setError(err?.message || "Failed to load FAQs");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchFaqs();
    return () => {
      cancelled = true;
    };
  }, []);

  // ✅ Scroll to #faqs when arriving from anywhere (e.g., /terms -> click Read More)
  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    // wait a tick so layout is ready
    const t = window.setTimeout(() => {
      const headerOffset = 84; // adjust if your fixed navbar height differs
      const rect = el.getBoundingClientRect();
      const y = rect.top + window.scrollY - headerOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }, 80);

    return () => window.clearTimeout(t);
  }, [location.hash, loading]);

  return (
    <div
      className="min-h-screen overflow-x-hidden pt-[76px] sm:pt-[48px]"
      style={{
        background:
          "radial-gradient(circle at 0% 0%, #ede9fe 0, #fdf4ff 40%, #f5f3ff 100%)",
      }}
    >
      {/* HERO */}
      <section className="px-4 pb-6 pt-4 sm:px-5">
        <div className="mx-auto max-w-[1120px]">
          <div className="animate-fadeUp">
            <div className="relative overflow-hidden rounded-[28px] border border-slate-200/60 bg-white/85 px-5 py-8 text-center shadow-[0_16px_40px_rgba(15,23,42,0.10)] sm:rounded-[32px] sm:px-7 sm:py-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-28 -top-28 h-[320px] w-[320px] rounded-full blur-3xl opacity-60"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(168,85,247,0.35), transparent 60%)",
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-28 -bottom-28 h-[320px] w-[320px] rounded-full blur-3xl opacity-60"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.35), transparent 60%)",
                }}
              />

              <div className="relative z-[1]">
                <div
                  className="mx-auto mb-3 grid h-[54px] w-[54px] place-items-center rounded-[18px] text-[26px] text-white shadow-[0_12px_30px_rgba(79,70,229,0.55)] animate-floatSlow"
                  style={{
                    background: "radial-gradient(circle at 0 0, #a855f7, #6366f1)",
                  }}
                >
                  💬
                </div>

                <h1 className="text-[2.35rem] font-extrabold leading-[1.02] text-slate-900 sm:text-[3rem]">
                  Help Center
                </h1>

                <p className="mx-auto mt-2 max-w-[860px] text-[1rem] leading-relaxed text-slate-600">
                  We’re here to help you get the best out of Back&Bone.
                  Explore quick answers, helpful tips, and expert support in one
                  place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="px-4 pb-12 pt-2 sm:px-5">
        <div className="mx-auto max-w-[1120px]">
          <div className="animate-fadeUp [animation-delay:120ms] [animation-fill-mode:both]">
            {/* ✅ Add id="faqs" here so hash scroll lands exactly on this card */}
            <div
              id="faqs"
              className="mx-auto max-w-[980px] rounded-[22px] border border-slate-200/70 bg-white/80 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.14)] sm:rounded-[28px] sm:p-6"
            >
              {/* FAQ header */}
              <header className="flex items-start gap-3">
                <span
                  className="mt-1 inline-flex h-6 items-center justify-center rounded-full px-3 text-[0.72rem] font-extrabold uppercase tracking-[0.10em] text-white shadow-[0_10px_24px_rgba(236,72,153,0.35)]"
                  style={{
                    background: "linear-gradient(135deg,#8b5cf6,#ec4899)",
                  }}
                >
                  FAQ
                </span>

                <div>
                  <h2 className="text-[1.25rem] font-bold text-slate-900 sm:text-[1.4rem]">
                    Frequently Asked Questions
                  </h2>
                  <p className="mt-1 max-w-[680px] text-[0.95rem] leading-relaxed text-slate-600">
                    Find quick answers to common questions about Back&Bone.
                    Start here before reaching out to support.
                  </p>
                </div>
              </header>

              {/* status */}
              {loading && (
                <div className="mt-5 rounded-2xl border border-violet-200/60 bg-violet-50/70 p-4 text-center text-[0.95rem] font-semibold text-violet-700">
                  Loading FAQs…
                </div>
              )}

              {error && (
                <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-[0.92rem] font-medium text-rose-800">
                  Error loading FAQs: {error}
                </div>
              )}

              {/* FAQ list */}
              <div className="mt-5 flex flex-col gap-3">
                {faqs &&
                  faqs.map((item, idx) => (
                    <article
                      key={idx}
                      className="group flex gap-4 rounded-[18px] border border-slate-200/70 bg-white p-4 shadow-[0_10px_26px_rgba(148,163,184,0.20)] transition duration-200 hover:-translate-y-[2px] hover:shadow-[0_18px_44px_rgba(129,140,248,0.28)]"
                    >
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.8rem] font-extrabold text-white shadow-[0_10px_22px_rgba(236,72,153,0.25)]"
                        style={{
                          background: "linear-gradient(135deg,#8b5cf6,#ec4899)",
                        }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-[1.02rem] font-bold text-slate-900">
                          {item.question}
                        </h3>
                        <p className="mt-1 text-[0.95rem] leading-relaxed text-slate-600">
                          {item.answer}
                        </p>
                      </div>
                    </article>
                  ))}

                {!loading && faqs && faqs.length === 0 && !error && (
                  <div className="rounded-2xl border border-slate-200/70 bg-white p-4 text-center text-[0.95rem] text-slate-600">
                    No FAQs available yet. Check back soon.
                  </div>
                )}
              </div>

              {/* Contact section */}
              <div className="mt-6 border-t border-slate-200/70 pt-6">
                <Contact />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* animations */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 520ms ease both;
        }

        @keyframes floatSlow {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
        .animate-floatSlow {
          animation: floatSlow 3.4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fadeUp, .animate-floatSlow { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
