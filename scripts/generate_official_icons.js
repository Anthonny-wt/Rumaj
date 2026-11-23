const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateOfficialIcons() {
  const logoPath = path.resolve(__dirname, '../assets/Mockups/logo 1.png');
  const trimmed = await sharp(logoPath).trim().toBuffer();

  // 1. assets/icon.png (1024x1024, clean white background, logo scaled to 680px)
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
      input: await sharp(trimmed).resize(680, 680, { fit: 'inside' }).toBuffer(),
      gravity: 'center'
    }
  ])
  .png()
  .toFile(path.resolve(__dirname, '../assets/icon.png'));
  console.log('Updated assets/icon.png');

  // 2. assets/android-icon-foreground.png (1024x1024, transparent, safe zone logo scaled to 640px)
  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([
    {
      input: await sharp(trimmed).resize(640, 640, { fit: 'inside' }).toBuffer(),
      gravity: 'center'
    }
  ])
  .png()
  .toFile(path.resolve(__dirname, '../assets/android-icon-foreground.png'));
  console.log('Updated assets/android-icon-foreground.png');

  // 3. assets/android-icon-background.png (1024x1024 solid white)
  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
  .png()
  .toFile(path.resolve(__dirname, '../assets/android-icon-background.png'));
  console.log('Updated assets/android-icon-background.png');

  // 4. assets/splash-icon.png (transparent background, 500px logo for splash screen)
  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([
    {
      input: await sharp(trimmed).resize(500, 500, { fit: 'inside' }).toBuffer(),
      gravity: 'center'
    }
  ])
  .png()
  .toFile(path.resolve(__dirname, '../assets/splash-icon.png'));
  console.log('Updated assets/splash-icon.png');

  // 5. assets/favicon.png (48x48)
  await sharp(trimmed)
    .resize(48, 48, { fit: 'inside' })
    .png()
    .toFile(path.resolve(__dirname, '../assets/favicon.png'));
  console.log('Updated assets/favicon.png');

  // Cleanup test icons
  const testFiles = ['test_icon_a.png', 'test_icon_b.png', 'icon_white.png', 'icon_citrus.png'];
  for (const f of testFiles) {
    const p = path.resolve(__dirname, '../assets', f);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }
}

generateOfficialIcons().catch(console.error);
