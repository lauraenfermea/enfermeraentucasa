import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'site-content.json')

export async function GET() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8')
    return NextResponse.json(JSON.parse(raw))
  } catch {
    return NextResponse.json({ error: 'Could not read data' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    // Simple password check via header
    const authHeader = request.headers.get('x-admin-password')
    const adminPassword = process.env.ADMIN_PASSWORD || 'enfermera2024'
    if (authHeader !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    fs.writeFileSync(DATA_FILE, JSON.stringify(body, null, 2), 'utf-8')
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Could not save data' }, { status: 500 })
  }
}
