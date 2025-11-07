const fs = require('fs');
const path = require('path');

const templateDir = path.join(__dirname, '..', 'template');

function walk(dir) {
  const files = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

const files = walk(templateDir).filter(f => f.endsWith('.html'));
console.log('Files to process:', files.length);

files.forEach(file => {
  let s = fs.readFileSync(file, 'utf8');
  let orig = s;

  // replace several casings of ki-admin
  s = s.replace(/\bKi-Admin\b/g, 'NAV Productions');
  s = s.replace(/\bKi Admin\b/g, 'NAV Productions');
  s = s.replace(/\bKi Admin\b/gi, 'NAV Productions');
  s = s.replace(/\bki-admin\b/gi, 'NAV Productions');
  s = s.replace(/\bKi-Admin\b/gi, 'NAV Productions');

  // fix explicit "Purchase The Ki-Admin" promotional lines
  s = s.replace(/Purchase The Ki[- ]?Admin[\s\S]*?Discover the Ki[- ]?Admin/gi, 'Contact NAV Productions to inquire about our production services and packages.');
  s = s.replace(/Purchase The Ki[- ]?Admin[\s\S]*?Craft Your Site Super Faster And powerful[\s\S]*?/gi, 'Contact NAV Productions to learn about our services and start your project.');

  // cleanup weird leftover encoded footer samples
  s = s.replace(/ki-admin\s*"©"/gi, 'NAV Productions');

  if (s !== orig) {
    fs.writeFileSync(file, s, 'utf8');
    console.log('Patched', file);
  }
});

console.log('Done.');
