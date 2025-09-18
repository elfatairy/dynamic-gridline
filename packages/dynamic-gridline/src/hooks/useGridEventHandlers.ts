import { useCallback, useMemo, useRef, useState } from "react"
import { getElementSize, throttle } from "../utils/utils"
import { GridConfig } from "~/configs/gridConfig"
import { THROTTLE_TIME } from "~/constants/grid"
import { MotionValue } from "motion/dist/react"
import { usePan } from "./usePan"
import { useZoom } from "./useZoom"

export interface GridEventHandlersProps {
  config: GridConfig
  containerRef: React.RefObject<HTMLDivElement>
  zoom: MotionValue<number>
  width: number
  height: number
  x: MotionValue<number>
  y: MotionValue<number>
  setZoomDisplayValue: (newZoom: number) => void
}

export const useGridEventHandlers = (props: GridEventHandlersProps) => {
  const { config, containerRef, zoom, width, height, x, y, setZoomDisplayValue } = props
  const { minZoom, maxZoom, onHoldClick, onFastClick, onMouseMove } = config

  const isHoldingRef = useRef(false)
  const [isHolding, setIsHolding] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const holdingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const fastClickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { setPan, movePan } = usePan({ containerRef, x, y, width, height, zoom })
  const { setZoom } = useZoom({ containerRef, x, y, width, height, zoom, minZoom, maxZoom, setZoomDisplayValue })

  const handleZoom = useCallback(
    (newZoom: number) => {
      newZoom = Math.max(minZoom, Math.min(maxZoom, Number(newZoom.toFixed(2))))
      setZoom(newZoom)
    },
    [minZoom, maxZoom, setZoom]
  )

  // Mouse wheel zoom
  const handleWheel = useMemo(
    () =>
      throttle((e: React.WheelEvent) => {
        const rect = containerRef.current?.getBoundingClientRect()
        if (!rect) {
          return
        }

        const delta = e.deltaY > 0 ? 0.9 : 1.1

        handleZoom(delta * zoom.get())
      }, THROTTLE_TIME),
    [handleZoom, zoom]
  )

  const handleStartHolding = useCallback(
    (position: { x: number; y: number }) => {
      setIsHolding(true)
      isHoldingRef.current = true
      setDragStart(position)
      if (onHoldClick) {
        holdingTimeoutRef.current = setTimeout(() => {
          if (!isHoldingRef.current) {
            return
          }

          const pos = {
            x: position.x / zoom.get() - width / 2,
            y: position.y / zoom.get() - height / 2
          }
          onHoldClick({
            x: pos.x,
            y: pos.y
          })
        }, 300)
      }
      if (onFastClick) {
        fastClickTimeoutRef.current = setTimeout(() => {
          if (!isHoldingRef.current) {
            return
          }
          onFastClick({ x: position.x - (width * zoom.get()) / 2, y: position.y - (height * zoom.get()) / 2 })
        }, 100)
      }
    },
    [onHoldClick, onFastClick, width, zoom, height]
  )

  const handleMoving = useCallback(
    (position: { x: number; y: number }, isTouch: boolean = false) => {
      if (isHolding) {
        if (holdingTimeoutRef.current) {
          clearTimeout(holdingTimeoutRef.current)
        }
        if (fastClickTimeoutRef.current) {
          clearTimeout(fastClickTimeoutRef.current)
        }
        setPan({
          x: position.x - dragStart.x,
          y: position.y - dragStart.y
        })
      }
      const viewPort = getElementSize(containerRef.current)
      if (onMouseMove && !isTouch) {
        onMouseMove({
          x: (position.x - viewPort.width / 2) / zoom.get(),
          y: (position.y - viewPort.height / 2) / zoom.get()
        })
      }
    },
    [isHolding, containerRef, onMouseMove, setPan, dragStart.x, dragStart.y, zoom]
  )

  const handleEndHolding = useCallback(() => {
    setIsHolding(false)
    isHoldingRef.current = false
    if (fastClickTimeoutRef.current) {
      clearTimeout(fastClickTimeoutRef.current)
    }
    if (holdingTimeoutRef.current) {
      clearTimeout(holdingTimeoutRef.current)
    }
  }, [])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button === 0) {
        handleStartHolding({ x: e.clientX - x.get(), y: e.clientY - y.get() })
      }
    },
    [handleStartHolding, x, y]
  )

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      handleStartHolding({ x: e.touches[0].clientX - x.get(), y: e.touches[0].clientY - y.get() })
    },
    [handleStartHolding, x, y]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      handleMoving({
        x: e.clientX,
        y: e.clientY
      })
    },
    [handleMoving]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMoving(
        {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        },
        true
      )
    },
    [handleMoving]
  )

  const handleMouseUp = useCallback(() => {
    handleEndHolding()
  }, [handleEndHolding])

  const handleTouchEnd = useCallback(() => {
    handleEndHolding()
  }, [handleEndHolding])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        movePan({ y: 10 })
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        movePan({ y: -10 })
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        movePan({ x: 10 })
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        movePan({ x: -10 })
      }
    },
    [movePan]
  )

    return {
      onWheel: config.disabled ? undefined : handleWheel,
      onMouseDown: config.disabled ? undefined : handleMouseDown,
      onMouseMove: config.disabled ? undefined : handleMouseMove,
      onMouseUp: config.disabled ? undefined : handleMouseUp,
      onMouseLeave: config.disabled ? undefined : handleMouseUp,
      onKeyDown: config.disabled ? undefined : handleKeyDown,
      onTouchStart: config.disabled ? undefined : handleTouchStart,
      onTouchMove: config.disabled ? undefined : handleTouchMove,
      onTouchEnd: config.disabled ? undefined : handleTouchEnd,
      onTouchCancel: config.disabled ? undefined : handleTouchEnd,
      handleZoom: config.disabled ? undefined : handleZoom
    }
}