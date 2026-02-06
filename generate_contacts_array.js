const fs = require('fs');

// Read CSV file
const csvContent = fs.readFileSync('F:/work/BNI/BNI联系人_GeoHub.csv', 'utf8');
const lines = csvContent.split('\n').filter(line => line.trim());

// Parse CSV (skip header)
const contacts = [];
for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // Parse CSV with proper handling of quoted fields
    const parts = [];
    let current = '';
    let inQuotes = false;
    for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            parts.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    parts.push(current);

    if (parts.length >= 7) {
        contacts.push({
            name: parts[0],
            company: parts[1],
            phone: parts[2],
            industry: parts[3],
            address: parts[4],
            lng: parseFloat(parts[5]),
            lat: parseFloat(parts[6])
        });
    }
}

// Generate JavaScript array
let js = 'const contacts = [\n';
contacts.forEach((c, i) => {
    js += `    { name: "${c.name}", company: "${c.company.replace(/"/g, '\\"')}", phone: "${c.phone}", industry: "${c.industry}", address: "${c.address}", lng: ${c.lng}, lat: ${c.lat} }`;
    if (i < contacts.length - 1) js += ',';
    js += '\n';
});
js += '];';

fs.writeFileSync('F:/work/BNI/contacts_array.txt', js, 'utf8');
console.log('Generated contacts_array.txt with ' + contacts.length + ' contacts');
