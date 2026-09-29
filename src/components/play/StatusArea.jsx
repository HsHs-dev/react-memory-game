import { AnimatePresence, motion } from "motion/react";
import { PHASE } from "../../lib/constants";

export default function StatusArea({ phase, sequence }) {

  return (
    <div className="h-32 flex items-center justify-center mb-4">
      <AnimatePresence mode="wait">
        {phase === PHASE.IDLE && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center gap-1"
          >
            <div className="text-[clamp(1.5rem,4vw,3rem)] font-bold text-slate-700 tracking-wide whitespace-nowrap">
              How far can you remember?
            </div>
            <div className="text-lg font-normal text-slate-400 tracking-wide">
              Watch the sequence, then play it back
            </div>
          </motion.div>
        )}
        {(phase === PHASE.SHOWING || phase === PHASE.INPUTTING) && (
          <motion.div
            key="level"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex items-baseline gap-2 text-3xl font-light text-slate-600 tracking-wide"
          >
            <span>Level:</span>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={sequence.length}
                initial={{ opacity: 0, y: -12, scale: 0.6, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 12, scale: 0.6, filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-4xl font-bold tabular-nums
                   bg-gradient-to-br from-slate-800 via-slate-700 to-slate-500
                   bg-clip-text text-transparent"
              >
                {sequence.length}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

}
