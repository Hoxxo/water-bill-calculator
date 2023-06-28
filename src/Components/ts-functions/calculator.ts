class Scope {
  start: number
  end: number

  constructor(start: number, end: number) {
    this.start = start
    this.end = end
  }
}

const map = new Map<Scope, number>()
map.set(new Scope(1, 10), 62.70)
map.set(new Scope(11, 20), 165.00)
map.set(new Scope(21, 40), 268.40)
map.set(new Scope(41, 100), 358.50)
map.set(new Scope(101, 500), 444.40)
map.set(new Scope(501, Number.MAX_SAFE_INTEGER), 485.10)

const find_entry = (input: number): [number, number] | null => {
  let index = 0
  for (const [scope, value] of map.entries()) {
    ++index
    if (input >= scope.start && input <= scope.end) {
      return [value, index]
    }
  }

  return null
}

const calculate = (n: number): number => {
  if (n < 1) {
    return n * 62.70
  }

  const index = find_entry(n)

  if (index === null) {
    console.error('Error finding entry!', new Error().stack)
    return 0
  }

  let total = 0
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
