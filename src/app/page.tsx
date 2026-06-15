import styles from "./page.module.css";
import Hero from "./components/Hero";
import Hello from "./components/Hello";
import Journey from "./components/Journey";
import Projects from "./components/Projects";
import Elsewhere from "./components/Elsewhere";
import Footer from "./components/Footer";

// Global widgets
import LangToggle from "./components/widgets/LangToggle";
import SideNav from "./components/widgets/SideNav";
import ScrollReveal from "./components/widgets/ScrollReveal";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Global Overlays */}
      <LangToggle />
      <SideNav />
      <ScrollReveal />

      {/* Main sections */}
      <Hero />
      <Hello />
      <Journey />
      <Projects />
      <Elsewhere />
      <Footer />
    </div>
  );
}
