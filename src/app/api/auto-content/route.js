import { NextResponse } from 'next/server';

// High quality curated medical & home nursing Unsplash images dictionary
const MEDICAL_IMAGES = {
  default: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
  enfermera: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
  auxilios: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
  emergencias: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
  mayores: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80",
  curas: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
  inyectables: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=1200&q=80",
  analiticas: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
  salud: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
  zaragoza: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { action, text, title, topic } = body;

    // 1. Auto-Fetch Medical Image
    if (action === 'auto-fetch-image') {
      const searchKey = ((title || topic || '') + ' ' + (text || '')).toLowerCase();
      let selectedUrl = MEDICAL_IMAGES.default;

      if (searchKey.includes('auxilio') || searchKey.includes('emergenc')) selectedUrl = MEDICAL_IMAGES.auxilios;
      else if (searchKey.includes('mayor') || searchKey.includes('ancian')) selectedUrl = MEDICAL_IMAGES.mayores;
      else if (searchKey.includes('cura') || searchKey.includes('herida')) selectedUrl = MEDICAL_IMAGES.curas;
      else if (searchKey.includes('inyect') || searchKey.includes('medicac')) selectedUrl = MEDICAL_IMAGES.inyectables;
      else if (searchKey.includes('analitic') || searchKey.includes('sangre')) selectedUrl = MEDICAL_IMAGES.analiticas;
      else if (searchKey.includes('enfermer')) selectedUrl = MEDICAL_IMAGES.enfermera;

      return NextResponse.json({ url: selectedUrl });
    }

    // 2. Auto-Format raw text into clean structured JSON content blocks
    if (action === 'auto-format-text') {
      if (!text || typeof text !== 'string') {
        return NextResponse.json({ error: 'No text provided' }, { status: 400 });
      }

      const rawLines = text.split('\n').map((l) => l.trim()).filter(Boolean);
      const blocks = [];

      for (let line of rawLines) {
        // H2 header
        if (line.startsWith('## ') || line.startsWith('H2: ') || line.endsWith(':') && line.length < 60) {
          blocks.push({
            type: 'heading2',
            text: line.replace(/^(##|H2:)\s*/, '').replace(/:$/, '').trim(),
            align: 'left',
          });
        } 
        // H3 header
        else if (line.startsWith('### ') || line.startsWith('H3: ')) {
          blocks.push({
            type: 'heading3',
            text: line.replace(/^(###|H3:)\s*/, '').trim(),
            align: 'left',
          });
        }
        // Quote block
        else if (line.startsWith('> ') || line.startsWith('Cita: ')) {
          blocks.push({
            type: 'quote',
            text: line.replace(/^(>|Cita:)\s*/, '').trim(),
            bgColor: '#EFF6FF',
            borderColor: '#2563EB',
            textColor: '#1E40AF',
          });
        }
        // CTA button
        else if (line.startsWith('CTA: ') || line.includes('https://wa.me')) {
          blocks.push({
            type: 'cta',
            text: 'Solicitar Atención por WhatsApp',
            url: 'https://wa.me/34641635705',
            bgColor: '#10B981',
            textColor: '#FFFFFF',
            align: 'center',
          });
        }
        // Normal paragraph
        else {
          blocks.push({
            type: 'paragraph',
            text: line,
            align: 'left',
          });
        }
      }

      return NextResponse.json({ blocks });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Error en auto-fetch' }, { status: 500 });
  }
}
