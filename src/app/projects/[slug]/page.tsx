'use client';

import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import projectsDataKo from "../../data/projects.json";
import projectsDataEn from "../../data/projects_en.json";
import { useLanguage } from "../../context/LanguageContext";
import {
  getActiveLinks,
  sortProjects,
  type Project,
  type ProjectLinks,
} from "../../types/project";
import ProjectThumbnail from "../../components/ProjectThumbnail";
import PrevNextNav from "../../components/master-detail/PrevNextNav";

const STATUS_LABEL: Record<string, { ko: string; en: string }> = {
  idea: { ko: "아이디어", en: "Idea" },
  prototype: { ko: "프로토타입", en: "Prototype" },
  mvp: { ko: "MVP", en: "MVP" },
  launched: { ko: "출시", en: "Launched" },
  archived: { ko: "보관", en: "Archived" },
};

const CATEGORY_LABEL: Record<string, { ko: string; en: string }> = {
  saas: { ko: "SaaS", en: "SaaS" },
  web: { ko: "웹", en: "Web" },
  mobile: { ko: "모바일", en: "Mobile" },
  app: { ko: "앱", en: "App" },
  ai: { ko: "AI", en: "AI" },
  tool: { ko: "도구", en: "Tool" },
  game: { ko: "게임", en: "Game" },
  research: { ko: "리서치", en: "Research" },
  other: { ko: "기타", en: "Other" },
};

const LINK_LABEL: Record<keyof ProjectLinks, { ko: string; en: string }> = {
  live: { ko: "라이브", en: "Live" },
  github: { ko: "GitHub", en: "GitHub" },
  demo: { ko: "데모", en: "Demo" },
  article: { ko: "아티클", en: "Article" },
};

const TECH_GROUP_LABEL: Record<string, { ko: string; en: string }> = {
  frontend: { ko: "프론트엔드", en: "Frontend" },
  backend: { ko: "백엔드", en: "Backend" },
  database: { ko: "데이터베이스", en: "Database" },
  infra: { ko: "인프라", en: "Infra" },
  ai: { ko: "AI", en: "AI" },
  tools: { ko: "도구", en: "Tools" },
};

function formatPeriod(start: string | null, end: string | null, lang: "ko" | "en") {
  if (!start && !end) return null;
  const ongoing = lang === "ko" ? "진행 중" : "Present";
  return `${start ?? "—"} – ${end ?? ongoing}`;
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { language } = useLanguage();
  const projects = sortProjects(
    (language === "ko" ? projectsDataKo : projectsDataEn) as unknown as Project[]
  );
  const index = projects.findIndex((p) => p.slug === params.slug);
  const project = index >= 0 ? projects[index] : undefined;

  if (!project || !project.visibility.allowDetailPage) {
    notFound();
  }

  const prevProject = index > 0 ? projects[index - 1] : null;
  const nextProject =
    index < projects.length - 1 ? projects[index + 1] : null;

  const t = (ko: string, en: string) => (language === "ko" ? ko : en);
  const { details, team, achievements, techStack } = project;
  const activeLinks = getActiveLinks(project);
  const period = formatPeriod(project.period.start, project.period.end, language);
  const techGroups = (Object.keys(techStack) as (keyof typeof techStack)[]).filter(
    (g) => techStack[g].length > 0
  );
  const showSoloRoleNote =
    team.type === "solo" && (team.contribution || team.myRoles.length > 0);
  const showTeamSection =
    team.type === "team" &&
    (team.contribution ||
      team.myRoles.length > 0 ||
      (team.otherMembers?.length ?? 0) > 0);

  return (
    <main className={styles.wrap}>
      <header className={styles.head}>
        <div className={styles.badges}>
          <span className={styles.badge}>
            {CATEGORY_LABEL[project.category]?.[language] ?? project.category}
          </span>
          <span className={`${styles.badge} ${styles.badgeStatus}`}>
            {STATUS_LABEL[project.status]?.[language] ?? project.status}
          </span>
          {period && <span className={styles.period}>{period}</span>}
        </div>
        <h1 className={styles.title}>{project.name}</h1>
        <p className={styles.tagline}>{project.tagline}</p>
        <p className={styles.summary}>{project.summary}</p>

        {activeLinks.length > 0 && (
          <div className={styles.links}>
            {activeLinks.map(({ key, url }) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkBtn}
              >
                {LINK_LABEL[key][language]}
                <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Thumbnail — placeholder when no real image is set. */}
      <div className={styles.thumb}>
        <ProjectThumbnail project={project} />
      </div>

      <p className={styles.description}>{project.description}</p>

      {showSoloRoleNote && (
        <div className={styles.soloRoleNote}>
          {team.contribution && (
            <p className={styles.soloRoleText}>{team.contribution}</p>
          )}
          {team.myRoles.length > 0 && (
            <div className={styles.tagList}>
              {team.myRoles.map((role) => (
                <span key={role} className={styles.tag}>
                  {role}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {(details.problem || details.solution) && (
        <section className={styles.section}>
          {details.problem && (
            <div className={styles.block}>
              <h2 className={styles.blockLabel}>{t("문제", "Problem")}</h2>
              <p className={styles.blockText}>{details.problem}</p>
            </div>
          )}
          {details.solution && (
            <div className={styles.block}>
              <h2 className={styles.blockLabel}>{t("해결", "Solution")}</h2>
              <p className={styles.blockText}>{details.solution}</p>
            </div>
          )}
        </section>
      )}

      {details.keyFeatures.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("핵심 기능", "Key features")}</h2>
          <div className={styles.featureGrid}>
            {details.keyFeatures.map((f, i) => (
              <div key={i} className={styles.feature}>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureText}>{f.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {techGroups.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("기술 스택", "Tech stack")}</h2>
          <div className={styles.techGroups}>
            {techGroups.map((g) => (
              <div key={g} className={styles.techGroup}>
                <span className={styles.techGroupLabel}>
                  {TECH_GROUP_LABEL[g][language]}
                </span>
                <div className={styles.tagList}>
                  {techStack[g].map((tech) => (
                    <span key={tech} className={styles.tag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {showTeamSection && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("팀 / 역할", "Team / Role")}</h2>
          <p className={styles.teamMeta}>
            {t("팀 프로젝트", "Team project")}
            {team.size ? ` · ${team.size}${t("명", " members")}` : ""}
          </p>
          <div className={styles.roleGrid}>
            <article className={styles.myRoleCard}>
              <span className={styles.roleEyebrow}>{t("내 담당", "My ownership")}</span>
              {team.contribution && (
                <p className={styles.myRoleText}>{team.contribution}</p>
              )}
              {team.myRoles.length > 0 && (
                <div className={styles.tagList}>
                  {team.myRoles.map((role) => (
                    <span key={role} className={styles.tag}>
                      {role}
                    </span>
                  ))}
                </div>
              )}
            </article>

            {(team.otherMembers ?? []).map((member) => (
              <article key={member.label} className={styles.memberRoleCard}>
                <span className={styles.memberLabel}>{member.label}</span>
                <p className={styles.memberContribution}>{member.contribution}</p>
                {member.roles.length > 0 && (
                  <div className={styles.tagList}>
                    {member.roles.map((role) => (
                      <span key={role} className={styles.tag}>
                        {role}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {details.architecture && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("아키텍처", "Architecture")}</h2>
          <p className={styles.blockText}>{details.architecture}</p>
        </section>
      )}

      {achievements.metrics.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("지표", "Metrics")}</h2>
          <div className={styles.metricGrid}>
            {achievements.metrics.map((m, i) => (
              <div key={i} className={styles.metric}>
                <span className={styles.metricValue}>{m.value}</span>
                <span className={styles.metricLabel}>{m.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {achievements.awards.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("수상", "Awards")}</h2>
          <ul className={styles.recordList}>
            {achievements.awards.map((a, i) => (
              <li key={i} className={styles.record}>
                <span className={styles.recordTitle}>
                  {a.title}
                  {a.rank && <span className={styles.rank}>{a.rank}</span>}
                </span>
                <span className={styles.recordMeta}>
                  {[a.organization, a.date].filter(Boolean).join(" · ")}
                </span>
                {a.description && (
                  <span className={styles.recordDesc}>{a.description}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {achievements.press.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("보도 / 기사", "Press")}</h2>
          <ul className={styles.recordList}>
            {achievements.press.map((p, i) => (
              <li key={i} className={styles.record}>
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.recordTitle}
                  >
                    {p.title} ↗
                  </a>
                ) : (
                  <span className={styles.recordTitle}>{p.title}</span>
                )}
                <span className={styles.recordMeta}>
                  {[p.source, p.date].filter(Boolean).join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {details.learnings && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("배운 점", "Learnings")}</h2>
          <p className={styles.blockText}>{details.learnings}</p>
        </section>
      )}

      <PrevNextNav
        prev={
          prevProject
            ? { href: `/projects/${prevProject.slug}`, name: prevProject.name }
            : null
        }
        next={
          nextProject
            ? { href: `/projects/${nextProject.slug}`, name: nextProject.name }
            : null
        }
        prevLabel={t("이전 프로젝트", "Previous")}
        nextLabel={t("다음 프로젝트", "Next")}
      />
    </main>
  );
}
