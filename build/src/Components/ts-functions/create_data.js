"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const read_data_1 = require("./read_data");
let data = [];
const generate_data = (y) => {
    let data = [];
    for (let i = 0; i < y.length; i++) {
        data.push({ x: i + 1, y: y[i] });
    }
    return data;
};
(0, read_data_1.load_data_frame)(read_data_1.path).then((values) => {
    if (values) {
        data = generate_data(values);
    }
    console.log(data);
});
//# sourceMappingURL=create_data.js.map