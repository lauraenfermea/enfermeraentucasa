const fs = require('fs');

const json = fs.readFileSync('d:\\New folder\\Laura\'s clinic\\src\\data\\blogPosts.json', 'utf8');

const jsContent = `export const blogPosts = ${json};`;

fs.writeFileSync('d:\\New folder\\Laura\'s clinic\\src\\data\\blogPosts.js', jsContent, 'utf8');

console.log('Fixed encoding!');
