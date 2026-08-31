import Container from '../layout/Container'
import SectionHeading from '../UI/SectionHeading'
import ButtonLink from '../UI/ButtonLink'
import { site } from '../../data/site'

export default function AboutSection() {
  return (
    <section className="section-shell about-section" id="about" aria-labelledby="about-heading">
      <Container className="about-grid">
        <div className="about-portrait">
          <img
            src="/images/FormalPicture-optimized.jpg"
            alt="Rodney Charles O. Austria"
            width="896"
            height="1152"
            loading="lazy"
            decoding="async"
          />
          <div className="portrait-caption"><span>Based in the Philippines</span><span>Full-Stack Developer</span></div>
        </div>
        <div className="about-copy">
          <SectionHeading id="about-heading" eyebrow="05 / About" title="An engineer who follows the problem through." />
          <p>
            I work across enterprise systems, web applications, APIs, databases, and AI integrations. That range matters most when a feature has to move from an operational requirement to maintainable code—and continue working in production.
          </p>
          <p>
            My healthcare work includes feature delivery, SQL investigation, reporting, release validation, and Level 3 incident resolution. In product builds, I focus on practical architecture: offline behavior, secure data flows, useful integrations, and interfaces that make complex workflows easier to act on.
          </p>
          <ButtonLink href={site.resumeUrl} variant="secondary" external>Read the resume</ButtonLink>
        </div>
      </Container>
    </section>
  )
}
