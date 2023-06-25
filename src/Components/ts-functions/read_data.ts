import * as XLSX from 'xlsx'
import * as dfd from 'danfojs-node'
import * as fs from 'fs'
import * as os from 'os'
import { type DataFrame } from 'danfojs-node'

export const current_day: string = new Date().toLocaleString('en-gb', { weekday: 'short' })

// Mac: /Users/hiroshi/PyCharmProjects/sandbox/py-data.xlsx
// Windows: C:\Users\hiroshi\PycharmProjects\sandbox\py-data.xlsx

export const path: string = os.platform() === 'win32'
  ? 'C:\\Users\\chain\\PycharmProjects\\sandbox\\py-data.xlsx'
  : '/Users/hiroshi/PyCharmProjects/sandbox/py-data.xlsx'

export async function extract_data_frame (path: string): Promise<DataFrame> {
  const buf = await fs.promises.readFile(path)
  const bstr = new Uint8Array(buf).reduce((s, b) => s + String.fromCharCode(b), '')
  const wb = XLSX.read(bstr, { type: 'binary' })
  const wsjson = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
  return new dfd.DataFrame(wsjson)
}

export const load_data_frame = async (path: string): Promise<number[]> => {
  try {
    const df = await extract_data_frame(path)

    console.log(df[current_day].$dataIncolumnFormat.slice(0, -1))
    return df[current_day].$dataIncolumnFormat.slice(0, -1)
  } catch (error) {
    console.error('Error reading file!', error)
    throw new Error()
  }
}
