'use client';

import styles from "./Hero.module.css";
import { useLanguage } from "../context/LanguageContext";
import ContactButton from "./widgets/ContactButton";

export default function Hero() {
  const { language } = useLanguage();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.hero} id="hero" data-reveal>
      <ContactButton />
      {/* Main content */}
      <div className={styles.heroContent}>
        <h1 className={styles.mainTitle}>
          <span className={styles.name}>{language === "ko" ? "김건우" : "Kunwoo Kim"}</span>
          <span className={styles.slash}>/</span>
          <span className={styles.handle}>Aidengoldkr</span>
        </h1>

        <h3 className={styles.subTitle}>
          <span className={styles.subTitleSide}>A </span>
          Product Builder
          <span className={styles.subTitleSide}> in s.Korea</span>
        </h3>

        {/* Tags */}
        <div className={styles.tags}>
          <div className={styles.tag}>
            <span className={`${styles.dot} ${styles.dotGreen}`}></span>
            Product Strategy
          </div>
          <div className={styles.tagDivider}></div>
          <div className={styles.tag}>
            <span className={`${styles.dot} ${styles.dotBlue}`}></span>
            UX/UI Planning
          </div>
          <div className={styles.tagDivider}></div>
          <div className={styles.tag}>
            <span className={`${styles.dot} ${styles.dotGreen}`}></span>
            Data-driven Decision
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollDown} onClick={() => scrollToSection("hello")}>
        <span>SCROLL TO DETAIL</span>
        <div className={styles.scrollLine}>
          <span className={styles.scrollDot}></span>
        </div>
      </div>
    </section>
  );
}
