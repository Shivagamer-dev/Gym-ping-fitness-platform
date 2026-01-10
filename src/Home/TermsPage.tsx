// src/Home/TermsPage.tsx
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
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

export default function TermsPage(): JSX.Element {
  useRevealOnScroll();

  const terms = [
    {
      n: "01",
      t: "Acceptance of Terms",
      body: (
        <>
          <p>By visiting this website, you acknowledge that:</p>
          <ul className="list-disc pl-5">
            <li>You are at least 13 years old, or browsing under parental consent.</li>
            <li>You agree to comply with these terms and all applicable laws.</li>
            <li>
              If you disagree with any part of these Terms, please discontinue using the website.
            </li>
          </ul>
        </>
      ),
    },
    {
      n: "02",
      t: "Purpose of the Website",
      body: (
        <>
          <p>
            The Back&Bone website serves as an informational and promotional platform for the
            Back&Bone mobile and web application. The website provides:
          </p>
          <ul className="list-disc pl-5">
            <li>Information about our brand, technology, and features.</li>
            <li>Links to download or explore the Back&Bone app.</li>
            <li>Company-related updates and product information.</li>
          </ul>
          <p>
            The website does not directly provide fitness services or account functionality inside
            the native app — for those, please use the app itself.
          </p>
        </>
      ),
    },
    {
      n: "03",
      t: "Intellectual Property",
      body: (
        <p>
          All content on this website — logos, visuals, text, and designs — is the property of
          Back&Bone / Frintt Studio Pvt. Ltd. You may not reproduce, distribute, or reuse any
          content without prior written consent.
        </p>
      ),
    },
    {
      n: "04",
      t: "User Conduct",
      body: (
        <>
          <p>When using the site, you agree not to:</p>
          <ul className="list-disc pl-5">
            <li>Attempt to gain unauthorized access to any system or data.</li>
            <li>Upload, distribute, or share malicious code.</li>
            <li>Use the website for unlawful or commercial solicitation.</li>
          </ul>
          <p>We reserve the right to restrict or block access for users violating these terms.</p>
        </>
      ),
    },
    {
      n: "05",
      t: "Third-Party Links",
      body: (
        <p>
          The site may contain links to third-party sites, including social platforms and app
          stores. We are not responsible for the content, privacy policies, or practices of those
          sites; please review their terms directly.
        </p>
      ),
    },
    {
      n: "06",
      t: "Disclaimer of Warranties",
      body: (
        <p>
          The website and its content are provided “as is” and “as available” without any
          warranties, express or implied. We make no representations about the accuracy,
          reliability, or completeness of the information displayed.
        </p>
      ),
    },
    {
      n: "07",
      t: "Limitation of Liability",
      body: (
        <p>
          Under no circumstances shall Back&Bone or its affiliates be liable for any indirect,
          incidental, or consequential damages arising from your use of this site. Your sole
          remedy for dissatisfaction is to stop using the site.
        </p>
      ),
    },
    {
      n: "08",
      t: "Governing Law",
      body: (
        <p>
          These Terms are governed by the laws of India. Any disputes shall be subject to the
          exclusive jurisdiction of the courts of Delhi, India.
        </p>
      ),
    },
    {
      n: "09",
      t: "Updates to Terms",
      body: (
        <p>
          We may update these Terms periodically. Continued use of the website after changes
          constitutes acceptance of the latest version.
        </p>
      ),
    },
    {
      n: "10",
      t: "Contact Information",
      body: (
        <>
          <p>For questions or clarifications about these Terms:</p>
          <ul className="list-disc pl-5">
            <li>
              Email: <strong>support@backandbone.com</strong>
            </li>
            <li>Frintt Studio Pvt. Ltd., Delhi, India.</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Back&Bone Terms of Service - Legal Agreement</title>
        <meta name="description" content="Read Back&Bone's terms of service. Understand our legal agreement, user conduct policies, intellectual property rights, and governing law for using our fitness platform." />
        <meta name="keywords" content="terms of service, legal agreement, user conduct, Back&Bone terms, intellectual property, governing law" />
        <link rel="canonical" href="https://backandbone.com/terms" />
        <meta property="og:title" content="Back&Bone Terms of Service - Legal Agreement" />
        <meta property="og:description" content="Read Back&Bone's terms of service. Understand our legal agreement, user conduct policies, and governing law." />
        <meta property="og:image" content="https://backandbone.com/src/assets/images/CircLogo.png" />
        <meta property="og:url" content="https://backandbone.com/terms" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Back&Bone Terms of Service - Legal Agreement" />
        <meta name="twitter:description" content="Read Back&Bone's terms of service. Understand our legal agreement and policies." />
        <meta name="twitter:image" content="https://backandbone.com/src/assets/images/CircLogo.png" />
      </Helmet>
<div className="min-h-screen w-full overflow-x-hidden bg-white pt-[21px] sm:pt-24">
      {/* HERO / TITLE */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-6xl px-5">
          <div
            data-bb-reveal
            className={[
              "opacity-0 translate-y-3 transition-all duration-500",
              "relative mt-0 sm:-mt-12 overflow-hidden rounded-[32px] bg-white",
              "px-6 py-8 sm:px-8 sm:py-10",
              "shadow-[0_16px_40px_rgba(15,23,42,0.10),0_0_0_1px_rgba(148,163,184,0.25)]",
              "text-center",
            ].join(" ")}
          >
            {/* ambient blobs */}
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <span className="absolute -left-24 -top-28 h-[320px] w-[320px] rounded-full blur-[26px] bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.22),transparent_60%)] animate-[bbBlobA_12s_ease-in-out_infinite]" />
              <span className="absolute -right-28 -top-20 h-[320px] w-[320px] rounded-full blur-[26px] bg-[radial-gradient(circle_at_35%_35%,rgba(79,70,229,0.18),transparent_62%)] animate-[bbBlobB_14s_ease-in-out_infinite]" />
              <span className="absolute left-[35%] -bottom-40 h-[320px] w-[320px] rounded-full blur-[26px] bg-[radial-gradient(circle_at_40%_40%,rgba(236,72,153,0.14),transparent_65%)] animate-[bbBlobC_16s_ease-in-out_infinite]" />
            </div>

            <div className="relative z-10">
              <div className="mx-auto mb-3 inline-flex h-[54px] w-[54px] items-center justify-center rounded-[18px] bg-[radial-gradient(circle_at_0_0,#a855f7,#6366f1)] text-[26px] text-white shadow-[0_12px_30px_rgba(79,70,229,0.55)] animate-[bbPop_900ms_ease-out_both]">
                📄
              </div>

              <h1 className="text-[clamp(2rem,4.4vw,2.9rem)] font-extrabold leading-[1.05] text-slate-900">
                Terms of Service
              </h1>

              <p className="mx-auto mt-3 max-w-[820px] text-[0.98rem] leading-7 text-slate-600">
                By accessing or using the Back&Bone website, you agree to these Terms and
                Conditions. Please read them carefully before browsing or submitting any
                information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TERMS CONTENT */}
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
            {terms.map((s, idx) => (
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
                  <h3 className="text-[1.06rem] font-extrabold text-slate-900">{s.t}</h3>
                </header>

                <div className="space-y-2 text-[0.95rem] leading-7 text-slate-700">{s.body}</div>
              </article>
            ))}

            {/* CONTACT (replaces old Contact CTA section) */}
            <article
              data-bb-reveal
              style={{ transitionDelay: `${terms.length * 70}ms` }}
              className="opacity-0 translate-y-3 mt-6 border-t border-slate-300/30 pt-6 transition-all duration-500"
            >
              <Contact />
            </article>
          </div>
        </div>
      </section>

      {/* animations only (safe) */}
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
  </>
  );
}
