// Post-build: convert absolute /_next/ /logo/ /images/ paths in HTML files to
// path-correct relative URLs so the static export works when served under a sub-path
// (e.g. the deploy_website proxy URL).
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'out');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

const ROOT_PREFIXES = ['/_next/', '/logo/', '/images/', '/clientverse-icon.png', '/clientverse-logo.png', '/icon-dark-32x32.png', '/icon-light-32x32.png', '/icon.svg', '/mr-clientverse-head.png', '/placeholder-logo.png', '/placeholder-logo.svg', '/placeholder-user.jpg', '/placeholder.jpg', '/placeholder.svg', '/apple-icon.png', '/og-image.jpg', '/blog/default-thumb.png'];

for (const file of walk(OUT)) {
  const rel = path.relative(OUT, path.dirname(file));
  const depth = rel === '' ? 0 : rel.split(path.sep).length;
  const prefix = depth === 0 ? './' : '../'.repeat(depth);

  let html = fs.readFileSync(file, 'utf8');
  for (const root of ROOT_PREFIXES) {
    // Replace href="/foo/..." and src="/foo/..." with relative path
    const target = root.startsWith('/') ? root.slice(1) : root;
    const pattern = new RegExp(`(href|src)="${root.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
    html = html.replace(pattern, `$1="${prefix}${target}`);
  }
  // Also handle any links to internal pages: href="/about" -> relative
  // Skip for now — Next routes shipped as /about/ links may break in static hosting at sub-path.
  // We can fix these too:
  html = html.replace(/href="\/(?!\/)([a-z][a-zA-Z0-9_\-]*[\/"])/g, (m, p1) => {
    return `href="${prefix}${p1}`;
  });
  // Bare root link: href="/"
  html = html.replace(/href="\/"/g, `href="${prefix}"`);

  fs.writeFileSync(file, html);
}

console.log('Fixed paths in', walk(OUT).length, 'HTML files.');
