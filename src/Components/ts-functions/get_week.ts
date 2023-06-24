import * as dfd from 'danfojs-node'
import { path, extract_data_frame } from './read_data'

type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"
const dayOfWeek: DayOfWeek[] = ["Mon" , "Tue" , "Wed" , "Thu" , "Fri" , "Sat" , "Sun"]

const print = (...args: any[]) => {
  console.log(...args)
}

type WeekData = {
  [key in DayOfWeek]: number
}

const fetch_week = async (path: string): Promise<WeekData> => {
  try {
    const df = await extract_data_frame(path)
    let index = 0

    const weekData: WeekData = df["$dataIncolumnFormat" as keyof dfd.DataFrame]
      .reduce((acc: WeekData, day: number[] | string[]) => {
        if (typeof day[0] === 'string') {
          return acc
        }

        acc[dayOfWeek[index++] as DayOfWeek] =
          (day as number[])
            .slice(0, -1)
            .reduce((total, num) => total + num, 0)

        return acc
      }, {} as WeekData)

    print(weekData);
    return weekData;
  } catch (error) {
    console.error(`Error reading file! ${error}`);
    throw new Error();
  }
}

fetch_week(path)