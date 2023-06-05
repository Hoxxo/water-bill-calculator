export interface Coordinate {x: number, y: number}

export const generate_data = (y: number[] | string): Coordinate[] => {
  const data: Coordinate[] = []

  for (let i = 0; i < y.length; i++) {
    if (y[i] === '') {
      continue
    }

    data.push({ x: i, y: y[i] as number })
  }

  return data
}
