import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function NavMenu({ items, className = "" }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleClose = (e) => {
      if (containerRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("click", handleClose);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", handleClose);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // animated burger menu for social links on mobile
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="nav-menu"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="w-9 h-9 z-50 sm:w-10 sm:h-10 rounded-full flex flex-col items-center justify-center gap-[5px]
           hover:bg-white/60 transition-colors
           focus-visible:outline-2 focus-visible:outline-offset-2
           focus-visible:outline-[var(--shadow-cloud)]
           cursor-pointer"
      >
        <span className={`block w-5 h-[2px] bg-slate-600 rounded-full transition-transform duration-200 origin-center ${open ? "translate-y-[7px] rotate-45" : ""}`} />
        <span className={`block w-5 h-[2px] bg-slate-600 rounded-full transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
        <span className={`block w-5 h-[2px] bg-slate-600 rounded-full transition-transform duration-200 origin-center ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="nav-menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-2
                       rounded-2xl bg-white/85 backdrop-blur-md
                       border border-white/60 shadow-xl overflow-hidden
                       origin-top-right"
          >
            <ul className="flex flex-col py-1">
              {items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    title={item.label}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center p-3
             text-slate-600 hover:bg-white/70 hover:text-slate-800
             transition-colors"
                  >
                    <item.Icon className="w-5 h-5 pointer-events-none" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}