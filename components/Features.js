export default function Features() {
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <header className="section__header">
          <h2>How DutchExam helps you pass inburgering</h2>
          <p>Realistic practice, clear explanations and smart repetition – all in one place.</p>
        </header>

        <div className="grid grid--3">
          <article className="card">
            <div className="card__icon">⏱</div>
            <h3 className="card__title">Real exam timing</h3>
            <p className="card__text">
              Practice with the same time limits and structure as the official exam, so the real day feels familiar.
            </p>
          </article>

          <article className="card">
            <div className="card__icon">🧠</div>
            <h3 className="card__title">Smart feedback</h3>
            <p className="card__text">
              See which question types you fail most often and get tips on how to improve those specific skills.
            </p>
          </article>

          <article className="card">
            <div className="card__icon">📊</div>
            <h3 className="card__title">Track your progress</h3>
            <p className="card__text">
              Watch your scores grow each week and know exactly when you are ready to book the real inburgering exam.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
