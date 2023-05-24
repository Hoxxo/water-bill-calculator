export interface Coordinate {x: number, y: number}

export const generate_data = (y: number[]): Coordinate[] => {
  const data: Coordinate[] = []

  for (let i = 0; i < y.length; i++) {
    data.push({ x: i + 1, y: y[i] })
  }

  return data
}
