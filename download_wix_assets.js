const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const data = JSON.parse(fs.readFileSync('wix_data.json', 'utf8'));
const outDir = path.join(__dirname, 'public', 'assets', 'wix');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const images = data.images.filter(img => img.src && img.src.startsWith('http'));

// Remove duplicates
const uniqueUrls = [...new Set(images.map(img => img.src))];

console.log(`Found ${uniqueUrls.length} unique images to download.`);

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

(async () => {
  for (let i = 0; i < uniqueUrls.length; i++) {
    const url = uniqueUrls[i];
    const filename = `wix_img_${i}_` + path.basename(new URL(url).pathname).split('~')[0]; // Simplify filename
    const dest = path.join(outDir, filename);
    
    console.log(`Downloading ${i+1}/${uniqueUrls.length}: ${filename}`);
    try {
      await download(url, dest);
    } catch (e) {
      console.error(`Failed to download ${url}:`, e);
    }
  }
  console.log('All downloads complete.');
})();
