import Container from '../layout/Container'
import SectionHeading from '../UI/SectionHeading'
import ProjectCaseStudy from './ProjectCaseStudy'
import ProjectArchive from './ProjectArchive'
import { featuredProjects, projectArchive } from '../../data/projects'

export default function ProjectsSection() {
  return (
    <section className="section-shell projects-section" id="work" aria-labelledby="work-heading">
      <Container>
        <SectionHeading
          id="work-heading"
          eyebrow="01 / Selected work"
          title="Products shaped by real constraints."
          description="A focused selection of healthcare, fitness, and mobility work—shown through the problem, ownership, engineering decisions, and verified outcome."
        />
        <div className="project-list">
          {featuredProjects.map((project, index) => <ProjectCaseStudy project={project} index={index} key={project.slug} />)}
        </div>
        <ProjectArchive projects={projectArchive} />
      </Container>
    </section>
  )
}
