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
            longitude: parts[5],
            latitude: parts[6]
        });
    }
}

// Generate KML
let kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document>
  <name>BNI联系人地图</name>
  <description>BNI商会成员位置标注</description>
  <Style id="dollarIcon"><IconStyle><color>ff00d4ff</color><scale>1.0</scale><Icon><href>http://maps.google.com/mapfiles/kml/shapes/dollar.png</href></Icon></IconStyle></Style>
  <Style id="euroIcon"><IconStyle><color>ff00d4ff</color><scale>1.2</scale><Icon><href>http://maps.google.com/mapfiles/kml/shapes/euro.png</href></Icon></IconStyle></Style>
  <Style id="poundIcon"><IconStyle><color>ff00d4ff</color><scale>1.0</scale><Icon><href>http://maps.google.com/mapfiles/kml/shapes/dollar.png</href></Icon></IconStyle></Style>
`;

contacts.forEach(contact => {
    // Determine style
    let style = '#dollarIcon';
    if (contact.name === 'BNI周五会场') {
        style = '#euroIcon';
    } else if (contact.name === '陆海波') {
        style = '#poundIcon';
    }

    kml += `  <Placemark>
    <name>${escapeXml(contact.name)}</name>
    <description><![CDATA[公司: ${contact.company}<br>电话: ${contact.phone}<br>行业: ${contact.industry}<br>地址: ${contact.address}]]></description>
    <styleUrl>${style}</styleUrl>
    <Point>
      <coordinates>${contact.longitude},${contact.latitude},0</coordinates>
    </Point>
  </Placemark>
`;
});

kml += `</Document>
</kml>`;

function escapeXml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

fs.writeFileSync('F:/work/BNI/BNI联系人地图-new.kml', kml, 'utf8');
console.log('KML file updated with ' + contacts.length + ' contacts');
