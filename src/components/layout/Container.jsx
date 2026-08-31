import { createElement } from 'react'

export default function Container({ as = 'div', className = '', children, ...props }) {
  return createElement(as, { className: `container-shell ${className}`.trim(), ...props }, children)
}
