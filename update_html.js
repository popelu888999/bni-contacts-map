const fs = require('fs');

// Read CSV
const csv = fs.readFileSync('F:/work/BNI/BNI联系人_GeoHub.csv', 'utf8');
const lines = csv.split('\n').filter(l => l.trim());
const headers = lines[0].split(',');

// Parse CSV to contacts array
const contacts = [];
for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // Handle CSV with quoted fields
    const values = [];
    let current = '';
    let inQuotes = false;
    for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    values.push(current.trim());

    if (values.length >= 7 && values[0]) {
        contacts.push({
            name: values[0],
            company: values[1] || '',
            phone: values[2] || '',
            industry: values[3] || '',
            address: values[4] || '',
            lng: parseFloat(values[5]) || 0,
            lat: parseFloat(values[6]) || 0
        });
    }
}

// Generate JS array string for HTML files
let jsArray = 'const contacts = [\n';
contacts.forEach((c, i) => {
    const isLast = i === contacts.length - 1;
    jsArray += `            { name: "${c.name}", company: "${c.company.replace(/"/g, '\\"')}", phone: "${c.phone}", industry: "${c.industry}", address: "${c.address}", lng: ${c.lng}, lat: ${c.lat} }${isLast ? '' : ','}\n`;
});
jsArray += '        ];';

// Output for verification
console.log('Total contacts:', contacts.length);
console.log('JS Array generated successfully');

// Save JS array to temp file
fs.writeFileSync('F:/work/BNI/contacts_array.txt', jsArray, 'utf8');
console.log('Saved to contacts_array.txt');
