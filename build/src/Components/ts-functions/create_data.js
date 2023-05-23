"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_data = void 0;
const read_data_1 = require("./read_data");
let data = [];
const generate_data = (y) => {
    let data = [];
    for (let i = 0; i < y.length; i++) {
        data.push({ x: i + 1, y: y[i] });
    }
    return data;
};
exports.generate_data = generate_data;
(0, read_data_1.load_data_frame)(read_data_1.path).then((values) => {
    if (values) {
        data = (0, exports.generate_data)(values);
    }
    else {
        return null;
    }
    let send = JSON.stringify(data);
    fetch('http://localhost:5200/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: send
    }).then((response) => {
        response.json().then((data) => {
            console.log(data);
        });
    });
});
//# sourceMappingURL=create_data.js.map