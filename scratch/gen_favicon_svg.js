import { readFileSync, writeFileSync } from 'fs';
const pngBuf = readFileSync('public/favicon-512x512.png');
const b64 = pngBuf.toString('base64');
const lines = [
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">',
  `  <image href="data:image/png;base64,${b64}" width="512" height="512" />`,
  '</svg>'
];
writeFileSync('public/favicon.svg', lines.join('\n'));
console.log('Written favicon.svg');
