import { useEffect, useState } from 'react'

const messages = {
  idle: '',
  copied: 'Email address copied to clipboard',
  failed: 'Copy failed. Select the address to copy it manually.',
}

export default function CopyEmailButton({ email }) {
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (status === 'idle') return undefined
    const timer = window.setTimeout(() => setStatus('idle'), 2500)
    return () => window.clearTimeout(timer)
  }, [status])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
  }

  return (
    <>
      <button type="button" className="button-link button-secondary copy-button" onClick={copy}>
        {status === 'copied' ? (
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 3.5v-.5a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
        {status === 'copied' ? 'Copied' : 'Copy email'}
      </button>
      <span className="sr-only" role="status" aria-live="polite">{messages[status]}</span>
      {status === 'failed' && <span className="copy-error" aria-hidden="true">{messages.failed}</span>}
    </>
  )
}
