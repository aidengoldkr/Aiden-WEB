import projectsData from "../../data/projects.json";

export function generateStaticParams() {
  return projectsData
    .filter((p) => p.visibility.allowDetailPage)
    .map((p) => ({ slug: p.slug }));
}

export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
