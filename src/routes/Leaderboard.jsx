import { useEffect, useState } from "react";
import { getScores } from "../lib/scores";
import LeaderboardRow from "../components/ui/LeaderBoardRow";

const MAX_ROWS = 100;

export default function Leaderboard() {

  const [entries, setEntries] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getScores()
      .then((data) => {
        if (!cancelled) setEntries(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const loading = entries === null && !error;
  const visible = entries?.slice(0, MAX_ROWS) ?? [];

  return (
    <div className="w-full max-w-2xl flex flex-col items-center">
      <header className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-700 tracking-tight">
          Leaderboard
        </h1>
        <p className="mt-1 text-slate-500">Longest sequences remembered</p>
      </header>

      {loading && (
        <p className="text-slate-500">Loading…</p>
      )}

      {error && (
        <p className="text-slate-500">Couldn't load leaderboard.</p>
      )}

      {!loading && !error && visible.length === 0 && (
        <p className="text-slate-500">No scores yet — be the first!</p>
      )}

      {!loading && !error && visible.length > 0 && (
        <ul className="w-full flex flex-col gap-3">
          {visible.map((entry, i) => (
            <LeaderboardRow
              key={entry.id}
              rank={i + 1}
              name={entry.playerDisplayName || "Anonymous"}
              score={entry.score}
              index={i}
            />
          ))}
        </ul>
      )}
    </div>
  );
}