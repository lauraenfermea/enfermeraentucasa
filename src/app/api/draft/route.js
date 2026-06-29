import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug') || '/'

  // Enable preview mode automatically on localhost, or check secret on production
  const host = request.headers.get('host') || ''
  const isLocal = host.includes('localhost') || host.includes('127.0.0.1')

  if (!isLocal && secret !== 'preview') {
    return new Response('Invalid secret token', { status: 401 })
  }

  // Enable Draft Mode in Next.js
  const draft = await draftMode()
  draft.enable()

  // Redirect to the target slug/page
  redirect(slug)
}
