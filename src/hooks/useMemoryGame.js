// main game logic driver

import { useEffect, useState } from "react";
import { PHASE, NOTES } from "../lib/constants";
import { playNote } from "../lib/audio";
import { recordScore } from "../lib/scores";

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


export function useMemoryGame() {
  const [sequence, setSequence] = useState([]);
  const [phase, setPhase] = useState(PHASE.IDLE);
  const [tileIndex, setTileIndex] = useState(null);
  const [inputIndex, setInputIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);

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

  const startGame = () => {
    const first = getRandomInt()
    setSequence([first])
    setInputIndex(0)
    setFeedback(null)
    setPhase(PHASE.SHOWING)
  };


  const triggerFeedback = (kind) => {
    setFeedback(kind)
    setTimeout(() => setFeedback(null), 1200)
  }

  const handleTileClick = (idx) => {

    if (phase !== PHASE.INPUTTING) return

    if (idx !== sequence[inputIndex]) {
      triggerFeedback("wrong")
      setPhase(PHASE.GAMEOVER)
      recordScore(sequence.length)
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



  return {
    // state
    sequence,
    phase,
    tileIndex,
    feedback,
    // actions
    startGame,
    handleTileClick,
  };
}