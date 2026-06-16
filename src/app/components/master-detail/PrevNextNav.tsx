"use client";

/**
 * Generic previous / next navigation for master-detail detail pages.
 * Content-agnostic — reused by project and (later) organization detail pages.
 */

import Link from "next/link";
import styles from "./PrevNextNav.module.css";

export interface PrevNextItem {
  href: string;
  name: string;
}

export interface PrevNextNavProps {
  prev?: PrevNextItem | null;
  next?: PrevNextItem | null;
  prevLabel?: string;
  nextLabel?: string;
}

export default function PrevNextNav({
  prev,
  next,
  prevLabel = "Previous",
  nextLabel = "Next",
}: PrevNextNavProps) {
  if (!prev && !next) return null;

  return (
    <nav className={styles.nav} aria-label="prev-next">
      {prev ? (
        <Link href={prev.href} className={`${styles.link} ${styles.prev}`}>
          <span className={styles.label}>← {prevLabel}</span>
          <span className={styles.name}>{prev.name}</span>
        </Link>
      ) : (
        <span className={styles.spacer} />
      )}

      {next ? (
        <Link href={next.href} className={`${styles.link} ${styles.next}`}>
          <span className={styles.label}>{nextLabel} →</span>
          <span className={styles.name}>{next.name}</span>
        </Link>
      ) : (
        <span className={styles.spacer} />
      )}
    </nav>
  );
}
