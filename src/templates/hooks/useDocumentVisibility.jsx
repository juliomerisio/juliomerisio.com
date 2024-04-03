import { useEffect, useState } from 'react'

export function useDocumentVisibility() {
  const [documentVisibility, setDocumentVisibility] = useState('visible')

  useEffect(() => {
    const listener = () => setDocumentVisibility(document.visibilityState)
    document.addEventListener('visibilitychange', listener)
    return () => document.removeEventListener('visibilitychange', listener)
  }, [])

  return documentVisibility
}
