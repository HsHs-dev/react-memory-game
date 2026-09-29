import { motion, AnimatePresence } from "motion/react";
import { PHASE } from "../../lib/constants";
import Overlay from "./GameOverOverly";

export default function GameOverCard({ phase, sequence, onRestart }) {
  return (
    <AnimatePresence>
      {phase === PHASE.GAMEOVER && (
        <Overlay sequence={sequence} onRestart={onRestart} />
      )}
    </AnimatePresence>
  );
}