import { AnimatePresence, motion } from "motion/react";
import { PHASE } from "../../lib/constants";

export default function ActionArea({ phase, onStart }) {

  return (
    <div className="h-20 flex items-center justify-center mt-4">
      <AnimatePresence mode="wait">
        {phase === PHASE.IDLE && (
          <motion.button
            key="start"
            type="button"
            onClick={onStart}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="px-6 py-3 rounded-full bg-white/80 text-slate-700 font-medium shadow-md hover:bg-white transition-colors cursor-pointer"
          >
            Start
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )

}