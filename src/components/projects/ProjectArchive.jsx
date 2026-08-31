import ArrowIcon from '../UI/ArrowIcon'
import TagList from '../UI/TagList'

export default function ProjectArchive({ projects }) {
  return (
    <div className="archive-block">
      <div className="archive-heading">
        <p className="mono-label">Earlier work</p>
        <h3>Additional builds</h3>
      </div>
      <div className="archive-grid">
        {projects.map((project) => (
          <article className="archive-card" key={project.slug}>
            <h4>{project.title}</h4>
            <p>{project.summary}</p>
            <TagList items={project.technologies} label={`${project.title} technologies`} />
            {project.links?.length > 0 && (
              <div className="archive-links">
                {project.links.map((link) => (
                  <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
                    {link.label}<ArrowIcon external />
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
