// src/Home/PrivacyPolicyPage.tsx
import { useEffect } from "react";
import Contact from "../components/contact";

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

export default function PrivacyPolicyPage() {
  useRevealOnScroll();

  const sections = [
    {
      n: "01",
      t: "Information We Collect",
      body: (
        <>
          <p>When you visit our website, we may collect:</p>
          <ul className="list-disc pl-5">
            <li>Basic usage data (browser type, device, visit duration).</li>
            <li>
              Analytics information to understand usage patterns and improve the
              website experience.
            </li>
            <li>
              Voluntary contact details submitted through forms (name, email,
              message).
            </li>
          </ul>
          <p>We do not collect sensitive financial details through this webpage.</p>
        </>
      ),
    },
    {
      n: "02",
      t: "How We Use Your Information",
      body: (
        <>
          <p>We use the data to:</p>
          <ul className="list-disc pl-5">
            <li>Improve site design, content and overall performance.</li>
            <li>Respond to inquiries and support requests.</li>
            <li>
              Send optional updates or marketing communications if you opt in.
            </li>
          </ul>
          <p>We never sell or rent your personal data to third parties.</p>
        </>
      ),
    },
    {
      n: "03",
      t: "Cookies and Tracking",
      body: (
        <p>
          Our website uses cookies and similar technologies to analyze
          performance and remember preferences. You may disable cookies in your
          browser settings, but this could affect website functionality.
        </p>
      ),
    },
    {
      n: "04",
      t: "Data Security",
      body: (
        <p>
          We implement industry-standard security measures to protect data
          collected on our site. However, no online transmission or storage is
          100% secure; users browse at their own discretion.
        </p>
      ),
    },
    {
      n: "05",
      t: "Third-Party Links",
      body: (
        <p>
          Our website may contain links to external sites (social media, app
          store pages, partner pages). We are not responsible for the privacy
          practices of those sites; please review their policies before sharing
          personal data.
        </p>
      ),
    },
    {
      n: "06",
      t: "App-Related Data",
      body: (
        <p>
          This policy covers the marketing website only. If you use the Back&Bone
          mobile app, certain user profile, analytics and fitness data may be
          collected in-app — please refer to the in-app Privacy Policy for
          app-specific details.
        </p>
      ),
    },
    {
      n: "07",
      t: "Your Rights",
      body: (
        <ul className="list-disc pl-5">
          <li>Request access, correction, or deletion of your contact data.</li>
          <li>
            Opt out of marketing communications at any time by emailing{" "}
            <strong>support@backandbone.com</strong>.
          </li>
        </ul>
      ),
    },
    {
      n: "08",
      t: "Policy Updates",
      body: (
        <p>
          We may update this Privacy Policy periodically. Any material changes
          will be posted on this page with a revised effective date.
        </p>
      ),
    },
  ];

  return (
<div className="min-h-screen w-full overflow-x-hidden bg-white pt-[50px] sm:pt-24">
      {/* HERO */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-6xl px-5">
          <div
            data-bb-reveal
            className={[
              "opacity-0 translate-y-3 transition-all duration-500",
              "relative -mt-6 overflow-hidden rounded-[32px] bg-white",
              "px-6 py-8 sm:px-8 sm:py-10",
              "shadow-[0_16px_40px_rgba(15,23,42,0.10),0_0_0_1px_rgba(148,163,184,0.25)]",
              "text-center",
            ].join(" ")}
          >
            {/* animated background */}
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <span className="absolute -left-24 -top-28 h-[320px] w-[320px] rounded-full blur-[26px] bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.22),transparent_60%)] animate-[bbBlobA_12s_ease-in-out_infinite]" />
              <span className="absolute -right-28 -top-20 h-[320px] w-[320px] rounded-full blur-[26px] bg-[radial-gradient(circle_at_35%_35%,rgba(79,70,229,0.18),transparent_62%)] animate-[bbBlobB_14s_ease-in-out_infinite]" />
              <span className="absolute left-[35%] -bottom-40 h-[320px] w-[320px] rounded-full blur-[26px] bg-[radial-gradient(circle_at_40%_40%,rgba(236,72,153,0.14),transparent_65%)] animate-[bbBlobC_16s_ease-in-out_infinite]" />
            </div>

            <div className="relative z-10">
              <div className="mx-auto mb-3 inline-flex h-[54px] w-[54px] items-center justify-center rounded-[18px] bg-[radial-gradient(circle_at_0_0,#a855f7,#6366f1)] text-[26px] text-white shadow-[0_12px_30px_rgba(79,70,229,0.55)] animate-[bbPop_900ms_ease-out_both]">
                🔒
              </div>

              <h1 className="text-[clamp(2rem,4.6vw,3rem)] font-extrabold leading-[1.02] text-slate-900">
                Privacy Policy
              </h1>

              <p className="mx-auto mt-3 max-w-[820px] text-[0.98rem] leading-7 text-slate-600">
                At Back&Bone we value your privacy and are committed to protecting
                your personal information. This Privacy Policy explains how we
                collect, use, and safeguard data when you visit our website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-6 sm:py-10">
        <div className="mx-auto max-w-6xl px-5">
          <div
            data-bb-reveal
            className={[
              "opacity-0 translate-y-3 transition-all duration-500",
              "mx-auto max-w-[980px] rounded-[28px]",
              "bg-[linear-gradient(135deg,#f9fbff,#f6f8ff)]",
              "p-6 sm:p-7",
              "shadow-[0_24px_60px_rgba(15,23,42,0.16),0_0_0_1px_rgba(148,163,184,0.35)]",
            ].join(" ")}
          >
            {sections.map((s, idx) => (
              <article
                key={s.n}
                data-bb-reveal
                style={{ transitionDelay: `${idx * 70}ms` }}
                className={[
                  "opacity-0 translate-y-3 transition-all duration-500",
                  idx === 0 ? "" : "mt-5 border-t border-slate-300/30 pt-5",
                ].join(" ")}
              >
                <header className="mb-2 flex items-center gap-2">
                  <span className="inline-flex h-6 min-w-[32px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#8b5cf6,#ec4899)] px-3 text-[0.7rem] font-extrabold tracking-[0.04em] text-white">
                    {s.n}
                  </span>
                  <h3 className="text-[1.06rem] font-extrabold text-slate-900">
                    {s.t}
                  </h3>
                </header>

                <div className="space-y-2 text-[0.95rem] leading-7 text-slate-700">
                  {s.body}
                </div>
              </article>
            ))}

            {/* ✅ Contact section via component (replaces old "09 Contact Us" block) */}
            <div
              data-bb-reveal
              style={{ transitionDelay: `${sections.length * 70}ms` }}
              className="opacity-0 translate-y-3 mt-6 border-t border-slate-300/30 pt-6 transition-all duration-500"
            >
              <Contact />
            </div>
          </div>
        </div>
      </section>

      {/* animations only (keeps UI + responsiveness safe) */}
      <style>{`
        @keyframes bbBlobA { 0%{transform:translate(0,0) scale(1)} 50%{transform:translate(38px,22px) scale(1.05)} 100%{transform:translate(0,0) scale(1)} }
        @keyframes bbBlobB { 0%{transform:translate(0,0) scale(1)} 50%{transform:translate(-34px,28px) scale(1.06)} 100%{transform:translate(0,0) scale(1)} }
        @keyframes bbBlobC { 0%{transform:translate(0,0) scale(1)} 50%{transform:translate(18px,-22px) scale(1.06)} 100%{transform:translate(0,0) scale(1)} }
        @keyframes bbPop { 0%{opacity:0; transform:translateY(8px) scale(.95)} 100%{opacity:1; transform:translateY(0) scale(1)} }

        @media (prefers-reduced-motion: reduce){
          *{ animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}
