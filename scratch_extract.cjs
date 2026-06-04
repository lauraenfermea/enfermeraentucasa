const fs = require('fs');
const cheerio = require('cheerio');

const files = [
  'C:\\Users\\Ashok Sharma\\.gemini\\antigravity-ide\\brain\\f007ce3f-86ad-48b2-8b5f-0d81e7a1d2e2\\.system_generated\\steps\\1193\\content.md',
  'C:\\Users\\Ashok Sharma\\.gemini\\antigravity-ide\\brain\\f007ce3f-86ad-48b2-8b5f-0d81e7a1d2e2\\.system_generated\\steps\\1194\\content.md',
  'C:\\Users\\Ashok Sharma\\.gemini\\antigravity-ide\\brain\\f007ce3f-86ad-48b2-8b5f-0d81e7a1d2e2\\.system_generated\\steps\\1209\\content.md',
  'C:\\Users\\Ashok Sharma\\.gemini\\antigravity-ide\\brain\\f007ce3f-86ad-48b2-8b5f-0d81e7a1d2e2\\.system_generated\\steps\\1210\\content.md'
];

const blogData = [];

files.forEach((file, index) => {
  if (fs.existsSync(file)) {
    const html = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(html);
    
    const titleMatch = html.match(/<meta property="og:title" content="([^"]+)"/);
    const title = titleMatch ? titleMatch[1] : 'Unknown Title';
    
    const descMatch = html.match(/<meta property="og:description" content="([^"]+)"/);
    const desc = descMatch ? descMatch[1] : '';
    
    const imageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
    const image = imageMatch ? imageMatch[1] : '';
    
    // In Wix blogs, the content is usually inside a component that renders the rich text.
    // Sometimes it's inside a JSON script tag or rendered as paragraphs.
    // Let's grab all paragraphs that are somewhat long.
    let content = [];
    $('p, h2, h3').each((i, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 20) {
         // basic filtering to avoid UI elements like "Log In", "Search"
         content.push(text);
      }
    });

    // If parsing fails because of heavy client-side rendering without SSR text, we can fallback to the og:description for the body.
    if (content.length === 0) {
       content = [desc];
    }
    
    // We'll generate a unique ID and slug for the router
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    blogData.push({
      id: index + 1,
      title,
      slug,
      description: desc,
      image,
      content
    });
  }
});

fs.writeFileSync('d:\\New folder\\Laura\'s clinic\\src\\data\\blogPosts.json', JSON.stringify(blogData, null, 2));
console.log('Saved to src/data/blogPosts.json');
