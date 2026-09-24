import { useState } from "react"
import { NOTES } from "../../constants"
import { playNote } from "../../audio"

export default function Tile({ idx, flashColor, isFlashing, isPressed, onActivate }) {

  const [flash, setFlash] = useState(false)

  const handleClick = () => {
    playNote(NOTES[idx])
    setFlash(true)
    setTimeout(() => setFlash(false), 300)
    onActivate?.(idx)
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
      ${isPressed ? "pressed" : ""}
    `}
      style={{ "--flash-rgb": `${flashColor}` }}
      onClick={handleClick}
    >
      <span className="key-base absolute inset-0"></span>
      <span className="key-cap absolute inset-0"></span>
    </button >
  )
}