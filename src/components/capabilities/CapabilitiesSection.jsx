import Container from '../layout/Container'
import SectionHeading from '../UI/SectionHeading'
import TagList from '../UI/TagList'
import { capabilityGroups, languages } from '../../data/capabilities'

export default function CapabilitiesSection() {
  return (
    <section className="section-shell capabilities-section" id="skills" aria-labelledby="skills-heading">
      <Container>
        <SectionHeading
          id="skills-heading"
          eyebrow="03 / Capabilities"
          title="Full-stack, from interface to incident."
          description="Technologies grouped by the engineering work they support—not by arbitrary proficiency scores."
        />
        <div className="capability-intro">
          <p className="mono-label">Core languages</p>
          <TagList items={languages} label="Programming languages" />
        </div>
        <div className="capability-grid">
          {capabilityGroups.map((group, index) => (
            <article className="capability-card" key={group.title}>
              <span className="capability-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <TagList items={group.technologies} label={`${group.title} technologies`} />
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
