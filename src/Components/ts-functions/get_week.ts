import type * as dfd from 'danfojs-node'
import { extract_data_frame } from './read_data'

type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'
const dayOfWeek: DayOfWeek[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const print = (...args: any[]) => {
  console.log(...args)
}

export type WeekData = {
  [key in DayOfWeek]: number
}

const is_number_array = (arr: any[]): arr is number[] => {
  return arr.every(item => typeof item === 'number')
}

// Stopped midway because it was a bad idea
// declare global {
//   interface Array<T> {
//     sum(): number
//   }
// }
//
// Array.prototype.sum = <T>(): number => {
//   if (this.every(item => typeof item === 'number')) {
//     return this.reduce((total, num) => total + num, 0)
//   } else {
//
//   }
// }

export const fetch_week = async (path: string): Promise<WeekData> => {
  try {
    const df = await extract_data_frame(path)
    let index = 0

    // print(weekData);
    return df['$dataIncolumnFormat' as keyof dfd.DataFrame]
      .reduce((acc: WeekData, day: number[] | string[]) => {
        // Check if the array is the correct type
        const set = day.slice(0, -1)
        if (!is_number_array(set)) {
          print(day)
          return acc
        }

        acc[dayOfWeek[index++]] =
          set.reduce((total, num) => total + num, 0)

        print(set)
        return acc
      }, <WeekData>{})
  } catch (error) {
    console.error(`Error reading file! ${error}`)
    throw new Error()
  }
}
