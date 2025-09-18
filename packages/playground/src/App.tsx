import { Grid, GridItem } from 'dynamic-gridline'

function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '500px', height: '500px', border: '2px solid black' }}>
        <Grid
          config={{
            width: 1000,
            height: 800,
            customZoomSlider: ({ zoomValue, handleZoom }) => (
              <div style={{ position: 'absolute', top: 0, right: 0 }}>
                <button onClick={() => handleZoom(zoomValue + 0.1)}>Zoom in</button>
                {zoomValue}
                <button onClick={() => handleZoom(zoomValue - 0.1)}>Zoom out</button>
              </div>
            ),
            onHoldClick: ({ x, y }) => {
              console.log('onHoldClick', x, y)
            },
            onFastClick: ({ x, y }) => {
              console.log('onFastClick', x, y)
            },
          }}
        >
          <GridItem x={0} y={0}>
            <div style={{ width: 100, height: 100, backgroundColor: 'red' }} />
          </GridItem>
        </Grid>
      </div>
    </div>
  )
}

export default App
