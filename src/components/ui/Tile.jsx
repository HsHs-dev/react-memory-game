export default function Tile({ idx }) {
  return (
    <button
      aria-label={`Tile ${idx}`}
      className="
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
    ">
      <span className="key-base absolute inset-0"></span>
      <span className="key-cap absolute inset-0"></span>
    </button>
  )
}