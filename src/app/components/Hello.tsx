'use client';

import Image from "next/image";
import styles from "./Hello.module.css";
import introDataKo from "../data/intro.json";
import introDataEn from "../data/intro_en.json";
import { useLanguage } from "../context/LanguageContext";

export default function Hello() {
  const { language } = useLanguage();
  const introData = language === "ko" ? introDataKo : introDataEn;
  return (
    <section className={styles.hello} id="hello">
      <div className={styles.helloContent}>
        <h3 className={styles.groupTitle} data-reveal="soft">Hello</h3>
        {/* Text details */}
        <div className={styles.helloDetails} data-reveal data-reveal-delay="80">
          <h2 className={styles.helloWorld}>{introData.greeting}</h2>
          <p className={styles.helloHeadline}>{introData.headline}</p>
          <p
            className={styles.helloDescription}
            dangerouslySetInnerHTML={{ __html: introData.description }}
          />

          {/* Tag chips */}
          <div className={styles.tagList}>
            {introData.tags.map((tag, index) => (
              <span
                key={index}
                className={styles.tagChip}
                data-reveal="soft"
                data-reveal-delay={String(140 + index * 45)}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom stats */}
          <div className={styles.statsList}>
            {introData.stats.map((stat, index) => (
              <div
                key={index}
                className={styles.statItem}
                data-reveal="soft"
                data-reveal-delay={String(220 + index * 60)}
              >
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
