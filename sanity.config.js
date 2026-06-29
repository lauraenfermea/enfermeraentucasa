import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { schema } from './src/sanity/schemas'
import IframePreview from './src/sanity/components/IframePreview'

// Define the singleton types
const singletonTypes = new Set(['settings'])

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'b15b2cdz',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  title: 'Laura Clinic Studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton Settings
            S.listItem()
              .title('Global Settings')
              .id('settings')
              .child(
                S.document()
                  .schemaType('settings')
                  .documentId('settings')
                  .views([
                    S.view.form(),
                    S.view.component(IframePreview).title('Live Preview')
                  ])
              ),
            S.divider(),
            // Regular document types (like pages)
            ...S.documentTypeListItems().filter(
              (item) => !singletonTypes.has(item.getId())
            ),
          ]),
      defaultDocumentNode: (S, { schemaType }) => {
        if (['page', 'post'].includes(schemaType)) {
          return S.document().views([
            S.view.form(),
            S.view.component(IframePreview).title('Live Preview')
          ])
        }
        return S.document()
      }
    }),
    presentationTool({
      previewUrl: {
        origin: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft?secret=preview',
        },
      },
    }),
  ],

  schema: {
    types: schema.types,
    // Filter out singleton types from new document list
    templates: (prev) =>
      prev.filter((template) => !singletonTypes.has(template.schemaId)),
  },

  document: {
    // For singleton documents, prevent creation/deletion
    actions: (prev, { schemaType }) => {
      if (singletonTypes.has(schemaType)) {
        return prev.filter(({ action }) => action === 'publish' || action === 'update')
      }
      return prev
    },
  },
})
