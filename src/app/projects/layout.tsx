import type { Metadata } from "next";
import ProjectsMasterDetail from "./ProjectsMasterDetail";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProjectsMasterDetail>{children}</ProjectsMasterDetail>;
}
