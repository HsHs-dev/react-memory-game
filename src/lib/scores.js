const KEY = "best-score";

export function getBestScore() {
  const raw = localStorage.getItem(KEY);
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
}

export function recordScore(level) {
  const current = getBestScore();
  if (level > current) {
    localStorage.setItem(KEY, String(level));
    return level;
  }
  return current;
}