import Container from '../layout/Container'
import SectionHeading from '../UI/SectionHeading'
import ProjectCard from './ProjectCard'
import ProjectArchive from './ProjectArchive'
import { featuredProjects, projectArchive } from '../../data/projects'

export default function ProjectsSection() {
  return (
    <section className="section-shell projects-section" id="work" aria-labelledby="work-heading">
      <Container>
        <SectionHeading
          id="work-heading"
          eyebrow="Selected work"
          title="Projects"
          description="Healthcare, fitness, and mobility products. Open any case study for the engineering detail."
        />
        <div className="project-list">
          {featuredProjects.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}
        </div>
        <ProjectArchive projects={projectArchive} />
      </Container>
    </section>
  )
}
