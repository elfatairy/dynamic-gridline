import { Grid, GridItem } from 'dynamic-gridline'
import letterPositions from './data/letterPositions.json'

const Dot = () => (
  <div style={{
    width: 100,
    height: 100,
    backgroundColor: '#1b2845',
    borderRadius: '50%'
  }} />
)

function App() {
  const allPositions = [
    ...Object.values(letterPositions.dynamic).flat(),
    ...Object.values(letterPositions.gridline).flat()
  ]

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
          minZoom: 0.16,
          maxZoom: 1,
          zoomSteps: 100,
        }}
      >
        {allPositions.map((position, index) => (
          <GridItem key={index} x={position.x} y={position.y}>
            <Dot />
          </GridItem>
        ))}
      </Grid>
    </div>
  )
}

export default App
