import styles from "./Projects.module.css";
import projectsData from "../data/projects.json";

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <div className={styles.projectsInner}>
        <h3 className={styles.groupTitle}>SELECTED PROJECTS</h3>

        <div className={styles.projectsGrid}>
          {projectsData.map((p, index) => (
            <a
              key={index}
              href={p.link ?? "#"}
              className={styles.projectCard}
              aria-label={p.name}
            >
              <div className={styles.cardHeader}>
                <h4 className={styles.projectName}>{p.name}</h4>
                <span className={styles.arrowIcon}>↗</span>
              </div>

              <p className={styles.projectTagline}>{p.tagline}</p>
              <p className={styles.projectDescription}>{p.description}</p>

              <div className={styles.tagList}>
                {p.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
