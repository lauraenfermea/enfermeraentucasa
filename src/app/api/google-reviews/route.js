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

export async function POST(request) {
  try {
    const body = await request.json();
    const { apiKey, placeId } = body;

    const content = readSiteContent() || {};
    const settings = content.settings || {};

    const activeApiKey = apiKey || settings.googleApiKey;
    const activePlaceId = placeId || settings.googlePlaceId;

    if (!activeApiKey || !activePlaceId) {
      return NextResponse.json(
        { error: 'Debes proporcionar la Clave API de Google (Google Maps API Key) y el ID de Lugar (Place ID).' },
        { status: 400 }
      );
    }

    // Save updated credentials to site-content.json
    content.settings = {
      ...settings,
      googleApiKey: activeApiKey,
      googlePlaceId: activePlaceId,
    };

    // Fetch live Google Place details & reviews
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      activePlaceId
    )}&fields=name,rating,reviews,user_ratings_total,url&key=${encodeURIComponent(activeApiKey)}&language=es`;

    const res = await fetch(url);
    const googleData = await res.json();

    if (googleData.status !== 'OK' || !googleData.result) {
      return NextResponse.json(
        {
          error: `Google API Error: ${googleData.error_message || googleData.status || 'No se pudieron obtener las reseñas'}. Comprueba que la API Key y el Place ID son correctos.`,
        },
        { status: 400 }
      );
    }

    const rawReviews = googleData.result.reviews || [];
    if (rawReviews.length === 0) {
      return NextResponse.json({
        message: 'No se encontraron reseñas en la cuenta de Google Place proporcionada.',
        count: 0,
      });
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

    // Merge Google reviews with existing ones (avoid duplicate text)
    const existingReviews = content.reviews || [];
    const existingTexts = new Set(existingReviews.map((rev) => rev.text));

    const freshReviews = gmbReviews.filter((gr) => !existingTexts.has(gr.text));
    content.reviews = [...freshReviews, ...existingReviews];

    writeSiteContent(content);

    return NextResponse.json({
      success: true,
      count: freshReviews.length,
      totalReviews: content.reviews.length,
      placeName: googleData.result.name,
      overallRating: googleData.result.rating,
      message: `¡Se han importado ${freshReviews.length} nuevas reseñas reales desde Google Business Profile!`,
      reviews: content.reviews,
    });
  } catch (error) {
    console.error('Error fetching Google GMB reviews:', error);
    return NextResponse.json({ error: 'Error de servidor al sincronizar reseñas de Google' }, { status: 500 });
  }
}
