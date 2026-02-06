const XLSX = require('xlsx');
const fs = require('fs');

try {
    const workbook = XLSX.readFile('F:/work/BNI/BNI联系人清单.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const csv = XLSX.utils.sheet_to_csv(sheet);
    fs.writeFileSync('F:/work/BNI/xlsx_output.csv', '\ufeff' + csv, 'utf8');
    console.log('Done! Saved to xlsx_output.csv');
} catch (e) {
    console.error('Error:', e.message);
}
