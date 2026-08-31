import Container from '../layout/Container'
import ArrowIcon from '../UI/ArrowIcon'
import ButtonLink from '../UI/ButtonLink'
import { site } from '../../data/site'

export default function ContactSection() {
  return (
    <section className="section-shell contact-section" id="contact" aria-labelledby="contact-heading">
      <Container className="contact-inner">
        <p className="mono-label">06 / Contact</p>
        <h2 id="contact-heading">Let’s build something useful.</h2>
        <p>
          Have a product problem, engineering opportunity, or team that values reliable full-stack delivery? Send me a note.
        </p>
        <ButtonLink href={`mailto:${site.email}`}>Email Rodney</ButtonLink>
        <div className="contact-links" aria-label="Other ways to connect">
          <a href={site.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn<ArrowIcon external /></a>
          <a href={site.githubUrl} target="_blank" rel="noreferrer">GitHub<ArrowIcon external /></a>
          <a href={site.resumeUrl} target="_blank" rel="noreferrer">Resume<ArrowIcon external /></a>
        </div>
      </Container>
    </section>
  )
}
