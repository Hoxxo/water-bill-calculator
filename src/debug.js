const create_range = (start, end) => {
    return {
        start,
        end
    };
};
const find_entry = (input, map) => {
    let index = 0;
    for (const [range, value] of map.entries()) {
        ++index;
        if (input >= range.start && input <= range.end) {
            return [value, index];
        }
    }
};
const calculate = (n) => {
    const map = new Map;
    let total = 0;
    map.set(create_range(1, 10), 62.70);
    map.set(create_range(11, 20), 165.00);
    map.set(create_range(21, 40), 268.40);
    map.set(create_range(41, 100), 358.50);
    map.set(create_range(101, 500), 444.40);
    map.set(create_range(501, Number.MAX_SAFE_INTEGER), 485.10);
    const index = find_entry(n, map);
    let _index = index[1];
    for (const [_, value] of map.entries()) {
        _index -= 1;
        if (_index === 0) {
            break;
        }
        total += value * 10;
    }
    total += index[0] * (n - 10 * (index[1] - 1));
    return total;
};

console.log(calculate(24));
console.log(Math.floor(4329.60 / 10) * 10);
