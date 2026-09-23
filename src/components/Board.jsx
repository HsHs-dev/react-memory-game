import Tile from "./ui/Tile"
export default function Board() {
  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-md">
      {
        [...Array(9)].map((_, idx) => {
          return <Tile key={idx} idx={idx} />
        })
      }
    </div>
  )
}