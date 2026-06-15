"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Projects.module.css";
import projectsDataKo from "../data/projects.json";
import projectsDataEn from "../data/projects_en.json";
import { useLanguage } from "../context/LanguageContext";

/* Abstract preview block — used when a project has no real image.
   Variant is chosen by card index so each card looks distinct. */
function Preview({ variant }: { variant: number }) {
  switch (variant % 4) {
    case 0:
      // code-like panel
      return (
        <div className={styles.previewCode} aria-hidden>
          <div className={styles.codeBar}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.codeBody}>
            <span className={styles.codeLine} style={{ width: "72%" }} />
            <span
              className={`${styles.codeLine} ${styles.codeAccent}`}
              style={{ width: "46%" }}
            />
            <span className={styles.codeLine} style={{ width: "88%" }} />
            <span className={styles.codeLine} style={{ width: "60%" }} />
            <span
              className={`${styles.codeLine} ${styles.codeBlue}`}
              style={{ width: "52%" }}
            />
            <span className={styles.codeLine} style={{ width: "78%" }} />
          </div>
        </div>
      );
    case 1:
      // line graphic
      return (
        <div className={styles.previewGraph} aria-hidden>
          <svg
            viewBox="0 0 200 120"
            preserveAspectRatio="none"
            className={styles.graphSvg}
          >
            <polyline
              points="0,92 30,72 60,82 90,42 120,58 150,28 200,38"
              className={styles.graphLine}
            />
            <polyline
              points="0,100 30,96 60,86 90,90 120,72 150,74 200,58"
              className={styles.graphLineBlue}
            />
          </svg>
        </div>
      );
    case 2:
      // subtle grid
      return (
        <div className={styles.previewGrid} aria-hidden>
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className={styles.gridDot} />
          ))}
        </div>
      );
    default:
      // bars
      return (
        <div className={styles.previewBars} aria-hidden>
          {[40, 66, 50, 82, 56, 72, 90].map((h, i) => (
            <span key={i} className={styles.bar} style={{ height: `${h}%` }} />
          ))}
        </div>
      );
  }
}

export default function Projects() {
  const { language } = useLanguage();
  const projectsData = language === "ko" ? projectsDataKo : projectsDataEn;

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState<number | "auto">("auto");
  const [translateX, setTranslateX] = useState(0);

  // Drive the horizontal track translate from the vertical scroll position
  // while the section is pinned (CSS sticky). 1:1 mapping for a natural feel.
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let maxX = 0;
    let sectionTop = 0;
    const wheelTickPause = 240;
    const startPause = wheelTickPause;
    const endPause = wheelTickPause;

    const update = () => {
      if (maxX <= 0) return;
      const currentScroll = window.scrollY - sectionTop;
      const horizontalScroll = currentScroll - startPause;
      const scrolled = Math.min(Math.max(horizontalScroll, 0), maxX);

      setTranslateX(-scrolled);
    };

    const measure = () => {
      const isMobile = window.innerWidth <= 768;
      const rect = section.getBoundingClientRect();
      sectionTop = rect.top + window.scrollY;

      if (isMobile) {
        // mobile fallback: plain vertical list, no pinning / translate
        maxX = 0;
        setSectionHeight("auto");
        setTranslateX(0);
        return;
      }

      maxX = Math.max(0, track.scrollWidth - window.innerWidth);
      // extra scroll distance == horizontal travel + start/end buffers → pinned section length
      setSectionHeight(window.innerHeight + maxX + startPause + endPause);
      update();
    };

    measure();
    // re-measure after layout settles (fonts / reflow)
    const raf = requestAnimationFrame(measure);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.projects}
      id="projects"
      style={{ height: sectionHeight }}
    >
      <div className={styles.sticky}>
        <div className={styles.header}>
          <h3 className={styles.groupTitle} data-reveal="soft">SELECTED PROJECTS</h3>
          <h2 className={styles.title} data-reveal data-reveal-delay="80">Building products from ideas.</h2>
          <p className={styles.subtitle} data-reveal data-reveal-delay="140">
            {language === "ko"
              ? "문제를 정의하고, 서비스로 구현한 대표 프로젝트입니다."
              : "Key projects where I defined problems and built services."}
          </p>
        </div>

        <div className={styles.trackViewport}>
          <div
            ref={trackRef}
            className={styles.track}
            style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
          >
            {projectsData.map((p, index) => (
              <article
                key={index}
                className={styles.card}
                data-reveal="card"
                data-reveal-delay={String(index * 90)}
              >
                <span className={styles.cardNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className={styles.cardText}>
                  <h4 className={styles.projectName}>{p.name}</h4>
                  <p className={styles.projectTagline}>{p.tagline}</p>
                  <p className={styles.projectDescription}>{p.description}</p>
                  <div className={styles.tagList}>
                    {p.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.cardPreview}>
                  <Preview variant={index} />
                </div>
              </article>
            ))}

            <Link
              href="/projects"
              className={styles.ctaCard}
              data-reveal="card"
              data-reveal-delay={String(projectsData.length * 90)}
            >
              <span className={styles.ctaLabel}>ALL WORKS</span>
              <span className={styles.ctaText}>View All Projects</span>
              <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
