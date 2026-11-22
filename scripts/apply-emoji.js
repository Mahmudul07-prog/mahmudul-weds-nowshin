const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const emojiSize = 275;

const emojiSvg = `
<svg width="${emojiSize}" height="${emojiSize}" viewBox="0 0 275 275" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="faceGrad" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#fff385"/>
      <stop offset="40%" stop-color="#ffcc00"/>
      <stop offset="85%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </radialGradient>
    <radialGradient id="blushGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fb7185" stop-opacity="0.85"/>
      <stop offset="60%" stop-color="#f43f5e" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#f43f5e" stop-opacity="0"/>
    </radialGradient>
    <filter id="softShadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="7" stdDeviation="10" flood-color="#000000" flood-opacity="0.32"/>
    </filter>
  </defs>

  <!-- Emoji Outer Soft Border -->
  <circle cx="137.5" cy="137.5" r="128" fill="#ffd700" opacity="0.35"/>
  <circle cx="137.5" cy="137.5" r="124" fill="url(#faceGrad)" filter="url(#softShadow)" stroke="#d97706" stroke-width="3.5"/>

  <!-- Rosy Cute Blushes -->
  <circle cx="55" cy="158" r="28" fill="url(#blushGrad)"/>
  <circle cx="220" cy="158" r="28" fill="url(#blushGrad)"/>

  <!-- Super Happy Smiling Eyes (Cheery upward arcs) -->
  <path d="M 58 118 C 70 90, 100 90, 112 118" fill="none" stroke="#451a03" stroke-width="10" stroke-linecap="round"/>
  <path d="M 163 118 C 175 90, 205 90, 217 118" fill="none" stroke="#451a03" stroke-width="10" stroke-linecap="round"/>

  <!-- Joyful Eyebrows -->
  <path d="M 64 84 Q 84 72 104 84" fill="none" stroke="#78350f" stroke-width="5" stroke-linecap="round"/>
  <path d="M 171 84 Q 191 72 211 84" fill="none" stroke="#78350f" stroke-width="5" stroke-linecap="round"/>

  <!-- Wide Happy Open Smile (Laughing/Joyous) -->
  <g>
    <!-- Mouth opening -->
    <path d="M 78 150 C 78 212, 197 212, 197 150 C 170 156, 105 156, 78 150 Z" fill="#7f1d1d" stroke="#451a03" stroke-width="5.5" stroke-linejoin="round"/>
    <!-- Sparkling white teeth -->
    <path d="M 83 152 C 108 165, 167 165, 192 152 C 188 164, 88 164, 83 152 Z" fill="#ffffff"/>
    <!-- Cute pink tongue -->
    <path d="M 108 192 C 120 176, 155 176, 167 192 C 156 205, 119 205, 108 192 Z" fill="#fb7185"/>
  </g>

  <!-- Golden Sparkles -->
  <path d="M 36 45 L 41 57 L 53 62 L 41 67 L 36 79 L 31 67 L 19 62 L 31 57 Z" fill="#ffffff" opacity="0.95"/>
  <circle cx="238" cy="58" r="3.5" fill="#ffffff"/>
  <path d="M 235 44 L 238 52 L 246 55 L 238 58 L 235 66 L 232 58 L 224 55 L 232 52 Z" fill="#ffd700"/>
</svg>
`;

async function run() {
  const inputPath = 'C:/Users/faysa/.gemini/antigravity/brain/4d005f9d-f1b2-4276-8bad-ff0cc87647d7/.user_uploaded/media_1794826876524_3f8a9921.jpg';
  const outputPath = path.join(__dirname, '../public/images/nowshin-bride.jpg');

  const emojiBuffer = Buffer.from(emojiSvg);

  await sharp(inputPath)
    .composite([
      {
        input: emojiBuffer,
        top: 175,
        left: 232,
      }
    ])
    .jpeg({ quality: 96 })
    .toFile(outputPath);

  console.log('Saved updated nowshin-bride.jpg successfully!');
}

run().catch(console.error);
