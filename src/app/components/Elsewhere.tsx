import styles from "./Elsewhere.module.css";
import socialData from "../data/social.json";

export default function Elsewhere() {
  return (
    <section className={styles.elsewhere} id="elsewhere">
      <div className={styles.elsewhereContent}>
        <h3 className={styles.groupTitle}>ELSEWHERE</h3>
        <div className={styles.linkGrid}>
          {socialData.map((item, index) => (
            <a
              key={index}
              href={item.url}
              className={styles.linkCard}
              target={item.url !== "#" ? "_blank" : undefined}
              rel={item.url !== "#" ? "noopener noreferrer" : undefined}
            >
              <div className={styles.linkIcon}>
                {item.label === "GitHub" && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                {item.label === "Tech Blog" && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1zm1 2v12h14V6H5zm2 2h10v2H7V8zm0 4h7v2H7v-2z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                {item.label === "LinkedIn" && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17H6.477v-7H9v7zM7.694 8.717c-.771 0-1.286-.514-1.286-1.2s.514-1.2 1.371-1.2c.771 0 1.286.514 1.286 1.2s-.514 1.2-1.371 1.2zM18 17h-2.442v-3.826c0-1.058-.651-1.302-.895-1.302s-1.058.163-1.058 1.302V17h-2.523v-7h2.523v.977c.325-.57.976-.977 2.197-.977C16.979 10 18 11.02 18 13.174V17z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </div>
              <div className={styles.linkBody}>
                <span className={styles.linkLabel}>{item.label}</span>
                <span className={styles.linkAction}>{item.action}</span>
              </div>
              <div className={styles.linkArrow} aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
