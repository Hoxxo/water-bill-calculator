class Scope {
  start: number
  end: number

  constructor(start: number, end: number) {
    this.start = start
    this.end = end
  }

  range(): number {
    return this.end - this.start + 1
  }
}

const map = new Map<Scope, number>()
map.set(new Scope(1, 10), 62.70)
map.set(new Scope(11, 20), 165.00)
map.set(new Scope(21, 40), 268.40)
map.set(new Scope(41, 100), 358.50)
map.set(new Scope(101, 500), 444.40)
map.set(new Scope(501, Number.MAX_SAFE_INTEGER), 485.10)

const find_entry = (input: number): [number, number, Scope] => {
  let index = 0
  for (const [scope, value] of map.entries()) {
    if (input >= scope.start && input <= scope.end) {
      return [value, index, scope]
    }
    ++index
  }

  throw new Error(`Number not found in area entries! Check argument number: ${input}`)
}

const calculate = (n: number | null): number => {
  if (n === null) {
    throw new Error('Number used to calculate value is null!')
  }

  if (n < 1) {
    return n * 62.70
  }

  const entry = find_entry(n)

  let total = 0
  let [cost, counter, scope] = entry

  for (const [currentScope, value] of map.entries()) {
    if (counter === 0) {
      break
    }
    counter -= 1
    total += value * currentScope.range()
  }

  total += cost * (n - (scope.start - 1))
  return total
}

export default calculate
