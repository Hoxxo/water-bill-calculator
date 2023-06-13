import express, { type Request, type Response } from 'express'
import cors from 'cors'
import { load_data_frame, path } from './read_data'
import { generate_data } from './create_data'
import { type Coordinate, type DataWrapper } from './types'
import catppuccin from "./themes";

const app = express()

app.use(cors())
app.use(express.json())

const make_data = (data: Coordinate[]): DataWrapper => {
  return {
    datasets: [
      {
        label: 'Data 1',
        backgroundColor: catppuccin.dark.purple,
        data
      }
    ]
  }
}

app.get('/data', async (req: Request, res: Response): Promise<void> => {
  const yValues = await load_data_frame(path)
  console.log('yValues: ', yValues)
  if (yValues !== null) {
    const data = generate_data(yValues)
    res.json(make_data(data))
    console.log('Data generated: ', data)
  } else {
    res.status(500).send('Error generating data')
  }
})

app.listen(5200, () => { console.log('Server started on port 5200') })
