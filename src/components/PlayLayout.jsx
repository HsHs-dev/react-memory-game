import Background from "./ui/Background";
import Board from "./Board";

const PlayLayout = () => {
  return <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-[linear-gradient(160deg,var(--bg-cloud-1)_0%,var(--bg-cloud-2)_55%,var(--bg-cloud-3)_100%)]">
    <svg aria-hidden="true" className="absolute w-0 h-0 overflow-hidden">
      <defs>
        <filter id="liquidGlass" x="-20%" y="-20%" width="140%" height="140%"
          colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018"
            numOctaves="2" seed="5" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2.5" result="softNoise" />
          <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="14"
            xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
    <Background />
    <Board />
  </main>
};

export default PlayLayout;
