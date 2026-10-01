import Container from '../layout/Container'
import ArrowIcon from '../UI/ArrowIcon'
import ButtonLink from '../UI/ButtonLink'
import CopyEmailButton from './CopyEmailButton'
import { site } from '../../data/site'

export default function ContactSection() {
  return (
    <section className="section-shell contact-section" id="contact" aria-labelledby="contact-heading">
      <Container className="contact-inner">
        <div>
          <p className="mono-label">Contact</p>
          <h2 id="contact-heading">Let’s build something useful.</h2>
          <p className="availability">
            <span className="status-dot" aria-hidden="true" />
            {site.availability}
          </p>
        </div>

        <div className="contact-panel">
          <p className="contact-email"><span className="sr-only">Email address: </span>{site.email}</p>
          <div className="contact-actions">
            <ButtonLink href={`mailto:${site.email}`}>Email me</ButtonLink>
            <CopyEmailButton email={site.email} />
          </div>
          <ul className="contact-links" aria-label="Other ways to connect">
            <li><a href={site.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn<ArrowIcon external /></a></li>
            <li><a href={site.githubUrl} target="_blank" rel="noreferrer">GitHub<ArrowIcon external /></a></li>
            <li><a href={site.resumeUrl} target="_blank" rel="noreferrer">Resume<ArrowIcon external /></a></li>
          </ul>
        </div>
      </Container>
    </section>
  )
}
