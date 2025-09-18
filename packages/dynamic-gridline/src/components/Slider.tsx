import { Slider as SliderPrimitive } from "@radix-ui/react-slider";
import { motion } from "motion/react";
import styles from "~/styles/Slider.module.css";

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
        min={minZoom}
        max={maxZoom}
        value={[zoomValue]}
        step={0.1}
        onValueChange={(values) => handleZoom(values[0])}
        className={styles.zoomSlider}
        aria-label='Zoom level slider'
      />
      <motion.span className={styles.zoomDisplay}>x{zoomValue.toFixed(2)}</motion.span>
    </div>
  )
}