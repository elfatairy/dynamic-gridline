import { Fragment } from 'react/jsx-runtime'
import { GridPattern } from './GridPattern'
import { MotionValue } from 'motion/react'
import { useMemo } from 'react'

interface GridlinesProps {
  width: number
  zoom: MotionValue<number>
  gridCellSize: number
  gridColor: string
}

export function Gridlines({
  width,
  zoom,
  gridCellSize,
  gridColor,
}: GridlinesProps) {
  const gridLevels = useMemo(
    () => Math.ceil(Math.log10(width / gridCellSize)),
    [width, gridCellSize],
  )

  return (
    <>
      <defs>
        {Array.from({ length: gridLevels }).map((_, index) => {
          return (
            <Fragment key={index}>
              <GridPattern zoom={zoom} cellSize={gridCellSize} index={index} gridColor={gridColor} />
            </Fragment>
          )
        })}
      </defs>
      {Array.from({ length: gridLevels }).map((_, index) => {
        return (
          <rect
            key={index}
            width="100%"
            height="100%"
            fill={`url(#dynamic-grid-pattern-${index})`}
          />
        )
      })}
    </>
  )
}
