"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (!targets.length) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const revealTarget = (
      target: HTMLElement,
      observer: IntersectionObserver
    ) => {
      const delay = target.dataset.revealDelay;

      if (delay) {
        target.style.transitionDelay = `${delay}ms`;
      }

      target.classList.add("is-visible");
      observer.unobserve(target);
    };

    const delayedTargets = targets.filter((target) => target.dataset.revealAfter);
    const observedTargets = targets.filter((target) => !target.dataset.revealAfter);

    const createObserver = (rootMargin: string) =>
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            revealTarget(entry.target as HTMLElement, observer);
          });
        },
        {
          rootMargin,
          threshold: 0.12,
        }
      );

    const defaultObserver = createObserver("0px 0px -12% 0px");
    const highTriggerObserver = createObserver("0px 0px -28% 0px");
    const delayedObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const source = entry.target as HTMLElement;
          const key = source.dataset.revealSource;

          delayedTargets
            .filter((target) => target.dataset.revealAfter === key)
            .forEach((target) => revealTarget(target, observer));

          observer.unobserve(source);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      }
    );

    observedTargets.forEach((target) => {
      const observer =
        target.dataset.revealTrigger === "high"
          ? highTriggerObserver
          : defaultObserver;

      observer.observe(target);
    });

    delayedTargets.forEach((target) => {
      const sourceKey = target.dataset.revealAfter;
      const source = document.querySelector<HTMLElement>(
        `[data-reveal-source="${sourceKey}"]`
      );

      if (source) {
        delayedObserver.observe(source);
      }
    });

    return () => {
      defaultObserver.disconnect();
      highTriggerObserver.disconnect();
      delayedObserver.disconnect();
    };
  }, []);

  return null;
}
