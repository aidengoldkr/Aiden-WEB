'use client';

import Image from "next/image";
import soomgoImg from "../asset/soomgo.jpg";
import styles from "./Elsewhere.module.css";
import socialDataKo from "../data/social.json";
import socialDataEn from "../data/social_en.json";
import { useLanguage } from "../context/LanguageContext";

export default function Elsewhere() {
  const { language } = useLanguage();
  const socialData = language === "ko" ? socialDataKo : socialDataEn;
  return (
    <section className={styles.elsewhere} id="elsewhere">
      <div className={styles.elsewhereContent}>
        <h3 className={styles.groupTitle} data-reveal="soft">ELSEWHERE</h3>
        <div className={styles.linkGrid}>
          {socialData.map((item, index) => (
            <a
              key={index}
              href={item.url}
              className={`${styles.linkCard} ${item.label.toLowerCase().includes("soomgo") ? styles.soomgoCard : ""}`}
              data-reveal="card"
              data-reveal-delay={String(index * 90)}
              target={item.url !== "#" ? "_blank" : undefined}
              rel={item.url !== "#" ? "noopener noreferrer" : undefined}
            >
              <div className={styles.linkIcon}>
                {item.label.toLowerCase().includes("soomgo") && (
                  <Image
                    src={soomgoImg}
                    alt="Soomgo"
                    width={24}
                    height={24}
                    className={styles.soomgoLogo}
                  />
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
