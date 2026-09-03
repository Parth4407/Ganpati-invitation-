'use client'

import { useCallback, useEffect, useImperativeHandle, useRef, type Ref } from 'react'

export type PetalShowerHandle = {
  burst: (count?: number) => void
}

type Petal = {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  angle: number
  spin: number
  sway: number
  swayOffset: number
  color: string
}

const PETAL_COLORS = ['#f6a11f', '#f2c33d', '#e8811d', '#d9541f', '#f7d774']

export function PetalShower({ ref }: { ref?: Ref<PetalShowerHandle> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const petalsRef = useRef<Petal[]>([])
  const rafRef = useRef<number>(0)

  const spawn = useCallback((count: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 9 + 8
      petalsRef.current.push({
        x: Math.random() * canvas.width,
        y: -30 - Math.random() * canvas.height * 0.3,
        size,
        speedY: Math.random() * 1.8 + 1.4,
        speedX: Math.random() * 1.2 - 0.6,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() * 2 - 1) * 0.04,
        sway: Math.random() * 1.2 + 0.4,
        swayOffset: Math.random() * Math.PI * 2,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      })
    }
  }, [])

  useImperativeHandle(ref, () => ({ burst: (count = 60) => spawn(count) }), [spawn])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const drawPetal = (p: Petal) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.angle)
      ctx.fillStyle = p.color
      // 5 soft marigold petals around a center
      for (let i = 0; i < 5; i++) {
        ctx.rotate((Math.PI * 2) / 5)
        ctx.beginPath()
        ctx.ellipse(0, p.size * 0.5, p.size * 0.28, p.size * 0.5, 0, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.fillStyle = '#7a2e12'
      ctx.beginPath()
      ctx.arc(0, 0, p.size * 0.22, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const petals = petalsRef.current
      const now = performance.now() / 1000
      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i]
        p.y += p.speedY
        p.x += p.speedX + Math.sin(now + p.swayOffset) * p.sway * 0.4
        p.angle += p.spin
        drawPetal(p)
        if (p.y > canvas.height + 40) petals.splice(i, 1)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    // gentle ambient drizzle on load
    spawn(14)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [spawn])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 h-screen w-screen"
    />
  )
}
