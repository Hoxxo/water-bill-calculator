interface Scope {
  start: number
  end: number
}

class BillScope implements Scope {
  start: number
  end: number

  constructor(start: number, end: number) {
    this.start = start
    this.end = end
  }
}

const find_entry = (input: number, map: Map<Scope, number>): [number, number] | null => {
  let index = 0
  for (const [Scope, value] of map.entries()) {
    ++index
    if (input >= Scope.start && input <= Scope.end) {
      return [value, index]
    }
  }

  return null
}

const calculate = (n: number): number => {
  if (n < 1) {
    return n * 62.70
  }
  const map = new Map<Scope, number>()
  let total = 0
  map.set(new BillScope(1, 10), 62.70)
  map.set(new BillScope(11, 20), 165.00)
  map.set(new BillScope(21, 40), 268.40)
  map.set(new BillScope(41, 100), 358.50)
  map.set(new BillScope(101, 500), 444.40)
  map.set(new BillScope(501, Number.MAX_SAFE_INTEGER), 485.10)

  const index = find_entry(n, map)

  if (index === null) {
    console.error('Error finding entry!', new Error().stack)
    return 0
  }

  let _index = index[1]
  for (const [_, value] of map.entries()) {
    _index -= 1
    if (_index === 0) {
      break
    }
    total += value * 10
  }

  total += index[0] * (n - 10 * (index[1] - 1))
  return total
}

export default calculate
