'use client';

import { useEffect, useState } from "react";
import styles from "./SideNav.module.css";

const SECTIONS = ["hero", "hello", "journey", "projects", "elsewhere"];

export default function SideNav() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of SECTIONS) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.sideNav}>
      {SECTIONS.map((sec) => (
        <span
          key={sec}
          className={`${styles.navDot} ${activeSection === sec ? styles.navDotActive : ""}`}
          onClick={() => scrollToSection(sec)}
          title={sec.toUpperCase()}
        />
      ))}
    </div>
  );
}
