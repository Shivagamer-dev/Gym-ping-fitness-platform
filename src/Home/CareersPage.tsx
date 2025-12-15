// src/Home/CareersPage.tsx
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
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
        if (!res.ok)
          throw new Error(`Failed to fetch careers.json (${res.status})`);
        const data = await res.json();

        if (!mounted) return;

        const maybeJobs: Job[] = Array.isArray(data)
          ? data
          : (data.openings as Job[]) ??
            (data.jobs as Job[]) ??
            [];

        setJobs(maybeJobs || []);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error("Error fetching careers.json", err);
        setError(
          "Could not load job listings right now. Please check back in a bit."
        );
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

  return (
    <div
      className="bb-page"
      style={{
        paddingTop: "104px",
        background:
          "radial-gradient(circle at 0% 0%, #ede9fe 0, #fdf4ff 40%, #f5f3ff 100%)",
      }}
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

      <main className="careers-page" role="main">
        {/* ================= HERO ================= */}
        <section className="careers-hero">
          <div className="careers-hero-card-shell">
            <header>
              <p className="careers-hero-kicker">Careers at Back&Bone</p>
              <h1>Shape the Future of Fitness</h1>
              <p className="careers-hero-subtitle">
                Join a team that's building the next generation of
                AI-powered fitness experiences. With people at the center and
                privacy by design, Back&Bone is where innovation meets
                impact.
              </p>
            </header>

            <div className="careers-hero-badges">
              <span className="careers-hero-badge">Remote-first</span>
              <span className="careers-hero-badge">Competitive benefits</span>
              <span className="careers-hero-badge">Growth opportunities</span>
            </div>

            <div className="careers-hero-cards">
              <article className="careers-hero-pill">
                <h3>Innovation-driven</h3>
                <p>
                  Work with advanced AI, ML, and product analytics to shape
                  tools used by real people every day.
                </p>
              </article>

              <article className="careers-hero-pill">
                <h3>Collaborative culture</h3>
                <p>
                  Join a tight-knit, diverse team where every idea is heard and
                  ownership is shared.
                </p>
              </article>

              <article className="careers-hero-pill">
                <h3>Career growth</h3>
                <p>
                  Learn fast with mentorship, feedback, and opportunities to
                  ship meaningful work early.
                </p>
              </article>
            </div>

            <p className="careers-cta-line">
              <a className="careers-cta-link" href="#openings">
                View openings
              </a>{" "}
              <span className="careers-cta-now">and apply today.</span>
            </p>
          </div>
        </section>

        {/* ================= OPENINGS ================= */}
        <section id="openings" className="careers-openings">
          <div className="careers-openings-shell">
            <div className="careers-openings-card">
              <h2>Current Opportunities</h2>

              {loading && (
                <p className="careers-status careers-status-loading">
                  Loading openings…
                </p>
              )}

              {error && (
                <p className="careers-status careers-status-error">{error}</p>
              )}

              {!loading && !error && jobs.length === 0 && (
                <p className="careers-status">
                  No openings available right now. Please check back later.
                </p>
              )}

              {!loading &&
                !error &&
                jobs.map((job, idx) => (
                  <article className="job-card" key={idx}>
                    <header className="job-card-header">
                      <div>
                        <h3 className="job-title">{job.title}</h3>

                        <p className="job-meta">
                          {job.role && (
                            <span className="job-role">{job.role}</span>
                          )}
                          {job.type && (
                            <span className="job-pill job-pill-type">
                              {job.type}
                            </span>
                          )}
                          {job.location && (
                            <span className="job-pill job-pill-location">
                              {job.location}
                            </span>
                          )}
                        </p>
                      </div>
                    </header>

                    {job.description && (
                      <>
                        <p className="job-label">About the role</p>
                        <p className="job-description">{job.description}</p>
                      </>
                    )}

                    {job.exReq && job.exReq.length > 0 && (
                      <>
                        <p className="job-label">What we're looking for</p>
                        <ul className="job-list">
                          {job.exReq.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    <div className="job-footer">
                      <button
                        onClick={() => openPopup(job.title, job.role)}
                        className="job-apply-btn"
                      >
                        Apply Now
                      </button>

                      <span className="job-footer-note">
                        Send your resume and a short note about why you'd
                        be a great fit.
                      </span>
                    </div>
                  </article>
                ))}
            </div>

            <p className="careers-email-note">
              Prefer email? Share your resume and cover letter with our talent
              team at{" "}
              <span className="careers-email">careers@backandbone.com</span>.
            </p>
          </div>
        </section>
      </main>

      {/* ================= INLINE PAGE STYLES ================= */}
      <style>
        {`
        .careers-page {
          padding: 40px 0 80px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
          color: #111827;
        }

        /* HERO */
        .careers-hero {
          display: flex;
          justify-content: center;
          padding: 0 16px 40px;
        }

        .careers-hero-card-shell {
          width: 100%;
          max-width: 1080px;
          padding: 40px 40px 32px;
          border-radius: 32px;
          background: #ffffff;
          box-shadow:
            0 32px 90px rgba(148, 163, 184, 0.45),
            0 0 0 1px rgba(179, 144, 255, 0.35);
          position: relative;
        }

        .careers-hero-card-shell::before {
          content: "";
          position: absolute;
          inset: -40px;
          border-radius: 48px;
          background:
            radial-gradient(circle at 0 0, rgba(139, 92, 246, 0.22), transparent 55%),
            radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.18), transparent 55%);
          z-index: -1;
          opacity: 0.9;
        }

        .careers-hero-kicker {
          margin: 0 0 6px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 0.78rem;
          font-weight: 600;
          color: #7c3aed;
          text-align: center;
        }

        .careers-hero h1 {
          margin: 0 0 10px;
          font-size: 2.6rem;
          line-height: 1.1;
          font-weight: 800;
          text-align: center;
          color: #18181b;
        }

        .careers-hero-subtitle {
          margin: 0 auto 22px;
          max-width: 760px;
          text-align: center;
          font-size: 1.02rem;
          color: #4b5563;
          line-height: 1.6;
        }

        .careers-hero-badges {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 26px;
        }

        .careers-hero-badge {
          padding: 7px 16px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: #4c1d95;
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.25);
          text-transform: uppercase;
        }

        .careers-hero-cards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }

        .careers-hero-pill {
          padding: 16px 18px 15px;
          border-radius: 20px;
          background: #f6f0ff;
          color: #312e81;
          box-shadow: 0 14px 28px rgba(148, 163, 184, 0.25);
        }

        .careers-hero-pill h3 {
          margin: 0 0 6px;
          font-size: 1rem;
          font-weight: 700;
        }

        .careers-hero-pill p {
          margin: 0;
          font-size: 0.92rem;
          line-height: 1.55;
        }

        .careers-cta-line {
          margin: 10px 0 0;
          text-align: center;
          font-size: 0.96rem;
          color: #4b5563;
        }

        .careers-cta-link {
          color: #7c3aed;
          font-weight: 600;
          text-decoration: underline;
          text-decoration-thickness: 1.5px;
          text-underline-offset: 3px;
        }

        .careers-cta-link:hover {
          color: #6d28d9;
        }

        .careers-cta-now {
          color: #ec4899;
          font-weight: 600;
        }

        /* OPENINGS */
        .careers-openings {
          padding: 24px 16px 0;
        }

        .careers-openings-shell {
          max-width: 1080px;
          margin: 0 auto;
        }

        .careers-openings-card {
          background: #ffffff;
          border-radius: 28px;
          padding: 28px 32px 26px;
          box-shadow:
            0 22px 65px rgba(148, 163, 184, 0.45),
            0 0 0 1px rgba(148, 163, 184, 0.25);
        }

        .careers-openings-card h2 {
          margin: 0 0 18px;
          font-size: 1.8rem;
          font-weight: 700;
          color: #111827;
        }

        .careers-status {
          margin: 4px 0 2px;
          color: #6b7280;
          font-size: 0.94rem;
        }

        .careers-status-loading {
          color: #7c3aed;
        }

        .careers-status-error {
          color: #b91c1c;
          font-weight: 500;
        }

        .job-card {
          margin-top: 20px;
          padding: 20px 22px 18px;
          border-radius: 22px;
          background: linear-gradient(135deg, #f9fafb, #f5f3ff);
          box-shadow: 0 14px 40px rgba(148, 163, 184, 0.35);
          border: 1px solid rgba(199, 210, 254, 0.7);
          transition:
            transform 200ms ease,
            box-shadow 200ms ease,
            border-color 200ms ease,
            background 200ms ease;
        }

        .job-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 60px rgba(129, 140, 248, 0.6);
          border-color: rgba(129, 140, 248, 1);
          background: linear-gradient(135deg, #f3e8ff, #fdf2ff);
        }

        .job-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .job-title {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
        }

        .job-meta {
          margin: 6px 0 0;
          font-size: 0.9rem;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          color: #4b5563;
        }

        .job-role {
          font-weight: 600;
          color: #4f46e5;
        }

        .job-pill {
          display: inline-flex;
          align-items: center;
          padding: 4px 11px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .job-pill-type {
          background: rgba(139, 92, 246, 0.08);
          color: #5b21b6;
          border: 1px solid rgba(139, 92, 246, 0.4);
        }

        .job-pill-location {
          background: rgba(56, 189, 248, 0.08);
          color: #0369a1;
          border: 1px solid rgba(56, 189, 248, 0.4);
        }

        .job-label {
          margin: 14px 0 4px;
          font-size: 0.84rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #6b21a8;
        }

        .job-description {
          margin: 0;
          font-size: 0.95rem;
          color: #374151;
          line-height: 1.7;
        }

        .job-list {
          margin: 8px 0 0 20px;
          padding: 0;
          font-size: 0.93rem;
          color: #374151;
          line-height: 1.65;
        }

        .job-footer {
          margin-top: 16px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
        }

        .job-apply-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 22px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          color: #f9fafb;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 16px 38px rgba(236, 72, 153, 0.55);
          cursor: pointer;
          transition:
            transform 160ms ease,
            box-shadow 160ms ease,
            filter 160ms ease;
        }

        .job-apply-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 20px 46px rgba(236, 72, 153, 0.7);
          filter: brightness(1.05);
        }

        .job-footer-note {
          font-size: 0.83rem;
          color: #6b7280;
        }

        .careers-email-note {
          margin: 18px 0 0;
          text-align: center;
          font-size: 0.9rem;
          color: #4b5563;
        }

        .careers-email {
          color: #7c3aed;
          font-weight: 600;
        }

        .careers-email:hover {
          color: #6d28d9;
        }

        @media (max-width: 900px) {
          .careers-hero-card-shell {
            padding: 28px 20px 22px;
            border-radius: 24px;
          }

          .careers-hero h1 {
            font-size: 2.1rem;
          }

          .careers-hero-cards {
            grid-template-columns: 1fr;
          }

          .careers-openings-card {
            padding: 22px 20px 18px;
          }

          .job-card {
            padding: 18px 16px 16px;
          }
        }
      `}
      </style>
    </div>
  );
}
