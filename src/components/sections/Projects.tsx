import type { Project } from "../../content/site";
import { useI18n } from "../../i18n/useI18n";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";
import { ArrowUpRightIcon } from "../ui/icons";

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { t } = useI18n();

  return (
    <li className="group relative border-b border-line">
      <div className="grid gap-5 py-9 md:grid-cols-[3rem_1fr_auto] md:items-start md:gap-10">
        <span className="hud pt-2 text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div>
          <h3 className="font-display text-[clamp(1.75rem,4.4vw,3.25rem)] uppercase leading-[0.92] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3">
            {project.title}
          </h3>

          <p className="mt-4 max-w-xl leading-relaxed text-muted">
            {project.summary}
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
            {project.tags.map((tag) => (
              <li key={tag} className="hud">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-6 md:flex-col md:items-end md:gap-4">
          <span className="hud">{project.year}</span>

          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="hud inline-flex items-center gap-1.5 transition-colors hover:text-accent"
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
              className="hud inline-flex items-center gap-1.5 transition-colors hover:text-accent"
            >
              {t.projects.viewLive}
              <ArrowUpRightIcon />
            </a>
          )}
        </div>
      </div>

      {/* Gradient wipe along the row baseline on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-linear-to-r from-grad-from to-grad-to transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />
    </li>
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
      <ul className="border-t border-line">
        {t.projects.items.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.06}>
            <ProjectRow project={project} index={index} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
