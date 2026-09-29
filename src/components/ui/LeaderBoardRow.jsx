import { motion } from "motion/react";

const DOT_COLORS = [
  "#F28B82",
  "#F7B878",
  "#F5DF8E",
  "#A8D8B0",
  "#8FD1C9",
  "#8FB8E8",
];

export default function LeaderboardRow({ rank, name, score, index }) {
  const accentStart = (rank - 1) % DOT_COLORS.length;

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.06,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex items-center gap-4
                 px-5 py-4 rounded-3xl
                 bg-white/70 backdrop-blur-md
                 border border-white/70
                 shadow-[0_4px_16px_-6px_rgba(58,70,94,0.2)]"
    >
      <div className="flex items-center justify-center
                      w-11 h-11 rounded-full shrink-0
                      bg-white/80 border border-white/80 shadow-sm">
        <span className="text-base font-semibold text-slate-700 tabular-nums">
          {rank}
        </span>
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-base font-semibold text-slate-800 truncate">
          {name}
        </span>
        <div className="flex gap-1.5 mt-1">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor:
                  DOT_COLORS[(accentStart + i) % DOT_COLORS.length],
              }}
            />
          ))}
        </div>
      </div>

      <span className="text-2xl font-semibold text-slate-800 tabular-nums shrink-0">
        {score}
      </span>
    </motion.li>
  );
}