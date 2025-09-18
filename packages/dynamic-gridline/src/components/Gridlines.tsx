import { Fragment } from "react/jsx-runtime"
import { GridPattern } from "./GridPattern"
import { MotionValue } from "motion/react"

export function Gridlines({ gridLevels, zoom, gridCellSize }: { gridLevels: number, zoom: MotionValue<number>, gridCellSize: number }) {
  return (
    <>
      <defs>
        {
          Array.from({ length: gridLevels }).map((_, index) => {
            return (
              <Fragment key={index}>
                <GridPattern zoom={zoom} cellSize={gridCellSize} index={index} />
              </Fragment>
            )
          }
          )
        }
      </defs>
      {
        Array.from({ length: gridLevels }).map((_, index) => {
          return (
            <rect key={index} width='100%' height='100%' fill={`url(#dynamic-grid-pattern-${index})`} />
          )
        })
      }
    </>
  )
}