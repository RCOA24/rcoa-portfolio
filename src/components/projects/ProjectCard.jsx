import TagList from '../UI/TagList'
import ProjectLinks from './ProjectLinks'
import ProjectVisual from './ProjectVisual'

const VISIBLE_TECH = 5

function ImpactIcon({ tone }) {
  return tone === 'award' ? (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="m10 2.5 2.2 4.6 5 .7-3.6 3.5.9 5L10 13.9l-4.5 2.4.9-5-3.6-3.5 5-.7L10 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ProjectCard({ project, index }) {
  const { details, impact, technologies } = project
  const headingId = `${project.slug}-title`

  return (
    <article className="project-card" id={project.slug} aria-labelledby={headingId}>
      <ProjectVisual project={project} sizes="(min-width: 1600px) 780px, (min-width: 960px) 660px, 100vw" />

      <div className="project-body">
        {index != null && <p className="project-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</p>}
        <h3 id={headingId}>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <TagList items={technologies.slice(0, VISIBLE_TECH)} label={`${project.title} main technologies`} />
        {impact && (
          <p className={`project-impact project-impact-${impact.tone}`}>
            <ImpactIcon tone={impact.tone} />
            <span>
              <span className="sr-only">{impact.tone === 'award' ? 'Recognition: ' : 'Impact: '}</span>
              {impact.text}
            </span>
          </p>
        )}
        <ProjectLinks project={project} />
      </div>

      {details && (
        <details className="project-details">
          <summary>
            <span className="details-label-closed">View case study</span>
            <span className="details-label-open">Hide case study</span>
            <span className="sr-only"> for {project.title}</span>
            <svg className="details-chevron" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <div className="project-details-body">
            <dl className="project-facts">
              <div><dt>Problem</dt><dd>{details.problem}</dd></div>
              <div><dt>My role</dt><dd>{details.role}</dd></div>
              <div><dt>Approach</dt><dd>{details.approach}</dd></div>
            </dl>
            <div className="project-highlights">
              <h4>Engineering highlights</h4>
              <ul className="highlight-list">
                {details.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
              {technologies.length > VISIBLE_TECH && (
                <>
                  <h4>Full stack</h4>
                  <TagList items={technologies} label={`${project.title} full technology stack`} />
                </>
              )}
            </div>
          </div>
        </details>
      )}
    </article>
  )
}
