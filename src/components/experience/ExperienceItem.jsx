import TagList from '../UI/TagList'

export default function ExperienceItem({ item, index }) {
  return (
    <article className={`experience-item ${item.featured ? 'experience-featured' : ''}`}>
      <div className="experience-meta">
        <span className="experience-number">{String(index + 1).padStart(2, '0')}</span>
        <p>{item.period}</p>
      </div>
      <div className="experience-content">
        <p className="experience-company">{item.company}</p>
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
