import Background from "./ui/Background";
import Board from "./Board";

const PlayLayout = () => {
  return <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-[linear-gradient(160deg,var(--bg-cloud-1)_0%,var(--bg-cloud-2)_55%,var(--bg-cloud-3)_100%)]">
    <Background />
    <Board />
  </main>
};

export default PlayLayout;
