import Tile from "./ui/Tile"
export default function Board({ flashIndex }) {

  const FLASH_RGB = [
    '242, 139, 130',
    '247, 184, 120',
    '245, 223, 142',
    '160, 220, 150',
    '120, 205, 195',
    '143, 184, 232',
    '168, 168, 232',
    '200, 160, 224',
    '235, 160, 200'
  ];

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
        [...Array(9)].map((_, idx) => (
          <Tile
            key={idx}
            idx={idx}
            flashColor={FLASH_RGB[idx]}
            isFlashing={flashIndex === idx} />
        ))
      }
    </div>
  )
}