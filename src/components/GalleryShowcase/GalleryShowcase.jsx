import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import "./GalleryShowcase.css"

const SHOWCASE_IMAGES = [
  { id: 1,  src: "/images/g1.png",       label: "Dr. Rashel",       category: "Brand Activation" },
  { id: 2,  src: "/images/g2.png",       label: "Baker Hughes",     category: "Corporate Event"  },
  { id: 3,  src: "/images/g3.png",       label: "Vijay Mamra",      category: "Exhibition Stall" },
  { id: 4,  src: "/images/g4.png",       label: "Walkaroo",         category: "Product Launch"   },
  { id: 5,  src: "/images/g5.png",       label: "Mufti",            category: "Experience Zone"  },
  { id: 6,  src: "/images/g6.png",       label: "ATC Chains",       category: "Trade Show"       },
  { id: 7,  src: "/images/g7.png",       label: "Hello EDC",        category: "Stage Setup"      },
  { id: 8,  src: "/images/g8.png",       label: "Flexiworld",       category: "Exhibition Stall" },
  { id: 9,  src: "/images/g9.png",       label: "Exhibition Stall", category: "Exhibition Stall" },
  { id: 10, src: "/images/stall1.png",   label: "Corporate Event",  category: "Corporate Event"  },
  { id: 11, src: "/images/stall2.png",   label: "Stage Setup",      category: "Stage Setup"      },
  { id: 12, src: "/images/stall3.png",   label: "Product Launch",   category: "Product Launch"   },
  { id: 13, src: "/images/stall4.png",   label: "Brand Experience", category: "Brand Activation" },
  { id: 14, src: "/images/stall5.png",   label: "Promo Booth",      category: "Promo Booth"      },
  { id: 15, src: "/images/collage1.png", label: "Event Collage",    category: "Exhibition Stall" },
  { id: 16, src: "/images/collage2.png", label: "Brand Showcase",   category: "Brand Activation" },
  { id: 17, src: "/images/collage3.png", label: "Grand Exhibition", category: "Exhibition Stall" },
]

const TOTAL      = SHOWCASE_IMAGES.length
const AUTOPLAY_MS = 4000

function wrap(idx) {
  return ((idx % TOTAL) + TOTAL) % TOTAL
}

export default function GalleryShowcase() {
  const [current,   setCurrent]   = useState(0)
  const [direction, setDirection] = useState(1)
  const [showLeft,  setShowLeft]  = useState(false)
  const [showRight, setShowRight] = useState(false)

  const sectionRef        = useRef(null)
  const thumbRef          = useRef(null)
  const autoRef           = useRef(null)
  const touchStartX       = useRef(0)
  const dragStartX        = useRef(0)
  const thumbDragStartX   = useRef(0)
  const thumbScrollStart  = useRef(0)
  const isThumbDragging   = useRef(false)

  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

  const goTo = useCallback((idx, dir) => {
    setDirection(dir)
    setCurrent(wrap(idx))
  }, [])

  const goNext = useCallback(() => goTo(current + 1,  1), [current, goTo])
  const goPrev = useCallback(() => goTo(current - 1, -1), [current, goTo])

  const startAuto = useCallback(() => {
    clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      setCurrent(prev => wrap(prev + 1))
      setDirection(1)
    }, AUTOPLAY_MS)
  }, [])

  const stopAuto = useCallback(() => clearInterval(autoRef.current), [])

  useEffect(() => { startAuto(); return stopAuto }, [startAuto, stopAuto])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft")  goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [goNext, goPrev])

  useEffect(() => {
    const el = thumbRef.current
    if (!el) return
    const handler = (e) => { e.preventDefault(); el.scrollLeft += e.deltaY * 1.2 }
    el.addEventListener("wheel", handler, { passive: false })
    return () => el.removeEventListener("wheel", handler)
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      if (!isThumbDragging.current || !thumbRef.current) return
      thumbRef.current.scrollLeft = thumbScrollStart.current - (e.clientX - thumbDragStartX.current)
    }
    const onUp = () => { isThumbDragging.current = false }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup",  onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup",  onUp)
    }
  }, [])

  // Scroll the thumbnail strip to center the active thumb —
  // uses manual scrollLeft so the PAGE scroll is never touched.
  useEffect(() => {
    const strip = thumbRef.current
    if (!strip) return
    const el = strip.children[current]
    if (!el) return
    const stripCenter  = strip.offsetWidth  / 2
    const thumbCenter  = el.offsetLeft + el.offsetWidth / 2
    strip.scrollTo({ left: thumbCenter - stripCenter, behavior: "smooth" })
  }, [current])

  const mainVariants = {
    enter:  (dir) => ({ opacity: 0, x: dir * 70, scale: 0.95 }),
    center: {
      opacity: 1, x: 0, scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir) => ({
      opacity: 0, x: dir * -70, scale: 0.95,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  const prevIdx = wrap(current - 1)
  const nextIdx = wrap(current + 1)

  return (
    <section
      className="gsc-section"
      id="gallery-showcase"
      ref={sectionRef}
      onMouseEnter={stopAuto}
      onMouseLeave={() => { startAuto(); setShowLeft(false); setShowRight(false) }}
    >
      <div className="gsc-separator" />
      <div className="gsc-bg-glow" />

      <motion.div
        className="gsc-header"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="gsc-headline">
          Our <span className="gsc-headline-gold">Showcase</span>
        </h2>
        <p className="gsc-subtext">
          Explore our portfolio of exhibition stalls, brand activations,
          corporate events, and immersive experiences—crafted with creativity,
          precision, and flawless execution.
        </p>
      </motion.div>

      <motion.div
        className="gsc-stage"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          const diff = touchStartX.current - e.changedTouches[0].clientX
          if (Math.abs(diff) > 40) { if (diff > 0) goNext(); else goPrev() }
        }}
        onMouseDown={(e) => { dragStartX.current = e.clientX }}
        onMouseUp={(e) => {
          const diff = dragStartX.current - e.clientX
          if (Math.abs(diff) > 50) { if (diff > 0) goNext(); else goPrev() }
        }}
      >
        <div
          className="gsc-hover-zone gsc-hover-zone--left"
          onMouseEnter={() => setShowLeft(true)}
          onMouseLeave={() => setShowLeft(false)}
          onClick={(e) => { e.stopPropagation(); goPrev() }}
        >
          <motion.button
            className="gsc-arrow gsc-arrow--left"
            animate={showLeft ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
            transition={{ duration: 0.25 }}
            aria-label="Previous image"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </motion.button>
        </div>

        <div
          className="gsc-hover-zone gsc-hover-zone--right"
          onMouseEnter={() => setShowRight(true)}
          onMouseLeave={() => setShowRight(false)}
          onClick={(e) => { e.stopPropagation(); goNext() }}
        >
          <motion.button
            className="gsc-arrow gsc-arrow--right"
            animate={showRight ? { opacity: 1, x: 0 } : { opacity: 0, x: 14 }}
            transition={{ duration: 0.25 }}
            aria-label="Next image"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </motion.button>
        </div>

        <div className="gsc-side-peek gsc-side-peek--left">
          <img src={SHOWCASE_IMAGES[prevIdx].src} alt={SHOWCASE_IMAGES[prevIdx].label} className="gsc-side-img" draggable={false} />
        </div>

        <div className="gsc-main-frame">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={current}
              className="gsc-main-inner"
              custom={direction}
              variants={mainVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <img
                src={SHOWCASE_IMAGES[current].src}
                alt={SHOWCASE_IMAGES[current].label}
                className="gsc-main-img"
                draggable={false}
              />
              <div className="gsc-main-overlay">
                <span className="gsc-main-category">{SHOWCASE_IMAGES[current].category}</span>
                <h3 className="gsc-main-label">{SHOWCASE_IMAGES[current].label}</h3>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="gsc-dots">
            {SHOWCASE_IMAGES.map((_, i) => (
              <button
                key={i}
                className={"gsc-dot" + (i === current ? " gsc-dot--active" : "")}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                aria-label={"Go to image " + (i + 1)}
              />
            ))}
          </div>
        </div>

        <div className="gsc-side-peek gsc-side-peek--right">
          <img src={SHOWCASE_IMAGES[nextIdx].src} alt={SHOWCASE_IMAGES[nextIdx].label} className="gsc-side-img" draggable={false} />
        </div>
      </motion.div>

      <motion.div
        className="gsc-thumbs-wrapper"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="gsc-thumbs"
          ref={thumbRef}
          onMouseDown={(e) => {
            isThumbDragging.current  = true
            thumbDragStartX.current  = e.clientX
            thumbScrollStart.current = thumbRef.current.scrollLeft
            e.preventDefault()
          }}
        >
          {SHOWCASE_IMAGES.map((img, i) => (
            <motion.button
              key={img.id}
              className={"gsc-thumb-item" + (i === current ? " gsc-thumb-active" : "")}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              whileHover={{ scale: 1.07, filter: "brightness(1.18)" }}
              animate={
                i === current
                  ? { scale: 1.1,  boxShadow: "0 0 0 2.5px #FFC107, 0 0 18px rgba(255,193,7,0.38)" }
                  : { scale: 1.0, boxShadow: "0 0 0 1.5px rgba(255,193,7,0.22)" }
              }
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              aria-label={"Select " + img.label}
              draggable={false}
            >
              <img src={img.src} alt={img.label} className="gsc-thumb-img" loading="lazy" draggable={false} />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
