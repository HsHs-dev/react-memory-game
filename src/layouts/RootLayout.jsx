import { NavLink, useOutlet, useLocation, href } from "react-router";
import Background from "../components/ui/Background";
import { motion, AnimatePresence } from "motion/react";
import NavMenu from "../components/ui/NavMenu";
import { GitHubIcon, XIcon } from "../components/icons/SocialIcons"

const linkClass = ({ isActive }) =>
  `inline-flex items-center justify-center no-underline
   text-[clamp(0.8rem,1.1vw,0.95rem)] font-semibold
   px-[clamp(10px,1.4vw,14px)] py-2 rounded-full
   transition-colors whitespace-nowrap
   focus-visible:outline-2 focus-visible:outline-offset-2
   focus-visible:outline-[var(--shadow-cloud)]
   ${isActive
    ? "bg-white/85 text-slate-700 shadow-[0_2px_6px_-2px_var(--shadow-cloud)]"
    : "text-slate-500 hover:bg-white/60 hover:text-slate-700"
  }`;

export default function RootLayout() {

  const MENU_ITEMS = [
    { label: "GitHub", href: "https://github.com/hshs-dev/react-memory-game", Icon: GitHubIcon },
    { label: "X", href: "https://x.com/hshs_dev", Icon: XIcon }
  ]

  const outlet = useOutlet()
  const location = useLocation()

  return (
    <main className="relative min-h-dvh flex flex-col overflow-x-hidden
                 bg-[linear-gradient(160deg,var(--bg-cloud-1)_0%,var(--bg-cloud-2)_55%,var(--bg-cloud-3)_100%)]">

      <svg aria-hidden="true" className="absolute w-0 h-0 overflow-hidden">
        <defs>
          <filter id="liquidGlass" x="-20%" y="-20%" width="140%" height="140%"
            colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018"
              numOctaves="2" seed="5" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="2.5" result="softNoise" />
            <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="14"
              xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <Background />

      <header className="relative z-10 flex items-center justify-between gap-[clamp(6px,1.5vw,16px)]
                   px-[clamp(12px,3.5vw,40px)] py-[clamp(10px,2.5vw,28px)]">

        <div className="min-w-0 text-[clamp(0.85rem,2.4vw,1.9rem)] font-bold tracking-[0.01em] text-slate-600 whitespace-nowrap">
          Memory Sequence
        </div>
        <nav className="flex items-center gap-[clamp(4px,1vw,10px)]" aria-label="Primary">
          <NavLink to="/" end className={linkClass}>Play</NavLink>
          <NavLink to="/leaderboard" className={linkClass}>Leaderboard</NavLink>
          <div className="hidden sm:flex items-center gap-1 ml-2">
            {MENU_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                title={item.label}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full
                   text-slate-500 hover:bg-white/60 hover:text-slate-700
                   transition-colors
                   focus-visible:outline-2 focus-visible:outline-offset-2
                   focus-visible:outline-[var(--shadow-cloud)]"
              >
                <item.Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <NavMenu items={MENU_ITEMS} className="sm:hidden" />
        </nav>
      </header>

      <div className="relative z-10 flex-1 min-h-0 flex flex-col p-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            }}
            exit={{
              opacity: 0,
              y: -12,
              transition: { duration: 0.15, ease: "easeIn" },
            }}
            className="flex-1 flex flex-col items-center justify-center w-full"
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </div>

    </main>
  );
}