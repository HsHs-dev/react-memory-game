export default function Background() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className="
          absolute
          w-[min(48vw,440px)]
          h-[min(48vw,440px)]
          rounded-full
          blur-[30px]
          bg-[rgba(255,255,255,0.9)]
          top-[4%]
          left-[6%]
          animate-[drift1_12s_ease-in-out_infinite]
        "
      />

      <div
        className="
          absolute
          w-[min(48vw,440px)]
          h-[min(48vw,440px)]
          rounded-full
          blur-[30px]
          bg-[rgba(200,213,232,0.9)]
          right-[6%]
          bottom-[4%]
          animate-[drift2_15s_ease-in-out_infinite]
        "
      />
    </div>
  )
}