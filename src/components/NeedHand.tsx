// src/components/NeedHand.tsx
import { useNavigate } from "react-router-dom";

export default function NeedHand() {
  const navigate = useNavigate();

  return (
    <section className="py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-5">
        <div className="relative overflow-hidden rounded-[34px] border border-slate-200/70 bg-white px-5 py-8 text-center shadow-[0_26px_70px_rgba(15,23,42,0.12)] sm:px-6 sm:py-10">
          {/* ambient background (soft, on-brand) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(circle at 15% 0%, rgba(168,85,247,0.14), transparent 58%)," +
                "radial-gradient(circle at 85% 100%, rgba(99,102,241,0.12), transparent 58%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-28 -top-28 h-[320px] w-[320px] rounded-full blur-3xl opacity-45"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(168,85,247,0.22), transparent 62%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -bottom-32 h-[340px] w-[340px] rounded-full blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.20), transparent 62%)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-[980px]">

            <h3 className="mt-4 m-0 text-[clamp(1.55rem,4vw,2.15rem)] font-black tracking-tight text-slate-900">
              Need a Hand?
            </h3>

            <p className="mx-auto mt-3 max-w-[900px] text-[1.02rem] leading-8 text-slate-600">
              Stuck anywhere in the app? Reach out and we will walk you through the right module
              or send a quick loom recording.
            </p>

            {/* buttons */}
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                className={[
                  "w-full sm:w-auto",
                  "min-w-[240px] rounded-full px-7 py-3",
                  "bg-slate-950 text-[0.98rem] font-extrabold text-white",
                  "shadow-[0_18px_44px_rgba(2,6,23,0.22)] transition duration-200",
                  "hover:-translate-y-[1px] hover:shadow-[0_22px_54px_rgba(2,6,23,0.26)] hover:brightness-[1.05] active:translate-y-0",
                ].join(" ")}
                onClick={() => navigate("/support")}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <span
                    aria-hidden="true"
                    className="grid h-6 w-6 place-items-center rounded-full bg-white/10"
                  >
                    ?
                  </span>
                  Visit Support Center
                </span>
              </button>

              <a
                href="mailto:support@backandbone.com"
                className={[
                  "w-full sm:w-auto",
                  "inline-flex min-w-[200px] items-center justify-center gap-2 rounded-full",
                  "border border-slate-200 bg-white px-7 py-3",
                  "text-[0.98rem] font-extrabold text-slate-900",
                  "shadow-[0_14px_34px_rgba(15,23,42,0.08)] transition duration-200",
                  "hover:-translate-y-[1px] hover:shadow-[0_18px_42px_rgba(15,23,42,0.10)]",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className="grid h-6 w-6 place-items-center rounded-full bg-slate-900/5"
                >
                  ✉
                </span>
                Email Us
              </a>
            </div>

            {/* response note */}
            <div className="mx-auto mt-5 max-w-[560px] rounded-2xl border border-slate-200/70 bg-white/65 px-4 py-3 text-[0.92rem] text-slate-500 shadow-[0_10px_26px_rgba(15,23,42,0.05)]">
              We typically respond within <span className="font-semibold text-slate-700">24 hours</span>.
            </div>
          </div>

          <style>{`
            @media (prefers-reduced-motion: reduce){
              *{ animation: none !important; transition: none !important; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
