import { getPrimaryLink } from './linkUtils'

/**
 * Fixed 16:10 project media. Links to the project's primary destination when one exists.
 * `sizes` describes the rendered width so the browser can pick the right srcSet candidate.
 */
export default function ProjectVisual({ project, sizes }) {
  const { image } = project
  const primary = getPrimaryLink(project.links)

  const media = (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.srcSet ? sizes : undefined}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
      decoding="async"
    />
  )

  if (!primary) return <div className="project-media">{media}</div>

  return (
    <a
      className="project-media project-media-link"
      href={primary.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${project.title}: ${primary.label} (opens in a new tab)`}
    >
      {media}
    </a>
  )
}
