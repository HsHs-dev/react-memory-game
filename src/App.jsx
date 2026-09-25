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
      {(phase === PHASE.SHOWING || phase === PHASE.INPUTTING) && (
        <div className="mb-8 text-3xl font-light text-slate-600 tracking-wide">
          Level: <span className="font-semibold text-slate-800 tabular-nums">{sequence.length}</span>
        </div>
      )}

      {phase !== PHASE.GAMEOVER && (
        <Board
          flashIndex={tileIndex}
          onActivate={handleTileClick}
          interactive={phase === PHASE.INPUTTING}
        />
      )}

      {/* Start button — only in IDLE */}
      {phase === PHASE.IDLE && (
        <button
          type="button"
          onClick={startGame}
          className="mt-8 px-6 py-3 rounded-full
                   bg-white/80 text-slate-700 font-medium
                   shadow-md hover:bg-white
                   transition-colors
                   cursor-pointer"
        >
          Start
        </button>
      )}

      {phase === PHASE.GAMEOVER && (
        <div className="flex flex-col items-center gap-10">
          <div className="text-4xl font-light text-slate-600 tracking-wide">
            Level: <span className="font-semibold text-slate-800 tabular-nums">{sequence.length}</span>
          </div>
          <div className="text-lg text-slate-800 tracking-wide">
            Best Score: <span className="font-semibold text-slate-800 tabular-nums">{localStorage.getItem("best-score")}</span>
          </div>

          <button
            type="button"
            onClick={startGame}
            className="px-8 py-3 rounded-full
                     bg-slate-700 text-white font-medium
                     shadow-lg hover:bg-slate-800
                     active:scale-95
                     transition-all duration-150
                     cursor-pointer"
          >
            Play Again
          </button>
        </div>
      )}
    </PlayLayout>
  );
}

export default App;
