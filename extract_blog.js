const fs = require('fs');
let html = fs.readFileSync('./public/content.html', 'utf8');

const index = html.indexOf('ourClasses_container__Jlcfx');
if (index === -1) {
  console.log("Could not find blog container by class.");
  process.exit(1);
}

const startOffset = html.lastIndexOf('<div', index);
let nextSectionIndex = html.indexOf('<div class="classpack_container', index);
if (nextSectionIndex === -1) {
  nextSectionIndex = html.indexOf('<footer', index);
}

if (nextSectionIndex !== -1) {
  const blogSection = html.substring(startOffset, nextSectionIndex);
  fs.writeFileSync('./blog_section.txt', blogSection);
  console.log("Extracted blog section to blog_section.txt. Size:", blogSection.length);
} else {
  console.log("Could not find end of blog section.");
}
