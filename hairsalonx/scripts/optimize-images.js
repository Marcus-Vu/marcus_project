const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');

async function optimizeImages() {
  const files = fs.readdirSync(imagesDir);
  
  for (const file of files) {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;
    if (file.includes('-optimized')) continue;
    
    const inputPath = path.join(imagesDir, file);
    const baseName = path.parse(file).name;
    
    console.log(`Processing: ${file}`);
    
    // Create optimized JPG (max 1200px width, quality 85)
    const outputJpg = path.join(imagesDir, `${baseName}-optimized.jpg`);
    await sharp(inputPath)
      .resize(1200, null, { withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true })
      .toFile(outputJpg);
    
    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputJpg).size;
    console.log(`  ✓ ${baseName}-optimized.jpg (${(originalSize/1024/1024).toFixed(1)}MB → ${(newSize/1024).toFixed(0)}KB)`);
    
    // Create WebP version
    const outputWebp = path.join(imagesDir, `${baseName}.webp`);
    await sharp(inputPath)
      .resize(1200, null, { withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(outputWebp);
    
    const webpSize = fs.statSync(outputWebp).size;
    console.log(`  ✓ ${baseName}.webp (${(webpSize/1024).toFixed(0)}KB)`);
  }
  
  console.log('\nDone! Update your image references to use the optimized versions.');
}

optimizeImages().catch(console.error);
