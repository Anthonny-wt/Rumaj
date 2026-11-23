const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '..', 'assets', 'mockups');
const outputDir = path.join(__dirname, '..', 'assets', 'optimized');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const fileMap = {
  'image 1.png': 'bg_gradient',
  'narajana 1.png': 'glass_juice',
  'gajo 1.png': 'orange_wedge_1',
  'gajo 2.png': 'orange_wedge_2',
  'sombrillas 1.png': 'umbrella_white',
  'sombrillas 2.png': 'umbrella_blue',
  'hielo 4.png': 'ice_cube_1',
  'hielo 5.png': 'ice_cube_2',
  'hielo 6.png': 'ice_cube_3',
  'hielo 8.png': 'ice_cube_4',
  'hielo 10.png': 'water_sphere',
  'logo 1.png': 'rumaj_logo',
};

async function processImages() {
  console.log('Optimizing mockup assets...');
  for (const [originalFile, cleanName] of Object.entries(fileMap)) {
    const inputPath = path.join(inputDir, originalFile);
    if (!fs.existsSync(inputPath)) {
      console.warn('File not found:', originalFile);
      continue;
    }

    const originalStats = fs.statSync(inputPath);

    // 1. Convert to high-quality optimized WebP
    const webpPath = path.join(outputDir, `${cleanName}.webp`);
    await sharp(inputPath)
      .webp({ quality: 88, effort: 6 })
      .toFile(webpPath);
    const webpStats = fs.statSync(webpPath);

    // 2. Also produce an optimized clean PNG fallback
    const pngPath = path.join(outputDir, `${cleanName}.png`);
    await sharp(inputPath)
      .png({ compressionLevel: 9, quality: 90 })
      .toFile(pngPath);
    const pngStats = fs.statSync(pngPath);

    const saving = Math.round((1 - webpStats.size / originalStats.size) * 100);
    console.log(
      `✓ ${originalFile} -> ${cleanName}.webp: ${Math.round(originalStats.size / 1024)}KB -> ${Math.round(webpStats.size / 1024)}KB (${saving}% saved)`
    );
  }
  console.log('Optimization complete!');
}

processImages().catch(console.error);
