import * as XLSX from 'xlsx';

let sheet: XLSX.WorkSheet | null = null;

let path: string = '/Users/hiroshi/PyCharmProjects/sandbox/py-data.xlsx'

const open_sheet = (path: string): XLSX.WorkBook | null => {
    try {
        return XLSX.readFile(path);
    } catch (error) {
        console.error("Error reading file!", error);
        return null;
    }
}

const book = open_sheet(path);

if (book) {
    sheet = book.Sheets[book.SheetNames[0]];
} else {
    console.error('Failed to load the workbook');
}

console.log(sheet);