import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Preloader({ onDone }) {
  const imgRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const img = imgRef.current
    const container = containerRef.current
    if (!img || !container) return

    const tl = gsap.timeline()

    // pulse for ~2 seconds (2 pulses)
    tl.to(img, { scale: 1.1, duration: 0.6, yoyo: true, repeat: 3, ease: 'power1.inOut' })

    // slight hold then zoom out and fade
    tl.to(img, { scale: 8, opacity: 0, duration: 0.8, ease: 'power2.in' }, '+=0.1')
    // fade out container quickly
    tl.to(container, { opacity: 0, duration: 0.15, ease: 'power1.out' }, '-=0.2')

    tl.call(() => {
      if (typeof onDone === 'function') onDone()
    })

    return () => {
      tl.kill()
    }
  }, [onDone])

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f0f2f5]/80">
      <img
        ref={imgRef}
        src="/images/logo.jpg"
        alt="preloader"
        className="w-40 h-40 md:w-64 md:h-64 object-cover rounded-full shadow-lg"
        style={{ willChange: 'transform, opacity' }}
      />
    </div>
  )
}
