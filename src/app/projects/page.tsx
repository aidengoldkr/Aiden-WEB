import { redirect } from "next/navigation";
import projectsData from "../data/projects.json";
import { sortProjects, type Project } from "../types/project";

// There is no standalone /projects landing page. Accessing /projects sends the
// user straight into the master-detail view focused on the top-most project.
export default function ProjectsIndexPage() {
  const projects = sortProjects(projectsData as unknown as Project[]);
  const top =
    projects.find((p) => p.visibility.allowDetailPage) ?? projects[0];
  redirect(`/projects/${top.slug}`);
}
