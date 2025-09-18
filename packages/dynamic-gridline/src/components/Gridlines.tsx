import { Fragment } from 'react/jsx-runtime'
import { GridPattern } from './GridPattern'
import { MotionValue } from 'motion/react'
import { useMemo } from 'react'

interface GridlinesProps {
  maxZoom: number
  minZoom: number
  zoom: MotionValue<number>
  gridCellSize: number
  gridColor: string
}

export function Gridlines({
  maxZoom,
  minZoom,
  zoom,
  gridCellSize,
  gridColor,
}: GridlinesProps) {
  const zoomOutLevelsCount = useMemo(
    () => Math.ceil(Math.log10(1 / minZoom)),
    [minZoom],
  )
  const zoomInLevelsCount = useMemo(
    () => Math.ceil(Math.log10(maxZoom)),
    [maxZoom],
  )

  return (
    <>
      <defs>
        <GridPattern zoom={zoom} cellSize={gridCellSize} level={0} gridColor={gridColor} />
        {Array.from({ length: zoomInLevelsCount }).map((_, index) => {
          const level = -index - 1
          return (
            <Fragment key={index}>
              <GridPattern zoom={zoom} cellSize={gridCellSize * 10 ** level} level={level} gridColor={gridColor} />
            </Fragment>
          )
        })}
        {Array.from({ length: zoomOutLevelsCount }).map((_, index) => {
          const level = index + 1
          return (
            <Fragment key={index}>
              <GridPattern zoom={zoom} cellSize={gridCellSize * 10 ** level} level={level} gridColor={gridColor} />
            </Fragment>
          )
        })}
      </defs>
      {Array.from({ length: zoomInLevelsCount + 1 + zoomOutLevelsCount }).map((_, index) => {
        return (
          <rect
            key={index - zoomInLevelsCount}
            width="100%"
            height="100%"
            fill={`url(#dynamic-grid-pattern-${index - zoomInLevelsCount})`}
          />
        )
      })}
    </>
  )
}
