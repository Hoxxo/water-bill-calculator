export type Coordinate = {x: number, y: number};

export const generate_data = (y: number[]): Coordinate[] => {
    let data: Coordinate[] = [];

    for (let i = 0; i < y.length; i++) {
        data.push({x: i + 1, y: y[i]});
    }

    return data;
};
