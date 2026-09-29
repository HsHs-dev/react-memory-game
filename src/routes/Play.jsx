import Board from "../components/Board";
import { useMemoryGame } from "../hooks/useMemoryGame";
import { PHASE } from "../lib/constants";
import FeedbackFlash from "../components/FeedbackFlash";
import StatusArea from "../components/play/StatusArea"
import ActionArea from "../components/play/ActionArea"
import GameOverCard from "../components/play/GameOverCard"

export default function Play() {

  const {
    sequence,
    phase,
    tileIndex,
    feedback,
    startGame,
    handleTileClick,
  } = useMemoryGame()


  return (
    <>
      <FeedbackFlash kind={feedback} />

      <StatusArea phase={phase} sequence={sequence} />

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

      <ActionArea phase={phase} onStart={startGame} />

      <GameOverCard phase={phase} onRestart={startGame} sequence={sequence} />
    </>
  );
}
