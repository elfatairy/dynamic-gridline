import { motion } from 'motion/react'
import styles from '~/styles/Slider.module.css'
import { Slider as SliderPrimitive } from './ui/slider'

export interface SliderProps {
  minZoom: number
  maxZoom: number
  zoomValue: number
  handleZoom: (value: number) => void
  zoomSteps: number
}

export const Slider = ({ minZoom, maxZoom, zoomValue, handleZoom, zoomSteps }: SliderProps) => {
  const min = Math.log10(minZoom)
  const max = Math.log10(maxZoom)
  const step = (max - min) / (zoomSteps - 1)
  return (
    <div className={styles.zoomControls}>
      <SliderPrimitive
        min={min}
        max={max}
        value={[Math.log10(zoomValue)]}
        step={step}
        onValueChange={(values) => handleZoom(10 ** values[0])}
        className={styles.zoomSlider}
        aria-label="Zoom level slider"
      />
      <motion.span className={styles.zoomDisplay}>x{zoomValue.toFixed(2)}</motion.span>
    </div>
  )
}
