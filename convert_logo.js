import { Jimp } from 'jimp';

async function processImage() {
  try {
    const image = await Jimp.read('C:\\Users\\debia\\.gemini\\antigravity\\brain\\4b54a322-6448-4599-beeb-2c7d3a1f8c6a\\media__1775993583159.jpg');
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      // Convert white/light pixels to transparent
      if (red > 210 && green > 210 && blue > 210) {
        this.bitmap.data[idx + 3] = 0;
      }
    });
    await image.write('C:\\Users\\debia\\Desktop\\Progetti\\metalfrigo\\public\\logo.png');
    console.log('Logo converted successfully to transparent PNG');
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

processImage();
