const fs = require('fs');

let html = fs.readFileSync('public/content.html', 'utf8');

// 1. Replace Logo SVG with img tag
html = html.replace(
    /<svg[^>]*aria-label="Company Logo"[^>]*>.*?<\/svg>/g, 
    '<img src="/shaphauslogo.png" alt="ShapeHause Logo" style="height: 60px; width: auto;" />'
);

// 2. Replace Favicon
html = html.replace(/<link rel="icon" href="[^"]*".*?>/g, '<link rel="icon" href="/shaphauslogo.png">');
html = html.replace(/<link rel="apple-touch-icon" href="[^"]*".*?>/g, '<link rel="apple-touch-icon" href="/shaphauslogo.png">');

// 3. Remove "Abuja"
html = html.replace(/\bAbuja\b/gi, '');
html = html.replace(/in\s*,/g, ','); // "Wellness Studio in ," -> "Wellness Studio,"

// 4. Remove "wellness store"
html = html.replace(/\bwellness store\b/gi, '');
html = html.replace(/\bwelness store\b/gi, '');

// 5. Replace Naira with CAD
html = html.replace(/₦/g, '$');
html = html.replace(/\bNaira\b/gi, 'CAD');

// Clean up extra spaces left behind
html = html.replace(/\s{2,}/g, ' ');

fs.writeFileSync('public/content.html', html);
console.log('Text updates completed!');
