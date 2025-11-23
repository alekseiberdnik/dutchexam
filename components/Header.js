"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="container header__inner">
        <a href="/" className="logo">
          <span className="logo__dot" />
          <span className="logo__text">
            Dutch<span>Exam</span>
          </span>
        </a>

        <nav className={`nav ${menuOpen ? "nav--open" : ""}`}>
          <div className="nav__group">
            <div className="nav__item nav__item--dropdown">
              <button className="nav__link" type="button">
                Our tests
                <span className="nav__chevron">▾</span>
              </button>
              <div className="nav__dropdown">
                <a href="#tests" className="nav__dropdown-link">Inburgering A2</a>
                <a href="#tests" className="nav__dropdown-link">Inburgering B1</a>
                <a href="#tests" className="nav__dropdown-link">KNM &amp; ONA</a>
              </div>
            </div>

            <div className="nav__item nav__item--dropdown">
              <button className="nav__link" type="button">
                About
                <span className="nav__chevron">▾</span>
              </button>
              <div className="nav__dropdown">
                <a href="#how-it-works" className="nav__dropdown-link">How it works</a>
                <a href="#for-whom" className="nav__dropdown-link">Who is it for?</a>
              </div>
            </div>

            <a href="#pricing" className="nav__link nav__link--ghost">Pricing</a>
          </div>

          <div className="nav__actions">
            <a href="/auth/login" className="btn btn--ghost">Log in</a>
            <a href="/auth/signup" className="btn btn--primary">Sign up</a>
          </div>
        </nav>

        <button
          className={`burger ${menuOpen ? "burger--open" : ""}`}
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
