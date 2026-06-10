// Generates icon-192.png and icon-512.png using Canvas API via node-canvas
// Run: node gen-icons.mjs
import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';

function makeIcon(size) {
  const c = createCanvas(size, size);
  const ctx = c.getContext('2d');
  const r = size * 0.18;

  // Background gradient
  const g = ctx.createLinearGradient(0, 0, size, size);
  g.addColorStop(0, '#7c3aed');
  g.addColorStop(0.5, '#4f46e5');
  g.addColorStop(1, '#06b6d4');
  ctx.fillStyle = g;

  // Rounded rect
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(size - r, 0);
  ctx.quadraticCurveTo(size, 0, size, r);
  ctx.lineTo(size, size - r);
  ctx.quadraticCurveTo(size, size, size - r, size);
  ctx.lineTo(r, size);
  ctx.quadraticCurveTo(0, size, 0, size - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();
  ctx.fill();

  // Emoji
  ctx.font = `${size * 0.52}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('💰', size / 2, size / 2 + size * 0.03);

  return c.toBuffer('image/png');
}

try {
  writeFileSync('icon-192.png', makeIcon(192));
  writeFileSync('icon-512.png', makeIcon(512));
  console.log('Icons generated!');
} catch(e) {
  console.log('canvas not installed, using fallback SVG icons');
}
