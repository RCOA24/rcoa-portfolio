import Container from '../layout/Container'
import ArrowIcon from '../UI/ArrowIcon'
import SectionHeading from '../UI/SectionHeading'
import { achievements, credentials, education, featuredRecognition, scholarship } from '../../data/achievements'

export default function RecognitionSection() {
  return (
    <section className="section-shell recognition-section" id="recognition" aria-labelledby="recognition-heading">
      <Container>
        <SectionHeading
          id="recognition-heading"
          eyebrow="04 / Recognition"
          title="Selected milestones."
          description="Competition results, education, and focused learning that support the work—not a wall of badges."
        />
        <div className="recognition-layout">
          <article className="recognition-feature">
            <div>
              <p className="mono-label">Featured recognition · {featuredRecognition.year}</p>
              <h3>{featuredRecognition.title}</h3>
              <p className="recognition-org">{featuredRecognition.organization}</p>
            </div>
            <p>{featuredRecognition.context}</p>
          </article>

          <div className="recognition-list">
            {achievements.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.organization}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="education-row">
          <div>
            <p className="mono-label">Education</p>
            <h3>{education.degree}</h3>
            <p>{education.school} · {education.completed}</p>
          </div>
          <div>
            <p className="mono-label">Selected credentials</p>
            <p className="credential-context">Scholarship: {scholarship}</p>
            <ul className="credential-list">
              {credentials.map((credential) => (
                <li key={credential.title}>
                  <a
                    className="credential-link"
                    href={credential.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${credential.title} credential from ${credential.issuer}`}
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
