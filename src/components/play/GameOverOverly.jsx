import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { getName, setName, getBest, submitScore } from "../../lib/scores";
import NamePrompt from "./NamePrompt";

export default function Overlay({ sequence, onRestart }) {

  const [showPrompt, setShowPrompt] = useState(!getName());
  const [status, setStatus] = useState(() => (getName() ? "submitting" : "idle"));
  const hasRun = useRef(false);

  const submit = async (name) => {
    try {
      const result = await submitScore({ name, level: sequence.length });
      setStatus(result?.skipped ? "not-best" : "new-best");
    } catch (err) {
      console.error("submit failed:", err);
      setStatus("error");
    }
  };

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const name = getName();
    if (name) submit(name);
  }, []);

  const handleNameSubmit = (name) => {
    setName(name);
    setShowPrompt(false);
    setStatus("submitting");
    submit(name);
  };

  return (
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
                   px-12 py-10 rounded-[2rem]
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

        {showPrompt ? (
          <NamePrompt onSubmit={handleNameSubmit} />
        ) : (
          <StatusBlock status={status} level={sequence.length} />
        )}

        <motion.button
          type="button"
          onClick={onRestart}
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
  );
}

function StatusBlock({ status, level }) {
  const config = {
    idle: { label: "Best", value: getBest(), className: "text-slate-700" },
    submitting: { label: "Saving…", value: getBest(), className: "text-slate-500" },
    "new-best": { label: "New Best!", value: level, className: "text-emerald-700" },
    "not-best": { label: "Your Best", value: getBest(), className: "text-slate-700" },
    error: { label: "Couldn't save", value: getBest(), className: "text-slate-500" },
  };
  const c = config[status] ?? config.idle;

  return (
    <div className="flex flex-col items-center mt-5 min-h-[62px]">
      <span className={`text-[0.65rem] uppercase tracking-[0.2em] font-semibold ${c.className}`}>
        {c.label}
      </span>
      <motion.span
        key={status}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-2xl font-semibold text-slate-900 tabular-nums mt-1"
      >
        {c.value}
      </motion.span>
    </div>
  );
}