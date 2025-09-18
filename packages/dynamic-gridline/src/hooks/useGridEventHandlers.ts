import { useCallback, useMemo, useRef } from 'react'
import { getElementSize, throttle } from '../utils/utils'
import { GridConfig } from '~/configs/gridConfig'
import { THROTTLE_TIME } from '~/constants/grid'
import { MotionValue } from 'motion/dist/react'
import { usePan } from './usePan'
import { useZoom } from './useZoom'

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
  const { minZoom, maxZoom, panStep, onHoldClick, onFastClick, onMouseMove } = config

  const isHolding = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const fastClickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const holdingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { setPan, movePan } = usePan({ containerRef, x, y, width, height, zoom })
  const { setZoom } = useZoom({
    containerRef,
    x,
    y,
    width,
    height,
    zoom,
    minZoom,
    maxZoom,
    setZoomDisplayValue,
  })

  // ZOOM
  const handleZoom = useCallback(
    (newZoom: number) => {
      newZoom = Math.max(minZoom, Math.min(maxZoom, Number(newZoom.toFixed(6))))
      setZoom(newZoom)
    },
    [minZoom, maxZoom, setZoom],
  )
  const handleWheel = useMemo(
    () =>
      throttle((e: React.WheelEvent) => {
        const delta = e.deltaY > 0 ? 0.9 : 1.1
        handleZoom(delta * zoom.get())
      }, THROTTLE_TIME),
    [handleZoom, zoom],
  )

  // HOLDING
  const handleHoldClick = useCallback(
    (position: { x: number; y: number }) => {
      holdingTimeoutRef.current = setTimeout(() => {
        if (!isHolding.current) return
        onHoldClick(position)
      }, 300)
    },
    [onHoldClick],
  )
  const handleFastClick = useCallback(() => {
    fastClickTimeoutRef.current = setTimeout(() => {
      fastClickTimeoutRef.current = null
    }, 100)
  }, [])

  const handleStartHolding = useCallback(
    (position: { x: number; y: number }) => {
      isHolding.current = true
      dragStart.current = position
      const pos = {
        x: position.x - (width * zoom.get()) / 2,
        y: position.y - (height * zoom.get()) / 2,
      }
      if (onHoldClick) {
        handleHoldClick(pos)
      }
      if (onFastClick) {
        handleFastClick()
      }
    },
    [onHoldClick, onFastClick, width, zoom, height, handleHoldClick, handleFastClick],
  )

  const handleMoving = useCallback(
    (position: { x: number; y: number }, isTouch: boolean = false) => {
      if (isHolding.current) {
        if (holdingTimeoutRef.current) clearTimeout(holdingTimeoutRef.current)
        if (fastClickTimeoutRef.current) clearTimeout(fastClickTimeoutRef.current)

        setPan({
          x: position.x - dragStart.current.x,
          y: position.y - dragStart.current.y,
        })
      }
      const viewPort = getElementSize(containerRef.current)
      if (onMouseMove && !isTouch) {
        onMouseMove({
          x: (position.x - viewPort.width / 2) / zoom.get(),
          y: (position.y - viewPort.height / 2) / zoom.get(),
        })
      }
    },
    [containerRef, onMouseMove, setPan, zoom],
  )

  const handleEndHolding = useCallback(() => {
    isHolding.current = false
    if (fastClickTimeoutRef.current) {
      fastClickTimeoutRef.current = null
      onFastClick({
        x: dragStart.current.x - (width * zoom.get()) / 2,
        y: dragStart.current.y - (height * zoom.get()) / 2,
      })
    }
    if (holdingTimeoutRef.current) {
      clearTimeout(holdingTimeoutRef.current)
    }
  }, [width, height, zoom, onFastClick])

  // MOUSE
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button === 0) {
        handleStartHolding({ x: e.clientX - x.get(), y: e.clientY - y.get() })
      }
    },
    [handleStartHolding, x, y],
  )
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      handleMoving({
        x: e.clientX,
        y: e.clientY,
      })
    },
    [handleMoving],
  )
  const handleMouseUp = useCallback(() => {
    handleEndHolding()
  }, [handleEndHolding])

  // TOUCH
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      handleStartHolding({ x: e.touches[0].clientX - x.get(), y: e.touches[0].clientY - y.get() })
    },
    [handleStartHolding, x, y],
  )
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMoving(
        {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        },
        true,
      )
    },
    [handleMoving],
  )
  const handleTouchEnd = useCallback(() => {
    handleEndHolding()
  }, [handleEndHolding])

  // KEYBOARD
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        movePan({ y: panStep })
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        movePan({ y: -panStep })
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        movePan({ x: panStep })
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        movePan({ x: -panStep })
      }
    },
    [movePan, panStep],
  )

  const memoizedEventHandlers = useMemo(
    () => ({
      onWheel: config.disabled || config.wheelDisabled ? undefined : handleWheel,
      onMouseDown: config.disabled || config.panDisabled ? undefined : handleMouseDown,
      onMouseMove: config.disabled || config.panDisabled ? undefined : handleMouseMove,
      onMouseUp: config.disabled || config.panDisabled ? undefined : handleMouseUp,
      onMouseLeave: config.disabled || config.panDisabled ? undefined : handleMouseUp,
      onKeyDown: config.disabled || config.keyDisabled ? undefined : handleKeyDown,
      onTouchStart: config.disabled || config.panDisabled ? undefined : handleTouchStart,
      onTouchMove: config.disabled || config.panDisabled ? undefined : handleTouchMove,
      onTouchEnd: config.disabled || config.panDisabled ? undefined : handleTouchEnd,
      onTouchCancel: config.disabled || config.panDisabled ? undefined : handleTouchEnd,
      handleZoom: config.disabled || config.wheelDisabled ? undefined : handleZoom,
    }),
    [
      config.disabled,
      config.wheelDisabled,
      config.panDisabled,
      config.keyDisabled,
      handleWheel,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      handleKeyDown,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      handleZoom,
    ],
  )

  return memoizedEventHandlers
}
