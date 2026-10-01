import TagList from '../UI/TagList'
import ProjectLinks from './ProjectLinks'
import ProjectVisual from './ProjectVisual'

export default function ProjectArchive({ projects }) {
  return (
    <div className="archive-block">
      <h3 className="archive-heading" id="archive-heading">More projects</h3>
      <div className="archive-grid">
        {projects.map((project) => (
          <article className="archive-card" id={project.slug} key={project.slug} aria-labelledby={`${project.slug}-title`}>
            <ProjectVisual project={project} sizes="(min-width: 1600px) 384px, (min-width: 960px) 320px, (min-width: 640px) 50vw, 100vw" />
            <div className="archive-body">
              <h4 id={`${project.slug}-title`}>{project.title}</h4>
              <p>{project.description}</p>
              <TagList items={project.technologies} label={`${project.title} technologies`} />
              <ProjectLinks project={project} />
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
