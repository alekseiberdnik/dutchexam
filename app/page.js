import Header from "@components/Header";
import Hero from "@components/Hero";
import Features from "@components/Features";
import CTA from "@components/CTA";
import Footer from "@components/Footer";

export default function Home() {
  return (
    <div className="page-root">
      <div className="bg-gradient" />
      <Header />
      <main className="main">
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
