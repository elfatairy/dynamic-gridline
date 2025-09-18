import { motion } from 'motion/react'
import styles from '~/styles/Slider.module.css'
import { Slider as SliderPrimitive } from './ui/slider'

export interface SliderProps {
  minZoom: number
  maxZoom: number
  zoomValue: number
  handleZoom: (value: number) => void
}

export const Slider = ({ minZoom, maxZoom, zoomValue, handleZoom }: SliderProps) => {
  return (
    <div className={styles.zoomControls}>
      <SliderPrimitive
        min={Math.log10(minZoom)}
        max={Math.log10(maxZoom)}
        value={[Math.log10(zoomValue)]}
        step={0.1}
        onValueChange={(values) => handleZoom(10 ** values[0])}
        className={styles.zoomSlider}
        aria-label="Zoom level slider"
      />
      <motion.span className={styles.zoomDisplay}>x{zoomValue.toFixed(2)}</motion.span>
    </div>
  )
}
