import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function CountUp({ target, suffix = '', duration = 2 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {isInView ? (
        <Counter target={target} duration={duration} />
      ) : '0'}
      {suffix}
    </motion.span>
  )
}

function Counter({ target, duration }) {
  const nodeRef = useRef(null)

  return (
    <motion.span
      ref={nodeRef}
      initial={{ count: 0 }}
      animate={{ count: target }}
      transition={{ duration, ease: 'easeOut' }}
      onUpdate={(latest) => {
        if (nodeRef.current) {
          nodeRef.current.textContent = Math.round(latest.count).toLocaleString('it-IT')
        }
      }}
    >
      0
    </motion.span>
  )
}
