const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'b15b2cdz',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
});

async function main() {
  const data = await client.fetch('*[_type == "page" && slug.current == "home"][0]{_id, title, pageBuilder}');
  if (!data) {
    console.log('NO HOME PAGE FOUND IN SANITY');
    return;
  }
  console.log('PAGE ID:', data._id);
  const blocks = data.pageBuilder || [];
  blocks.forEach((b, i) => {
    console.log(`\nBlock ${i}: _type = ${b._type}`);
    if (b._type === 'services') {
      const list = (b.servicesList || []).map(s => s.title);
      console.log('  Services:', JSON.stringify(list, null, 2));
    }
    if (b._type === 'rates') {
      const list = (b.ratesList || []).map(r => r.title);
      console.log('  Rates:', JSON.stringify(list, null, 2));
    }
  });
}

main().catch(console.error);
