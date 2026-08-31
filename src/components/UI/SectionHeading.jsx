export default function SectionHeading({ id, eyebrow, title, description, align = 'left' }) {
  return (
    <header className={`section-heading section-heading-${align}`}>
      <p className="mono-label">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </header>
  )
}
