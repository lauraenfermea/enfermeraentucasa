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
  } catch (error) {
    console.error('Error reading site content:', error);
    return null;
  }
}

function writeSiteContent(data) {
  try {
    const filePath = getSiteContentPath();
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing site content:', error);
    return false;
  }
}

// Internal worker to sync reviews given apiKey and placeId
async function syncGoogleReviews(apiKey, placeId) {
  const content = readSiteContent() || {};
  const settings = content.settings || {};

  const activeApiKey = apiKey || settings.googleApiKey;
  const activePlaceId = placeId || settings.googlePlaceId;

  if (!activeApiKey || !activePlaceId) {
    return { error: 'Debes configurar tu API Key y Place ID de Google en el Panel de Admin (/admin).' };
  }

  // Save updated credentials if provided
  content.settings = {
    ...settings,
    googleApiKey: activeApiKey,
    googlePlaceId: activePlaceId,
  };

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
    activePlaceId
  )}&fields=name,rating,reviews,user_ratings_total,url&key=${encodeURIComponent(activeApiKey)}&language=es`;

  const res = await fetch(url);
  const googleData = await res.json();

  if (googleData.status !== 'OK' || !googleData.result) {
    return {
      error: `Google API Error: ${googleData.error_message || googleData.status || 'No se pudieron obtener las reseñas'}.`,
    };
  }

  const rawReviews = googleData.result.reviews || [];
  if (rawReviews.length === 0) {
    return { message: 'No se encontraron reseñas nuevas.', count: 0 };
  }

  const gmbReviews = rawReviews.map((r, idx) => ({
    id: `gmb_${Date.now()}_${idx}`,
    name: r.author_name || 'Cliente Google',
    initial: r.author_name ? r.author_name.charAt(0).toUpperCase() : 'G',
    avatarBg: '#4285F4',
    rating: r.rating || 5,
    date: r.relative_time_description || 'hace poco',
    text: r.text || '',
    profilePhoto: r.profile_photo_url || null,
    source: 'Google Business Profile',
  }));

  const existingReviews = content.reviews || [];
  const existingTexts = new Set(existingReviews.map((rev) => rev.text));

  const freshReviews = gmbReviews.filter((gr) => gr.text && !existingTexts.has(gr.text));
  content.reviews = [...freshReviews, ...existingReviews];

  writeSiteContent(content);

  return {
    success: true,
    count: freshReviews.length,
    totalReviews: content.reviews.length,
    placeName: googleData.result.name,
    overallRating: googleData.result.rating,
    message: `¡Se han sincronizado ${freshReviews.length} nuevas reseñas desde Google Business Profile!`,
    reviews: content.reviews,
  };
}

// 1. Manual Sync (from Admin Dashboard button)
export async function POST(request) {
  try {
    const body = await request.json();
    const { apiKey, placeId } = body;
    const result = await syncGoogleReviews(apiKey, placeId);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in POST /api/google-reviews:', error);
    return NextResponse.json({ error: 'Error al sincronizar reseñas' }, { status: 500 });
  }
}

// 2. Automated Natural Background Sync (Triggered by Vercel Cron or Periodic GET)
export async function GET() {
  try {
    const result = await syncGoogleReviews();
    if (result.error) {
      return NextResponse.json({ status: 'warning', message: result.error });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in GET /api/google-reviews:', error);
    return NextResponse.json({ error: 'Error en auto-sincronización' }, { status: 500 });
  }
}
