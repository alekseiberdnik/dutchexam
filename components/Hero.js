export default function Hero() {
  return (
    <section className="section hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <div className="eyebrow">Inburgering exam trainer · Online</div>
          <h1 className="hero__title">
            Pass your Dutch inburgering
            <span className="hero__accent"> from the first attempt</span>
          </h1>
          <p className="hero__subtitle">
            Practice with realistic DutchExam tests, instant feedback and smart tips in English, Dutch or Russian.
            Short sessions, real exam timing, clear explanations.
          </p>

          <div className="hero__cta">
            <a href="/auth/signup" className="btn btn--primary btn--lg">
              Start free practice test
            </a>
            <button className="btn btn--ghost btn--lg" type="button" onClick={() => {
              const el = document.getElementById("how-it-works");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}>
              How it works
            </button>
          </div>

          <ul className="hero__badges">
            <li>✓ Based on official inburgering format</li>
            <li>✓ Timers &amp; scoring like real exam</li>
            <li>✓ Track your weak topics</li>
          </ul>
        </div>

        <div className="hero__card">
          <div className="hero-card">
            <div className="hero-card__header">
              <span className="hero-card__pill">Demo exam</span>
              <span className="hero-card__status">Today · 30 min</span>
            </div>

            <div className="hero-card__stats">
              <div>
                <div className="hero-card__stat-label">Overall progress</div>
                <div className="hero-card__stat-value">63%</div>
                <div className="hero-card__bar">
                  <div className="hero-card__bar-fill hero-card__bar-fill--primary" style={{ width: "63%" }} />
                </div>
              </div>
              <div>
                <div className="hero-card__stat-label">Chance to pass</div>
                <div className="hero-card__stat-value hero-card__stat-value--good">High</div>
              </div>
            </div>

            <div className="hero-card__grid">
              <div className="hero-card__item">
                <div className="hero-card__item-label">Reading</div>
                <div className="hero-card__item-score">18 / 20</div>
              </div>
              <div className="hero-card__item">
                <div className="hero-card__item-label">Listening</div>
                <div className="hero-card__item-score">15 / 20</div>
              </div>
              <div className="hero-card__item">
                <div className="hero-card__item-label">Writing</div>
                <div className="hero-card__item-score">11 / 20</div>
              </div>
              <div className="hero-card__item">
                <div className="hero-card__item-label">Speaking</div>
                <div className="hero-card__item-score">12 / 20</div>
              </div>
            </div>

            <button type="button" className="btn btn--primary btn--full">
              Try a free sample test
            </button>

            <p className="hero-card__hint">
              No credit card needed · Works on phone, tablet and laptop
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
