import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import PlayLayout from "./components/PlayLayout";
import Board from "./components/Board";
import { PHASE, NOTES } from "./constants";
import { playNote } from "./audio";

const MAX_VAL = 9;

function getRandomInt() {
  return Math.floor(Math.random() * MAX_VAL);
}

function generateSeq(seq) {
  let rand = getRandomInt();
  if (seq.length === 0) {
    return [...seq, rand];
  } else {
    while (rand === seq[seq.length - 1]) rand = getRandomInt();
    return [...seq, rand];
  }
}

function App() {

  const [sequence, setSequence] = useState([])
  const [phase, setPhase] = useState(PHASE.IDLE)
  const [tileIndex, setTileIndex] = useState(null)
  const [inputIndex, setInputIndex] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [show, setShow] = useState(true)


  useEffect(() => {
    if (phase !== PHASE.SHOWING) return;

    let i = 0
    let timer;

    const tick = () => {
      if (i >= sequence.length) {
        setTileIndex(null)
        setPhase(PHASE.INPUTTING)
        return
      }

      const idx = sequence[i]
      setTileIndex(idx)
      playNote(NOTES[idx])

      timer = setTimeout(() => {
        setTileIndex(null)
        i++;
        // let up the nex tile
        timer = setTimeout(tick, 200);
      }, 400)

    }

    // delay after inputting
    timer = setTimeout(tick, 800);

    return () => {
      clearTimeout(timer)
    }


  }, [phase, sequence])

  const triggerFeedback = (kind) => {
    setFeedback(kind)
    setTimeout(() => setFeedback(null), 1200)
  }

  const startGame = () => {
    const first = getRandomInt()
    setSequence([first])
    setInputIndex(0)
    setFeedback(null)
    setPhase(PHASE.SHOWING)
  };

  const setHighscore = () => {
    const previous = JSON.parse(localStorage.getItem("best-score"))
    if (previous == null) {
      localStorage.setItem("best-score", JSON.stringify(sequence.length))
    } else if (sequence.length > previous) {
      localStorage.setItem("best-score", JSON.stringify(sequence.length))
    }
  }

  const handleTileClick = (idx) => {

    if (phase !== PHASE.INPUTTING) return

    if (idx !== sequence[inputIndex]) {
      triggerFeedback("wrong")
      setPhase(PHASE.GAMEOVER)
      setHighscore()
      return;
    }

    const next = inputIndex + 1

    if (next === sequence.length) {
      triggerFeedback("correct")
      const extended = generateSeq(sequence)
      setSequence(extended)
      setInputIndex(0)
      setPhase(PHASE.SHOWING)
    } else {
      setInputIndex(next)
    }

  }

  return (
    <PlayLayout feedback={feedback}>

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

      <div
        className={`transition-all duration-500 ${phase === PHASE.GAMEOVER
          ? 'opacity-15 blur-[6px] scale-95'
          : 'opacity-100 blur-0 scale-100'
          }`}
      >
        <Board
          flashIndex={tileIndex}
          onActivate={handleTileClick}
          interactive={phase === PHASE.INPUTTING}
        />
      </div>

      <div className="h-20 flex items-center justify-center mt-4">
        <AnimatePresence mode="wait">
          {phase === PHASE.IDLE && show && (
            <motion.button
              key="start"
              type="button"
              onClick={startGame}
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
                onClick={startGame}
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


    </PlayLayout>
  );
}

export default App;
