import { load_data_frame, path } from './read_data';

type Coordinate = {x: number, y: number};

let data: Coordinate[] = [];

const generate_data = (y: number[]): Coordinate[] => {
    let data: Coordinate[] = [];

    for (let i = 0; i < y.length; i++) {
        data.push({x: i + 1, y: y[i]});
    }

    return data
}

load_data_frame(path).then((values) => {
    if (values) {
        data = generate_data(values);
    }

    console.log(data);
});