const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'assets', 'optimized');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png') && f !== 'bg_gradient.png');

async function run() {
  console.log('Trimming transparent margins from all assets...');
  for (const f of files) {
    const filePath = path.join(dir, f);
    const baseName = f.replace('.png', '');
    const webpPath = path.join(dir, `${baseName}.webp`);

    const trimmedBuffer = await sharp(filePath)
      .trim()
      .toBuffer();

    // Overwrite PNG with trimmed version
    await sharp(trimmedBuffer)
      .png({ compressionLevel: 9, quality: 95 })
      .toFile(filePath);

    // Overwrite WebP with trimmed version
    await sharp(trimmedBuffer)
      .webp({ quality: 92, effort: 6 })
      .toFile(webpPath);

    const meta = await sharp(filePath).metadata();
    console.log(`✓ Trimmed ${f} -> actual visible size: ${meta.width}x${meta.height}`);
  }
  console.log('All transparent borders removed!');
}

run().catch(console.error);
