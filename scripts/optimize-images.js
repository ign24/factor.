import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de tamaños para diferentes breakpoints
const sizes = {
  mobile: { width: 400, height: 600 },
  tablet: { width: 600, height: 900 },
  desktop: { width: 800, height: 1200 }
};

// Imágenes que necesitan optimización
const imagesToOptimize = [
  'conocenos',
  'fondo'
];

async function optimizeImage(inputPath, outputPath, width, height, quality = 80) {
  try {
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ 
        quality: quality,
        effort: 6 // Máxima compresión
      })
      .toFile(outputPath);
    
    console.log(`✅ Optimized: ${outputPath} (${width}x${height})`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
}

async function optimizeAllImages() {
  const inputDir = path.join(__dirname, '../src/assets/image');
  const outputDir = path.join(__dirname, '../src/assets/image/optimized');
  
  // Crear directorio de salida si no existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  for (const imageName of imagesToOptimize) {
    const inputPath = path.join(inputDir, `${imageName}.webp`);
    
    // Verificar si la imagen de entrada existe
    if (!fs.existsSync(inputPath)) {
      console.warn(`⚠️  Input image not found: ${inputPath}`);
      continue;
    }
    
    // Generar todas las variantes
    for (const [breakpoint, dimensions] of Object.entries(sizes)) {
      const outputPath = path.join(outputDir, `${imageName}-${breakpoint}.webp`);
      
      // Solo generar si no existe
      if (!fs.existsSync(outputPath)) {
        await optimizeImage(inputPath, outputPath, dimensions.width, dimensions.height);
      } else {
        console.log(`⏭️  Skipping existing: ${outputPath}`);
      }
    }
  }
  
  console.log('\n🎉 Image optimization complete!');
}

// Ejecutar directamente
optimizeAllImages().catch(console.error);

export { optimizeAllImages, optimizeImage };
