<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![project_license][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://github.com/elfatairy/dynamic-gridline">
    <img src="https://github.com/elfatairy/dynamic-gridline/blob/main/media/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Dynamic Gridline</h3>

  <p align="center">
    A draggable and zoomable grid system for placing items.
    <br />
    <br />
    <a href="https://github.com/elfatairy/dynamic-gridline/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/elfatairy/dynamic-gridline/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Demo Dynamic Gridline](https://github.com/user-attachments/assets/a7e65877-970a-4362-b39e-1ccb2105e0ba)](https://github.com/user-attachments/assets/a7e65877-970a-4362-b39e-1ccb2105e0ba)

### Built With

- [![React][React.js]][React-url]
- [![Motion][Motion.dev]][Motion-url]

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

```sh
# npm
npm install motion @radix-ui/react-slider

# yarn
yarn add motion @radix-ui/react-slider

# pnpm
pnpm add motion @radix-ui/react-slider

# bun
bun install motion @radix-ui/react-slider
```

### Installation

```sh
# npm
npm install dynamic-gridline

# yarn
yarn add dynamic-gridline

# pnpm
pnpm add dynamic-gridline

# bun
bun install dynamic-gridline
```

<!-- USAGE EXAMPLES -->

## Usage

### Basic Setup

Import the components and start building your interactive grid:

```tsx
import { Grid, GridItem } from 'dynamic-gridline'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Grid>
        <GridItem x={100} y={100}>
          <div>Your content here</div>
        </GridItem>
      </Grid>
    </div>
  )
}
```

<img width="1920" height="1080" alt="Screenshot 2025-09-21 011243" src="https://github.com/user-attachments/assets/7c440a6d-6401-4828-b8d1-40a250aa606c" />

### Core Components

#### Grid Component

The `Grid` component is the main container that provides the interactive canvas with pan, zoom, and grid functionality.

```tsx
import { Grid } from 'dynamic-gridline'

function InteractiveCanvas() {
  return (
    <Grid
      config={{
        width: 10000,
        height: 8000,
        gridCellSize: 50,
        minZoom: 0.1,
        maxZoom: 2,
        gridColor: '#e0e0e0',
      }}
    >
      {/* Your grid items go here */}
    </Grid>
  )
}
```

<img width="1920" height="1080" alt="Screenshot 2025-09-21 011342" src="https://github.com/user-attachments/assets/1c5bdc5f-b2f2-4bd9-af18-7e7afea682a3" />

#### GridItem Component

The `GridItem` component positions content within the grid coordinate system.

```tsx
import { Grid, GridItem } from 'dynamic-gridline'

function ItemPlacement() {
  return (
    <Grid>
      <GridItem x={0} y={0}>
        <div style={{ background: 'red', text: 'white', padding: '10px' }}>(0,0)</div>
      </GridItem>
      <GridItem x={200} y={150}>
        <div style={{ background: 'blue', text: 'white', padding: '10px' }}>(200,150)</div>
      </GridItem>
      <GridItem x={-150} y={-50}>
        <div style={{ background: 'green', text: 'white', padding: '10px' }}>(-150, -50)</div>
      </GridItem>
    </Grid>
  )
}
```

<img width="1920" height="1080" alt="Screenshot 2025-09-21 011534" src="https://github.com/user-attachments/assets/2d206814-56b2-4817-bdf2-8bf44e095c7c" />

### Advanced Features

#### Disable Scale for Grid Items

Control whether items scale with zoom using the `disableScale` property:

```tsx
function ScalingDemo() {
  return (
    <Grid config={{ minZoom: 0.5, maxZoom: 2 }}>
      {/* This circle will scale with zoom */}
      <GridItem x={-100} y={0} disableScale={false}>
        <div
          style={{
            width: 120,
            height: 120,
            color: 'white',
            borderRadius: '50%',
            background: 'blue',
          }}
        ></div>
      </GridItem>

      {/* This circle maintains constant size */}
      <GridItem x={100} y={0} disableScale={true}>
        <div
          style={{
            width: 120,
            height: 120,
            color: 'white',
            borderRadius: '50%',
            background: 'red',
          }}
        ></div>
      </GridItem>
    </Grid>
  )
}
```

<div align="center" style="display: flex; flex-direction: row;">
  <img width="400" alt="Screenshot 2025-09-21 011732" src="https://github.com/user-attachments/assets/0bd6394f-ffcd-4602-9a02-c01cfea86b6b" />
  <img width="400" alt="Screenshot 2025-09-21 013624" src="https://github.com/user-attachments/assets/a9695148-d06d-4808-a071-f925a334d46e" />
</div>

#### Fixed Z-Index Control

Control layering of grid items with `fixedZIndex`:

```tsx
function LayeringDemo() {
  return (
    <Grid>
      <GridItem x={-50} y={-50} fixedZIndex={1}>
        <div
          style={{
            width: 100,
            height: 100,
            background: 'rgba(255,0,0,0.7)',
            color: 'white',
          }}
        >
          Behind (z-index: 1)
        </div>
      </GridItem>

      <GridItem x={0} y={0} fixedZIndex={10}>
        <div
          style={{
            width: 100,
            height: 100,
            background: 'rgba(0,0,255,0.7)',
            color: 'white',
          }}
        >
          In Front (z-index: 10)
        </div>
      </GridItem>
    </Grid>
  )
}
```

<img width="1920" height="1080" alt="Screenshot 2025-09-21 011845" src="https://github.com/user-attachments/assets/543c2fb0-2b67-4496-a915-2469a9fa0c53" />

### Interaction Features

#### Click Event Handlers

Handle fast clicks and hold clicks on the grid:

```tsx
function ClickHandling() {
  const handleFastClick = ({ x, y }: { x: number; y: number }) => {
    console.log('Fast click at:', x, y)
    // Add logic for quick interactions
  }

  const handleHoldClick = ({ x, y }: { x: number; y: number }) => {
    console.log('Hold click at:', x, y)
    // Add logic for context menus or long-press actions
  }

  return (
    <Grid
      config={{
        onFastClick: handleFastClick,
        onHoldClick: handleHoldClick,
      }}
    >
      <GridItem x={0} y={0}>
        <div>Try clicking and holding on the grid!</div>
      </GridItem>
    </Grid>
  )
}
```

#### Mouse Movement Tracking

Track mouse position within the grid coordinate system:

```tsx
function MouseTracking() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = ({ x, y }: { x: number; y: number }) => {
    setMousePos({ x, y })
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <p style={{ position: 'absolute', top: 0, left: 0 }}>
        Mouse position: ({mousePos.x.toFixed(2)}, {mousePos.y.toFixed(2)})
      </p>
      <Grid config={{ onMouseMove: handleMouseMove }}>
        <GridItem x={mousePos.x} y={mousePos.y}>
          <div
            style={{
              width: 10,
              height: 10,
              background: 'red',
              borderRadius: '50%',
            }}
          />
        </GridItem>
      </Grid>
    </div>
  )
}
```

![Untitled video - Made with Clipchamp](https://github.com/user-attachments/assets/62e5c70a-91a4-43e5-9c61-ed2c4f57e713)

### Navigation Controls

#### Keyboard Navigation

Navigate the grid using arrow keys:

```tsx
function KeyboardNavigation() {
  return (
    <Grid
      config={{
        panStep: 50, // Pixels to move per arrow key press
        keyDisabled: false, // Enable keyboard controls
      }}
    >
      <GridItem x={0} y={0}>
        <div>Use arrow keys to pan around!</div>
      </GridItem>
    </Grid>
  )
}
```

#### Zoom Controls

Built-in zoom slider and wheel zoom functionality:

```tsx
function ZoomDemo() {
  return (
    <Grid
      config={{
        minZoom: 0.25,
        maxZoom: 4,
        zoomSteps: 50,
        wheelDisabled: false, // Enable mouse wheel zoom
      }}
    >
      <GridItem x={0} y={0}>
        <div>Use mouse wheel or slider to zoom!</div>
      </GridItem>
    </Grid>
  )
}
```

### Customization Options

#### Custom Grid Appearance

Customize the grid's visual appearance:

```tsx
function CustomStyling() {
  return (
    <Grid
      config={{
        gridBackground: '#1b2845',
        gridColor: '#4f88cb', // Custom grid line color
        gridCellSize: 30, // Smaller grid cells
      }}
    >
      <GridItem x={0} y={0}>
        <div style={{ color: 'white' }}>Custom styled grid!</div>
      </GridItem>
    </Grid>
  )
}
```

<img width="1920" height="1080" alt="Screenshot 2025-09-21 012631" src="https://github.com/user-attachments/assets/91315249-e725-4612-a683-d272fef9e793" />

#### Custom Zoom Slider

Replace the default zoom slider with your own component:

```tsx
function CustomZoomSlider() {
  const customSlider = (sliderProps: SliderProps) => (
    <div
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        background: 'white',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <label>Zoom: {sliderProps.zoomValue.toFixed(2)}x</label>
      <input
        type="range"
        min={Math.log10(sliderProps.minZoom)}
        max={Math.log10(sliderProps.maxZoom)}
        step={
          (Math.log10(sliderProps.maxZoom) - Math.log10(sliderProps.minZoom)) /
          (sliderProps.zoomSteps - 1)
        }
        value={Math.log10(sliderProps.zoomValue)}
        onChange={(e) => sliderProps.handleZoom(10 ** parseFloat(e.target.value))}
      />
    </div>
  )

  return (
    <Grid config={{ customZoomSlider: customSlider }}>
      <GridItem x={0} y={0}>
        <div>Custom zoom control!</div>
      </GridItem>
    </Grid>
  )
}
```

<img width="1920" height="1080" alt="Screenshot 2025-09-21 012823" src="https://github.com/user-attachments/assets/34702c8d-6b97-424b-97d4-13ae784e41d9" />

### Disabling Features

#### Selective Feature Disabling

Disable specific interactions while keeping others active:

```tsx
function SelectiveDisabling() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        gap: '20px',
      }}
    >
      <div style={{ width: '30vw', aspectRatio: '1/1' }}>
        <Grid config={{ panDisabled: true, wheelDisabled: false }}>
          <GridItem x={0} y={0}>
            <div>Zoom only</div>
          </GridItem>
        </Grid>
      </div>
      {/* Wheel zoom disabled, pan still works */}
      <div style={{ width: '30vw', aspectRatio: '1/1' }}>
        <Grid config={{ panDisabled: false, wheelDisabled: true }}>
          <GridItem x={0} y={0}>
            <div>Pan only</div>
          </GridItem>
        </Grid>
      </div>
      {/* Everything disabled */}
      <div style={{ width: '30vw', aspectRatio: '1/1' }}>
        <Grid config={{ disabled: true }}>
          <GridItem x={0} y={0}>
            <div>Static view</div>
          </GridItem>
        </Grid>
      </div>
    </div>
  )
}
```

<img width="1920" height="1080" alt="Screenshot 2025-09-21 013157" src="https://github.com/user-attachments/assets/a507e7b8-59f2-4c86-bae3-d7880369c38d" />

### Grid Reference and Imperative Controls

Access grid methods using a ref:

```tsx
import { useRef } from 'react'
import { Grid, GridRef } from 'dynamic-gridline'

function GridWithRef() {
  const gridRef = useRef<GridRef>(null)

  const focusGrid = () => {
    gridRef.current?.focusGrid()
  }

  return (
    <div>
      <button onClick={focusGrid}>Focus Grid (for keyboard controls)</button>
      <Grid ref={gridRef}>
        <GridItem x={0} y={0}>
          <div>Grid with ref access</div>
        </GridItem>
      </Grid>
    </div>
  )
}
```

## Configuration Reference

The `Grid` component accepts a `config` prop with the following options:

| Property           | Type                                           | Default                        | Description                                    |
| ------------------ | ---------------------------------------------- | ------------------------------ | ---------------------------------------------- |
| `width`            | `number`                                       | `window.innerWidth * 10`       | Total width of the grid canvas in pixels       |
| `height`           | `number`                                       | `window.innerHeight * 10`      | Total height of the grid canvas in pixels      |
| `gridCellSize`     | `number`                                       | `20`                           | Size of each grid cell in pixels               |
| `gridBackground`   | `string`                                       | `'transparent'`                | Background color of the grid container         |
| `gridColor`        | `string`                                       | `'oklch(70.7% 0.022 261.325)'` | Color of the grid lines                        |
| `minZoom`          | `number`                                       | `0.1`                          | Minimum zoom level (0.1 = 10%)                 |
| `maxZoom`          | `number`                                       | `1`                            | Maximum zoom level (1 = 100%)                  |
| `zoomSteps`        | `number`                                       | `100`                          | Number of steps in the zoom slider             |
| `panStep`          | `number`                                       | `10`                           | Pixels to move when using keyboard navigation  |
| `disabled`         | `boolean`                                      | `false`                        | Disable all interactions (pan, zoom, keyboard) |
| `panDisabled`      | `boolean`                                      | `false`                        | Disable panning (mouse drag and touch)         |
| `wheelDisabled`    | `boolean`                                      | `false`                        | Disable mouse wheel zooming                    |
| `keyDisabled`      | `boolean`                                      | `false`                        | Disable keyboard navigation                    |
| `customZoomSlider` | `((props: SliderProps) => ReactNode) \| null`  | `null`                         | Custom zoom slider component                   |
| `onFastClick`      | `({ x, y }: { x: number; y: number }) => void` | `undefined`                    | Callback for quick clicks on the grid          |
| `onHoldClick`      | `({ x, y }: { x: number; y: number }) => void` | `undefined`                    | Callback for long presses on the grid          |
| `onMouseMove`      | `({ x, y }: { x: number; y: number }) => void` | `undefined`                    | Callback for mouse movement over the grid      |

### GridItem Properties

| Property       | Type        | Default     | Description                         |
| -------------- | ----------- | ----------- | ----------------------------------- |
| `x`            | `number`    | Required    | X coordinate in grid space          |
| `y`            | `number`    | Required    | Y coordinate in grid space          |
| `disableScale` | `boolean`   | `false`     | Prevent item from scaling with zoom |
| `fixedZIndex`  | `number`    | `undefined` | Fixed z-index for layering control  |
| `children`     | `ReactNode` | Required    | Content to render in the grid item  |

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Top contributors:

<a href="https://github.com/elfatairy/dynamic-gridline/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=elfatairy/dynamic-gridline" alt="contrib.rocks image" />
</a>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Omar Hassan - [@omar_elfat76510](https://x.com/omar_elfat76510) - elfatairy@omarhassan.net

Project Link: [https://github.com/elfatairy/dynamic-gridline](https://github.com/elfatairy/dynamic-gridline)

Portfolio: [https://omarhassan.net](https://omarhassan.net)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/elfatairy/dynamic-gridline.svg?style=for-the-badge
[contributors-url]: https://github.com/elfatairy/dynamic-gridline/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/elfatairy/dynamic-gridline.svg?style=for-the-badge
[forks-url]: https://github.com/elfatairy/dynamic-gridline/network/members
[stars-shield]: https://img.shields.io/github/stars/elfatairy/dynamic-gridline.svg?style=for-the-badge
[stars-url]: https://github.com/elfatairy/dynamic-gridline/stargazers
[issues-shield]: https://img.shields.io/github/issues/elfatairy/dynamic-gridline.svg?style=for-the-badge
[issues-url]: https://github.com/elfatairy/dynamic-gridline/issues
[license-shield]: https://img.shields.io/github/license/elfatairy/dynamic-gridline.svg?style=for-the-badge
[license-url]: https://github.com/elfatairy/dynamic-gridline/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/omar-hassan-81888320b/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Motion.dev]: https://img.shields.io/badge/motion-dev-black.svg?logo=data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI0IDkiIHdpZHRoPSIyNCIgaGVpZ2h0PSI5Ij4NCiAgPHRpdGxlPk1vdGlvbjwvdGl0bGU+DQogIDxwYXRoIGZpbGw9IiNmZmY0MmIiDQogICAgZD0iTSA5LjA2MiAwIEwgNC4zMiA4Ljk5MiBMIDAgOC45OTIgTCAzLjcwMyAxLjk3MSBDIDQuMjc3IDAuODgyIDUuNzA5IDAgNi45MDIgMCBaIE0gMTkuNjU2IDIuMjQ4IEMgMTkuNjU2IDEuMDA2IDIwLjYyMyAwIDIxLjgxNiAwIEMgMjMuMDA5IDAgMjMuOTc2IDEuMDA2IDIzLjk3NiAyLjI0OCBDIDIzLjk3NiAzLjQ5IDIzLjAwOSA0LjQ5NiAyMS44MTYgNC40OTYgQyAyMC42MjMgNC40OTYgMTkuNjU2IDMuNDkgMTkuNjU2IDIuMjQ4IFogTSA5Ljg3MiAwIEwgMTQuMTkyIDAgTCA5LjQ1IDguOTkyIEwgNS4xMyA4Ljk5MiBaIE0gMTQuOTc0IDAgTCAxOS4yOTQgMCBMIDE1LjU5MiA3LjAyMSBDIDE1LjAxOCA4LjExIDEzLjU4NSA4Ljk5MiAxMi4zOTIgOC45OTIgTCAxMC4yMzIgOC45OTIgWiI+PC9wYXRoPg0KPC9zdmc+
[Motion-url]: https://motion.dev/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
