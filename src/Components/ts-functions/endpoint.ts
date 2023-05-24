import express, { type Request, type Response } from 'express'
import cors from 'cors'
import { load_data_frame, path } from './read_data'
import { type Coordinate, generate_data } from './create_data'

const app = express()

app.use(cors())
app.use(express.json())

const make_data = (data: Coordinate[]) => {
  return {
    datasets: [
      {
        label: 'Data 1',
        backgroundColor: '#f87979',
        data
      }
    ]
  }
}

app.get('/data', async (req: Request, res: Response) => {
  const yValues = await load_data_frame(path)
  console.log('yValues: ', yValues)
  if (yValues != null) {
    const data = generate_data(yValues)
    res.json(make_data(data))
    console.log('Data generated: ', data)
  } else {
    res.status(500).send('Error generating data')
  }
})

app.listen(5200, () => { console.log('Server started on port 5200') })
