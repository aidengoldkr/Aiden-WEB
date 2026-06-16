"use client";

/**
 * Generic Notion-style master/detail shell.
 *
 * The master column (a list of items) stays on the left; selecting an item
 * routes to its detail page, the list compresses into a left sidebar, and the
 * detail panel slides in from the right. On mobile it collapses to a single
 * column (list OR detail).
 *
 * This component is route-driven and content-agnostic — pass it `items` and a
 * `basePath`, render the detail itself as `children` (from the nested route).
 * Reused by the projects section and, later, the organization section.
 */

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./MasterDetailLayout.module.css";

export interface MasterDetailItem {
  /** Stable key. */
  id: string;
  /** Detail route, e.g. `/projects/todit`. */
  href: string;
  title: string;
  subtitle?: string | null;
  /** Small leading marker (index number, category, …). */
  marker?: string | null;
}

export interface MasterDetailLayoutProps {
  items: MasterDetailItem[];
  /** Index route with no selection, e.g. `/projects`. */
  basePath: string;
  /** Large header shown only in full (no-selection) mode. */
  header?: ReactNode;
  /** Compact label shown only in sidebar (selection) mode. */
  compactTitle?: string;
  /** Top "back" link (e.g. to home). */
  homeHref?: string;
  homeLabel?: string;
  children: ReactNode;
}

export default function MasterDetailLayout({
  items,
  basePath,
  header,
  compactTitle,
  homeHref,
  homeLabel,
  children,
}: MasterDetailLayoutProps) {
  const [isMobileMasterOpen, setIsMobileMasterOpen] = useState(false);
  const pathname = usePathname() ?? basePath;
  const isDetail = pathname !== basePath && pathname.startsWith(`${basePath}/`);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    setIsMobileMasterOpen(false);
  }, [pathname]);

  return (
    <div className={`${styles.shell} ${isDetail ? styles.shellDetail : ""}`}>
      {isDetail && (
        <div className={styles.mobileMaster}>
          <div className={styles.mobileMasterBar}>
            <button
              type="button"
              className={styles.mobileMasterButton}
              aria-label="Open project list"
              aria-expanded={isMobileMasterOpen}
              onClick={() => setIsMobileMasterOpen((open) => !open)}
            >
              <span aria-hidden />
              <span aria-hidden />
              <span aria-hidden />
            </button>
            <span className={styles.mobileMasterTitle}>
              {compactTitle ?? "Projects"}
            </span>
          </div>

          {isMobileMasterOpen && (
            <div className={styles.mobileMasterPanel}>
              {homeHref && (
                <Link href={homeHref} className={styles.mobileBack}>
                  ← {homeLabel ?? "Back"}
                </Link>
              )}

              <ul className={styles.mobileList}>
                {items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className={`${styles.mobileItem} ${
                          active ? styles.mobileItemActive : ""
                        }`}
                      >
                        {item.marker && (
                          <span className={styles.mobileMarker}>
                            {item.marker}
                          </span>
                        )}
                        <span className={styles.mobileItemTitle}>
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}

      <aside className={styles.master}>
        <div className={styles.masterInner}>
          {homeHref && (
            <Link href={homeHref} className={styles.back}>
              ← {homeLabel ?? "Back"}
            </Link>
          )}

          {header && <div className={styles.head}>{header}</div>}
          {compactTitle && (
            <h2 className={styles.compactTitle}>{compactTitle}</h2>
          )}

          <ul className={styles.list}>
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`${styles.item} ${
                      active ? styles.itemActive : ""
                    }`}
                  >
                    {item.marker && (
                      <span className={styles.marker}>{item.marker}</span>
                    )}
                    <span className={styles.itemBody}>
                      <span className={styles.itemTitle}>{item.title}</span>
                      {item.subtitle && (
                        <span className={styles.itemSubtitle}>
                          {item.subtitle}
                        </span>
                      )}
                    </span>
                    <span className={styles.itemArrow} aria-hidden>
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      <section className={styles.detail}>{children}</section>
    </div>
  );
}
