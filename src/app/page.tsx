import styles from "./page.module.css";
import Hero from "./components/Hero";
import Hello from "./components/Hello";
import Journey from "./components/Journey";
import Projects from "./components/Projects";
import Elsewhere from "./components/Elsewhere";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <Hello />
      <Journey />
      <Projects />
      <Elsewhere />
      <Footer />
    </div>
  );
}
