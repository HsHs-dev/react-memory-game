const API_BASE = "https://api.simpleboards.dev/api";
const API_KEY = import.meta.env.VITE_SIMPLEBOARDS_KEY;
const BOARD_ID = import.meta.env.VITE_SIMPLEBOARDS_BOARD;
const NAME_KEY = "player-name";
const ID_KEY = "player-id";
const BEST_KEY = "player-best";

function getOrCreatePlayerId() {
  let id = localStorage.getItem(ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(ID_KEY, id);
  }
  return id;
}

export function getName() {
  return localStorage.getItem(NAME_KEY);
}

export function setName(name) {
  localStorage.setItem(NAME_KEY, name.trim());
}

export function getBest() {
  return Number(localStorage.getItem(BEST_KEY) || 0);
}

function setBest(level) {
  localStorage.setItem(BEST_KEY, String(level));
}


export async function getScores() {
  const res = await fetch(`${API_BASE}/leaderboards/${BOARD_ID}/entries`, {
    headers: { "x-api-key": API_KEY },
  });
  if (!res.ok) throw new Error(`getScores failed: ${res.status}`);
  return await res.json();
}

export async function submitScore({ name, level }) {
  const playerId = getOrCreatePlayerId();
  const best = getBest();

  if (level <= best) {
    return { skipped: true, reason: "not-personal-best" };
  }

  const res = await fetch(`${API_BASE}/entries`, {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      leaderboardId: BOARD_ID,
      playerId,
      playerDisplayName: name,
      score: String(level),
      metadata: JSON.stringify({ timestamp: Date.now() }),
    }),
  });

  if (!res.ok) throw new Error(`submitScore failed: ${res.status}`);

  setBest(level);
  return await res.json();
}