interface Scope {
  start: number
  end: number
}

const create_Scope = (start: number, end: number): Scope => {
  return {
    start,
    end
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
  map.set(create_Scope(1, 10), 62.70)
  map.set(create_Scope(11, 20), 165.00)
  map.set(create_Scope(21, 40), 268.40)
  map.set(create_Scope(41, 100), 358.50)
  map.set(create_Scope(101, 500), 444.40)
  map.set(create_Scope(501, Number.MAX_SAFE_INTEGER), 485.10)

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
