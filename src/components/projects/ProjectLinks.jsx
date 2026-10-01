import ArrowIcon from '../UI/ArrowIcon'
import { getProjectLinks } from './linkUtils'

export default function ProjectLinks({ project }) {
  const links = getProjectLinks(project.links)
  if (!links.length) return null

  return (
    <ul className="project-links" aria-label={`${project.title} links`}>
      {links.map((link) => (
        <li key={link.key}>
          <a href={link.href} target="_blank" rel="noreferrer">
            {link.label}
            <span className="sr-only"> for {project.title} (opens in a new tab)</span>
            <ArrowIcon external />
          </a>
        </li>
      ))}
    </ul>
  )
}
