export default function CTA() {
  return (
    <section className="section section--accent" id="pricing">
      <div className="container cta">
        <div>
          <h2>Start practicing today</h2>
          <p>Get access to realistic inburgering tests, timers and detailed explanations.</p>
        </div>
        <div className="cta__actions">
          <a href="/auth/signup" className="btn btn--primary btn--lg">
            Create free account
          </a>
          <span className="cta__note">Then upgrade to full access when you&apos;re ready.</span>
        </div>
      </div>
    </section>
  );
}
