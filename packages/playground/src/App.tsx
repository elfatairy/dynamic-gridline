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
            width: 100000,
            height: 80000,
            onHoldClick: ({ x, y }) => {
              console.log('onHoldClick', x, y)
            },
            onFastClick: ({ x, y }) => {
              console.log('onFastClick', x, y)
            },
            gridColor: '#C9DAEA',
            gridBackground: '#191516',
            minZoom: 0.01,
            maxZoom: 100,
            zoomSteps: 100,
          }}
        >
          {/* <GridItem x={0} y={0}>
            <div style={{ width: 100, height: 100, backgroundColor: 'red' }} />
          </GridItem>
          <GridItem x={200} y={0} disableScale>
            <div style={{ width: 100, height: 100, backgroundColor: 'blue', borderRadius: '50%' }} />
          </GridItem> */}
        </Grid>
      </div>
    </div>
  )
}

export default App
