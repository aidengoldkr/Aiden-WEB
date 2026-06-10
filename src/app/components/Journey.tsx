import styles from "./Journey.module.css";
import journeyData from "../data/journey.json";

export default function Journey() {
  return (
    <section className={styles.journey}>
      <div className={styles.journeyContent}>
        <h3 className={styles.groupTitle}>JOURNEY</h3>
        <div className={styles.timeline}>
          {journeyData.map((item, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelinePoint} />
              <div className={styles.timelineBody}>
                <span className={styles.timelinePeriod}>{item.year}</span>
                <h4 className={styles.timelineTitle}>{item.title}</h4>
                <p className={styles.timelineDesc}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
