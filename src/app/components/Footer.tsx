'use client';

import styles from "./Footer.module.css";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.name} data-reveal="soft">
          <span className={styles.nameKr}>{language === "ko" ? "김건우" : "Kunwoo Kim"}</span>
          <span className={styles.slash}>/</span>
          <span className={styles.handle}>Aidengoldkr</span>
        </p>
        <p className={styles.copy}>© 2026 Aidengoldkr. All rights reserved.</p>
      </div>
    </footer>
  );
}
