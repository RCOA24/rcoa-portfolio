import Container from '../layout/Container'
import ArrowIcon from '../UI/ArrowIcon'
import SectionHeading from '../UI/SectionHeading'
import { achievements, credentials, education, featuredRecognition, scholarship } from '../../data/achievements'

export default function RecognitionSection() {
  return (
    <section className="section-shell recognition-section" id="recognition" aria-labelledby="recognition-heading">
      <Container>
        <SectionHeading id="recognition-heading" eyebrow="Recognition" title="Awards, education & credentials" />

        <div className="recognition-layout">
          <article className="recognition-feature">
            <p className="mono-label">Featured · {featuredRecognition.year}</p>
            <h3>{featuredRecognition.title}</h3>
            <p className="recognition-org">{featuredRecognition.organization}</p>
            <p>{featuredRecognition.context}</p>
            <a className="text-link" href={featuredRecognition.project.href}>
              View {featuredRecognition.project.title} <ArrowIcon />
            </a>
          </article>

          <ul className="recognition-list" aria-label="Other awards">
            {achievements.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.organization}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="education-row">
          <div>
            <h3 className="mono-label">Education</h3>
            <p className="education-degree">{education.degree}</p>
            <p>{education.school} · {education.completed}</p>
            <p className="credential-context">Scholarship: {scholarship}</p>
          </div>
          <div>
            <h3 className="mono-label">Selected credentials</h3>
            <ul className="credential-list">
              {credentials.map((credential) => (
                <li key={credential.title}>
                  <a
                    className="credential-link"
                    href={credential.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${credential.title} credential from ${credential.issuer} (opens in a new tab)`}
                  >
                    <span>
                      <strong>{credential.title}</strong>
                      <small>{credential.issuer}</small>
                    </span>
                    <ArrowIcon external />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
