const fs = require('fs');

let html = fs.readFileSync('public/content.html', 'utf8');

// Remove srcset and sizes attributes so it falls back to the extracted local images
html = html.replace(/srcset="[^"]*"/gi, '');
html = html.replace(/sizes="[^"]*"/gi, '');

fs.writeFileSync('public/content.html', html);
console.log('Fixed image tags to use extracted images');
