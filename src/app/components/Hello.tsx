import Image from "next/image";
import styles from "./Hello.module.css";
import introData from "../data/intro.json";

export default function Hello() {
  return (
    <section className={styles.hello} id="hello">
      <div className={styles.helloContent}>
        {/* Profile image with gradient border */}
        <div className={styles.profileWrapper}>
          <Image
            src="/asset/profile.png"
            alt="Aidengoldkr Profile"
            width={240}
            height={240}
            className={styles.profileImage}
            priority
          />
        </div>

        {/* Text details */}
        <div className={styles.helloDetails}>
          <h2 className={styles.helloWorld}>{introData.greeting}</h2>
          <p className={styles.helloHeadline}>{introData.headline}</p>
          <p
            className={styles.helloDescription}
            dangerouslySetInnerHTML={{ __html: introData.description }}
          />

          {/* Tag chips */}
          <div className={styles.tagList}>
            {introData.tags.map((tag, index) => (
              <span key={index} className={styles.tagChip}>
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom stats */}
          <div className={styles.statsList}>
            {introData.stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
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
