import { motion, AnimatePresence } from "motion/react"
import { PHASE } from "../../lib/constants"

export default function GameOverCard({ phase, onStart, sequence }) {
  return (
    <AnimatePresence>
      {phase === PHASE.GAMEOVER && (
        <motion.div
          key="gameover-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 24 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex flex-col items-center
                   px-12 py-10 rounded-4xl
                   bg-white/75 backdrop-blur-xl
                   border border-white/80
                   shadow-2xl"
          >
            <span className="text-[0.7rem] uppercase tracking-[0.28em] text-slate-700 font-semibold">
              Game Over
            </span>

            <div className="flex flex-col items-center mt-7">
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-700 font-semibold">
                Level Reached
              </span>
              <span className="text-7xl font-semibold text-slate-900 tabular-nums leading-none mt-2">
                {sequence.length}
              </span>
            </div>

            <div className="flex flex-col items-center mt-5">
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-700 font-semibold">
                Best
              </span>
              <span className="text-2xl font-semibold text-slate-900 tabular-nums mt-1">
                {localStorage.getItem("best-score") ?? sequence.length}
              </span>
            </div>

            <motion.button
              type="button"
              onClick={onStart}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="mt-10 px-8 py-3 rounded-full
                     bg-slate-700 text-white font-medium
                     shadow-lg hover:bg-slate-800
                     cursor-pointer"
            >
              Play Again
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}