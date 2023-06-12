export interface Coordinate {
  x: number
  y: number
}

export interface DataSet {
  label: string
  backgroundColor: string
  data: Coordinate[]
}

export interface DataWrapper {
  datasets: DataSet[]
}
