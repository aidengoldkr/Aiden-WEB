import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import projectsData from "../data/projects.json";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <main className={styles.wrap}>
      <Link href="/" className={styles.back}>
        ← Back
      </Link>

      <header className={styles.head}>
        <h3 className={styles.label}>ALL PROJECTS</h3>
        <h1 className={styles.title}>Building products from ideas.</h1>
        <p className={styles.lead}>
          문제를 정의하고, 서비스로 구현한 프로젝트 모음입니다.
        </p>
      </header>

      <ul className={styles.list}>
        {projectsData.map((p, index) => (
          <li key={index} className={styles.item}>
            <span className={styles.num}>{String(index + 1).padStart(2, "0")}</span>
            <div className={styles.body}>
              <h2 className={styles.name}>{p.name}</h2>
              <p className={styles.tagline}>{p.tagline}</p>
              <p className={styles.desc}>{p.description}</p>
              <div className={styles.tagList}>
                {p.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
