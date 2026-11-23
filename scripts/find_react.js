const fs = require('fs');
const path = require('path');

function search(dir) {
  try {
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, f.name);
      if (f.isDirectory()) {
        search(p);
      } else if (f.name === 'react.development.js') {
        const txt = fs.readFileSync(p, 'utf8');
        const m = txt.match(/ReactVersion\s*=\s*['"]([^'"]+)['"]/);
        console.log('Found:', p, m ? m[1] : 'unknown');
      }
    }
  } catch (e) {}
}

search('node_modules');
