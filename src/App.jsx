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
  console.log(seq);
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


  useEffect(() => {
    if (phase !== PHASE.SHOWING) return;

    console.log("game started. seq: ", sequence)

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


  const startGame = () => {
    const first = getRandomInt()
    setSequence([first])
    setInputIndex(0)
    setPhase(PHASE.SHOWING)
  };

  const handleTileClick = (idx) => {

    if (phase !== PHASE.INPUTTING) return

    if (idx !== sequence[inputIndex]) {
      setPhase(PHASE.GAMEOVER)
      return;
    }

    const next = inputIndex + 1

    if (next === sequence.length) {
      const extended = generateSeq(sequence)
      setSequence(extended)
      setInputIndex(0)
      setPhase(PHASE.SHOWING)
    } else {
      setInputIndex(next)
    }

  }

  return (
    <PlayLayout>
      <Board flashIndex={tileIndex} onActivate={handleTileClick} />
      {
        phase === PHASE.IDLE && (
          <button type="button" onClick={startGame}
            className="mt-8 px-6 py-3 rounded-full bg-white/80 text-slate-700 font-medium shadow-md hover:bg-white transition-colors">
            Start
          </button>
        )
      }
    </PlayLayout>
  )
}

export default App;
