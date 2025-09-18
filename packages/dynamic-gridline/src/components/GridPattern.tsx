import { motion, MotionValue, useTransform } from 'motion/react'

export const GridPattern = ({ zoom, cellSize, index }: { zoom: MotionValue<number>, cellSize: number, index: number }) => {
  const scaledCellSize = useTransform(zoom, (_zoom) => cellSize * (10 ** index) * _zoom)
  const scaledStrokeWidth = useTransform(zoom, [0.1 ** index, 0.1 ** (index + 1)], [1, 0.1])

  return (
    <motion.pattern
      key={index}
      id={`dynamic-grid-pattern-${index}`}
      style={{
        width: scaledCellSize,
        height: scaledCellSize
      }}
      patternUnits='userSpaceOnUse'
    >
      <motion.path
        d={`M ${cellSize * 10 ** index} 0 L 0 0 0 ${cellSize * 10 ** index}`}
        fill='none'
        stroke='oklch(70.7% 0.022 261.325)'
        strokeWidth={scaledStrokeWidth}
        opacity={0.5}
      />
    </motion.pattern>
  )
}