import express, { type Request, type Response } from 'express'
import cors from 'cors'
import { load_data_frame, path } from './read_data'
import { generate_data } from './create_data'
import { type Coordinate, type DataWrapper } from './types'
import catppuccin from './themes'
import { fetch_week } from "./get_week"
import { type DataRequest, type DataType } from './types'
import { type WeekData } from './get_week'
import { BarWrapper } from './types'

const app = express()

app.use(cors())
app.use(express.json())

const current_day: string = new Date().toLocaleString('ja-jp', { weekday: 'long' })

const make_data = (data: Coordinate[]): DataWrapper => {
  return {
    datasets: [
      {
        label: current_day,
        labelColor: '#c6d0f5',
        backgroundColor: catppuccin.dark.pink,
        data
      }
    ]
  }
}

const transform_week_data = (data: WeekData): BarWrapper => {
  const labels = Object.keys(data)
  const values = Object.values(data)
  const initialData = {
    label: "使用水道量",
    labelColor: '#c6d0f5',
    backgroundColor: catppuccin.dark.pink,
  }

  return {
    labels: labels,
    datasets: [
      {
        ...initialData,
        data: values,
        borderColor: catppuccin.dark.purple,
        borderWidth: 2,
        borderRadius: 5,
        fill: false
      }
    ]
  }
}

app.post('/data', async (
  req: Request<unknown, unknown,
  DataRequest>, res: Response<DataWrapper | string | BarWrapper>
): Promise<void> => {
  try {
    const dataType: DataType = req.body.dataType
    let yValues

    switch (dataType) {
      case 'day':
        yValues = await load_data_frame(path);
        const data = generate_data(yValues);
        res.json(make_data(data));
        break;
      case 'week':
        const weekData: WeekData = await fetch_week(path);
        console.log("WeekData: ", transform_week_data(weekData))
        res.json(transform_week_data(weekData))
        break;
      default:
        res.status(400).send('Invalid data type');
        return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating data');
  }
});

app.listen(5200, () => { console.log('Server started on port 5200') })