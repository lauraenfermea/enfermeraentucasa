import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from './env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})

export function getClient(preview = false) {
  if (preview) {
    return createClient({
      apiVersion,
      dataset,
      projectId,
      useCdn: false,
      token: process.env.SANITY_API_READ_TOKEN || undefined,
      perspective: process.env.SANITY_API_READ_TOKEN ? 'previewDrafts' : 'published',
      stega: {
        enabled: true,
        studioUrl: '/studio',
      }
    })
  }
  return client
}

