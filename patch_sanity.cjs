const { createClient } = require('@sanity/client');

// IMPORTANT: We need a write token. Using the project's write token.
const client = createClient({
  projectId: 'b15b2cdz',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // set this env var, or hardcode temporarily
});

async function main() {
  // 1. Fetch current page
  const data = await client.fetch('*[_type == "page" && slug.current == "home"][0]{_id, pageBuilder}');
  if (!data) {
    console.log('NO HOME PAGE FOUND');
    return;
  }
  console.log('Found page:', data._id);

  const blocks = data.pageBuilder || [];

  // 2. Fix Services block — add "Servicio de cuidadoras a domicilio" if missing
  const servicesBlockIdx = blocks.findIndex(b => b._type === 'services');
  if (servicesBlockIdx !== -1) {
    const servicesList = blocks[servicesBlockIdx].servicesList || [];
    const hasCuidadoras = servicesList.some(s =>
      s.title && s.title.toLowerCase().includes('cuidadora')
    );
    console.log('Has cuidadoras service:', hasCuidadoras);
    if (!hasCuidadoras) {
      // Insert after Extracciones (index 6 in current list) before Control de Constantes
      const insertAfterIdx = servicesList.findIndex(s =>
        s.title && (s.title.toLowerCase().includes('analítica') || s.title.toLowerCase().includes('extracci'))
      );
      const insertAt = insertAfterIdx >= 0 ? insertAfterIdx + 1 : servicesList.length;

      servicesList.splice(insertAt, 0, {
        _type: 'object',
        _key: 'cuidadoras-service-' + Date.now(),
        title: 'Servicio de cuidadoras a domicilio',
        desc: 'Acompañamiento y cuidados a domicilio para personas que necesitan apoyo en su día a día. Contamos con cuidadoras para ayudar en las actividades diarias y ofrecer compañía y atención en el hogar, de forma puntual o continuada.',
      });
      blocks[servicesBlockIdx].servicesList = servicesList;
      console.log('Added cuidadoras to services block at index', insertAt);
    }
  }

  // 3. Fix Rates block — add "Servicio de cuidadoras a domicilio" if missing
  const ratesBlockIdx = blocks.findIndex(b => b._type === 'rates');
  if (ratesBlockIdx !== -1) {
    const ratesList = blocks[ratesBlockIdx].ratesList || [];
    const hasCuidadorasRate = ratesList.some(r =>
      r.title && r.title.toLowerCase().includes('cuidadora')
    );
    console.log('Has cuidadoras rate:', hasCuidadorasRate);
    if (!hasCuidadorasRate) {
      // Insert after the analíticas rate
      const insertAfterIdx = ratesList.findIndex(r =>
        r.title && (r.title.toLowerCase().includes('analítica') || r.title.toLowerCase().includes('analitic'))
      );
      const insertAt = insertAfterIdx >= 0 ? insertAfterIdx + 1 : ratesList.length;

      ratesList.splice(insertAt, 0, {
        _type: 'object',
        _key: 'cuidadoras-rate-' + Date.now(),
        title: 'Servicio de cuidadoras a domicilio',
        price: 'Desde 12 €/h',
        desc: 'Acompañamiento y cuidados a domicilio para personas que necesitan apoyo en su día a día (mínimo 2h).',
        features: [
          'Apoyo en actividades diarias',
          'Compañía y atención en el hogar',
          'Atención puntual o continuada',
          'Mínimo 2 horas por servicio'
        ],
        recommended: false
      });
      blocks[ratesBlockIdx].ratesList = ratesList;
      console.log('Added cuidadoras to rates block at index', insertAt);
    }
  }

  // 4. Patch the document
  const result = await client
    .patch(data._id)
    .set({ pageBuilder: blocks })
    .commit({ autoGenerateArrayKeys: true });

  console.log('\n✅ Patched document:', result._id);
  console.log('Updated services:', blocks[servicesBlockIdx]?.servicesList?.map(s => s.title));
  console.log('Updated rates:', blocks[ratesBlockIdx]?.ratesList?.map(r => r.title));
}

main().catch(e => {
  console.error('Error:', e.message);
  if (e.statusCode === 403) {
    console.log('\n⚠️  Write token required. Set SANITY_API_TOKEN env var with a write token.');
    console.log('Get it from: https://www.sanity.io/manage/personal/project/b15b2cdz/api');
  }
});
