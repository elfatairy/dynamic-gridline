import styles from '~/styles/Grid.module.css'
import { Slider, SliderProps } from '~/components/Slider'
import { useGrid } from '~/hooks/useGrid'
import { RefObject } from 'react'
import { Fragment, useImperativeHandle, useMemo } from 'react'
import { motion, useTransform } from 'motion/react'
import { GridContext } from '~/contexts/GridContext'
import { GridConfig, mergeWithDefaultConfig } from '~/configs/gridConfig'
import { GridPattern } from '~/components/GridPattern'

export interface GridRef {
  focusGrid: () => void
}

interface GridProps {
  children?: React.ReactNode
  ref?: RefObject<GridRef | null>
  config?: Partial<GridConfig>
}


export function Grid({
  children = null,
  ref = undefined,
  config,
}: GridProps) {
  const mergedConfig = useMemo(() => mergeWithDefaultConfig(config), [config])

  const {
    zoomDisplayValue,
    x,
    y,
    containerRef,
    zoom,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleZoom,
    handleKeyDown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useGrid(mergedConfig)

  useImperativeHandle(ref, () => ({
    focusGrid: () => {
      containerRef.current?.focus()
    }
  }))

  const { width, height, gridCellSize, minZoom, maxZoom, disabled, customZoomSlider } = mergedConfig

  const scaledWidth = useTransform(zoom, (_zoom) => width * _zoom)
  const scaledHeight = useTransform(zoom, (_zoom) => height * _zoom)

  const gridLevels = useMemo(() => Math.ceil(Math.log10(width / gridCellSize)), [width, gridCellSize])

  return (
    <div className={styles.gridContainer} ref={containerRef}>
      <motion.div
        style={{
          cursor: disabled ? 'auto' : 'grab',
          x,
          y,
          width: scaledWidth,
          height: scaledHeight
        }}
        animate={{
          transition: { duration: 0.01 }
        }}
        onWheel={disabled ? undefined : handleWheel}
        onMouseDown={disabled ? undefined : handleMouseDown}
        onMouseMove={disabled ? undefined : handleMouseMove}
        onMouseUp={disabled ? undefined : handleMouseUp}
        onMouseLeave={disabled ? undefined : handleMouseUp}
        onKeyDown={disabled ? undefined : handleKeyDown}
        onTouchStart={disabled ? undefined : handleTouchStart}
        onTouchMove={disabled ? undefined : handleTouchMove}
        onTouchEnd={disabled ? undefined : handleTouchEnd}
        onTouchCancel={disabled ? undefined : handleTouchEnd}
      >
        <svg className={styles.gridSvg}>
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
        </svg>
        {
          children && (
            <GridContext value={{ width: scaledWidth, height: scaledHeight, x, y, zoom }}>
              <div className={styles.gridContent}>
                {children}
              </div>
            </GridContext>
          )
        }
      </motion.div>

      {customZoomSlider ? customZoomSlider({ minZoom, maxZoom, zoomValue: zoomDisplayValue, handleZoom }) : (
        <Slider minZoom={minZoom} maxZoom={maxZoom} zoomValue={zoomDisplayValue} handleZoom={handleZoom} />
      )}
    </div>
  )
}