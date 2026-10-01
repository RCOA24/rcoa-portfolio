import Container from '../layout/Container'
import SectionHeading from '../UI/SectionHeading'
import { primarySkills, skillGroups } from '../../data/capabilities'

export default function CapabilitiesSection() {
  return (
    <section className="section-shell skills-section" id="skills" aria-labelledby="skills-heading">
      <Container>
        <SectionHeading
          id="skills-heading"
          eyebrow="Skills"
          title="Technologies I work with"
          description="Highlighted items are my day-to-day production stack."
        />
        <dl className="skill-groups">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.title}>
              <dt>{group.title}</dt>
              <dd>
                <ul className="tag-list" aria-label={`${group.title} technologies`}>
                  {group.items.map((item) => (
                    <li key={item} className={primarySkills.has(item) ? 'tag-primary' : undefined}>
                      {item}
                      {primarySkills.has(item) && <span className="sr-only"> (primary stack)</span>}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
