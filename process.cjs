const fs = require('fs');
const path = require('path');

let html = fs.readFileSync('backup_index.html', 'utf8');

// Replace Text
html = html.replace(/Sage & She/g, 'ShapeHause');
html = html.replace(/SAGE & SHE/g, 'SHAPEHAUSE');
html = html.replace(/Sage &amp; She/g, 'ShapeHause');
html = html.replace(/sageandshe/g, 'shapehause');

// Extract images
const imgRegex = /<img([^>]*?)src="data:image\/(.*?);base64,(.*?)"([^>]*?)>/g;
let match;
let i = 0;
const publicImagesDir = path.join('public', 'extracted_images');
if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
}

html = html.replace(imgRegex, (match, before, ext, data, after) => {
    // some exts can be like 'jpeg' or 'png'
    ext = ext.split(';')[0];
    const filename = `image_${i}.${ext}`;
    const filePath = path.join(publicImagesDir, filename);
    fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
    i++;
    return `<img${before}src="/extracted_images/${filename}"${after}>`;
});

// Remove script tags
html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

// Save cleaned HTML for React
fs.writeFileSync('public/content.html', html);
console.log(`Cleaned HTML saved. Extracted ${i} images.`);
