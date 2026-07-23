const fs = require('fs');
const path = require('path');
const PNG = require('pngjs').PNG;

const imagesDir = path.join(__dirname, '..', 'public', 'images');

// 1. Process Lacoste (logo3.png)
function processLacoste() {
  const filePath = path.join(imagesDir, 'logo3.png');
  fs.createReadStream(filePath)
    .pipe(new PNG({ filterType: 4 }))
    .on('parsed', function() {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const idx = (this.width * y + x) << 2;
          const r = this.data[idx];
          const g = this.data[idx + 1];
          const b = this.data[idx + 2];
          const a = this.data[idx + 3];

          if (a < 10) continue; // already transparent

          // Check if white / near-white background (light gray/white)
          if (r > 180 && g > 180 && b > 180) {
            this.data[idx + 3] = 0; // Make background transparent
          } 
          // Check if green (crocodile)
          else if (g > r + 15 && g > b + 15) {
            // Keep green crocodile untouched!
          } 
          // Check if red (mouth/tongue)
          else if (r > g + 30 && r > b + 30) {
            // Keep red mouth untouched!
          }
          // Dark/Black text ("LACOSTE")
          else if (r < 140 && g < 140 && b < 140) {
            this.data[idx] = 255;
            this.data[idx + 1] = 255;
            this.data[idx + 2] = 255;
            this.data[idx + 3] = 255; // Turn black text into pure WHITE
          }
        }
      }
      this.pack().pipe(fs.createWriteStream(path.join(imagesDir, 'logo3-clean.png')))
        .on('finish', () => console.log('logo3-clean.png saved successfully!'));
    });
}

// 2. Process Deal Jeans (logo9.png) & Smarr Realty (logo2.png)
function processWhiteBgLogo(filename, outname) {
  const filePath = path.join(imagesDir, filename);
  fs.createReadStream(filePath)
    .pipe(new PNG({ filterType: 4 }))
    .on('parsed', function() {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const idx = (this.width * y + x) << 2;
          const r = this.data[idx];
          const g = this.data[idx + 1];
          const b = this.data[idx + 2];
          const a = this.data[idx + 3];

          if (a < 10) continue;

          // Background (white / light grey)
          if (r > 170 && g > 170 && b > 170) {
            this.data[idx + 3] = 0; // Transparent
          } else {
            // Dark artwork / text -> turn white
            this.data[idx] = 255;
            this.data[idx + 1] = 255;
            this.data[idx + 2] = 255;
            this.data[idx + 3] = 255;
          }
        }
      }
      this.pack().pipe(fs.createWriteStream(path.join(imagesDir, outname)))
        .on('finish', () => console.log(outname + ' saved successfully!'));
    });
}

processLacoste();
processWhiteBgLogo('logo9.png', 'logo9-clean.png');
processWhiteBgLogo('logo2.png', 'logo2-clean.png');
