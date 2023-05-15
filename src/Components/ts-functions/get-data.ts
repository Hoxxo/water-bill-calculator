const fetch_data = () =>{

}

const generate_numbers = (n: number): number[] => {
    let r: number[] = [];

    for (let i = 0; i < n; i++) {
        let num = Math.random() * 100
        r.push(Math.floor(num));
    }

    return r;
};

let x = generate_numbers(10);
let y = generate_numbers(10);

type Coordinate = {x: number, y: number};

const get_data = (x: number[], y: number[]): Coordinate[] => {
    if (x.length != y.length) {
        console.log("X and Y doesn't have the same number of elements!");
        return [];
    }

    let r: Coordinate[] = [];

    x.map((i, index) => {
        r.push({x: i, y: y[index]})
    });

    return r;
}

console.log(get_data(x, y));