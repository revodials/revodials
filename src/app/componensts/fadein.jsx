"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"


export function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.5,
  viewTriggerOffset = 0.1,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: viewTriggerOffset })

  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: { x: 0, y: 0 },
  }

  const motionProps = {
    initial: {
      opacity: 0,
      ...directionOffset[direction],
    },
    animate: isInView
      ? {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration,
            delay,
            ease: "easeOut",
          },
        }
      : {},
  }

  return (
    <motion.div ref={ref} className={className} {...motionProps}>
      {children}
    </motion.div>
  )
}