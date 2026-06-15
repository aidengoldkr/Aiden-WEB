'use client';

import styles from "./LangToggle.module.css";
import { useLanguage } from "../../context/LanguageContext";

export default function LangToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <header className={styles.topBar}>
      <div className={styles.langToggle}>
        <span
          className={`${styles.langBtn} ${language === "ko" ? styles.langActive : ""}`}
          onClick={() => setLanguage("ko")}
        >
          KOR
        </span>
        <span className={styles.langDivider}>|</span>
        <span
          className={`${styles.langBtn} ${language === "en" ? styles.langActive : ""}`}
          onClick={() => setLanguage("en")}
        >
          ENG
        </span>
      </div>
    </header>
  );
}
