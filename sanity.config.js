import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { colorInput } from '@sanity/color-input'
import { schema } from './src/sanity/schemas'
import IframePreview from './src/sanity/components/IframePreview'

const singletonTypes = new Set(['settings'])

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'b15b2cdz',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: '🏥 Enfermera en Tu Casa — Admin',

  plugins: [
    colorInput(),
    structureTool({
      title: 'Panel de Control',
      structure: (S) =>
        S.list()
          .title('🏥 Panel de Control')
          .items([
            // ─── PÁGINA PRINCIPAL ─────────────────────────────
            S.listItem()
              .title('🌐 Página Principal')
              .id('homepage')
              .child(
                S.documentList()
                  .title('Página de Inicio')
                  .filter('_type == "page" && slug.current == "home"')
                  .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
              ),

            S.divider(),

            // ─── CONFIGURACIÓN GLOBAL ─────────────────────────
            S.listItem()
              .title('⚙️ Configuración Global')
              .id('settings')
              .child(
                S.document()
                  .schemaType('settings')
                  .documentId('settings')
                  .title('⚙️ Configuración Global')
                  .views([
                    S.view.form().title('✏️ Editar'),
                    S.view.component(IframePreview).title('👁️ Vista Previa')
                  ])
              ),

            S.divider(),

            // ─── BLOG ─────────────────────────────────────────
            S.listItem()
              .title('📰 Blog')
              .id('blog')
              .child(
                S.documentList()
                  .title('📰 Entradas del Blog')
                  .filter('_type == "post"')
                  .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              ),

            S.divider(),

            // ─── TODAS LAS PÁGINAS ─────────────────────────────
            S.listItem()
              .title('📄 Todas las Páginas')
              .id('all-pages')
              .child(
                S.documentList()
                  .title('Páginas')
                  .filter('_type == "page"')
              ),
          ]),

      defaultDocumentNode: (S, { schemaType }) => {
        if (['page', 'post'].includes(schemaType)) {
          return S.document().views([
            S.view.form().title('✏️ Editar'),
            S.view.component(IframePreview).title('👁️ Vista Previa en Vivo')
          ])
        }
        return S.document().views([
          S.view.form().title('✏️ Editar'),
        ])
      }
    }),

    presentationTool({
      title: '👁️ Vista Previa',
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
    templates: (prev) =>
      prev.filter((template) => !singletonTypes.has(template.schemaId)),
  },

  document: {
    actions: (prev, { schemaType }) => {
      if (singletonTypes.has(schemaType)) {
        return prev.filter(({ action }) => action === 'publish' || action === 'update')
      }
      return prev
    },
  },
})
