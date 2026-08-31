import ArrowIcon from '../UI/ArrowIcon'
import TagList from '../UI/TagList'
import ProjectVisual from './ProjectVisual'

export default function ProjectCaseStudy({ project, index }) {
  const links = [
    project.links.live && { href: project.links.live, label: 'Live demo' },
    project.links.repository && { href: project.links.repository, label: 'GitHub repository' },
    project.links.devpost && { href: project.links.devpost, label: 'View Devpost submission' },
    project.links.video && { href: project.links.video, label: 'Watch walkthrough' },
  ].filter(Boolean)

  return (
    <article className={`project-case project-case-${project.visual}`} aria-labelledby={`${project.slug}-title`}>
      <div className="project-visual-column">
        <div className="project-index-row">
          <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
          <span className="project-status">{project.status}</span>
        </div>
        <ProjectVisual project={project} />
      </div>

      <div className="project-content">
        <p className="project-kicker">Selected case study</p>
        <h3 id={`${project.slug}-title`}>{project.title}</h3>
        <p className="project-tagline">{project.tagline}</p>
        <p className="project-summary">{project.summary}</p>

        <dl className="project-details">
          <div><dt>Problem</dt><dd>{project.problem}</dd></div>
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Engineering</dt><dd>{project.solution}</dd></div>
          <div className="project-outcome"><dt>Outcome</dt><dd>{project.outcome}</dd></div>
        </dl>

        <ul className="engineering-list" aria-label={`${project.shortTitle} engineering highlights`}>
          {project.engineeringHighlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>

        <TagList items={project.technologies} />

        {links.length > 0 && (
          <div className="project-links">
            {links.map((link) => (
              <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
                {link.label}<ArrowIcon external />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
