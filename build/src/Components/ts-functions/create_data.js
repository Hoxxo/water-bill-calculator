"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_data = void 0;
const generate_data = (y) => {
    let data = [];
    for (let i = 0; i < y.length; i++) {
        data.push({ x: i + 1, y: y[i] });
    }
    return data;
};
exports.generate_data = generate_data;
//# sourceMappingURL=create_data.js.map