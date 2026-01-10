// src/components/contact.tsx
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  const goToFaqs = () => {
    navigate("/support#faqs");

    // force scroll every time (even if already on /support)
    setTimeout(() => {
      const el = document.getElementById("faqs");
      if (!el) return;

      const headerOffset = 84; // adjust if your header height changes
      const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }, 50);
  };

  return (
    <section
      className="relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/80 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.12)] sm:p-8"
      style={{
        background:
          "radial-gradient(900px 240px at 15% -10%, rgba(34,211,238,0.18), transparent 60%)," +
          "radial-gradient(900px 240px at 85% 10%, rgba(99,102,241,0.18), transparent 60%)," +
          "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.80))",
      }}
    >
      {/* soft glow blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-[260px] w-[260px] rounded-full blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(168,85,247,0.35), transparent 62%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -bottom-24 h-[260px] w-[260px] rounded-full blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.35), transparent 62%)",
        }}
      />

      <div className="relative z-[1]">
        {/* header */}
        <div className="text-center">
          <h2 className="mt-1 text-[1.85rem] font-black tracking-[-0.35px] text-slate-950 sm:text-[2.2rem]">
            Contact Us
          </h2>

          <p className="mx-auto mt-2 max-w-[720px] text-[0.98rem] leading-relaxed text-slate-600 sm:text-[1rem]">
            For questions or concerns, we’re here to help. Reach out anytime and
            we’ll get back to you as soon as possible.
          </p>
        </div>

        {/* cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Email card */}
          <div className="group rounded-2xl border border-slate-200/70 bg-white/90 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.08)] transition hover:-translate-y-[2px] hover:shadow-[0_22px_60px_rgba(99,102,241,0.18)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-[0_12px_30px_rgba(79,70,229,0.25)]"
                style={{
                  background: "radial-gradient(circle at 0 0, #a855f7, #6366f1)",
                }}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-[1.1rem] font-extrabold text-slate-950">
                  Email Support
                </h3>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-slate-600">
                  Best for account, billing, and general questions.
                </p>

                <a
                  href="mailto:support@backandbone.com"
                  className="mt-3 inline-flex w-full items-center justify-between gap-2 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-[0.95rem] font-extrabold text-indigo-700 transition hover:bg-indigo-500/15"
                >
                  <span className="min-w-0 flex-1 break-words">
                    support@backandbone.com
                  </span>
                  <span className="shrink-0 opacity-70">↗</span>
                </a>

                <div className="mt-3 text-[0.9rem] text-slate-500">
                  We typically reply within{" "}
                  <span className="font-semibold text-slate-700">24 hours</span>.
                </div>
              </div>
            </div>
          </div>

          {/* FAQ card */}
          <div className="group rounded-2xl border border-slate-200/70 bg-white/90 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.08)] transition hover:-translate-y-[2px] hover:shadow-[0_22px_60px_rgba(236,72,153,0.14)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-[0_12px_30px_rgba(236,72,153,0.18)]"
                style={{
                  background: "linear-gradient(135deg,#ec4899,#8b5cf6)",
                }}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-1.414 1.414M8.05 15.95l-1.414 1.414m10.607 0l1.414 1.414M8.05 8.05L6.636 6.636M12 2v2m0 16v2m10-10h-2M4 12H2m15.536-6.364A9 9 0 116.364 18.364 9 9 0 0117.536 5.636z"
                  />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-[1.1rem] font-extrabold text-slate-950">
                  FAQs
                </h3>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-slate-600">
                  Quick answers, FAQs, and step-by-step help.
                </p>

                <button
                  type="button"
                  onClick={goToFaqs}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 px-5 py-2.5 text-[0.98rem] font-extrabold text-white shadow-[0_18px_44px_rgba(99,102,241,0.28)] transition hover:-translate-y-[1px] hover:shadow-[0_24px_60px_rgba(99,102,241,0.38)] active:translate-y-0 sm:w-auto sm:justify-start"
                >
                  Read More.... <span className="opacity-90">→</span>
                </button>

                <div className="mt-3 text-[0.9rem] text-slate-500">
                  For urgent help, start here first.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-1" />
      </div>
    </section>
  );
}
