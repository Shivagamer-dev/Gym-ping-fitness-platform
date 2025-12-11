// src/Home/HelpCenterPage.tsx
import { useEffect, useState } from "react";
import "../App.css";

type FaqItem = {
  question: string;
  answer: string;
};

export default function HelpCenterPage(): JSX.Element {
  const [faqs, setFaqs] = useState<FaqItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        if (!cancelled) setFaqs(data);
      } catch (err: any) {
        if (!cancelled) setError(err.message || "Failed to load FAQs");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchFaqs();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bb-page" style={{ paddingTop: "104px", overflowX: "hidden" }}>
      {/* HERO */}
      <section className="bb-section" style={{ paddingTop: 16, paddingBottom: 24 }}>
        <div className="bb-section-shell bb-anim-fade-up">
          <div className="bb-hc-hero-card">
            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="bb-hc-hero-icon">
                💬
              </div>

              <h1 className="bb-page-title bb-hc-hero-title">
                Help Center
              </h1>

              <p className="bb-section-subtitle bb-hc-hero-subtitle">
                We’re here to help you get the best out of Back&Bone. Explore
                quick answers, helpful tips, and expert support in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section
        className="bb-section bb-section-alt"
        style={{ paddingTop: 12, paddingBottom: 40 }}
      >
        <div className="bb-section-shell">
          <div className="bb-hc-card bb-anim-fade-up">
            <header className="bb-hc-header">
              <span className="bb-hc-pill">FAQ</span>
              <div>
                <h2 className="bb-hc-heading">Frequently Asked Questions</h2>
                <p className="bb-hc-subheading">
                  Find quick answers to common questions about Back&Bone.  
                  Start here before reaching out to support.
                </p>
              </div>
            </header>

            {/* status */}
            {loading && (
              <div className="bb-hc-status">
                Loading FAQs…
              </div>
            )}

            {error && (
              <div className="bb-hc-error">
                Error loading FAQs: {error}
              </div>
            )}

            {/* FAQ list */}
            <div className="bb-hc-faq-list">
              {faqs &&
                faqs.map((item, idx) => (
                  <article key={idx} className="bb-hc-faq bb-card-hover">
                    <div className="bb-hc-faq-badge">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="bb-hc-faq-body">
                      <h3 className="bb-hc-faq-question">{item.question}</h3>
                      <p className="bb-hc-faq-answer">{item.answer}</p>
                    </div>
                  </article>
                ))}

              {!loading && faqs && faqs.length === 0 && !error && (
                <div className="bb-hc-status">
                  No FAQs available yet. Check back soon.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scoped styles for Help Center */}
        <style>
          {`
            .bb-hc-hero-card {
              border-radius: 32px;
              padding: 30px 28px 34px;
              background: var(--bb-bg, #ffffff);
              box-shadow:
                0 16px 40px rgba(15,23,42,0.10),
                0 0 0 1px rgba(148,163,184,0.25);
              text-align: center;
              position: relative;
              overflow: hidden;
              margin-top: -60px;
            }

            .bb-hc-hero-icon {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 54px;
              height: 54px;
              border-radius: 18px;
              background: radial-gradient(circle at 0 0, #a855f7, #6366f1);
              color: #fff;
              margin-bottom: 14px;
              box-shadow: 0 12px 30px rgba(79,70,229,0.55);
              font-size: 26px;
            }

            .bb-hc-hero-title {
              font-size: 3rem;
              font-weight: 800;
              margin-bottom: 8px;
              line-height: 1.02;
              color: #0f172a;
            }

            .bb-hc-hero-subtitle {
              max-width: 820px;
              margin: 0 auto;
              font-size: 1rem;
              color: var(--bb-muted);
            }

            .bb-hc-card {
              max-width: 980px;
              margin: 0 auto;
              border-radius: 28px;
              padding: 26px 24px 28px;
              background: linear-gradient(135deg,#f9f5ff,#faf5ff);
              box-shadow:
                0 24px 60px rgba(15,23,42,0.16),
                0 0 0 1px rgba(148,163,184,0.35);
            }

            .bb-hc-header {
              display: flex;
              align-items: flex-start;
              gap: 12px;
              margin-bottom: 16px;
            }

            .bb-hc-pill {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              min-width: 40px;
              height: 24px;
              padding: 0 12px;
              border-radius: 999px;
              background: linear-gradient(135deg,#8b5cf6,#ec4899);
              color: #f9fafb;
              font-size: 0.72rem;
              font-weight: 700;
              letter-spacing: 0.08em;
              text-transform: uppercase;
            }

            .bb-hc-heading {
              margin: 0;
              font-size: 1.4rem;
              font-weight: 700;
              color: #111827;
            }

            .bb-hc-subheading {
              margin: 4px 0 0;
              font-size: 0.95rem;
              color: #6b7280;
              max-width: 640px;
            }

            .bb-hc-status {
              padding: 20px;
              text-align: center;
              color: var(--bb-muted);
              font-size: 0.95rem;
            }

            .bb-hc-error {
              padding: 18px 20px;
              border-radius: 14px;
              background: #fef2f2;
              color: #7f1d1d;
              margin-bottom: 16px;
              font-size: 0.92rem;
            }

            .bb-hc-faq-list {
              display: flex;
              flex-direction: column;
              gap: 12px;
            }

            .bb-hc-faq {
              display: flex;
              gap: 14px;
              padding: 16px 18px;
              border-radius: 18px;
              background: #ffffff;
              box-shadow:
                0 10px 26px rgba(148,163,184,0.28),
                0 0 0 1px rgba(209,213,219,0.6);
            }

            .bb-hc-faq-badge {
              flex-shrink: 0;
              width: 32px;
              height: 32px;
              border-radius: 999px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 0.8rem;
              font-weight: 700;
              color: #f9fafb;
              background: linear-gradient(135deg,#8b5cf6,#ec4899);
              box-shadow: 0 8px 18px rgba(236,72,153,0.55);
            }

            .bb-hc-faq-body {
              flex: 1;
            }

            .bb-hc-faq-question {
              margin: 0 0 4px;
              font-size: 1.02rem;
              font-weight: 700;
              color: #111827;
            }

            .bb-hc-faq-answer {
              margin: 0;
              font-size: 0.95rem;
              line-height: 1.65;
              color: #4b5563;
            }

            @media (max-width: 768px) {
              .bb-hc-hero-card {
                padding: 24px 18px 26px;
                border-radius: 24px;
                margin-top: -48px;
              }

              .bb-hc-hero-title {
                font-size: 2.4rem;
              }

              .bb-hc-card {
                padding: 22px 18px 24px;
                border-radius: 22px;
              }

              .bb-hc-header {
                flex-direction: row;
                align-items: center;
              }

              .bb-hc-heading {
                font-size: 1.25rem;
              }
            }
          `}
        </style>
      </section>

      {/* STILL NEED HELP CTA */}
      <section className="bb-section bb-cta" style={{ paddingBottom: 40 }}>
        <div className="bb-section-shell bb-anim-fade-up" style={{ textAlign: "center" }}>
          <h3
            className="bb-section-title"
            style={{ marginBottom: 8, fontSize: "1.8rem" }}
          >
            Still Need Help?
          </h3>

          <p
            className="bb-section-subtitle"
            style={{ marginBottom: 18, color: "var(--bb-muted)" }}
          >
            Get detailed help by emailing our support team.
          </p>

          <button
            className="bb-btn bb-btn-primary bb-btn-animated"
            style={{
              padding: "14px 36px",
              fontSize: "1.02rem",
              borderRadius: 999,
            }}
            onClick={() =>
              (window.location.href = "mailto:support@backandbone.com")
            }
            aria-label="Email Back& Bone support"
          >
            support@backandbone.com
          </button>

          <p className="bb-cta-note" style={{ marginTop: 10 }}>
            We aim to reply within 24 hours.
          </p>
        </div>
      </section>
    </div>
  );
}
