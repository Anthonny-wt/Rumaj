const sharp = require('sharp');
const path = require('path');

async function run() {
  const logoPath = path.resolve(__dirname, '../assets/Mockups/logo 1.png');
  const trimmed = await sharp(logoPath).trim().toBuffer();

  // Variant C: Crisp White background (#FFFFFF) with 660px logo
  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
  .composite([
    {
      input: await sharp(trimmed).resize(660, 660, { fit: 'inside' }).toBuffer(),
      gravity: 'center'
    }
  ])
  .png()
  .toFile(path.resolve(__dirname, '../assets/icon_white.png'));

  // Variant D: Vibrant Brand Citrus Background with white circle emblem
  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 232, g: 99, b: 26, alpha: 1 } // #E8631A
    }
  })
  .composite([
    {
      input: Buffer.from(`
        <svg width="1024" height="1024">
          <circle cx="512" cy="512" r="370" fill="#FFFFFF" />
        </svg>
      `),
      top: 0,
      left: 0
    },
    {
      input: await sharp(trimmed).resize(640, 640, { fit: 'inside' }).toBuffer(),
      gravity: 'center'
    }
  ])
  .png()
  .toFile(path.resolve(__dirname, '../assets/icon_citrus.png'));

  console.log('Done generating variations');
}

run().catch(console.error);
