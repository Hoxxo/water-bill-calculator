"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.load_data_frame = exports.path = void 0;
const XLSX = __importStar(require("xlsx"));
const dfd = __importStar(require("danfojs-node"));
const fs = __importStar(require("fs"));
const current_day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()].slice(0, 3);
exports.path = '/Users/hiroshi/PyCharmProjects/sandbox/py-data.xlsx';
const load_data_frame = async (path) => {
    try {
        let buf = await fs.promises.readFile(path);
        let bstr = new Uint8Array(buf).reduce((s, b) => s + String.fromCharCode(b), '');
        let wb = XLSX.read(bstr, { type: 'binary' });
        let wsjson = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        let df = new dfd.DataFrame(wsjson);
        return df[current_day]['$dataIncolumnFormat'].slice(0, -1);
    }
    catch (error) {
        console.error("Error reading file!", error);
        return null;
    }
};
exports.load_data_frame = load_data_frame;
//# sourceMappingURL=read_data.js.map