import ProjectsBreadcrumb from "@/components/projects/projects-breadcrumb";
import { getContent } from "@/lib/content";

export default function ProjectsLayout({ children }) {
  const { projectsDetail } = getContent();
  const titles = Object.fromEntries(
    Object.entries(projectsDetail).map(([slug, project]) => [slug, project.title]),
  );

  return (
    <>
      <ProjectsBreadcrumb titles={titles} />
      {children}
    </>
  );
}
