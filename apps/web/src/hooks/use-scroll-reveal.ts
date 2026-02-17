import { useEffect, useRef } from 'react'

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )

    const revealElements = el.querySelectorAll('.reveal')
    for (const revealEl of revealElements) {
      observer.observe(revealEl)
    }
    if (el.classList.contains('reveal')) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return ref
}
