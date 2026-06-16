"use client";

import { useEffect, useMemo, useState } from "react";
import thumbnailConfig from "../data/projectThumbnails.json";
import {
  resolveProjectThumbnailImage,
  type ProjectThumbnailImage,
} from "../data/projectThumbnailAssets";
import type { Project } from "../types/project";
import styles from "./ProjectThumbnail.module.css";

type ThumbnailConfig =
  | {
      type: "gallery";
      images: string[];
    }
  | {
      type: "iframe";
      src: string;
    }
  | {
      type: "youtube";
      src: string;
    }
  | undefined;

const thumbnails = thumbnailConfig as Record<string, ThumbnailConfig>;

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    const videoId =
      host === "youtu.be"
        ? parsed.pathname.slice(1)
        : parsed.searchParams.get("v");

    if (!videoId || !["youtube.com", "m.youtube.com", "youtu.be"].includes(host)) {
      return null;
    }

    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return null;
  }
}

function getFallbackImages(project: Project): ProjectThumbnailImage[] {
  const thumbnail = project.media.thumbnail ? [project.media.thumbnail] : [];
  return [...thumbnail, ...project.media.images].map((src) => ({ src }));
}

export default function ProjectThumbnail({ project }: { project: Project }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(1);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const config = thumbnails[project.slug];
  const gallery = useMemo<ProjectThumbnailImage[]>(() => {
    if (config?.type === "gallery") {
      return config.images.map(resolveProjectThumbnailImage);
    }

    if (!config) {
      return getFallbackImages(project);
    }

    return [];
  }, [config, project]);
  const primaryVideo = project.media.videos[0];
  const primaryVideoEmbedUrl =
    config?.type === "youtube"
      ? getYouTubeEmbedUrl(config.src)
      : !config && primaryVideo
      ? getYouTubeEmbedUrl(primaryVideo.url)
      : null;

  const hasMultipleImages = gallery.length > 1;
  const slides = hasMultipleImages
    ? [gallery[gallery.length - 1], ...gallery, gallery[0]]
    : gallery;
  const activeImage = gallery.length > 0 ? gallery[activeIndex] : null;

  useEffect(() => {
    setActiveIndex(0);
    setSlideIndex(gallery.length > 1 ? 1 : 0);
  }, [gallery.length, project.slug]);

  useEffect(() => {
    if (isTransitionEnabled) return;

    const frame = requestAnimationFrame(() => {
      setIsTransitionEnabled(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [isTransitionEnabled]);

  const goToPrevious = () => {
    setIsTransitionEnabled(true);
    setActiveIndex((current) => (current === 0 ? gallery.length - 1 : current - 1));
    setSlideIndex((current) => current - 1);
  };

  const goToNext = () => {
    setIsTransitionEnabled(true);
    setActiveIndex((current) => (current + 1) % gallery.length);
    setSlideIndex((current) => current + 1);
  };

  const handleSlideTransitionEnd = () => {
    if (!hasMultipleImages) return;

    if (slideIndex === 0) {
      setIsTransitionEnabled(false);
      setSlideIndex(gallery.length);
    }

    if (slideIndex === gallery.length + 1) {
      setIsTransitionEnabled(false);
      setSlideIndex(1);
    }
  };

  if (activeImage) {
    return (
      <div className={styles.thumbnail}>
        <div
          className={styles.track}
          style={{
            transform: `translate3d(-${slideIndex * 100}%, 0, 0)`,
            transition: isTransitionEnabled ? undefined : "none",
          }}
          onTransitionEnd={handleSlideTransitionEnd}
        >
          {slides.map((image, index) => (
            <div key={`${image.src}-${index}`} className={styles.slide}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                width={image.width}
                height={image.height}
                alt={`${project.name} ${activeIndex + 1}`}
                className={styles.image}
              />
            </div>
          ))}
        </div>
        {hasMultipleImages && (
          <>
            <button
              type="button"
              className={`${styles.button} ${styles.previous}`}
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <span aria-hidden>&lsaquo;</span>
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.next}`}
              onClick={goToNext}
              aria-label="Next image"
            >
              <span aria-hidden>&rsaquo;</span>
            </button>
            <div className={styles.counter} aria-live="polite">
              {activeIndex + 1} / {gallery.length}
            </div>
          </>
        )}
      </div>
    );
  }

  if (config?.type === "iframe") {
    return (
      <iframe
        className={styles.frame}
        src={config.src}
        title={`${project.name} preview`}
        loading="lazy"
      />
    );
  }

  if (primaryVideoEmbedUrl) {
    return (
      <iframe
        className={styles.frame}
        src={primaryVideoEmbedUrl}
        title={
          config?.type === "youtube"
            ? `${project.name} video`
            : primaryVideo?.title ?? `${project.name} video`
        }
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <div className={`${styles.thumbnail} ${styles.placeholder}`} aria-hidden>
      <span>{project.name}</span>
    </div>
  );
}
