import * as XLSX from 'xlsx';
import * as dfd from 'danfojs-node';
import * as fs from 'fs';

const current_day: string = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    [new Date().getDay()].slice(0, 3);

export const path: string = '/Users/hiroshi/PyCharmProjects/sandbox/py-data.xlsx'

export const load_data_frame = async (path: string): Promise<number[] | null> => {
    try {
        let buf = await fs.promises.readFile(path);
        let bstr = new Uint8Array(buf).reduce((s, b) => s + String.fromCharCode(b), '');
        let wb = XLSX.read(bstr, { type: 'binary' });
        let wsjson = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        let df = new dfd.DataFrame(wsjson);

        return df[current_day]['$dataIncolumnFormat'].slice(0, -1);
    } catch (error) {
        console.error("Error reading file!", error);
        return null;
    }
}