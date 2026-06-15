'use client';

import { useEffect, useRef, useState } from "react";
import styles from "./SideNav.module.css";

const SECTIONS = [
  { id: "hero", label: "Main" },
  { id: "hello", label: "Hello" },
  { id: "journey", label: "Journey" },
  { id: "projects", label: "Projects" },
  { id: "elsewhere", label: "Contact" },
];

export default function SideNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isExpanded, setIsExpanded] = useState(false);
  const isProgrammaticScrollRef = useRef(false);
  const scrollEndTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollEndTimerRef.current) {
        window.clearTimeout(scrollEndTimerRef.current);
      }

      if (isProgrammaticScrollRef.current) {
        scrollEndTimerRef.current = window.setTimeout(() => {
          isProgrammaticScrollRef.current = false;
        }, 180);
      } else {
        setIsExpanded(false);
      }

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const { id: sectionId } of SECTIONS) {
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollEndTimerRef.current) {
        window.clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      isProgrammaticScrollRef.current = true;
      setIsExpanded(true);
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`${styles.sideNav} ${isExpanded ? styles.sideNavExpanded : ""}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseMove={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onFocus={() => setIsExpanded(true)}
      onBlur={() => setIsExpanded(false)}
    >
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          type="button"
          className={`${styles.navItem} ${activeSection === section.id ? styles.navItemActive : ""}`}
          onClick={() => scrollToSection(section.id)}
          aria-label={`Go to ${section.label} section`}
          aria-current={activeSection === section.id ? "true" : undefined}
        >
          <span className={styles.navLabel}>{section.label}</span>
          <span className={styles.navDot} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
