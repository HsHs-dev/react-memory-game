import Tile from "./ui/Tile"
export default function Board() {

  return (
    <div className="
  relative 
  z-1
  grid
  grid-cols-[repeat(3,clamp(72px,12vw,118px))]
  auto-rows-[clamp(72px,12vw,118px)]
  gap-[clamp(22px,3.2vw,30px)]
  p-[clamp(24px,3.6vw,34px)]
    ">
      {
        [...Array(9)].map((_, idx) => {
          return <Tile idx={idx} />
        })
      }
    </div>
  )
}