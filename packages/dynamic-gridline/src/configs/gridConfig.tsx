import { SliderProps } from '~/components/Slider'

export type GridConfig = {
  width: number
  height: number
  gridCellSize: number

  minZoom: number
  maxZoom: number
  panStep: number

  disabled: boolean
  panDisabled: boolean
  wheelDisabled: boolean
  keyDisabled: boolean

  customZoomSlider: ((sliderProps: SliderProps) => React.ReactNode) | null
  onFastClick?: ({ x, y }: { x: number; y: number }) => void
  onHoldClick?: ({ x, y }: { x: number; y: number }) => void
  onMouseMove?: ({ x, y }: { x: number; y: number }) => void
}

export const DEFAULT_GRID_CONFIG: GridConfig = {
  width: window.innerWidth * 10,
  height: window.innerHeight * 10,
  gridCellSize: 20,
  minZoom: 0.1,
  maxZoom: 1,
  panStep: 10,
  disabled: false,
  panDisabled: false,
  wheelDisabled: false,
  keyDisabled: false,
  customZoomSlider: null,
}

export const mergeWithDefaultConfig = (userConfig?: Partial<GridConfig>): GridConfig => {
  return {
    ...DEFAULT_GRID_CONFIG,
    ...userConfig,
  }
}
