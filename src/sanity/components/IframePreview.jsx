import React from 'react'

export default function IframePreview({ document }) {
  const { displayed } = document
  
  if (!displayed) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h3>Cargando vista previa...</h3>
      </div>
    )
  }

  // Determine the URL based on the document slug and environment
  const slug = displayed.slug?.current
  const id = displayed._id
  const type = displayed._type

  // Use local port 3000 if running locally
  const baseUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : typeof window !== 'undefined' ? window.location.origin : ''

  let path = '/'
  if (type === 'page') {
    path = slug === 'home' ? '/' : `/${slug}`
  } else if (type === 'post') {
    path = `/blog/${slug}`
  } else if (type === 'settings') {
    path = '/'
  }

  const url = `${baseUrl}${path}`

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding: '0.5rem 1rem',
        background: '#1a1f2c',
        color: '#fff',
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #2d3748',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <span>
          <strong>Vista previa:</strong> <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#63b3ed', textDecoration: 'none' }}>{url}</a>
        </span>
        <button 
          onClick={() => {
            const iframe = window.document.getElementById('sanity-iframe-preview')
            if (iframe) iframe.src = iframe.src
          }}
          style={{
            background: '#2d3748',
            color: '#fff',
            border: 'none',
            padding: '4px 10px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.75rem'
          }}
        >
          Actualizar
        </button>
      </div>
      <iframe
        id="sanity-iframe-preview"
        src={url}
        style={{ width: '100%', height: '100%', border: 'none', background: 'white' }}
        title="Live Preview"
      />
    </div>
  )
}
