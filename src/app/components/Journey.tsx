'use client';

import styles from "./Journey.module.css";
import journeyDataKo from "../data/journey.json";
import journeyDataEn from "../data/journey_en.json";
import profileDataKo from "../data/profile.json";
import profileDataEn from "../data/profile_en.json";
import { useLanguage } from "../context/LanguageContext";

export default function Journey() {
  const { language } = useLanguage();
  const journeyData = language === "ko" ? journeyDataKo : journeyDataEn;
  const profileData = language === "ko" ? profileDataKo : profileDataEn;
  const phaseLabels = ["Idea", "Business", "Product", "Execution"];
  const timelineData = [...journeyData].sort(
    (a, b) => Number(a.year.replace(/\D/g, "")) - Number(b.year.replace(/\D/g, ""))
  );
  const achievementLabels =
    language === "ko"
      ? { title: "MORE RECORDS", awards: "수상", experience: "경험", certificates: "자격/특허" }
      : { title: "MORE RECORDS", awards: "Awards", experience: "Experience", certificates: "Certificates" };

  return (
    <section className={styles.journey} id="journey">
      <div className={styles.journeyContent}>
        <h3 className={styles.groupTitle} data-reveal="soft">JOURNEY</h3>
        <div className={styles.timeline} data-reveal-source="journey-timeline">
          {timelineData.map((item, index) => (
            <div
              key={index}
              className={styles.timelineItem}
              data-reveal="card"
              data-reveal-delay={String(index * 120)}
            >
              <div className={styles.timelinePoint} />
              <div className={styles.timelineHeader}>
                <span className={styles.timelinePhase}>{phaseLabels[index]}</span>
                <span className={styles.timelinePeriod}>{item.year}</span>
              </div>
              <div className={styles.timelineBody}>
                <p className={styles.timelineSummary}>{item.summary}</p>
                <div className={styles.recordGrid}>
                  {item.records.map((record) => (
                    <div key={record.label} className={styles.recordGroup}>
                      <span className={styles.recordLabel}>{record.label}</span>
                      <ul className={styles.recordList}>
                        {record.items.map((recordItem) => (
                          <li key={recordItem}>{recordItem}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className={styles.achievementSection}
          data-reveal
          data-reveal-after="journey-timeline"
          data-reveal-delay="560"
        >
          <h4 className={styles.achievementTitle}>{achievementLabels.title}</h4>
          <div className={styles.achievementGrid}>
            <div className={styles.achievementColumn}>
              <span className={styles.achievementLabel}>{achievementLabels.awards}</span>
              <div className={styles.awardGroups}>
                {profileData.awards.map((awardGroup) => (
                  <div key={awardGroup.year} className={styles.awardGroup}>
                    <span className={styles.awardYear}>{awardGroup.year}</span>
                    <ul className={styles.achievementList}>
                      {awardGroup.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.achievementColumn}>
              <span className={styles.achievementLabel}>{achievementLabels.experience}</span>
              <ul className={styles.achievementList}>
                {profileData.experience.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.achievementColumn}>
              <span className={styles.achievementLabel}>{achievementLabels.certificates}</span>
              <ul className={styles.achievementList}>
                {profileData.certificates.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
