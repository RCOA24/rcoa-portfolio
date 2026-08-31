import Container from '../layout/Container'
import ButtonLink from '../UI/ButtonLink'
import { site } from '../../data/site'

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <Container className="hero-grid">
        <div className="hero-copy">
          <p className="mono-label">Software Developer</p>
          <h1 id="hero-title">Building production systems and AI-powered products.</h1>
          <p className="hero-intro">
            I’m Rodney, a full-stack developer working across enterprise healthcare software,
            modern web applications, APIs, databases, and reliable product delivery.
          </p>
          <p className="hero-proof">
            <span className="status-dot" aria-hidden="true" />
            Currently building enterprise healthcare software supporting 11 government hospitals in the Philippines.
          </p>
          <div className="hero-actions">
            <ButtonLink href="#work">View selected work</ButtonLink>
            <ButtonLink href={site.resumeUrl} variant="secondary" external>View resume</ButtonLink>
          </div>
          <div className="hero-socials" aria-label="Professional profiles">
            <a className="text-link" href={site.githubUrl} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <a className="text-link" href={site.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </Container>
    </section>
  )
}
