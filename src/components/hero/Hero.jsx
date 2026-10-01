import Container from '../layout/Container'
import ButtonLink from '../UI/ButtonLink'
import { site } from '../../data/site'

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <Container className="hero-inner">
        <div className="hero-identity">
          <img
            className="hero-avatar"
            src="/images/avatar-192.jpg"
            alt=""
            width="640"
            height="640"
            fetchPriority="high"
          />
          <p>
            <strong>{site.shortName}</strong>
            <span>{site.role} · {site.location}</span>
          </p>
        </div>

        <h1 id="hero-title">Building production systems and <span className="nowrap">AI-powered</span> products.</h1>

        <p className="hero-intro">
          I build enterprise healthcare software at <span className="nowrap">E-Med</span> Healthcare Solutions with C#, .NET, Angular, and SQL Server,
          and ship <span className="nowrap">AI-powered</span> web products with React and Next.js.
        </p>

        <p className="availability">
          <span className="status-dot" aria-hidden="true" />
          {site.availability}
        </p>

        <div className="hero-actions">
          <ButtonLink href="#work">View projects</ButtonLink>
          <ButtonLink href={site.resumeUrl} variant="secondary" external>Resume</ButtonLink>
          <div className="hero-socials">
            <a className="text-link" href={site.githubUrl} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <a className="text-link" href={site.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </Container>
    </section>
  )
}
