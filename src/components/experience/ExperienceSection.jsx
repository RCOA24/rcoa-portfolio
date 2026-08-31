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
          eyebrow="02 / Experience"
          title="Engineering in production."
          description="Enterprise delivery, incident resolution, data investigation, and collaborative product work across healthcare and business systems."
        />
        <div className="experience-list">
          {experience.map((item, index) => <ExperienceItem item={item} index={index} key={item.company} />)}
        </div>
        <p className="confidentiality-note">
          Enterprise work is presented through sanitized responsibilities and impact. No patient data, protected screenshots, or proprietary implementation details are shown.
        </p>
      </Container>
    </section>
  )
}
