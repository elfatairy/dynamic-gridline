import { SliderProps } from '~/components/Slider'

export type GridConfig = {
  width: number
  height: number
  gridCellSize: number

  gridBackground: string
  gridColor: string

  minZoom: number
  maxZoom: number
  zoomSteps: number
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
  gridBackground: 'transparent',
  gridColor: 'oklch(70.7% 0.022 261.325)',
  minZoom: 0.1,
  maxZoom: 1,
  zoomSteps: 10,
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
