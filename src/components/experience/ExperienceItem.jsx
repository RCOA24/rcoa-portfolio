import TagList from '../UI/TagList'
import ArrowIcon from '../UI/ArrowIcon'

export default function ExperienceItem({ item, index }) {
  return (
    <article className={`experience-item ${item.featured ? 'experience-featured' : ''}`}>
      <div className="experience-meta">
        <span className="experience-number">{String(index + 1).padStart(2, '0')}</span>
        <p>{item.period}</p>
      </div>
      <div className="experience-content">
        {item.websiteUrl ? (
          <a
            className="experience-brand"
            href={item.websiteUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit ${item.company} website`}
          >
            {item.logo && (
              <span className={`experience-logo${item.logo.theme ? ` experience-logo-${item.logo.theme}` : ''}`} aria-hidden="true">
                <img
                  src={item.logo.src}
                  alt=""
                  width={item.logo.width}
                  height={item.logo.height}
                  loading="lazy"
                  decoding="async"
                />
              </span>
            )}
            <span className="experience-brand-copy">
              <span className="experience-company">{item.company}</span>
              <span className="experience-website">Visit company website <ArrowIcon external /></span>
            </span>
          </a>
        ) : (
          <p className="experience-company">{item.company}</p>
        )}
        <h3>{item.role}</h3>
        <p className="experience-summary">{item.summary}</p>
        <ul className="experience-highlights">
          {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        <TagList items={item.technologies} label={`${item.company} technologies`} />
      </div>
    </article>
  )
}
