'use client'

import { useRef } from 'react'
import { CalendarDays, Flame, Flower2, MapPin } from 'lucide-react'
import { PetalShower, type PetalShowerHandle } from '@/components/petal-shower'

const schedule = [
  {
    icon: CalendarDays,
    label: 'Ganesh Sthapana',
    value: 'Installation of the Idol',
    sub: '14th September',
  },
  {
    icon: Flame,
    label: 'Daily Aarti & Darshan',
    value: 'Morning & Evening',
    sub: 'Join us for the prayers',
  },
  {
    icon: Flower2,
    label: 'Uttarpuja & Visarjan',
    value: 'Farewell Procession',
    sub: '19th September, Saturday',
  },
]

function Toran() {
  return (
    <div aria-hidden="true" className="flex items-start justify-center gap-2 pb-2">
      {Array.from({ length: 11 }).map((_, i) => (
        <span key={i} className="flex flex-col items-center">
          <span className="h-3 w-px bg-gold/40" />
          <span
            className="block rounded-full bg-gradient-to-b from-gold to-saffron shadow-[0_0_8px] shadow-gold/30"
            style={{ width: i % 2 ? 9 : 12, height: i % 2 ? 9 : 12 }}
          />
        </span>
      ))}
    </div>
  )
}

export default function Page() {
  const petalsRef = useRef<PetalShowerHandle>(null)

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8">
      <PetalShower ref={petalsRef} />

      {/* soft radial glow behind card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-saffron/20 blur-3xl"
      />

      <article className="relative w-full max-w-md rounded-[2rem] border border-gold/40 bg-card/80 p-6 text-center shadow-2xl backdrop-blur-md sm:p-8">
        {/* corner flourishes */}
        <span className="pointer-events-none absolute left-3 top-3 h-6 w-6 rounded-tl-xl border-l-2 border-t-2 border-gold/50" />
        <span className="pointer-events-none absolute right-3 top-3 h-6 w-6 rounded-tr-xl border-r-2 border-t-2 border-gold/50" />
        <span className="pointer-events-none absolute bottom-3 left-3 h-6 w-6 rounded-bl-xl border-b-2 border-l-2 border-gold/50" />
        <span className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 rounded-br-xl border-b-2 border-r-2 border-gold/50" />

        <Toran />

        <p className="text-sm font-semibold tracking-[0.35em] text-gold">
          {'|| Shri Ganeshaya Namah ||'}
        </p>

        {/* Ganesha idol, background removed and set against the theme */}
        <div className="relative mx-auto my-5 h-72 w-64">
          {/* radiant halo behind the idol */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-6 h-52 w-52 -translate-x-1/2 rounded-full bg-saffron/35 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-10 h-36 w-36 -translate-x-1/2 rounded-full bg-gold/25 blur-2xl"
          />
          <img
            src="/images/ganesha-idol.png"
            alt="Lord Ganesha idol adorned with a golden crown and jewellery"
            className="relative h-full w-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.45)]"
          />
        </div>

        <p className="font-display text-xs font-medium uppercase tracking-[0.4em] text-saffron">
          Ganpati Bappa Morya
        </p>

        <h1 className="mt-3 font-display text-3xl font-semibold uppercase leading-tight tracking-wide text-gold text-balance drop-shadow-sm sm:text-4xl">
          You Are Invited
        </h1>

        <div aria-hidden="true" className="mx-auto mt-3 flex items-center justify-center gap-2">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/60" />
          <Flower2 className="h-4 w-4 text-gold/80" />
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        <p className="mx-auto mt-4 max-w-sm text-lg leading-relaxed text-card-foreground/90 text-pretty">
          As we do every year, Lord Ganesha graces our home once again. We
          warmly invite you and your family to join us for the darshan and
          mahaprasad, and to add to the joy of the celebration with your
          presence.
        </p>

        {/* Host */}
        <div className="mx-auto mt-6 rounded-2xl border border-gold/25 bg-gold-soft px-5 py-4">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Your Hosts
          </span>
          <h2 className="mt-1 font-display text-2xl text-gold">The Wadkar Family</h2>
        </div>

        {/* Petal shower button */}
        <button
          type="button"
          onClick={() => petalsRef.current?.burst(70)}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-saffron px-6 py-3 text-lg font-bold text-primary-foreground shadow-lg transition-transform active:scale-95"
        >
          <Flower2 className="h-5 w-5" />
          Offer Flowers to Bappa
        </button>

        {/* Schedule */}
        <section className="mt-8 text-left">
          <h3 className="border-b border-gold/25 pb-2 text-center font-display text-xl text-gold">
            Festival Schedule
          </h3>
          <ul className="mt-4 space-y-3">
            {schedule.map(({ icon: Icon, label, value, sub }) => (
              <li
                key={label}
                className="flex items-start gap-3 rounded-xl border border-gold/20 bg-secondary/40 p-4"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-gold">{label}</p>
                  <p className="text-card-foreground/90">{value}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Venue */}
        <section className="mt-6 rounded-2xl border border-gold/30 bg-secondary/50 p-5">
          <h3 className="text-lg font-bold text-gold">Venue</h3>
          <p className="mt-1 font-semibold text-card-foreground/90 text-pretty">
            KHARGHAR CHS SHRAMIK I-302, Kharghar
          </p>
          <a
            href="https://goo.gl/maps/gzyJbGUNG4hEuFtE9?g_st=ac"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-md transition-colors hover:bg-saffron"
          >
            <MapPin className="h-4 w-4" />
            Open in Google Maps
          </a>
        </section>

        <p className="mt-8 border-t border-gold/25 pt-4 text-sm text-muted-foreground">
          We look forward to welcoming you · The Wadkar Family
        </p>
      </article>
    </main>
  )
}
