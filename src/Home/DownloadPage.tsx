// src/Home/DownloadPage.tsx
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import "../App.css";

// Import the popup
import AppDownloadPopup from "../components/AppDownloadPopup";

export default function DownloadPage() {
  const [showPopup, setShowPopup] = useState(false);

  // Show popup on download / try
  const handleIOSDownload = () => {
    // window.open("https://apps.apple.com/your-app", "_blank");
    setShowPopup(true);
  };

  const handleAndroidDownload = () => {
    // window.open("https://play.google.com/store/apps/details?id=your.app", "_blank");
    setShowPopup(true);
  };

  // const handleTry = () => {
  //   setShowPopup(true);
  // };

  return (
    <>
      <Helmet>
        <title>Download Back&Bone App - iOS & Android</title>
        <meta name="description" content="Download Back&Bone fitness app for iOS and Android. Currently in beta testing. Join our closed beta program for personalized AI-powered workouts and gym discovery." />
        <meta name="keywords" content="download Back&Bone, fitness app download, iOS app, Android app, beta testing, mobile fitness app" />
        <link rel="canonical" href="https://backandbone.com/app-download" />
        <meta property="og:title" content="Download Back&Bone App - iOS & Android" />
        <meta property="og:description" content="Download Back&Bone fitness app for iOS and Android. Currently in beta testing with exclusive features." />
        <meta property="og:image" content="https://backandbone.com/src/assets/images/CircLogo.png" />
        <meta property="og:url" content="https://backandbone.com/app-download" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Download Back&Bone App - iOS & Android" />
        <meta name="twitter:description" content="Download Back&Bone fitness app for iOS and Android. Currently in beta testing." />
        <meta name="twitter:image" content="https://backandbone.com/src/assets/images/CircLogo.png" />
      </Helmet>
      <div
        className="bb-page"
        style={{
          paddingTop: "104px",
          overflowX: "hidden",
          background:
            "radial-gradient(circle at 0% 0%, #ede9fe 0, #f5f3ff 40%, #f9fafb 100%)",
        }}
      >
      <section className="bb-section bb-section-alt">
        <div
          className="bb-section-shell"
          style={{ maxWidth: 980, margin: "0 auto" }}
        >
          {/* HERO */}
          <header style={{ textAlign: "center", marginBottom: 32 }}>
            <p className="bb-hero-kicker">App Download</p>
            <h1
              style={{
                fontSize: "2.8rem",
                lineHeight: 1.05,
                fontWeight: 800,
                marginBottom: 12,
                color: "#111827",
              }}
            >
              Back&Bone App Status
            </h1>
            <p
              className="bb-section-subtitle"
              style={{
                maxWidth: 640,
                margin: "0 auto",
                fontSize: "1.02rem",
              }}
            >
              We're polishing the Back&Bone mobile experience before
              opening it up to everyone. Check the current status and grab the
              latest app builds when they are ready.
            </p>


            <a
  href=""
  className="bb-btn bb-btn-ghost bb-btn-animated"
  style={{
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 18px",
    borderRadius: "999px",
  }}
>
  Try It
</a>


          </header>

          {/* STATUS CARD */}
          <div
            className="bb-card-hover"
            style={{
              borderRadius: 32,
              padding: "28px 26px 26px",
              background: "linear-gradient(145deg, #ffffff, #f5f3ff, #fdf2ff)",
              boxShadow:
                "0 26px 70px rgba(148,163,184,0.35), 0 0 0 1px rgba(148,163,184,0.18)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Soft glow background */}
            <div
              style={{
                position: "absolute",
                inset: "-40%",
                background:
                  "radial-gradient(circle at 0 0, rgba(139,92,246,0.18), transparent 60%), radial-gradient(circle at 100% 100%, rgba(236,72,153,0.16), transparent 60%)",
                zIndex: 0,
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 1,
              }}
            >
              <h2
                style={{
                  fontSize: "1.55rem",
                  marginBottom: 8,
                  color: "#111827",
                }}
              >
                Mobile apps currently in beta
              </h2>
              <p
                style={{
                  margin: 0,
                  color: "#4b5563",
                  fontSize: "0.98rem",
                  lineHeight: 1.6,
                }}
              >
                We're running a closed beta with a small group of users to
                refine workout flows, performance, and privacy controls. Use the
                download buttons below once your platform build is available.
              </p>

              {/* Pills Row */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 16,
                  marginTop: 20,
                }}
              >
                {/* iOS */}
                <StatusPill
                  label="iOS"
                  tone="purple"
                  buttonLabel="Download"
                  onClick={handleIOSDownload}
                />

                {/* Android */}
                <StatusPill
                  label="Android"
                  tone="pink"
                  buttonLabel="Download"
                  onClick={handleAndroidDownload}
                />
              </div>
            </div>
          </div>

          {/* Footer note */}
          <p
            style={{
              marginTop: 22,
              textAlign: "center",
              fontSize: "0.88rem",
              color: "#6b7280",
            }}
          >
            Already part of the beta? Use the invite link we emailed you or
            reach out at{" "}
            <a
              href="mailto:support@backandbone.com"
              style={{ color: "#7c3aed", fontWeight: 500 }}
            >
              support@backandbone.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* ---------- POPUP HERE ---------- */}
      {showPopup && (
        <AppDownloadPopup
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  </>
  );
}

/* ------------------------------------ */
/*            STATUS PILL               */
/* ------------------------------------ */

type StatusPillProps = {
  label: string;
  tone: "purple" | "pink";
  status?: string;
  buttonLabel?: string;
  onClick?: () => void;
};

function StatusPill({
  label,
  tone,
  status,
  buttonLabel,
  onClick,
}: StatusPillProps) {
  const gradients: Record<
    StatusPillProps["tone"],
    { bg: string; dot: string }
  > = {
    purple: {
      bg: "linear-gradient(135deg, rgba(129,140,248,0.16), rgba(139,92,246,0.18))",
      dot: "#6366f1",
    },
    pink: {
      bg: "linear-gradient(135deg, rgba(244,114,182,0.18), rgba(236,72,153,0.2))",
      dot: "#ec4899",
    },
  };

  const style = gradients[tone];

  return (
    <div
      style={{
        minWidth: 220,
        borderRadius: 999,
        padding: "8px 14px",
        background: style.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        color: "#111827",
      }}
    >
      {/* Left side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          minWidth: 0,
        }}
      >
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: "999px",
            background: style.dot,
            boxShadow: `0 0 10px ${style.dot}`,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontWeight: 600,
            fontSize: "0.86rem",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>

        {status && (
          <span
            style={{
              fontSize: "0.8rem",
              color: "#4b5563",
              marginLeft: 4,
              whiteSpace: "nowrap",
            }}
          >
            · {status}
          </span>
        )}
      </div>

      {/* Right side: Button */}
      {buttonLabel && (
        <button
          type="button"
          onClick={onClick}
          style={{
            borderRadius: 999,
            border: "none",
            padding: "6px 14px",
            fontSize: "0.8rem",
            fontWeight: 600,
            cursor: "pointer",
            background:
              tone === "pink"
                ? "linear-gradient(135deg, #fb7185, #ec4899)"
                : "linear-gradient(135deg, #4f46e5, #6366f1)",
            color: "#fff",
            boxShadow: "0 8px 20px rgba(79,70,229,0.35)",
            flexShrink: 0,
          }}
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
}
