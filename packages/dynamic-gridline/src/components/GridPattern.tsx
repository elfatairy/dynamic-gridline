import { motion, MotionValue, useTransform } from 'motion/react'

interface GridPatternProps {
  zoom: MotionValue<number>
  cellSize: number
  level: number
  gridColor: string
}

export const GridPattern = ({
  zoom,
  cellSize,
  level,
  gridColor,
}: GridPatternProps) => {
  const scaledCellSize = useTransform(zoom, (_zoom) => cellSize * _zoom)
  const scaledStrokeWidth = useTransform(zoom, [0.1 ** (level - 1), 0.1 ** level, 0.1 ** (level + 1)], [0, 1, 0])

  return (
    <motion.pattern
      key={level}
      id={`dynamic-grid-pattern-${level}`}
      style={{
        width: scaledCellSize,
        height: scaledCellSize,
      }}
      patternUnits="userSpaceOnUse"
    >
      <motion.line
        x1={0}
        y1={0}
        x2={0}
        y2={scaledCellSize}
        fill="none"
        stroke={gridColor}
        strokeWidth={scaledStrokeWidth}
      />
      <motion.line
        x1={0}
        y1={0}
        x2={scaledCellSize}
        y2={0}
        fill="none"
        stroke={gridColor}
        strokeWidth={scaledStrokeWidth}
      />
    </motion.pattern>
  )
}
