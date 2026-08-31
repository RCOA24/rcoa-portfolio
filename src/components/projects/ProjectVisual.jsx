import ArrowIcon from '../UI/ArrowIcon'

export default function ProjectVisual({ project }) {
  if (project.image) {
    const preview = (
      <>
        <span className="project-preview-media">
          <img
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            loading="lazy"
            decoding="async"
          />
          {project.links.devpost && (
            <span className="project-preview-overlay" aria-hidden="true">
              View submission <ArrowIcon external />
            </span>
          )}
        </span>
        {project.submission && (
          <span className="project-preview-meta">
            <span>
              <small>{project.submission.context}</small>
              <strong>{project.submission.event}</strong>
            </span>
            <span className="project-preview-action" aria-hidden="true">
              {project.submission.platform} <ArrowIcon external />
            </span>
          </span>
        )}
      </>
    )

    if (project.links.devpost) {
      return (
        <a
          className="project-image-frame project-preview-link"
          href={project.links.devpost}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${project.shortTitle} submission on Devpost`}
        >
          {preview}
        </a>
      )
    }

    return (
      <div className="project-image-frame">
        {preview}
      </div>
    )
  }

  if (project.visual === 'healthbridge') {
    return (
      <div className="project-abstract project-abstract-health" role="img" aria-label="HealthBridge product scope: consultation, pharmacy, laboratory, and discharge preparation connected to more than five services">
        <div className="abstract-header"><span>HealthBridge</span><span>5+ services</span></div>
        <div className="care-grid" aria-hidden="true">
          {['Consultation', 'Pharmacy', 'Laboratory', 'Discharge'].map((item, index) => (
            <div className="care-step" key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></div>
          ))}
        </div>
        <div className="abstract-status" aria-hidden="true"><span /> Offline support <span /> Secure authentication</div>
      </div>
    )
  }

  return (
    <div className="project-abstract project-abstract-commute" role="img" aria-label="Commute Lens compares financial cost, time cost, and route reliability">
      <div className="abstract-header"><span>Commute Lens</span><span>Decision view</span></div>
      <div className="commute-lenses" aria-hidden="true">
        <div><span>01</span><strong>Financial cost</strong><small>Fare and spend</small></div>
        <div><span>02</span><strong>Time cost</strong><small>Travel burden</small></div>
        <div><span>03</span><strong>Reliability</strong><small>Route context</small></div>
      </div>
    </div>
  )
}
