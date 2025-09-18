import { MotionValue } from "motion/dist/react"
import { createContext, use } from "react"

export const GridContext = createContext<{
  width: MotionValue<number>
  height: MotionValue<number>
  x: MotionValue<number>
  y: MotionValue<number>
  zoom: MotionValue<number>
} | null>(null)

export const useGridContentContext = () => {
  const context = use(GridContext)
  if (!context) {
    throw new Error('GridContent must be used within a GridContent')
  }
  return context
}