import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const LOCAL_DATA_FILE = path.join(process.cwd(), 'data', 'site-content.json');
const TMP_DATA_FILE = path.join('/tmp', 'site-content.json');

// Global memory cache across server requests
if (!global.cachedSiteContent) {
  global.cachedSiteContent = null;
}

function loadContent() {
  if (global.cachedSiteContent) {
    return global.cachedSiteContent;
  }
  try {
    if (fs.existsSync(TMP_DATA_FILE)) {
      const raw = fs.readFileSync(TMP_DATA_FILE, 'utf-8');
      global.cachedSiteContent = JSON.parse(raw);
      return global.cachedSiteContent;
    }
  } catch (err) {
    console.warn('Could not read from /tmp data file:', err);
  }

  try {
    if (fs.existsSync(LOCAL_DATA_FILE)) {
      const raw = fs.readFileSync(LOCAL_DATA_FILE, 'utf-8');
      global.cachedSiteContent = JSON.parse(raw);
      return global.cachedSiteContent;
    }
  } catch (err) {
    console.warn('Could not read from local data file:', err);
  }

  return null;
}

export async function GET() {
  try {
    const data = loadContent();
    if (!data) {
      return NextResponse.json({ error: 'Could not read data' }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET site-content:', error);
    return NextResponse.json({ error: 'Could not read data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get('x-admin-password');
    const adminPassword = process.env.ADMIN_PASSWORD || 'enfermera2024';
    if (authHeader !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Update global in-memory cache
    global.cachedSiteContent = body;

    let savedToFile = false;

    // Try writing to project directory (works in local dev)
    try {
      const dir = path.dirname(LOCAL_DATA_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(body, null, 2), 'utf-8');
      savedToFile = true;
    } catch (localErr) {
      console.warn('Local file write failed (expected in read-only production):', localErr.message);
    }

    // Try writing to /tmp directory (works in serverless Vercel)
    try {
      fs.writeFileSync(TMP_DATA_FILE, JSON.stringify(body, null, 2), 'utf-8');
      savedToFile = true;
    } catch (tmpErr) {
      console.warn('/tmp file write failed:', tmpErr.message);
    }

    return NextResponse.json({
      success: true,
      message: '¡Datos guardados con éxito!',
      savedToFile,
    });
  } catch (error) {
    console.error('Error in POST site-content:', error);
    return NextResponse.json({ error: 'Error interno al guardar datos' }, { status: 500 });
  }
}
