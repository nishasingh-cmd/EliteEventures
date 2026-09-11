/**
 * Creates a 512x512 favicon where the full Elite Eventure logo
 * is centered and fully visible even when Google crops it to a circle.
 *
 * Logo: 666x236 (RGBA - white text + gold arrow on transparent)
 * Target: 512x512 dark background, logo scaled to fit inside the inscribed circle
 */

import { readFileSync, writeFileSync } from 'fs';
import zlib from 'zlib';

// ── PNG Parser ────────────────────────────────────────────────────────────────
function parsePNG(buf) {
  let offset = 8, w, h, colorType, idatChunks = [];
  while (offset < buf.length) {
    const len = buf.readUInt32BE(offset); offset += 4;
    const type = buf.slice(offset, offset + 4).toString(); offset += 4;
    const data = buf.slice(offset, offset + len); offset += len + 4;
    if (type === 'IHDR') { w = data.readUInt32BE(0); h = data.readUInt32BE(4); colorType = data[9]; }
    if (type === 'IDAT') idatChunks.push(data);
  }
  const bpp = colorType === 6 ? 4 : 3;
  const raw = zlib.inflateSync(Buffer.concat(idatChunks));
  const pixels = new Uint8Array(w * h * 4);
  let rowOff = 0;
  for (let y = 0; y < h; y++) {
    const filter = raw[rowOff++];
    const prev = y > 0 ? pixels.slice((y - 1) * w * 4, y * w * 4) : new Uint8Array(w * 4);
    const curr = pixels.subarray(y * w * 4, (y + 1) * w * 4);
    for (let xi = 0; xi < w; xi++) {
      for (let c = 0; c < bpp; c++) {
        const b = raw[rowOff++];
        const a = xi > 0 ? curr[(xi - 1) * 4 + c] : 0;
        const p = prev[xi * 4 + c];
        const cc = (xi > 0) ? prev[(xi - 1) * 4 + c] : 0;
        let val;
        if (filter === 0) val = b;
        else if (filter === 1) val = (b + a) & 0xFF;
        else if (filter === 2) val = (b + p) & 0xFF;
        else if (filter === 3) val = (b + Math.floor((a + p) / 2)) & 0xFF;
        else { const pa = Math.abs(p - cc), pb = Math.abs(a - cc), pc = Math.abs(a + p - cc - cc); val = (b + (pa <= pb && pa <= pc ? a : pb <= pc ? p : cc)) & 0xFF; }
        curr[xi * 4 + c] = val & 0xFF;
      }
      curr[xi * 4 + 3] = bpp === 4 ? curr[xi * 4 + 3] : 255;
    }
  }
  return { w, h, pixels };
}

// ── PNG Writer (RGB, no alpha) ────────────────────────────────────────────────
function writePNG(w, h, pixels) {
  const crcTable = new Uint32Array(256);
  for (let i = 0; i < 256; i++) { let c = i; for (let j = 0; j < 8; j++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; crcTable[i] = c; }
  function crc32(buf) { let c = 0xFFFFFFFF; for (const b of buf) c = (c >>> 8) ^ crcTable[(c ^ b) & 0xFF]; return (c ^ 0xFFFFFFFF) >>> 0; }
  function chunk(type, data) { const td = Buffer.concat([Buffer.from(type), data]); const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td)); const len = Buffer.alloc(4); len.writeUInt32BE(data.length); return Buffer.concat([len, td, crc]); }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 2; // 8-bit RGB
  const raw = Buffer.alloc(h * (w * 3 + 1));
  for (let y = 0; y < h; y++) {
    raw[y * (w * 3 + 1)] = 0;
    for (let x = 0; x < w; x++) {
      raw[y * (w * 3 + 1) + 1 + x * 3] = pixels[(y * w + x) * 4];
      raw[y * (w * 3 + 1) + 1 + x * 3 + 1] = pixels[(y * w + x) * 4 + 1];
      raw[y * (w * 3 + 1) + 1 + x * 3 + 2] = pixels[(y * w + x) * 4 + 2];
    }
  }
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

// ── Bilinear Resize ───────────────────────────────────────────────────────────
function bilinearResize(src, sw, sh, dw, dh) {
  const dst = new Uint8Array(dw * dh * 4);
  const xr = sw / dw, yr = sh / dh;
  for (let dy = 0; dy < dh; dy++) {
    for (let dx = 0; dx < dw; dx++) {
      const sx = (dx + 0.5) * xr - 0.5, sy = (dy + 0.5) * yr - 0.5;
      const x0 = Math.max(0, Math.floor(sx)), y0 = Math.max(0, Math.floor(sy));
      const x1 = Math.min(sw - 1, x0 + 1), y1 = Math.min(sh - 1, y0 + 1);
      const xf = sx - x0, yf = sy - y0;
      for (let c = 0; c < 4; c++) {
        const tl = src[(y0 * sw + x0) * 4 + c], tr = src[(y0 * sw + x1) * 4 + c];
        const bl = src[(y1 * sw + x0) * 4 + c], br = src[(y1 * sw + x1) * 4 + c];
        dst[(dy * dw + dx) * 4 + c] = Math.round(tl * (1 - xf) * (1 - yf) + tr * xf * (1 - yf) + bl * (1 - xf) * yf + br * xf * yf);
      }
    }
  }
  return dst;
}

// ── Main ──────────────────────────────────────────────────────────────────────
const SIZE = 512;
const BG = [7, 7, 7]; // #070707

// The circle Google draws has radius = SIZE/2 = 256, center = (256, 256).
// To keep the FULL logo visible inside the circle, the logo must fit in a
// rectangle inscribed inside the circle.
// For a rectangle of aspect ratio logoW:logoH inside circle r=256:
//   w² + h² = (2r)² → w² + h² = 512²
// logoAR = 666/236 ≈ 2.822
// w = 2.822*h → (2.822h)² + h² = 512² → h = 512 / sqrt(2.822²+1) = 512/2.997 ≈ 170
// w = 2.822 * 170 ≈ 480
// BUT we want some breathing room — use 75% of that for clean padding:
const LOGO_W = Math.round(480 * 0.78); // ~375px wide
const LOGO_H = Math.round(170 * 0.78); // ~133px tall

const logo = parsePNG(readFileSync('public/images/EliteEventureLogoNew.png'));
console.log(`Logo source: ${logo.w}x${logo.h}`);

const scaledLogo = bilinearResize(logo.pixels, logo.w, logo.h, LOGO_W, LOGO_H);

// Create 512x512 canvas with dark background
const canvas = new Uint8Array(SIZE * SIZE * 4);
for (let i = 0; i < SIZE * SIZE; i++) {
  canvas[i * 4] = BG[0]; canvas[i * 4 + 1] = BG[1]; canvas[i * 4 + 2] = BG[2]; canvas[i * 4 + 3] = 255;
}

// Center the logo on the canvas
const offsetX = Math.round((SIZE - LOGO_W) / 2);
const offsetY = Math.round((SIZE - LOGO_H) / 2);

// Alpha-composite the logo onto the dark canvas
for (let y = 0; y < LOGO_H; y++) {
  for (let x = 0; x < LOGO_W; x++) {
    const logoIdx = (y * LOGO_W + x) * 4;
    const alpha = scaledLogo[logoIdx + 3] / 255;
    if (alpha === 0) continue; // fully transparent → keep dark bg
    const cx = offsetX + x, cy = offsetY + y;
    const canvasIdx = (cy * SIZE + cx) * 4;
    // Blend: out = logo * alpha + bg * (1 - alpha)
    canvas[canvasIdx]     = Math.round(scaledLogo[logoIdx]     * alpha + BG[0] * (1 - alpha));
    canvas[canvasIdx + 1] = Math.round(scaledLogo[logoIdx + 1] * alpha + BG[1] * (1 - alpha));
    canvas[canvasIdx + 2] = Math.round(scaledLogo[logoIdx + 2] * alpha + BG[2] * (1 - alpha));
    canvas[canvasIdx + 3] = 255;
  }
}

// Write 512x512
writeFileSync('public/favicon-512x512.png', writePNG(SIZE, SIZE, canvas));
console.log('Written favicon-512x512.png (logo centered for circle crop)');

// Regenerate all smaller sizes from this
const sizes = [192, 180, 96, 48, 32, 16];
const outNames = { 192: 'favicon-192x192.png', 180: 'apple-touch-icon.png', 96: 'favicon-96x96.png', 48: 'favicon-48x48.png', 32: 'favicon-32x32.png', 16: 'favicon-16x16.png' };
for (const sz of sizes) {
  const resized = bilinearResize(canvas, SIZE, SIZE, sz, sz);
  writeFileSync(`public/${outNames[sz]}`, writePNG(sz, sz, resized));
  console.log(`Written ${outNames[sz]} (${sz}x${sz})`);
}

// Regenerate favicon.svg
const pngBuf512 = readFileSync('public/favicon-512x512.png');
const b64 = pngBuf512.toString('base64');
const svg = [
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">',
  `  <image href="data:image/png;base64,${b64}" width="512" height="512" />`,
  '</svg>'
].join('\n');
writeFileSync('public/favicon.svg', svg);
console.log('Written favicon.svg');
console.log('\nDone! All favicons regenerated with circle-optimized logo.');
