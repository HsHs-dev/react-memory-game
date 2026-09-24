import { useEffect, useState } from "react";
import PlayLayout from "./components/PlayLayout";
import Board from "./components/Board";
import { PHASE } from "./constants";

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

      timer = setTimeout(() => {
        setTileIndex(null)
        i++;
        // let up the nex tile
        timer = setTimeout(tick, 200);
      }, 400)

    }

    tick()

    return () => {
      clearTimeout(timer)
    }


  }, [phase, sequence])


  const startGame = () => {
    const first = getRandomInt()
    setSequence([3, 2, 8, 1])
    setInputIndex(0)
    setPhase(PHASE.SHOWING)
  };

  const handlePlay = () => {
  };

  return (
    <PlayLayout>
      <Board flashIndex={tileIndex} />
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
