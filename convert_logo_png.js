import { Jimp, rgbaToInt } from 'jimp';

async function fixLogo() {
  try {
    const img = await Jimp.read('C:\\Users\\debia\\.gemini\\antigravity\\brain\\4b54a322-6448-4599-beeb-2c7d3a1f8c6a\\media__1775993583159.jpg');
    
    // Instead of naive threshold, let's make purely white or extremely near-white transparent.
    img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      // Only remove almost pure white (JPG artifacts included)
      if (red > 248 && green > 248 && blue > 248) {
        this.bitmap.data[idx + 3] = 0; // Alpha 0
      }
    });

    await img.write('C:\\Users\\debia\\Desktop\\Progetti\\metalfrigo\\public\\logo.png');
    console.log('Logo cleanly converted to PNG!');
  } catch (err) {
    console.error('Error:', err);
  }
}

fixLogo();
