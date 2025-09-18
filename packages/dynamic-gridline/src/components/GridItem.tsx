import styles from '~/styles/GridItem.module.css'
import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useTransform } from 'motion/react'
import { useGridContentContext } from '~/contexts/GridContext'

interface GridItemProps {
  children: React.ReactNode
  x: number
  y: number
  disableScale?: boolean
  fixedZIndex?: number
}

export const GridItem = ({
  children,
  x,
  y,
  disableScale = false,
  fixedZIndex = undefined,
}: GridItemProps) => {
  const { width, height, zoom } = useGridContentContext()
  const itemRef = useRef<HTMLDivElement>(null)
  const [itemSize, setItemSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  })

  useLayoutEffect(() => {
    if (itemRef.current) {
      setItemSize({ width: itemRef.current.offsetWidth, height: itemRef.current.offsetHeight })
    }
  }, [])

  const translateX = useTransform(
    width,
    (_width) => _width / 2 + x * zoom.get() - itemSize.width / 2,
  )
  const translateY = useTransform(
    height,
    (_height) => _height / 2 + y * zoom.get() - itemSize.height / 2,
  )

  return (
    <motion.div
      ref={itemRef}
      className={styles.gridItem}
      style={{
        x: translateX,
        y: translateY,
        scale: disableScale ? 1 : zoom,
        zIndex: fixedZIndex,
      }}
    >
      {children}
    </motion.div>
  )
}
