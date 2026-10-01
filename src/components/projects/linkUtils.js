// Order doubles as priority: the first available link is the project's primary destination,
// rendered first and used for the clickable preview image.
const linkTypes = [
  { key: 'live', label: 'Live demo' },
  { key: 'dashboard', label: 'View dashboard' },
  { key: 'devpost', label: 'Devpost' },
  { key: 'repository', label: 'GitHub' },
  { key: 'video', label: 'Walkthrough' },
]

export function getProjectLinks(links = {}) {
  return linkTypes.filter(({ key }) => links[key]).map(({ key, label }) => ({ key, label, href: links[key] }))
}

export function getPrimaryLink(links = {}) {
  return getProjectLinks(links)[0] ?? null
}
