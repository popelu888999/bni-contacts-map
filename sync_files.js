const fs = require('fs');

// Read contacts array
const contactsArray = fs.readFileSync('F:/work/BNI/contacts_array.txt', 'utf8');

// Read and update index.html
let indexHtml = fs.readFileSync('F:/work/BNI/index.html', 'utf8');
// Find and replace contacts array
indexHtml = indexHtml.replace(/const contacts = \[[\s\S]*?\];/m, contactsArray);
fs.writeFileSync('F:/work/BNI/index.html', indexHtml, 'utf8');
console.log('Updated index.html');

// Read and update BNI联系人地图-单文件版.html
let singleFileHtml = fs.readFileSync('F:/work/BNI/BNI联系人地图-单文件版.html', 'utf8');
singleFileHtml = singleFileHtml.replace(/const contacts = \[[\s\S]*?\];/m, contactsArray);
fs.writeFileSync('F:/work/BNI/BNI联系人地图-单文件版.html', singleFileHtml, 'utf8');
console.log('Updated BNI联系人地图-单文件版.html');

// Read and update bni-contacts-map.html
let bniHtml = fs.readFileSync('F:/work/BNI/bni-contacts-map.html', 'utf8');
bniHtml = bniHtml.replace(/const contacts = \[[\s\S]*?\];/m, contactsArray);
fs.writeFileSync('F:/work/BNI/bni-contacts-map.html', bniHtml, 'utf8');
console.log('Updated bni-contacts-map.html');

// Read and update BNI联系人地图.html
let mapHtml = fs.readFileSync('F:/work/BNI/BNI联系人地图.html', 'utf8');
mapHtml = mapHtml.replace(/const contacts = \[[\s\S]*?\];/m, contactsArray);
fs.writeFileSync('F:/work/BNI/BNI联系人地图.html', mapHtml, 'utf8');
console.log('Updated BNI联系人地图.html');

console.log('All HTML files updated successfully!');
