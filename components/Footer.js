export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="logo__dot" />
          <span className="logo__text">
            Dutch<span>Exam</span>
          </span>
        </div>
        <div className="footer__links">
          <a href="/privacy">Privacy policy</a>
          <a href="/terms">Terms</a>
          <a href="mailto:hello@dutchexam.online">Support</a>
        </div>
        <div className="footer__copy">
          © {new Date().getFullYear()} DutchExam. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
