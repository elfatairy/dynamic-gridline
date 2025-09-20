import { Grid, GridItem } from 'dynamic-gridline'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
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
    </div>
  )
}

export default App
