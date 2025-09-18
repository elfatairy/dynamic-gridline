import { getElementSize } from '~/utils/utils'
import { useCallback } from 'react'
import { MotionValue } from 'motion/dist/react'

export interface UsePanProps {
  containerRef: React.RefObject<HTMLDivElement>
  x: MotionValue<number>
  y: MotionValue<number>
  width: number
  height: number
  zoom: MotionValue<number>
}

export const usePan = ({ containerRef, x, y, width, height, zoom }: UsePanProps) => {
  const setPan = useCallback(
    (newPosition: { x: number; y: number }) => {
      const viewPort = getElementSize(containerRef.current)

      x.set(Math.max(Math.min(0, newPosition.x), viewPort.width - width * zoom.get()))
      y.set(Math.max(Math.min(0, newPosition.y), viewPort.height - height * zoom.get()))
    },
    [containerRef, x, width, zoom, y, height],
  )

  const movePan = useCallback(
    (distance: { x?: number; y?: number }) => {
      setPan({ x: x.get() + (distance.x ?? 0), y: y.get() + (distance.y ?? 0) })
    },
    [setPan, x, y],
  )

  const resetPan = useCallback(() => {
    const viewPort = getElementSize(containerRef.current)
    if (viewPort) {
      x.set(viewPort.width / 2 - width / 2)
      y.set(viewPort.height / 2 - height / 2)
    }
  }, [containerRef, width, height, x, y])

  return {
    setPan,
    movePan,
    resetPan,
  }
}
