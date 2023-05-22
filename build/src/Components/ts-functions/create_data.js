import './read_data.ts';
const fetch_data = () => {
    // TODO!
};
const generate_numbers = (n) => {
    let r = [];
    for (let i = 0; i < n; i++) {
        let num = Math.random() * 100;
        r.push(Math.floor(num));
    }
    return r;
};
let x = generate_numbers(10);
let y = generate_numbers(10);
const generate_data = (x, y) => {
    if (x.length != y.length) {
        console.log("X and Y doesn't have the same number of elements!");
        return [];
    }
    let r = [];
    x.map((i, index) => {
        r.push({ x: i, y: y[index] });
    });
    return r;
};
let data = generate_data(x, y);
export default data;
//# sourceMappingURL=create_data.js.map