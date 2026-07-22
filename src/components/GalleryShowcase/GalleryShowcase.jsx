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

export default function GalleryShowcase({
  images = SHOWCASE_IMAGES,
  titlePrefix = "Our",
  titleHighlight = "Showcase",
  badge = null,
  subtext = "Explore our portfolio of exhibition stalls, brand activations, corporate events, and immersive experiences—crafted with creativity, precision, and flawless execution.",
  id = "gallery-showcase"
}) {
  const showcaseList = images && images.length > 0 ? images : SHOWCASE_IMAGES
  const total = showcaseList.length

  const wrap = useCallback((idx) => {
    return ((idx % total) + total) % total
  }, [total])

  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const sectionRef = useRef(null)
  const thumbRef = useRef(null)
  const touchStartX = useRef(0)
  const dragStartX = useRef(0)
  const thumbDragStartX = useRef(0)
  const thumbScrollStart = useRef(0)
  const isThumbDragging = useRef(false)

  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

  const goTo = useCallback((idx, dir) => {
    setDirection(dir)
    setCurrent(wrap(idx))
    setProgress(0)
  }, [wrap])

  const goNext = useCallback(() => goTo(current + 1, 1), [current, goTo])
  const goPrev = useCallback(() => goTo(current - 1, -1), [current, goTo])

  // Circular Auto Progress timer interval (3 seconds total = 3000ms, tick every 50ms = +1.667% progress)
  useEffect(() => {
    if (!isPlaying || isFullscreen) return

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goNext()
          return 0
        }
        return prev + (100 / 60)
      })
    }, 50)

    return () => clearInterval(timer)
  }, [isPlaying, isFullscreen, goNext])

  // Keyboard navigation & ESC handler for Fullscreen Lightbox
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
      if (e.key === "Escape" && isFullscreen) setIsFullscreen(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [goNext, goPrev, isFullscreen])

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
    window.addEventListener("mouseup", onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
    }
  }, [])

  useEffect(() => {
    const strip = thumbRef.current
    if (!strip) return
    const el = strip.children[current]
    if (!el) return
    const stripCenter = strip.offsetWidth / 2
    const thumbCenter = el.offsetLeft + el.offsetWidth / 2
    strip.scrollTo({ left: thumbCenter - stripCenter, behavior: "smooth" })
  }, [current])

  const mainVariants = {
    enter: (dir) => ({ opacity: 0, x: dir * 70, scale: 0.95 }),
    center: {
      opacity: 1, x: 0, scale: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir) => ({
      opacity: 0, x: dir * -70, scale: 0.95,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  const prevIdx = wrap(current - 1)
  const nextIdx = wrap(current + 1)

  return (
    <section
      className="gsc-section"
      id={id}
      ref={sectionRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setShowLeft(false); setShowRight(false) }}
    >
      <div className="gsc-separator" />
      <div className="gsc-bg-glow" />

      <motion.div
        className="gsc-header"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="gsc-header-titles">
          {badge && <div className="gsc-badge">{badge}</div>}
          <h2 className="gsc-headline">
            {titlePrefix && `${titlePrefix} `}<span className="gsc-headline-gold">{titleHighlight}</span>
          </h2>
        </div>
        <p className="gsc-subtext">
          {subtext}
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
          <img src={showcaseList[prevIdx].src} alt={showcaseList[prevIdx].label} className="gsc-side-img" draggable={false} />
        </div>

        <div className="gsc-main-frame">
          {/* Top Left Interactive Controls Bar */}
          <div className="gsc-top-left-controls">
            {/* Circular Progress & Play/Pause Button */}
            <button
              className={`gsc-ctrl-btn gsc-ring-btn ${!isPlaying ? 'paused' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setIsPlaying(prev => !prev)
              }}
              title={isPlaying ? "Pause slideshow" : "Resume slideshow"}
              aria-label={isPlaying ? "Pause slideshow" : "Resume slideshow"}
            >
              <svg className="gsc-progress-svg" viewBox="0 0 36 36">
                <path
                  className="gsc-progress-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="gsc-progress-bar"
                  strokeDasharray="100, 100"
                  strokeDashoffset={100 - progress}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="gsc-ring-icon">
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                )}
              </span>
            </button>

            {/* Fullscreen Lightbox Button */}
            <button
              className="gsc-ctrl-btn"
              onClick={(e) => {
                e.stopPropagation()
                setIsFullscreen(true)
              }}
              title="Expand to Fullscreen"
              aria-label="Expand to Fullscreen"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
          </div>

          {/* Counter Badge Pill Top Right */}
          <div className="gsc-counter-badge">
            <span>{String(current + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
          </div>

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
                src={showcaseList[current].src}
                alt={showcaseList[current].label}
                className="gsc-main-img"
                draggable={false}
              />
              <div className="gsc-main-overlay">
                <span className="gsc-main-category">{showcaseList[current].category}</span>
                <h3 className="gsc-main-label">{showcaseList[current].label}</h3>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="gsc-dots">
            {showcaseList.map((_, i) => (
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
          <img src={showcaseList[nextIdx].src} alt={showcaseList[nextIdx].label} className="gsc-side-img" draggable={false} />
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
            isThumbDragging.current = true
            thumbDragStartX.current = e.clientX
            thumbScrollStart.current = thumbRef.current.scrollLeft
            e.preventDefault()
          }}
        >
          {showcaseList.map((img, i) => (
            <motion.button
              key={img.id || i}
              className={"gsc-thumb-item" + (i === current ? " gsc-thumb-active" : "")}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              whileHover={{ scale: 1.07, filter: "brightness(1.18)" }}
              animate={
                i === current
                  ? { scale: 1.1, boxShadow: "0 0 0 2.5px #FFC107, 0 0 18px rgba(255,193,7,0.38)" }
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

      {/* Fullscreen Lightbox Modal (Professional Portfolio Viewer) */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="gsc-lb-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsFullscreen(false)}
          >
            {/* Top Bar Controls */}
            <div className="gsc-lb-topbar" onClick={(e) => e.stopPropagation()}>
              <div className="gsc-lb-meta">
                <span className="gsc-lb-category">{showcaseList[current].category}</span>
                <span className="gsc-lb-dot">•</span>
                <span className="gsc-lb-title">{showcaseList[current].label}</span>
              </div>
              <div className="gsc-lb-top-right">
                <div className="gsc-lb-counter">
                  <span>{String(current + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
                </div>
                <button
                  className="gsc-lb-close"
                  onClick={() => setIsFullscreen(false)}
                  aria-label="Close Lightbox"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Left & Right Screen-Edge Navigation Arrows */}
            <button
              className="gsc-lb-arrow gsc-lb-arrow--left"
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              className="gsc-lb-arrow gsc-lb-arrow--right"
              onClick={(e) => { e.stopPropagation(); goNext() }}
              aria-label="Next image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Center Main Viewport Image */}
            <motion.div
              className="gsc-lb-stage"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={showcaseList[current].src}
                alt={showcaseList[current].label}
                className="gsc-lb-main-img"
              />
            </motion.div>

            {/* Bottom Scrollable Thumbnail Strip */}
            <div className="gsc-lb-thumbs-container" onClick={(e) => e.stopPropagation()}>
              <div className="gsc-lb-thumbs">
                {showcaseList.map((img, i) => (
                  <button
                    key={img.id || i}
                    className={"gsc-lb-thumb-item" + (i === current ? " active" : "")}
                    onClick={() => goTo(i, i > current ? 1 : -1)}
                    aria-label={"Select " + img.label}
                  >
                    <img src={img.src} alt={img.label} className="gsc-lb-thumb-img" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
