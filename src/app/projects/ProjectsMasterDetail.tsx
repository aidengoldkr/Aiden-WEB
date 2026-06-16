"use client";

import type { ReactNode } from "react";
import MasterDetailLayout, {
  type MasterDetailItem,
} from "../components/master-detail/MasterDetailLayout";
import projectsDataKo from "../data/projects.json";
import projectsDataEn from "../data/projects_en.json";
import { useLanguage } from "../context/LanguageContext";
import { sortProjects, type Project } from "../types/project";
import headerStyles from "./page.module.css";

export default function ProjectsMasterDetail({
  children,
}: {
  children: ReactNode;
}) {
  const { language } = useLanguage();
  const projects = sortProjects(
    (language === "ko" ? projectsDataKo : projectsDataEn) as unknown as Project[]
  );

  const items: MasterDetailItem[] = projects.map((p, i) => ({
    id: p.id,
    href: p.visibility.allowDetailPage ? `/projects/${p.slug}` : "/projects",
    title: p.name,
    subtitle: p.tagline,
    marker: String(i + 1).padStart(2, "0"),
  }));

  const header = (
    <div className={headerStyles.head}>
      <h3 className={headerStyles.label}>ALL PROJECTS</h3>
      <h1 className={headerStyles.title}>Building products from ideas.</h1>
      <p className={headerStyles.lead}>
        {language === "ko"
          ? "문제를 정의하고, 서비스로 구현한 프로젝트 모음입니다."
          : "A collection of projects where I defined problems and built services."}
      </p>
    </div>
  );

  return (
    <MasterDetailLayout
      items={items}
      basePath="/projects"
      header={header}
      compactTitle="ALL PROJECTS"
      homeHref="/"
      homeLabel={language === "ko" ? "홈" : "Home"}
    >
      {children}
    </MasterDetailLayout>
  );
}
