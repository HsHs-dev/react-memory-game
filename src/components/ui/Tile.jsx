import { useState } from "react"

export default function Tile({ idx, flashColor, isFlashing }) {

  const [flash, setFlash] = useState(false)

  const handleFlash = () => {
    setFlash(true)
    setTimeout(() => setFlash(false), 300)
  }

  return (
    <button
      aria-label={`Tile ${idx}`}
      className={`
      key
      relative
      bg-transparent
      appearance-none
      p-0
      m-0
      aspect-square
      focus:outline-none
      cursor-pointer
      [-webkit-tap-highlight-color:transparent]
      ${flash || isFlashing ? "flash" : ""}
    `}
      style={{ "--flash-rgb": `${flashColor}` }}
      onClick={handleFlash}
    >
      <span className="key-base absolute inset-0"></span>
      <span className="key-cap absolute inset-0"></span>
    </button >
  )
}