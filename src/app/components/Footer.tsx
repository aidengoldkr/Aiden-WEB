import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.name}>
          <span className={styles.nameKr}>김건우</span>
          <span className={styles.slash}>/</span>
          <span className={styles.handle}>Aidengoldkr</span>
        </p>
        <p className={styles.tagline}>Building products from ideas.</p>
        <p className={styles.copy}>© 2026</p>
      </div>
    </footer>
  );
}
