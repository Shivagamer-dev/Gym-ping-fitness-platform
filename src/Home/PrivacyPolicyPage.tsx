// src/Home/PrivacyPolicyPage.tsx
import "../App.css";

export default function PrivacyPolicyPage() {
  return (
    <div className="bb-page" style={{ paddingTop: "104px" }}>
      {/* HERO */}
      <section
        className="bb-section"
        style={{ paddingTop: 12, paddingBottom: 24 }} // less vertical space
      >
        <div className="bb-section-shell bb-anim-fade-up">
          <div
            style={{
              borderRadius: 32,
              padding: "28px 26px 32px",
              background: "var(--bb-bg, #ffffff)", // clean background
              boxShadow:
                "0 16px 40px rgba(15,23,42,0.10), 0 0 0 1px rgba(148,163,184,0.25)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              marginTop: -60, // nudge the card slightly upwards
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
                🔒
              </div>

              <h1
                className="bb-page-title"
                style={{
                  fontSize: "3rem",
                  fontWeight: 800,
                  marginBottom: 10,
                  lineHeight: 1.02,
                  color: "#0f172a",
                }}
              >
                Privacy Policy
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
                At Back&Bone we value your privacy and are committed to
                protecting your personal information. This Privacy Policy
                explains how we collect, use, and safeguard data when you visit
                our website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section
        className="bb-section bb-section-alt"
        style={{ paddingTop: 12, paddingBottom: 40 }}
      >
        <div className="bb-section-shell">
          <div className="bb-pp-card bb-anim-fade-up">
            {/* 1 */}
            <article className="bb-pp-section">
              <header className="bb-pp-section-header">
                <span className="bb-pp-pill">01</span>
                <h3>Information We Collect</h3>
              </header>

              <p>When you visit our website, we may collect:</p>
              <ul>
                <li>Basic usage data (browser type, device, visit duration).</li>
                <li>
                  Analytics information to understand usage patterns and improve
                  the website experience.
                </li>
                <li>
                  Voluntary contact details submitted through forms (name,
                  email, message).
                </li>
              </ul>
              <p>
                We do not collect sensitive financial details through this
                webpage.
              </p>
            </article>

            {/* 2 */}
            <article className="bb-pp-section">
              <header className="bb-pp-section-header">
                <span className="bb-pp-pill">02</span>
                <h3>How We Use Your Information</h3>
              </header>

              <p>We use the data to:</p>
              <ul>
                <li>Improve site design, content and overall performance.</li>
                <li>Respond to inquiries and support requests.</li>
                <li>
                  Send optional updates or marketing communications if you opt
                  in.
                </li>
              </ul>
              <p>We never sell or rent your personal data to third parties.</p>
            </article>

            {/* 3 */}
            <article className="bb-pp-section">
              <header className="bb-pp-section-header">
                <span className="bb-pp-pill">03</span>
                <h3>Cookies &amp; Tracking</h3>
              </header>

              <p>
                Our website uses cookies and similar technologies to analyze
                performance and remember preferences. You may disable cookies in
                your browser settings, but this could affect website
                functionality.
              </p>
            </article>

            {/* 4 */}
            <article className="bb-pp-section">
              <header className="bb-pp-section-header">
                <span className="bb-pp-pill">04</span>
                <h3>Data Security</h3>
              </header>

              <p>
                We implement industry-standard security measures to protect data
                collected on our site. However, no online transmission or
                storage is 100% secure; users browse at their own discretion.
              </p>
            </article>

            {/* 5 */}
            <article className="bb-pp-section">
              <header className="bb-pp-section-header">
                <span className="bb-pp-pill">05</span>
                <h3>Third-Party Links</h3>
              </header>

              <p>
                Our website may contain links to external sites (social media,
                app store pages, partner pages). We are not responsible for the
                privacy practices of those sites; please review their policies
                before sharing personal data.
              </p>
            </article>

            {/* 6 */}
            <article className="bb-pp-section">
              <header className="bb-pp-section-header">
                <span className="bb-pp-pill">06</span>
                <h3>App-Related Data</h3>
              </header>

              <p>
                This policy covers the marketing website only. If you use the
                Back&Bone mobile app, certain user profile, analytics and
                fitness data may be collected in-app — please refer to the
                in-app Privacy Policy for app-specific details.
              </p>
            </article>

            {/* 7 */}
            <article className="bb-pp-section">
              <header className="bb-pp-section-header">
                <span className="bb-pp-pill">07</span>
                <h3>Your Rights</h3>
              </header>

              <ul>
                <li>
                  Request access, correction, or deletion of your contact data.
                </li>
                <li>
                  Opt out of marketing communications at any time by emailing{" "}
                  <strong>support@backandbone.com</strong>.
                </li>
              </ul>
            </article>

            {/* 8 */}
            <article className="bb-pp-section">
              <header className="bb-pp-section-header">
                <span className="bb-pp-pill">08</span>
                <h3>Policy Updates</h3>
              </header>

              <p>
                We may update this Privacy Policy periodically. Any material
                changes will be posted on this page with a revised effective
                date.
              </p>
            </article>

            {/* 9 – CONTACT US */}
            <article className="bb-pp-section bb-pp-section-contact">
              <header className="bb-pp-section-header bb-pp-section-header-center">
                <span className="bb-pp-pill">09</span>
                <h3>Contact Us</h3>
              </header>

              <p className="bb-pp-contact-text">
                For any privacy-related concerns, contact our team:
              </p>

              <div className="bb-pp-contact-row">
                <a
                  href="mailto:support@backandbone.com"
                  className="bb-btn bb-btn-primary bb-pp-contact-btn"
                >
                  support@backandbone.com
                </a>
              </div>

              <p className="bb-pp-contact-note">
                We typically respond within 24 hours.
              </p>
            </article>
          </div>
        </div>

        {/* Scoped styles for this page only */}
        <style>
          {`
            .bb-pp-card {
              max-width: 980px;
              margin: 0 auto;
              border-radius: 28px;
              padding: 26px 24px 30px;
              background: linear-gradient(135deg,#f9f5ff,#faf5ff);
              box-shadow:
                0 24px 60px rgba(15,23,42,0.16),
                0 0 0 1px rgba(148,163,184,0.35);
            }

            .bb-pp-section + .bb-pp-section {
              border-top: 1px solid rgba(148,163,184,0.25);
              margin-top: 18px;
              padding-top: 18px;
            }

            .bb-pp-section-header {
              display: flex;
              align-items: center;
              gap: 10px;
              margin-bottom: 6px;
            }

            .bb-pp-section-header h3 {
              margin: 0;
              font-size: 1.1rem;
              font-weight: 700;
              color: #111827;
            }

            .bb-pp-section-header-center {
              justify-content: center;
            }

            .bb-pp-pill {
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

            .bb-pp-section p {
              margin: 4px 0 6px;
              line-height: 1.7;
              color: #374151;
              font-size: 0.95rem;
            }

            .bb-pp-section ul {
              margin: 4px 0 6px 1.2rem;
              padding-left: 0.4rem;
              line-height: 1.7;
              color: #374151;
              font-size: 0.95rem;
            }

            .bb-pp-section ul li {
              margin-bottom: 2px;
            }

            .bb-pp-section-contact {
              border-top: 1px solid rgba(148,163,184,0.25);
              margin-top: 22px;
              padding-top: 20px;
              text-align: center;
            }

            .bb-pp-contact-text {
              margin: 6px 0 4px;
              line-height: 1.7;
              color: #374151;
              font-size: 0.95rem;
              text-align: center;
            }

            .bb-pp-contact-row {
              display: flex;
              justify-content: center;
              margin-top: 12px;
            }

            .bb-pp-contact-btn {
              border-radius: 999px;
              padding: 10px 26px;
              background: #111827;
              box-shadow: 0 14px 32px rgba(15,23,42,0.45);
              text-decoration: none;
              font-size: 0.93rem;
            }

            .bb-pp-contact-note {
              text-align: center;
              color: var(--bb-muted);
              margin-top: 8px;
              font-size: 0.8rem;
            }

            @media (max-width: 768px) {
              .bb-pp-card {
                padding: 22px 18px 24px;
                border-radius: 22px;
              }

              .bb-pp-contact-row {
                justify-content: center;
              }

              .bb-pp-contact-note {
                text-align: center;
              }
            }
          `}
        </style>
      </section>
    </div>
  );
}
