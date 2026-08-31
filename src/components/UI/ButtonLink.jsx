import ArrowIcon from './ArrowIcon'

export default function ButtonLink({ href, children, variant = 'primary', external = false, download = false }) {
  const externalProps = external ? { target: '_blank', rel: 'noreferrer' } : {}

  return (
    <a className={`button-link button-${variant}`} href={href} download={download || undefined} {...externalProps}>
      {children}
      <ArrowIcon external={external} />
    </a>
  )
}
