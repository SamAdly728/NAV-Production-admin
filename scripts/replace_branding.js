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

  // replace title suffix
  s = s.replace(/\|\s*ki-admin\s*-\s*Premium Admin Template/gi, '| NAV Productions');

  // replace meta keywords/description that mention ki-admin/template
  s = s.replace(/<meta[^>]*content\s*=\s*"([^"]*ki-admin[^"]*)"[^>]*>/gi, function(m){
    return '<meta name="description" content="NAV Productions — promotional videos, photography, aerial media and social media content. San Diego-based production company focused on cinematic quality and results.">';
  });

  // Replace generic meta listing of admin template
  s = s.replace(/admin template,\s*ki-admin admin template,\s*dashboard template,\s*flat admin template,\s*responsive admin template,\s*web app/gi,
                'NAV Productions, video production, photography, aerial media, bookings and media services');

  // footer copyright
  s = s.replace(/Copyright \u00A9\s*2025[^<]*ki-admin[^<]*/gi, 'Copyright © 2025 NAV Productions. All rights reserved.');
  s = s.replace(/Copyright \u00A9\s*2025[^<]*/gi, 'Copyright © 2025 NAV Productions. All rights reserved.');

  // support mail
  s = s.replace(/teqlathemes@gmail.com/gi, 'info@nav-productions.com');
  s = s.replace(/mailto:teqlathemes@gmail.com/gi, 'mailto:info@nav-productions.com');

  // External demo doc links -> root
  s = s.replace(/https?:\/\/[^"'\s]*ki-admin[^"'\s]*/gi, '/');

  if (s !== orig) {
    fs.writeFileSync(file, s, 'utf8');
    console.log('Patched', file);
  }
});

console.log('Done.');
