import { useState } from "react";

export default function NamePrompt({ onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-3 mt-6 w-full max-w-[260px]"
    >
      <label
        htmlFor="player-name"
        className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-700 font-semibold"
      >
        Enter your name
      </label>

      <input
        id="player-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Alex"
        maxLength={20}
        autoComplete="off"
        spellCheck={false}
        className="w-full px-4 py-2.5 rounded-full text-center
                   bg-white/80 border border-white/80
                   text-slate-800 font-medium placeholder:text-slate-400
                   outline-none
                   focus:border-slate-400 focus:bg-white
                   transition-colors"
      />

      <button
        type="submit"
        disabled={!name.trim()}
        className="w-full px-6 py-2.5 rounded-full
                   bg-slate-700 text-white font-medium
                   shadow-md hover:bg-slate-800
                   active:scale-95
                   transition-all duration-150
                   cursor-pointer
                   disabled:opacity-40 disabled:pointer-events-none"
      >
        Submit Score
      </button>
    </form>
  );
}