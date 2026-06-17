import type { Metadata } from "next";
import projectsData from "../../data/projects.json";
import thumbnailConfig from "../../data/projectThumbnails.json";
import { resolveProjectThumbnailImage } from "../../data/projectThumbnailAssets";

const SITE = "https://aidengoldkr.dev";

type RawProject = (typeof projectsData)[number];

function findProject(slug: string): RawProject | undefined {
  return projectsData.find((p) => p.slug === slug);
}

function getOgImage(slug: string): string {
  const config = (thumbnailConfig as Record<string, { type: string; images?: string[] }>)[slug];
  if (config?.type === "gallery" && config.images?.[0]) {
    return resolveProjectThumbnailImage(config.images[0]).src;
  }
  return "/og.png";
}

function getTechTags(project: RawProject): string[] {
  const { frontend, backend, database, infra, ai, tools } = project.techStack;
  return [...frontend, ...backend, ...database, ...infra, ...ai, ...tools];
}

export function generateStaticParams() {
  return projectsData
    .filter((p) => p.visibility.allowDetailPage)
    .map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = findProject(params.slug);

  if (!project || !project.visibility.allowDetailPage) {
    return { title: "Project" };
  }

  const description = project.summary || project.tagline;
  const url = `${SITE}/projects/${project.slug}`;
  const image = getOgImage(project.slug);
  const titleWithBrand = `${project.name} | Aidengoldkr`;

  return {
    title: project.name,
    description,
    keywords: [
      project.name,
      ...getTechTags(project),
      "Aidengoldkr",
      "김건우",
      "Portfolio",
    ],
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      type: "article",
      title: titleWithBrand,
      description,
      url,
      siteName: "Aidengoldkr",
      images: [{ url: image, alt: project.name }],
      locale: "ko_KR",
      alternateLocale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: titleWithBrand,
      description,
      images: [image],
    },
  };
}

export default function ProjectDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const project = findProject(params.slug);

  const jsonLd = project
    ? {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.name,
        headline: project.tagline,
        description: project.summary || project.tagline,
        url: `${SITE}/projects/${project.slug}`,
        image: getOgImage(project.slug),
        keywords: getTechTags(project).join(", "),
        ...(project.period.start ? { dateCreated: project.period.start } : {}),
        author: {
          "@type": "Person",
          name: "Kunwoo Kim",
          url: SITE,
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
