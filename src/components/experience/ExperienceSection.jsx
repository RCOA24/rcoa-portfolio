import Container from '../layout/Container'
import SectionHeading from '../UI/SectionHeading'
import ExperienceItem from './ExperienceItem'
import { experience } from '../../data/experience'

export default function ExperienceSection() {
  return (
    <section className="section-shell experience-section" id="experience" aria-labelledby="experience-heading">
      <Container>
        <SectionHeading
          id="experience-heading"
          eyebrow="Experience"
          title="Where I’ve worked"
        />
        <div className="experience-list">
          {experience.map((item) => <ExperienceItem item={item} key={item.company} />)}
        </div>
        <p className="confidentiality-note">
          Enterprise work is presented through sanitized responsibilities and impact. No patient data, protected screenshots, or proprietary implementation details are shown.
        </p>
      </Container>
    </section>
  )
}
