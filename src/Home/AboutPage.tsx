// src/About/AboutPage.tsx
import "../App.css";

export default function AboutPage() {
  return (
    <div className="bb-page bb-story">
      {/* ===== TOP HEADING ===== */}
      <header
        className="bb-story-header bb-anim-fade-up"
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          textAlign: "center",
          paddingBottom: "60px",
        }}
      >
        <h1
          className="bb-story-title"
          style={{
            fontSize: "3.4rem",
            lineHeight: 1.15,
            marginBottom: "14px",
          }}
        >
          Our Story
        </h1>

        <p
          className="bb-story-tagline"
          style={{
            fontSize: "1.18rem",
            color: "#6b7280",
          }}
        >
          Why we started Back&Bone – and what we’re building with you.
        </p>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section
        className="bb-about-section bb-story-hero-row"
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          paddingBottom: "100px",
          display: "flex",
          flexWrap: "wrap",
          gap: "60px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT TEXT */}
        <div
          className="bb-story-copy bb-anim-slide-left"
          style={{ flex: "1 1 520px", minWidth: 0 }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "20px",
            }}
          >
            Why We Started Back&Bone
          </h2>

          <p style={{ fontSize: "1.08rem", marginBottom: "14px" }}>
            Back&Bone began with a simple frustration: starting a fitness
            journey shouldn't feel so hard.
          </p>

          <p style={{ fontSize: "1.08rem", marginBottom: "14px" }}>
            When our founders first stepped into the world of fitness, they
            struggled with the same challenges most beginners face:
          </p>

          <ul
            style={{
              paddingLeft: "1.4rem",
              fontSize: "1.04rem",
              marginBottom: "20px",
            }}
          >
            <li>Which gym is right for me?</li>
            <li>What workouts should I actually follow?</li>
            <li>How do I get proper guidance without spending a fortune?</li>
          </ul>

          <p style={{ fontSize: "1.08rem", marginBottom: "12px" }}>
            They realized that while motivation may be free, the right support
            often isn't. Personal trainers are expensive, advice is scattered,
            and staying consistent is a challenge.
          </p>

          <p style={{ fontSize: "1.08rem" }}>
            So they built something better — guidance that's smart, affordable,
            and accessible to everyone.
          </p>
        </div>

        {/* RIGHT VISUAL CARD */}
        <div
          className="bb-story-hero-visual bb-anim-slide-right"
          style={{
            flex: "1 1 360px",
            minWidth: 0,
            display: "flex",
            justifyContent: "flex-end",
            background: "transparent", // let inner card handle the color
            boxShadow: "none",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              height: "300px",
              borderRadius: "36px",
              background: "linear-gradient(145deg, #ffe4ea, #fdf2f8)",
              boxShadow:
                "0 40px 90px rgba(148, 27, 128, 0.09), 0 25px 45px rgba(0,0,0,0.06)",
            }}
          />
        </div>
      </section>

      {/* ===== MORE THAN A FITNESS APP ===== */}
      <section
        className="bb-story-section bb-anim-fade-up"
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          paddingBottom: "96px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "2.6rem", marginBottom: "18px" }}>
          Back&Bone is More Than a Fitness App
        </h2>

        <p
          style={{
            fontSize: "1.12rem",
            color: "#6b7280",
            marginBottom: "20px",
          }}
        >
          It's your complete fitness ecosystem — guiding you from where you are
          to where you want to be.
        </p>

        <p style={{ fontSize: "1.08rem", marginBottom: "12px" }}>
          Whether you're beginning or leveling up, Back&Bone adapts to
          your goals, supports your progress, and celebrates every milestone.
        </p>

        <p style={{ fontSize: "1.08rem" }}>
          Because your journey deserves guidance that grows with you.
        </p>
      </section>

      {/* ===== OUR MISSION ===== */}
      <section
        className="bb-story-section bb-anim-fade-up"
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          paddingBottom: "110px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "2.6rem", marginBottom: "18px" }}>Our Mission</h2>

        <p
          style={{
            fontSize: "1.12rem",
            color: "#6b7280",
            marginBottom: "20px",
          }}
        >
          To make fitness simple, affordable, and accessible to everyone.
        </p>

        <p style={{ fontSize: "1.08rem", marginBottom: "12px" }}>
          You shouldn't need a big budget or years of experience to feel strong
          and confident.
        </p>

        <p style={{ fontSize: "1.08rem" }}>
          Fitness should empower — not exclude — you.
        </p>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section
        className="bb-story-cta bb-anim-fade-up"
        style={{
          padding: "80px 24px 110px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "2.8rem", marginBottom: "12px" }}>
          Start Your Fitness Journey Today
        </h2>

        <p
          style={{
            fontSize: "1.08rem",
            color: "#6b7280",
            marginBottom: "26px",
          }}
        >
          Join a growing community building consistency with Back&Bone.
        </p>

        <div className="bb-cta-actions">
          <button className="bb-btn bb-btn-primary">Download the app</button>
          <button className="bb-btn bb-btn-ghost">Explore Features</button>
        </div>
      </section>
    </div>
  );
}
