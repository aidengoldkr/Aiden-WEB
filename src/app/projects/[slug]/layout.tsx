import type { Metadata } from "next";
import projectsData from "../../data/projects.json";

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
  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project" };
  return {
    title: project.name,
    description: project.summary,
  };
}

export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
