export interface Coordinate {
  x: number
  y: number
}

export interface DataSet {
  label: string
  labelColor: string
  backgroundColor: string
  data: Coordinate[]
}

export interface DataWrapper {
  datasets: DataSet[]
}

export enum DataType {
  DAY = 'day',
  WEEK = 'week'
}

export interface DataRequest {
  dataType: DataType
}

interface BarData extends Omit<DataSet, 'data'> {
  data: number[]
  borderColor: string
  borderWidth: number
  borderRadius: number
  fill: boolean
}

export interface BarWrapper extends Omit<DataWrapper, 'datasets'> {
  datasets: BarData[]
  labels: string[]
}
