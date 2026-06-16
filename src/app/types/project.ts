// Canonical Project schema. Both `data/projects.json` (KO) and
// `data/projects_en.json` (EN) share this exact shape — only human-readable
// text differs between the two files. Missing single values are `null`,
// missing collections are `[]`.

export type ProjectCategory =
  | "saas"
  | "web"
  | "mobile"
  | "app"
  | "ai"
  | "tool"
  | "game"
  | "research"
  | "other";
export type ProjectStatus =
  | "idea"
  | "prototype"
  | "mvp"
  | "launched"
  | "archived";
export type TeamType = "solo" | "team";

export interface ProjectPeriod {
  start: string | null;
  end: string | null;
}

export interface ProjectLinks {
  live: string | null;
  github: string | null;
  demo: string | null;
  article: string | null;
}

export interface ProjectVideo {
  title: string;
  url: string;
  thumbnail: string | null;
}

export interface ProjectMedia {
  thumbnail: string | null;
  images: string[];
  videos: ProjectVideo[];
}

export interface ProjectTechStack {
  frontend: string[];
  backend: string[];
  database: string[];
  infra: string[];
  ai: string[];
  tools: string[];
}

export interface ProjectTeam {
  type: TeamType;
  size: number | null;
  myRoles: string[];
  contribution: string | null;
  otherMembers?: ProjectTeamMember[];
}

export interface ProjectTeamMember {
  label: string;
  roles: string[];
  contribution: string;
}

export interface ProjectKeyFeature {
  title: string;
  description: string;
}

export interface ProjectDetails {
  problem: string | null;
  solution: string | null;
  keyFeatures: ProjectKeyFeature[];
  architecture: string | null;
  learnings: string | null;
}

export interface ProjectAward {
  title: string;
  organization: string | null;
  date: string | null;
  rank: string | null;
  description: string | null;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectPress {
  title: string;
  url: string | null;
  source: string | null;
  date: string | null;
}

export interface ProjectAchievements {
  awards: ProjectAward[];
  metrics: ProjectMetric[];
  press: ProjectPress[];
}

export interface ProjectVisibility {
  showOnHome: boolean;
  showInProjects: boolean;
  allowDetailPage: boolean;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  summary: string;
  description: string;
  homeDescription?: string;
  category: ProjectCategory;
  status: ProjectStatus;
  isMain: boolean;
  featuredOrder: number | null;
  period: ProjectPeriod;
  links: ProjectLinks;
  media: ProjectMedia;
  techStack: ProjectTechStack;
  team: ProjectTeam;
  details: ProjectDetails;
  achievements: ProjectAchievements;
  visibility: ProjectVisibility;
}

/** Canonical ordering: featuredOrder ascending, nulls last (file order kept). */
export function sortProjects(projects: Project[]): Project[] {
  return projects
    .slice()
    .sort(
      (a, b) =>
        (a.featuredOrder ?? Number.MAX_SAFE_INTEGER) -
        (b.featuredOrder ?? Number.MAX_SAFE_INTEGER)
    );
}

/** Flatten the grouped tech stack into a single ordered tag list. */
export function getTechTags(project: Project): string[] {
  const { frontend, backend, database, infra, ai, tools } = project.techStack;
  return [...frontend, ...backend, ...database, ...infra, ...ai, ...tools];
}

/** Links that actually point somewhere, ready to render as buttons. */
export function getActiveLinks(
  project: Project
): { key: keyof ProjectLinks; url: string }[] {
  return (Object.keys(project.links) as (keyof ProjectLinks)[])
    .filter((key) => project.links[key] !== null)
    .map((key) => ({ key, url: project.links[key] as string }));
}
