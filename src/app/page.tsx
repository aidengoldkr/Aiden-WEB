import Image from "next/image";
import styles from "./page.module.css";
import profileData from "./data/profile.json";

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.mainTitle}>
            <span className={styles.name}>김건우</span>
            <span className={styles.slash}>/</span>
            <span className={styles.handle}>Aidengoldkr</span>
          </h1>
          <h3 className={styles.subTitle}>
            <span className={styles.subTitleSide}>A </span>
            Product Builder
            <span className={styles.subTitleSide}> in s.Korea</span>
          </h3>
        </div>
        <div className={styles.scrollDown}>
          scroll to detail
        </div>
      </section>

      <section className={styles.hello}>
        <div className={styles.helloContent}>
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
          <div className={styles.helloDetails}>
            <h2 className={styles.helloWorld}>Hello World! 👋</h2>
            <p className={styles.helloDescription}>
              안녕하세요! 아이디어를 빠르게 실행하고 완성도 높은 프로덕트로 만드는 <strong>김건우 / Aidengoldkr </strong>입니다.<br />기획부터 개발까지 전체 프로덕트 사이클을 거치며 가치를 창출하고자 합니다.
            </p>

          </div>
        </div>
      </section>

      <section className={styles.history}>
        <div className={styles.historyContent}>
          
          <div className={styles.historyColumn}>
            {/* Career & Education */}
            <div className={styles.historyGroup}>
              <h3 className={styles.groupTitle}>CAREER & EDUCATION</h3>
              <div className={styles.timeline}>
                {profileData.career.map((item, index) => (
                  <div key={index} className={styles.timelineItem}>
                    <div className={styles.timelinePoint} />
                    <div className={styles.timelineBody}>
                      <span className={styles.timelinePeriod}>{item.period}</span>
                      <h4 className={styles.timelineTitle}>{item.title}</h4>
                      <p className={styles.timelineDesc}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className={styles.historyGroup}>
              <h3 className={styles.groupTitle}>EXPERIENCE</h3>
              <ul className={styles.bulletList}>
                {profileData.experience.map((item, index) => (
                  <li key={index} className={styles.bulletItem}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.historyColumn}>
            {/* Selected Awards */}
            <div className={styles.historyGroup}>
              <h3 className={styles.groupTitle}>SELECTED AWARDS</h3>
              <div className={styles.awardsList}>
                {profileData.awards.map((group, index) => (
                  <div key={index} className={styles.awardsGroup}>
                    <h4 className={styles.awardsYear}>{group.year}</h4>
                    <ul className={styles.bulletList}>
                      {group.items.map((item, itemIdx) => (
                        <li key={itemIdx} className={styles.bulletItem}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div className={styles.historyGroup}>
              <h3 className={styles.groupTitle}>CERTIFICATES</h3>
              <ul className={`${styles.bulletList} ${styles.certificatesGrid}`}>
                {profileData.certificates.map((item, index) => (
                  <li key={index} className={styles.bulletItem}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
