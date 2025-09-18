import styles from '~/styles/Grid.module.css'
import { Slider } from '~/components/Slider'
import { useGrid } from '~/hooks/useGrid'
import { RefObject, useRef } from 'react'
import { useImperativeHandle, useMemo } from 'react'
import { motion } from 'motion/react'
import { GridContext } from '~/contexts/GridContext'
import { GridConfig, mergeWithDefaultConfig } from '~/configs/gridConfig'
import { Gridlines } from '~/components/Gridlines'
import { useGridEventHandlers } from '~/hooks/useGridEventHandlers'

export interface GridRef {
  focusGrid: () => void
}

interface GridProps {
  children?: React.ReactNode
  ref?: RefObject<GridRef | null>
  config?: Partial<GridConfig>
}

export function Grid({ children = null, ref = undefined, config: configProps }: GridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const config = useMemo(() => mergeWithDefaultConfig(configProps), [configProps])

  const { zoomDisplayValue, x, y, zoom, setZoomDisplayValue, scaledWidth, scaledHeight } = useGrid(
    containerRef,
    config,
  )
  const { handleZoom, ...eventHandlers } = useGridEventHandlers({
    config,
    containerRef,
    zoom,
    width: config.width,
    height: config.height,
    x,
    y,
    setZoomDisplayValue,
  })

  useImperativeHandle(ref, () => ({
    focusGrid: () => {
      containerRef.current?.focus()
    },
  }))

  const zoomSliderConfig = useMemo(
    () => ({
      minZoom: config.minZoom,
      maxZoom: config.maxZoom,
      zoomValue: zoomDisplayValue,
      handleZoom: handleZoom,
      zoomSteps: config.zoomSteps,
    }),
    [config.minZoom, config.maxZoom, config.zoomSteps, zoomDisplayValue, handleZoom],
  )

  return (
    <div
      className={styles.gridContainer}
      ref={containerRef}
      style={{
        backgroundColor: config.gridBackground,
      }}
    >
      <motion.div
        style={{
          cursor: config.disabled ? 'auto' : 'grab',
          x,
          y,
          width: scaledWidth,
          height: scaledHeight,
        }}
        animate={{
          transition: { duration: 0.01 },
        }}
        {...eventHandlers}
      >
        <svg className={styles.gridSvg}>
          <Gridlines width={config.width} zoom={zoom} gridCellSize={config.gridCellSize} gridColor={config.gridColor} />
        </svg>

        {children && (
          <GridContext value={{ width: scaledWidth, height: scaledHeight, x, y, zoom }}>
            <div className={styles.gridContent}>{children}</div>
          </GridContext>
        )}
      </motion.div>

      {config.customZoomSlider ? (
        config.customZoomSlider(zoomSliderConfig)
      ) : (
        <Slider {...zoomSliderConfig} />
      )}
    </div>
  )
}
