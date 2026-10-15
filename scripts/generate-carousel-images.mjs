import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const outDir = path.join(process.cwd(), "public", "carousel");

const slides = [
  {
    file: "green-beans.webp",
    gradient: ["#3d4f2e", "#6b705c"],
    accent: "#c4a574",
    label: "Зелёное зерно",
  },
  {
    file: "roasting.webp",
    gradient: ["#2c1810", "#5c3d2e"],
    accent: "#e8a87c",
    label: "Обжарка",
  },
  {
    file: "cupping.webp",
    gradient: ["#4a3f35", "#8b7355"],
    accent: "#f9f6f0",
    label: "Каппинг",
  },
  {
    file: "packing.webp",
    gradient: ["#3a2a22", "#6b5344"],
    accent: "#b85c38",
    label: "Упаковка",
  },
];

function slideSvg(gradient, accent, label) {
  return `<svg width="1200" height="675" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${gradient[0]}"/>
      <stop offset="100%" style="stop-color:${gradient[1]}"/>
    </linearGradient>
    <radialGradient id="glow" cx="70%" cy="30%" r="50%">
      <stop offset="0%" style="stop-color:${accent};stop-opacity:0.35"/>
      <stop offset="100%" style="stop-color:${accent};stop-opacity:0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <rect width="1200" height="675" fill="url(#glow)"/>
  <circle cx="280" cy="340" r="120" fill="${accent}" opacity="0.12"/>
  <circle cx="320" cy="300" r="80" fill="${accent}" opacity="0.08"/>
  <ellipse cx="900" cy="480" rx="200" ry="60" fill="#000" opacity="0.15"/>
  <text x="80" y="580" font-family="Georgia, serif" font-size="42" fill="${accent}" opacity="0.9">${label}</text>
  <text x="80" y="630" font-family="system-ui, sans-serif" font-size="22" fill="#f9f6f0" opacity="0.55">Кварта · Минск</text>
</svg>`;
}

await fs.mkdir(outDir, { recursive: true });

for (const slide of slides) {
  const svg = slideSvg(slide.gradient, slide.accent, slide.label);
  const outPath = path.join(outDir, slide.file);
  await sharp(Buffer.from(svg))
    .webp({ quality: 82, effort: 4 })
    .toFile(outPath);
  console.log("Wrote", outPath);
}
