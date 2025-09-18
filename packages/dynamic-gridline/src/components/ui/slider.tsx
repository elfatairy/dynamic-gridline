import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import styles from '~/styles/Slider.module.css'

export default function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max],
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={`${styles.slider} ${className || ''}`}
      {...props}
    >
      <SliderPrimitive.Track data-slot="slider-track" className={styles.sliderTrack}>
        <SliderPrimitive.Range data-slot="slider-range" className={styles.sliderRange} />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          aria-label="Slider thumb"
          data-slot="slider-thumb"
          key={index}
          className={styles.sliderThumb}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
