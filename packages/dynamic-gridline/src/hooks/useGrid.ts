import { useLayoutEffect, useRef, useState, useDeferredValue } from 'react'
import { useMotionValue, useTransform } from 'motion/react'
import { GridConfig } from '~/configs/gridConfig'
import { usePan } from './usePan'

export const useGrid = (containerRef: React.RefObject<HTMLDivElement>, config: GridConfig) => {
  const { width, height } = config
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const zoom = useMotionValue(1)

  const scaledWidth = useTransform(zoom, (_zoom) => width * _zoom)
  const scaledHeight = useTransform(zoom, (_zoom) => height * _zoom)

  const [zoomDisplayValue, setZoomDisplayValue] = useState(1)
  const zoomDisplayValueDeferred = useDeferredValue(zoomDisplayValue)

  const { resetPan } = usePan({ containerRef, x, y, width, height, zoom })

  useLayoutEffect(() => {
    resetPan()
  }, [resetPan])

  return {
    zoom,
    zoomDisplayValue: zoomDisplayValueDeferred,
    setZoomDisplayValue,
    x,
    y,
    scaledWidth,
    scaledHeight,
  }
}
