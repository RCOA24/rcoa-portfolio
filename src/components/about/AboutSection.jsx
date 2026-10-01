import Container from '../layout/Container'
import SectionHeading from '../UI/SectionHeading'
import ButtonLink from '../UI/ButtonLink'
import { aboutFacts, site } from '../../data/site'

export default function AboutSection() {
  return (
    <section className="section-shell about-section" id="about" aria-labelledby="about-heading">
      <Container className="about-grid">
        <div className="about-portrait">
          <img
            src="/images/FormalPicture-optimized.jpg"
            alt="Portrait of Rodney Charles O. Austria"
            width="896"
            height="1152"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="about-copy">
          <SectionHeading id="about-heading" eyebrow="About" title="How I work" />
          <p>
            I like owning a problem end to end: understanding the requirement, tracing it through the data and the API,
            and shipping an interface people can actually use.
          </p>
          <p>
            I care about maintainable code, clear communication with QA and business analysts, and confirming a fix works
            in production instead of assuming it does. Hackathons are where I try new tools and AI ideas.
          </p>
          <dl className="about-facts">
            {aboutFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink href={site.resumeUrl} variant="secondary" external>Read the resume</ButtonLink>
        </div>
      </Container>
    </section>
  )
}
