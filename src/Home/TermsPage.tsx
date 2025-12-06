// src/Home/TermsPage.tsx
import { useEffect, useState } from "react";
import "../App.css";

/**
 * Terms & Conditions page with an "Open Roles" (Careers) section
 * that fetches careers.json from the GitHub repo:
 * raw: https://raw.githubusercontent.com/BUTDRILL1/backnbone-data/main/careers.json
 */

type CareerRole = {
  title: string;
  role?: string;
  description?: string;
  type?: string;
  location?: string;
  exReq?: string[];
  responsibilities?: string[];
};

export default function TermsPage(): JSX.Element {
  const [careers, setCareers] = useState<CareerRole[] | null>(null);
  const [loadingCareers, setLoadingCareers] = useState(true);
  const [careersError, setCareersError] = useState<string | null>(null);

  const CAREERS_JSON_URL =
    "https://raw.githubusercontent.com/BUTDRILL1/backnbone-data/main/careers.json";

  useEffect(() => {
    async function loadCareers() {
      try {
        setLoadingCareers(true);
        const res = await fetch(CAREERS_JSON_URL);
        if (!res.ok) {
          throw new Error(`Failed to fetch careers data: ${res.status}`);
        }
        const data = await res.json();
        setCareers(data);
        setCareersError(null);
      } catch (err) {
        console.error("Error loading careers:", err);
        setCareersError("Unable to load careers at the moment.");
        setCareers(null);
      } finally {
        setLoadingCareers(false);
      }
    }

    loadCareers();
  }, []);

  return (
    <div
      className="bb-page"
      style={{
        paddingTop: "104px",
        overflowX: "hidden",
      }}
    >
      {/* ===== HERO / TITLE ===== */}
      <section
        className="bb-section"
        style={{ paddingTop: 16, paddingBottom: 24 }}
      >
        <div className="bb-section-shell bb-anim-fade-up">
          <div
            style={{
              borderRadius: 32,
              padding: "28px 26px 34px",
              background: "var(--bb-bg, #ffffff)",
              boxShadow:
                "0 16px 40px rgba(15,23,42,0.10), 0 0 0 1px rgba(148,163,184,0.25)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              marginTop: -60,
            }}
          >
            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 54,
                  height: 54,
                  borderRadius: 18,
                  background:
                    "radial-gradient(circle at 0 0, #a855f7, #6366f1)",
                  color: "#fff",
                  marginBottom: 14,
                  boxShadow: "0 12px 30px rgba(79,70,229,0.55)",
                  fontSize: 26,
                }}
              >
                📄
              </div>

              <h1
                className="bb-page-title"
                style={{
                  fontSize: "2.9rem",
                  lineHeight: 1.05,
                  fontWeight: 800,
                  marginBottom: 10,
                  color: "#0f172a",
                }}
              >
                Terms &amp; Conditions
              </h1>

              <p
                className="bb-section-subtitle"
                style={{
                  maxWidth: 820,
                  margin: "0 auto",
                  fontSize: "1rem",
                  color: "var(--bb-muted)",
                }}
              >
                By accessing or using the Back&amp;Bone website, you agree to
                these Terms &amp; Conditions. Please read them carefully before
                browsing or submitting any information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TERMS CONTENT ===== */}
      <section className="bb-section bb-section-alt">
        <div className="bb-section-shell">
          <div className="bb-terms-card bb-anim-fade-up">
            {/* 1 */}
            <article className="bb-terms-section">
              <header className="bb-terms-section-header">
                <span className="bb-terms-pill">01</span>
                <h3>Acceptance of Terms</h3>
              </header>
              <p>
                By visiting this website, you acknowledge that:
              </p>
              <ul>
                <li>
                  You are at least 13 years old, or browsing under parental
                  consent.
                </li>
                <li>
                  You agree to comply with these terms and all applicable laws.
                </li>
                <li>
                  If you disagree with any part of these Terms, please
                  discontinue using the website.
                </li>
              </ul>
            </article>

            {/* 2 */}
            <article className="bb-terms-section">
              <header className="bb-terms-section-header">
                <span className="bb-terms-pill">02</span>
                <h3>Purpose of the Website</h3>
              </header>
              <p>
                The Back&amp;Bone website serves as an informational and
                promotional platform for the Back&amp;Bone mobile and web
                application. The website provides:
              </p>
              <ul>
                <li>Information about our brand, technology, and features.</li>
                <li>Links to download or explore the Back&amp;Bone app.</li>
                <li>Company-related updates and product information.</li>
              </ul>
              <p>
                The website does not directly provide fitness services or
                account functionality inside the native app — for those, please
                use the app itself.
              </p>
            </article>

            {/* 3 */}
            <article className="bb-terms-section">
              <header className="bb-terms-section-header">
                <span className="bb-terms-pill">03</span>
                <h3>Intellectual Property</h3>
              </header>
              <p>
                All content on this website — logos, visuals, text, and designs
                — is the property of Back&amp;Bone / Frintt Studio Pvt. Ltd.
                You may not reproduce, distribute, or reuse any content without
                prior written consent.
              </p>
            </article>

            {/* 4 */}
            <article className="bb-terms-section">
              <header className="bb-terms-section-header">
                <span className="bb-terms-pill">04</span>
                <h3>User Conduct</h3>
              </header>
              <p>When using the site, you agree not to:</p>
              <ul>
                <li>Attempt to gain unauthorized access to any system or data.</li>
                <li>Upload, distribute, or share malicious code.</li>
                <li>
                  Use the website for unlawful or commercial solicitation.
                </li>
              </ul>
              <p>
                We reserve the right to restrict or block access for users
                violating these terms.
              </p>
            </article>

            {/* 5 */}
            <article className="bb-terms-section">
              <header className="bb-terms-section-header">
                <span className="bb-terms-pill">05</span>
                <h3>Third-Party Links</h3>
              </header>
              <p>
                The site may contain links to third-party sites, including
                social platforms and app stores. We are not responsible for the
                content, privacy policies, or practices of those sites; please
                review their terms directly.
              </p>
            </article>

            {/* 6 */}
            <article className="bb-terms-section">
              <header className="bb-terms-section-header">
                <span className="bb-terms-pill">06</span>
                <h3>Disclaimer of Warranties</h3>
              </header>
              <p>
                The website and its content are provided “as is” and “as
                available” without any warranties, express or implied. We make
                no representations about the accuracy, reliability, or
                completeness of the information displayed.
              </p>
            </article>

            {/* 7 */}
            <article className="bb-terms-section">
              <header className="bb-terms-section-header">
                <span className="bb-terms-pill">07</span>
                <h3>Limitation of Liability</h3>
              </header>
              <p>
                Under no circumstances shall Back&amp;Bone or its affiliates be
                liable for any indirect, incidental, or consequential damages
                arising from your use of this site. Your sole remedy for
                dissatisfaction is to stop using the site.
              </p>
            </article>

            {/* 8 */}
            <article className="bb-terms-section">
              <header className="bb-terms-section-header">
                <span className="bb-terms-pill">08</span>
                <h3>Governing Law</h3>
              </header>
              <p>
                These Terms are governed by the laws of India. Any disputes
                shall be subject to the exclusive jurisdiction of the courts of
                Delhi, India.
              </p>
            </article>

            {/* 9 */}
            <article className="bb-terms-section">
              <header className="bb-terms-section-header">
                <span className="bb-terms-pill">09</span>
                <h3>Updates to Terms</h3>
              </header>
              <p>
                We may update these Terms periodically. Continued use of the
                website after changes constitutes acceptance of the latest
                version.
              </p>
            </article>

            {/* 10 */}
            <article className="bb-terms-section">
              <header className="bb-terms-section-header">
                <span className="bb-terms-pill">10</span>
                <h3>Contact Information</h3>
              </header>
              <p>
                For questions or clarifications about these Terms:
              </p>
              <ul>
                <li>
                  Email: <strong>support@backandbone.com</strong>
                </li>
                <li>Frintt Studio Pvt. Ltd., Delhi, India.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <section className="bb-section bb-cta">
        <div className="bb-section-shell bb-anim-fade-up">
          <div className="bb-terms-contact-cta">
            <h3>Contact Us</h3>
            <p>
              For questions or concerns about these Terms, we&apos;re here to help.
            </p>

            <div className="bb-terms-contact-row">
              <a
                href="mailto:support@backandbone.com"
                className="bb-btn bb-btn-primary bb-terms-contact-btn"
              >
                support@backandbone.com
              </a>
            </div>

            <p className="bb-terms-contact-note">
              We typically respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ===== OPEN ROLES / CAREERS ===== */}
      <section id="careers" className="bb-section">
        <div className="bb-section-shell bb-anim-fade-up">
          <h2
            className="bb-section-title"
            style={{ textAlign: "center", marginBottom: 18 }}
          >
            Open Roles
          </h2>

          <p
            className="bb-section-subtitle"
            style={{
              textAlign: "center",
              maxWidth: 820,
              margin: "0 auto 22px",
            }}
          >
            Join the Back&amp;Bone team. We&apos;re building the future of
            fitness — if you&apos;re driven, curious, and love building great
            product experiences, explore the roles below.
          </p>

          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            {loadingCareers && (
              <p style={{ textAlign: "center" }}>Loading open roles…</p>
            )}

            {careersError && (
              <p style={{ textAlign: "center", color: "var(--bb-muted)" }}>
                {careersError} — try reloading the page.
              </p>
            )}

            {careers && careers.length === 0 && (
              <p style={{ textAlign: "center" }}>No roles posted right now.</p>
            )}

            {careers && careers.length > 0 && (
              <div className="bb-roles-grid">
                {careers.map((c, idx) => (
                  <article
                    key={`${c.title}-${idx}`}
                    className="bb-job-card bb-card-hover"
                  >
                    <header className="bb-job-header">
                      <h3>{c.title}</h3>
                      <div className="bb-job-meta">
                        {c.role && (
                          <span className="bb-job-pill">{c.role}</span>
                        )}
                        {c.type && (
                          <span className="bb-job-pill bb-job-pill-outline">
                            {c.type}
                          </span>
                        )}
                        {c.location && (
                          <span className="bb-job-location">{c.location}</span>
                        )}
                      </div>
                    </header>

                    {c.description && (
                      <p className="bb-job-description">{c.description}</p>
                    )}

                    {Array.isArray(c.exReq) && c.exReq.length > 0 && (
                      <ul className="bb-job-list">
                        {c.exReq.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    )}

                    <footer className="bb-job-footer">
                      <a
                        href={`mailto:careers@backandbone.com?subject=Application: ${encodeURIComponent(
                          c.title
                        )}`}
                        style={{ textDecoration: "none" }}
                      >
                        <button className="bb-btn bb-btn-primary">
                          Apply Now
                        </button>
                      </a>

                      <button
                        className="bb-btn bb-btn-ghost"
                        onClick={() => {
                          window.alert(
                            `More details for "${c.title}" — check your email to apply.`
                          );
                        }}
                      >
                        Learn more
                      </button>
                    </footer>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Scoped styles for Terms page */}
        <style>
          {`
            .bb-terms-card {
              max-width: 980px;
              margin: 0 auto;
              border-radius: 28px;
              padding: 26px 24px 30px;
              background: linear-gradient(135deg,#f9f5ff,#faf5ff);
              box-shadow:
                0 24px 60px rgba(15,23,42,0.16),
                0 0 0 1px rgba(148,163,184,0.35);
            }

            .bb-terms-section + .bb-terms-section {
              border-top: 1px solid rgba(148,163,184,0.25);
              margin-top: 18px;
              padding-top: 18px;
            }

            .bb-terms-section-header {
              display: flex;
              align-items: center;
              gap: 10px;
              margin-bottom: 6px;
            }

            .bb-terms-section-header h3 {
              margin: 0;
              font-size: 1.08rem;
              font-weight: 700;
              color: #111827;
            }

            .bb-terms-pill {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              min-width: 32px;
              height: 24px;
              padding: 0 10px;
              border-radius: 999px;
              background: linear-gradient(135deg,#8b5cf6,#ec4899);
              color: #f9fafb;
              font-size: 0.7rem;
              font-weight: 700;
              letter-spacing: 0.04em;
              text-transform: uppercase;
            }

            .bb-terms-section p {
              margin: 4px 0 6px;
              line-height: 1.7;
              color: #374151;
              font-size: 0.95rem;
            }

            .bb-terms-section ul {
              margin: 4px 0 6px 1.2rem;
              padding-left: 0.4rem;
              line-height: 1.7;
              color: #374151;
              font-size: 0.95rem;
            }

            .bb-terms-section ul li {
              margin-bottom: 2px;
            }

            .bb-terms-contact-cta {
              max-width: 680px;
              margin: 0 auto;
              text-align: center;
            }

            .bb-terms-contact-cta h3 {
              margin: 0 0 6px;
              font-size: 1.8rem;
            }

            .bb-terms-contact-cta p {
              margin: 0;
              line-height: 1.7;
              color: #374151;
              font-size: 0.98rem;
            }

            .bb-terms-contact-row {
              display: flex;
              justify-content: center;
              margin-top: 14px;
            }

            .bb-terms-contact-btn {
              border-radius: 999px;
              padding: 12px 30px;
              background: #111827;
              box-shadow: 0 18px 40px rgba(15,23,42,0.45);
              text-decoration: none;
              font-size: 0.95rem;
            }

            .bb-terms-contact-note {
              margin-top: 8px;
              font-size: 0.82rem;
              color: var(--bb-muted);
              text-align: center;
            }

            .bb-roles-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 18px;
            }

            .bb-job-card {
              border-radius: 22px;
              padding: 20px 18px 18px;
              background: radial-gradient(circle at 0 0,#eef2ff,#f9fafb);
              box-shadow:
                0 18px 40px rgba(15,23,42,0.10),
                0 0 0 1px rgba(148,163,184,0.35);
              display: flex;
              flex-direction: column;
              gap: 8px;
            }

            .bb-job-header h3 {
              margin: 0 0 4px;
              font-size: 1.05rem;
              font-weight: 700;
              color: #111827;
            }

            .bb-job-meta {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
              align-items: center;
              margin-bottom: 4px;
            }

            .bb-job-pill {
              padding: 3px 10px;
              border-radius: 999px;
              font-size: 0.72rem;
              font-weight: 600;
              background: linear-gradient(135deg,#8b5cf6,#ec4899);
              color: #f9fafb;
            }

            .bb-job-pill-outline {
              background: transparent;
              border: 1px solid rgba(129,140,248,0.6);
              color: #4f46e5;
            }

            .bb-job-location {
              font-size: 0.8rem;
              color: #6b7280;
            }

            .bb-job-description {
              margin: 2px 0 4px;
              line-height: 1.6;
              font-size: 0.94rem;
              color: #374151;
            }

            .bb-job-list {
              margin: 4px 0 6px 1.1rem;
              padding-left: 0.4rem;
              font-size: 0.9rem;
              color: #374151;
              line-height: 1.6;
            }

            .bb-job-footer {
              margin-top: 10px;
              display: flex;
              gap: 10px;
              flex-wrap: wrap;
              align-items: center;
            }

            @media (max-width: 768px) {
              .bb-terms-card {
                padding: 22px 18px 24px;
                border-radius: 22px;
              }

              .bb-job-card {
                border-radius: 20px;
              }

              .bb-terms-contact-cta h3 {
                font-size: 1.6rem;
              }
            }
          `}
        </style>
      </section>
    </div>
  );
}
