const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Set viewport to desktop
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log("Navigating to the Wix site...");
  try {
    await page.goto('https://enfermeraentucasa.wixsite.com/enfermera-en-tu-casa', { waitUntil: 'domcontentloaded', timeout: 30000 });
  } catch (e) {
    console.log("Navigation timeout reached, continuing anyway...");
  }
  
  // Wait a bit for initial JS to run
  await new Promise(r => setTimeout(r, 5000));
  // Scroll down to load lazy images
  console.log("Scrolling to load lazy elements...");
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      let distance = 300;
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
  
  // Wait a bit more for final renders
  await new Promise(r => setTimeout(r, 2000));
  
  console.log("Extracting elements...");
  const data = await page.evaluate(() => {
    const images = [];
    const elements = document.querySelectorAll('img, [style*="background-image"]');
    
    elements.forEach(el => {
      if (el.tagName === 'IMG') {
        images.push({ type: 'img', src: el.src, alt: el.alt, width: el.width, height: el.height, rect: el.getBoundingClientRect().toJSON() });
      } else {
        const style = window.getComputedStyle(el);
        if (style.backgroundImage && style.backgroundImage !== 'none') {
          images.push({ type: 'bg', src: style.backgroundImage, rect: el.getBoundingClientRect().toJSON() });
        }
      }
    });
    
    // Also grab text content to identify sections
    const textNodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while(node = walker.nextNode()) {
      if(node.nodeValue.trim().length > 5) {
        textNodes.push({ text: node.nodeValue.trim(), parentTag: node.parentElement.tagName, rect: node.parentElement.getBoundingClientRect().toJSON() });
      }
    }
    
    return { images, textNodes };
  });

  fs.writeFileSync('wix_data.json', JSON.stringify(data, null, 2));
  console.log("Data saved to wix_data.json");
  await browser.close();
})();
