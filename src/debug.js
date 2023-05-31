const XLSX = require('xlsx')

let book = null
let sheet = null;
(() => {
  try {
    book = XLSX.readFile('/Users/hiroshi/PyCharmProjects/sandbox/py-data.xlsx')
  } catch (error) {
    console.log('Error reading file!', error)
    return null
  }
})()

if (book) {
  sheet = book.Sheets[book.SheetNames[0]]
} else {
  console.error('Failed to load the workbook')
}

console.log(sheet)
