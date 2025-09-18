import { MotionValue } from 'motion/dist/react'
import { useCallback } from 'react'
import { getElementSize } from '~/utils/utils'

interface UseZoomProps {
  containerRef: React.RefObject<HTMLDivElement>
  x: MotionValue<number>
  y: MotionValue<number>
  width: number
  height: number
  zoom: MotionValue<number>
  minZoom: number
  maxZoom: number
  setZoomDisplayValue: (newZoom: number) => void
}

export const useZoom = ({
  containerRef,
  x,
  y,
  width,
  height,
  zoom,
  minZoom,
  maxZoom,
  setZoomDisplayValue,
}: UseZoomProps) => {
  const setZoom = useCallback(
    (newZoom: number) => {
      const { width: rectWidth, height: rectHeight } = getElementSize(containerRef.current)

      newZoom = Math.max(minZoom, Math.min(maxZoom, newZoom))
      const zoomRatio = newZoom / zoom.get()
      const newX = ((1 - zoomRatio) * rectWidth) / 2 + x.get() * zoomRatio
      const newY = ((1 - zoomRatio) * rectHeight) / 2 + y.get() * zoomRatio
      x.set(Math.max(Math.min(0, newX), rectWidth - width * newZoom))
      y.set(Math.max(Math.min(0, newY), rectHeight - height * newZoom))

      zoom.set(newZoom)
      setZoomDisplayValue(newZoom)
    },
    [zoom, setZoomDisplayValue, containerRef, minZoom, maxZoom, width, height, x, y],
  )

  return {
    setZoom,
  }
}
