import type { Project } from "../../content/site";
import { useI18n } from "../../i18n/useI18n";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";
import { ArrowUpRightIcon } from "../ui/icons";

function ProjectCard({ project }: { project: Project }) {
  const { t } = useI18n();

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent/40 sm:p-7">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-grad-from to-grad-to opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl font-bold tracking-tight">
          {project.title}
        </h3>
        <span className="shrink-0 text-sm text-muted">{project.year}</span>
      </div>

      <p className="mt-3 flex-1 leading-relaxed text-muted">{project.summary}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-line px-2.5 py-1 text-xs font-medium text-muted"
          >
            {tag}
          </li>
        ))}
      </ul>

      {(project.repoUrl || project.liveUrl) && (
        <div className="mt-6 flex items-center gap-5 border-t border-line pt-5 text-sm font-semibold">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
            >
              {t.projects.viewCode}
              <ArrowUpRightIcon />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
            >
              {t.projects.viewLive}
              <ArrowUpRightIcon />
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export function Projects() {
  const { t } = useI18n();

  return (
    <Section
      id="projects"
      label={t.projects.label}
      heading={t.projects.heading}
      intro={t.projects.intro}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {t.projects.items.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.07}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
