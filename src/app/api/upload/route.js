import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const sanitizeFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}_${sanitizeFilename}`;

    // Try saving locally to /public/uploads (works in local dev)
    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const filePath = path.join(uploadsDir, filename);
      fs.writeFileSync(filePath, buffer);
      return NextResponse.json({ success: true, url: `/uploads/${filename}` });
    } catch (fsErr) {
      console.warn('Local disk upload failed (read-only production), converting to base64 Data URI:', fsErr.message);
    }

    // Fallback for Vercel read-only filesystem: Base64 Data URI
    const mimeType = file.type || 'image/png';
    const base64Str = buffer.toString('base64');
    const dataUri = `data:${mimeType};base64,${base64Str}`;

    return NextResponse.json({ success: true, url: dataUri });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
