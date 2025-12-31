// src/About/AboutPage.tsx
import { useEffect } from "react";
import "../App.css";
import communityImage from "../assets/images/bb-community-gesture.jpg";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bb-aboutV3">
      {/* HERO */}
      <header className="bb-aboutV3-hero">
        <div className="bb-aboutV3-container">
          <div className="bb-aboutV3-heroCardWrap">
            <div className="bb-aboutV3-heroCard">
              <div className="bb-aboutV3-badges">
                <span className="bb-aboutV3-badge bb-aboutV3-badge--brand">
                  Back&Bone
                </span>
                <span className="bb-aboutV3-badge">Community-first</span>
                <span className="bb-aboutV3-badge">Beginner friendly</span>
              </div>

              <h1 className="bb-aboutV3-title">Our Story</h1>
              <p className="bb-aboutV3-subtitle">
                Why we started Back&Bone - and what we’re building with you.
              </p>

              {/* ✅ Section anchors */}
              <div className="bb-aboutV3-anchors" role="navigation" aria-label="About sections">
                <button
                  type="button"
                  className="bb-aboutV3-anchorBtn"
                  onClick={() => scrollToId("bb-story")}
                >
                  Story
                </button>
                <button
                  type="button"
                  className="bb-aboutV3-anchorBtn"
                  onClick={() => scrollToId("bb-ecosystem")}
                >
                  Ecosystem
                </button>
                <button
                  type="button"
                  className="bb-aboutV3-anchorBtn"
                  onClick={() => scrollToId("bb-mission")}
                >
                  Mission
                </button>
              </div>

              <div className="bb-aboutV3-divider" />

              <div className="bb-aboutV3-pillars">
                <div className="bb-aboutV3-pillar">
                  <div className="bb-aboutV3-pillarTop">Guidance</div>
                  <div className="bb-aboutV3-pillarText">
                    Clear workouts, not confusing advice.
                  </div>
                </div>
                <div className="bb-aboutV3-pillar">
                  <div className="bb-aboutV3-pillarTop">Consistency</div>
                  <div className="bb-aboutV3-pillarText">
                    Progress that’s sustainable and realistic.
                  </div>
                </div>
                <div className="bb-aboutV3-pillar">
                  <div className="bb-aboutV3-pillarTop">Support</div>
                  <div className="bb-aboutV3-pillarText">
                    Tools and community that keep you going.
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ subtle scroll hint */}
            <button
              type="button"
              className="bb-aboutV3-scrollHint"
              onClick={() => scrollToId("bb-story")}
              aria-label="Scroll to story section"
              title="Scroll"
            >
              <span className="bb-aboutV3-scrollDot" />
              <span className="bb-aboutV3-scrollText">Scroll</span>
            </button>
          </div>
        </div>
      </header>

      {/* STORY + IMAGE */}
      <section className="bb-aboutV3-section" id="bb-story">
        <div className="bb-aboutV3-container bb-aboutV3-twoCol">
          <div className="bb-aboutV3-card bb-aboutV3-card--copy">
            <h2 className="bb-aboutV3-h2">Why We Started Back&Bone</h2>

            <p className="bb-aboutV3-p">
              Back&Bone began with a simple frustration: starting a fitness
              journey shouldn’t feel so hard.
            </p>

            <p className="bb-aboutV3-p">
              When our founders stepped into fitness, they faced the same
              beginner problems most people face:
            </p>

            <ul className="bb-aboutV3-list">
              <li>Which gym is right for me?</li>
              <li>What workouts should I actually follow?</li>
              <li>How do I get proper guidance without spending a fortune?</li>
            </ul>

            <p className="bb-aboutV3-p">
              Motivation might be free, but the right support often isn’t.
              Personal trainers are expensive, advice is scattered, and staying
              consistent is tough.
            </p>

            <p className="bb-aboutV3-p bb-aboutV3-p--strong">
              So we built something better: smart guidance that’s affordable,
              accessible, and designed for real life.
            </p>

            <div className="bb-aboutV3-stats">
              <div className="bb-aboutV3-stat">
                <div className="bb-aboutV3-statNum">1+</div>
                <div className="bb-aboutV3-statLabel">Journey, many paths</div>
              </div>
              <div className="bb-aboutV3-stat">
                <div className="bb-aboutV3-statNum">3</div>
                <div className="bb-aboutV3-statLabel">Core pillars</div>
              </div>
              <div className="bb-aboutV3-stat">
                <div className="bb-aboutV3-statNum">100%</div>
                <div className="bb-aboutV3-statLabel">Beginner friendly</div>
              </div>
            </div>
          </div>

          <div className="bb-aboutV3-visualStack">
            <div className="bb-aboutV3-card bb-aboutV3-card--image">
              <img
                src={communityImage}
                alt="Community fitness unity"
                className="bb-aboutV3-img"
              />
              <div className="bb-aboutV3-imageGlow" aria-hidden="true" />
            </div>

            <div className="bb-aboutV3-card bb-aboutV3-card--quote">
              <div className="bb-aboutV3-quoteMark">“</div>
              <p className="bb-aboutV3-quoteText">
                Fitness should feel doable. We’re here to make the next step
                clear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="bb-aboutV3-section bb-aboutV3-section--soft" id="bb-ecosystem">
        <div className="bb-aboutV3-container">
          <div className="bb-aboutV3-center">
            <h2 className="bb-aboutV3-h2">More Than A Fitness App</h2>
            <p className="bb-aboutV3-muted">
              A complete fitness ecosystem, guiding you from where you are to
              where you want to be.
            </p>
          </div>

          <div className="bb-aboutV3-grid3">
            <div className="bb-aboutV3-card bb-aboutV3-card--mini">
              <h3 className="bb-aboutV3-h3">Personalized guidance</h3>
              <p className="bb-aboutV3-cardText">
                Plans and direction that adapt to your goals and your schedule.
              </p>
            </div>
            <div className="bb-aboutV3-card bb-aboutV3-card--mini">
              <h3 className="bb-aboutV3-h3">Progress you can track</h3>
              <p className="bb-aboutV3-cardText">
                Stay consistent with simple milestones and clear next actions.
              </p>
            </div>
            <div className="bb-aboutV3-card bb-aboutV3-card--mini">
              <h3 className="bb-aboutV3-h3">Support that stays</h3>
              <p className="bb-aboutV3-cardText">
                Less noise, more clarity, and motivation that lasts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="bb-aboutV3-section" id="bb-mission">
        <div className="bb-aboutV3-container">
          <div className="bb-aboutV3-center">
            <h2 className="bb-aboutV3-h2">Our Mission</h2>
            <p className="bb-aboutV3-muted">
              To make fitness simple, affordable, and accessible to everyone.
            </p>
          </div>

          <div className="bb-aboutV3-grid3">
            <div className="bb-aboutV3-card bb-aboutV3-card--mini bb-aboutV3-card--tint">
              <h3 className="bb-aboutV3-h3">Simple</h3>
              <p className="bb-aboutV3-cardText">
                Clear steps, clean workouts, less confusion.
              </p>
            </div>
            <div className="bb-aboutV3-card bb-aboutV3-card--mini bb-aboutV3-card--tint">
              <h3 className="bb-aboutV3-h3">Affordable</h3>
              <p className="bb-aboutV3-cardText">
                Real support without premium pressure.
              </p>
            </div>
            <div className="bb-aboutV3-card bb-aboutV3-card--mini bb-aboutV3-card--tint">
              <h3 className="bb-aboutV3-h3">Accessible</h3>
              <p className="bb-aboutV3-cardText">
                Built for beginners and busy schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bb-aboutV3-section bb-aboutV3-section--cta">
        <div className="bb-aboutV3-container">
          <div className="bb-aboutV3-ctaCard">
            <h2 className="bb-aboutV3-ctaTitle">Start Your Fitness Journey Today</h2>
            <p className="bb-aboutV3-ctaText">
              Join a growing community building consistency with Back&Bone.
            </p>

            <div className="bb-aboutV3-ctaActions">
              <button className="bb-btn bb-btn-primary">Download the app</button>
              <button className="bb-btn bb-btn-ghost">Explore Features</button>
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
          .bb-aboutV3{
            color:#0f172a;
            background:
              radial-gradient(1200px 380px at 20% -10%, rgba(99,102,241,0.16), transparent 60%),
              radial-gradient(900px 320px at 85% 0%, rgba(34,211,238,0.12), transparent 55%),
              linear-gradient(180deg, rgba(99,102,241,0.06), rgba(255,255,255,0) 32%),
              #ffffff;
          }

          .bb-aboutV3-container{
            max-width: 1120px;
            margin: 0 auto;
            padding: 0 20px;
          }

          /* ✅ navbar safe space */
         .bb-aboutV3-hero{
             padding-top: 72px;   /* matches navbar height */
             padding-bottom: 20px;
             }

          /* ✅ keep hero card not full width */
          .bb-aboutV3-heroCardWrap{
            display:flex;
            flex-direction: column;
            align-items:center;
            gap: 14px;
          }

          .bb-aboutV3-heroCard{
            width: 100%;
            max-width: 920px; /* ✅ narrower, premium */
            border-radius: 26px;
            background: rgba(255,255,255,0.88);
            border: 1px solid rgba(15,23,42,0.08);
            box-shadow: 0 22px 70px rgba(2,6,23,0.08);
            padding: 28px 26px;
            text-align: center;
          }

          .bb-aboutV3-badges{
            display:flex;
            justify-content:center;
            gap: 10px;
            flex-wrap:wrap;
            margin-bottom: 14px;
          }

          .bb-aboutV3-badge{
            font-size: 0.92rem;
            font-weight: 750;
            padding: 7px 12px;
            border-radius: 999px;
            background: rgba(15,23,42,0.04);
            border: 1px solid rgba(15,23,42,0.08);
          }

          .bb-aboutV3-badge--brand{
            background: rgba(99,102,241,0.14);
            border: 1px solid rgba(99,102,241,0.24);
            font-weight: 900;
          }

          .bb-aboutV3-title{
            margin: 0;
            font-size: 3.15rem;
            line-height: 1.04;
            letter-spacing: -0.7px;
          }

          .bb-aboutV3-subtitle{
            margin: 10px auto 0;
            max-width: 70ch;
            color: #475569;
            font-size: 1.1rem;
            line-height: 1.65;
          }

          /* ✅ section anchors */
          .bb-aboutV3-anchors{
            margin: 14px auto 0;
            display:flex;
            gap: 10px;
            justify-content:center;
            flex-wrap: wrap;
          }
          .bb-aboutV3-anchorBtn{
            border: 1px solid rgba(15,23,42,0.10);
            background: rgba(255,255,255,0.7);
            color:#0f172a;
            padding: 8px 12px;
            border-radius: 999px;
            font-weight: 800;
            font-size: 0.95rem;
            cursor: pointer;
            transition: transform .12s ease, background .12s ease;
          }
          .bb-aboutV3-anchorBtn:hover{
            background: rgba(99,102,241,0.10);
            transform: translateY(-1px);
          }
          .bb-aboutV3-anchorBtn:active{
            transform: translateY(0px);
          }

          .bb-aboutV3-divider{
            margin: 18px auto 16px;
            height: 1px;
            width: 100%;
            max-width: 820px;
            background: rgba(15,23,42,0.08);
          }

          .bb-aboutV3-pillars{
            display:grid;
            grid-template-columns: repeat(3, minmax(0,1fr));
            gap: 12px;
            max-width: 860px;
            margin: 0 auto;
            text-align:left;
          }

          .bb-aboutV3-pillar{
            border-radius: 16px;
            padding: 14px 14px;
            background: rgba(15,23,42,0.03);
            border: 1px solid rgba(15,23,42,0.06);
          }

          .bb-aboutV3-pillarTop{
            font-weight: 900;
            margin-bottom: 4px;
          }

          .bb-aboutV3-pillarText{
            color:#475569;
            font-size: 0.98rem;
            line-height: 1.45;
          }

          /* ✅ scroll hint */
          .bb-aboutV3-scrollHint{
            border: 0;
            background: transparent;
            cursor: pointer;
            display:flex;
            align-items:center;
            gap: 10px;
            color:#64748b;
            font-weight: 800;
            padding: 8px 10px;
            border-radius: 999px;
            transition: background .12s ease;
          }
          .bb-aboutV3-scrollHint:hover{
            background: rgba(15,23,42,0.04);
          }
          .bb-aboutV3-scrollDot{
            width: 10px;
            height: 16px;
            border-radius: 999px;
            border: 2px solid rgba(99,102,241,0.55);
            position: relative;
          }
          .bb-aboutV3-scrollDot:after{
            content:"";
            position:absolute;
            left:50%;
            top:3px;
            transform: translateX(-50%);
            width: 4px;
            height: 4px;
            border-radius: 999px;
            background: rgba(99,102,241,0.80);
            animation: bbScrollDot 1.35s ease-in-out infinite;
          }
          @keyframes bbScrollDot{
            0%{ opacity: .2; transform: translateX(-50%) translateY(0); }
            50%{ opacity: 1; transform: translateX(-50%) translateY(6px); }
            100%{ opacity: .2; transform: translateX(-50%) translateY(0); }
          }
          .bb-aboutV3-scrollText{
            font-size: 0.95rem;
          }

          /* sections */
          .bb-aboutV3-section{
            padding: 32px 0;
          }
          .bb-aboutV3-section--soft{
            padding: 34px 0;
            background: linear-gradient(180deg, rgba(99,102,241,0.06), rgba(255,255,255,0));
          }

          .bb-aboutV3-twoCol{
            display:grid;
            grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.9fr);
            gap: 18px;
            align-items: start;
          }

          .bb-aboutV3-card{
            border-radius: 20px;
            border: 1px solid rgba(15,23,42,0.08);
            background: rgba(255,255,255,0.92);
            box-shadow: 0 18px 54px rgba(2,6,23,0.07);
          }

          .bb-aboutV3-card--copy{
            padding: 22px;
          }

          .bb-aboutV3-h2{
            margin: 0 0 10px;
            font-size: 2.05rem;
            letter-spacing: -0.35px;
          }

          .bb-aboutV3-h3{
            margin: 0 0 8px;
            font-size: 1.18rem;
          }

          .bb-aboutV3-p{
            margin: 10px 0;
            font-size: 1.05rem;
            line-height: 1.78;
            color:#0f172a;
          }
          .bb-aboutV3-p--strong{
            font-weight: 800;
          }

          .bb-aboutV3-list{
            margin: 12px 0;
            padding-left: 18px;
            line-height: 1.75;
            font-size: 1.03rem;
          }
          .bb-aboutV3-list li{ margin: 7px 0; }

          .bb-aboutV3-stats{
            margin-top: 16px;
            display:grid;
            grid-template-columns: repeat(3, minmax(0,1fr));
            gap: 10px;
          }
          .bb-aboutV3-stat{
            border-radius: 16px;
            padding: 12px;
            background: rgba(99,102,241,0.08);
            border: 1px solid rgba(99,102,241,0.18);
          }
          .bb-aboutV3-statNum{
            font-size: 1.5rem;
            font-weight: 950;
            line-height: 1;
          }
          .bb-aboutV3-statLabel{
            margin-top: 6px;
            font-size: 0.98rem;
            color:#334155;
            line-height: 1.35;
          }

          .bb-aboutV3-visualStack{
            display:flex;
            flex-direction: column;
            gap: 12px;
          }
          .bb-aboutV3-card--image{
            overflow:hidden;
            height: 360px;
            position: relative;
          }
          .bb-aboutV3-img{
            width:100%;
            height:100%;
            object-fit: cover;
            display:block;
          }
          .bb-aboutV3-imageGlow{
            position:absolute;
            inset:-60px;
            background: radial-gradient(circle at 30% 20%, rgba(99,102,241,0.20), transparent 60%);
            pointer-events:none;
          }

          .bb-aboutV3-card--quote{
            padding: 16px 16px 16px 18px;
            display:flex;
            gap: 10px;
            align-items:flex-start;
            background: rgba(15,23,42,0.02);
          }
          .bb-aboutV3-quoteMark{
            font-size: 1.9rem;
            line-height: 1;
            font-weight: 950;
            color: rgba(99,102,241,0.95);
            margin-top: -2px;
          }
          .bb-aboutV3-quoteText{
            margin: 0;
            color:#334155;
            line-height: 1.65;
            font-size: 1.02rem;
          }

          .bb-aboutV3-center{
            text-align:center;
            max-width: 860px;
            margin: 0 auto 16px;
          }
          .bb-aboutV3-muted{
            margin: 8px auto 0;
            color:#475569;
            font-size: 1.08rem;
            line-height: 1.65;
          }

          .bb-aboutV3-grid3{
            display:grid;
            grid-template-columns: repeat(3, minmax(0,1fr));
            gap: 14px;
          }

          .bb-aboutV3-card--mini{
            padding: 18px;
          }

          .bb-aboutV3-card--tint{
            background: rgba(99,102,241,0.06);
            border: 1px solid rgba(99,102,241,0.14);
          }

          .bb-aboutV3-cardText{
            margin: 0;
            color:#334155;
            font-size: 1.02rem;
            line-height: 1.65;
          }

          .bb-aboutV3-section--cta{
            padding: 28px 0 56px;
          }
          .bb-aboutV3-ctaCard{
            border-radius: 24px;
            padding: 26px 22px;
            text-align:center;
            background:
              radial-gradient(900px 240px at 15% -10%, rgba(34,211,238,0.22), transparent 60%),
              radial-gradient(900px 240px at 85% 10%, rgba(99,102,241,0.22), transparent 60%),
              linear-gradient(180deg, rgba(99,102,241,0.08), rgba(15,23,42,0.02));
            border: 1px solid rgba(15,23,42,0.08);
            box-shadow: 0 24px 74px rgba(2,6,23,0.08);
          }
          .bb-aboutV3-ctaTitle{
            margin: 0 0 10px;
            font-size: 2.1rem;
            letter-spacing: -0.25px;
          }
          .bb-aboutV3-ctaText{
            margin: 0 auto 18px;
            max-width: 70ch;
            color:#475569;
            font-size: 1.05rem;
            line-height: 1.65;
          }
          .bb-aboutV3-ctaActions{
            display:flex;
            justify-content:center;
            gap: 12px;
            flex-wrap: wrap;
          }
            .bb-footer-heading--brand:hover{
  text-shadow:
    0 0 16px rgba(34,211,238,0.65),
    0 0 36px rgba(99,102,241,0.55);
}


          /* Responsive */
          @media (max-width: 980px){
            .bb-aboutV3-pillars{ grid-template-columns: 1fr; }
            .bb-aboutV3-twoCol{ grid-template-columns: 1fr; }
            .bb-aboutV3-card--image{ height: 320px; }
            .bb-aboutV3-grid3{ grid-template-columns: 1fr; }
            .bb-aboutV3-stats{ grid-template-columns: 1fr; }
            .bb-aboutV3-heroCard{ max-width: 720px; }
          }
          @media (max-width: 640px){
            .bb-aboutV3-hero{ padding-top: 96px; }
            .bb-aboutV3-title{ font-size: 2.35rem; }
            .bb-aboutV3-h2{ font-size: 1.8rem; }
            .bb-aboutV3-heroCard{ padding: 22px 18px; }
          }
            @media (max-width: 640px){
            .bb-aboutV3-hero{
              padding-top: 56px;   /* mobile navbar height */
              padding-bottom: 16px;
            }
          }

        `}
      </style>
    </div>
  );
}
