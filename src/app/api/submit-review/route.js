import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getSiteContentPath() {
  return path.join(process.cwd(), 'data', 'site-content.json');
}

function readSiteContent() {
  try {
    const filePath = getSiteContentPath();
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

function writeSiteContent(data) {
  try {
    const filePath = getSiteContentPath();
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch {
    return false;
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, rating, text } = body;

    if (!name || !text) {
      return NextResponse.json({ error: 'Nombre y opinión son obligatorios' }, { status: 400 });
    }

    const content = readSiteContent() || {};
    const reviews = content.reviews || [];

    const colors = ['#10B981', '#2563EB', '#8B5CF6', '#EC4899', '#F59E0B'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newReview = {
      id: `rev_user_${Date.now()}`,
      name: name.trim(),
      initial: name.trim().charAt(0).toUpperCase(),
      avatarBg: randomColor,
      rating: parseInt(rating, 10) || 5,
      date: 'hace un momento',
      text: text.trim(),
      source: 'Sitio Web',
    };

    content.reviews = [newReview, ...reviews];
    writeSiteContent(content);

    return NextResponse.json({
      success: true,
      message: '¡Gracias por tu reseña! Ha sido publicada correctamente en la web.',
      review: newReview,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Error al enviar la reseña' }, { status: 500 });
  }
}
