import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '../sanity/image';

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure style={{ margin: '2.5rem 0', textAlign: 'center' }}>
          <img
            src={urlFor(value).width(900).url()}
            alt={value.alt || ''}
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '12px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            }}
          />
          {value.caption && (
            <figcaption style={{
              marginTop: '0.75rem',
              color: '#6b7a7c',
              fontSize: '0.9rem',
              fontStyle: 'italic',
            }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },

  block: {
    h1: ({ children }) => (
      <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '2rem 0 1rem', color: '#2c3e40', lineHeight: 1.2 }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ fontSize: '2rem', fontWeight: '700', margin: '2rem 0 1rem', color: '#2c3e40', lineHeight: 1.3 }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '1.75rem 0 0.75rem', color: '#2c3e40', lineHeight: 1.4 }}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 style={{ fontSize: '1.25rem', fontWeight: '600', margin: '1.5rem 0 0.5rem', color: '#2c3e40' }}>
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p style={{ marginBottom: '1.25rem', lineHeight: 1.8, color: '#3d4f51', fontSize: '1.05rem' }}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote style={{
        borderLeft: '4px solid var(--primary)',
        paddingLeft: '1.5rem',
        margin: '2rem 0',
        color: '#4a5f62',
        fontStyle: 'italic',
        fontSize: '1.1rem',
        lineHeight: 1.7,
        backgroundColor: 'rgba(92,121,123,0.06)',
        borderRadius: '0 8px 8px 0',
        padding: '1rem 1.5rem',
      }}>
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <pre style={{
        backgroundColor: '#1e2a2b',
        color: '#e2e8f0',
        padding: '1.5rem',
        borderRadius: '10px',
        overflowX: 'auto',
        margin: '1.5rem 0',
        fontSize: '0.9rem',
        lineHeight: 1.6,
        fontFamily: 'monospace',
      }}>
        <code>{children}</code>
      </pre>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.25rem', lineHeight: 1.8, color: '#3d4f51' }}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.25rem', lineHeight: 1.8, color: '#3d4f51' }}>
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li style={{ marginBottom: '0.4rem', fontSize: '1.05rem' }}>{children}</li>
    ),
    number: ({ children }) => (
      <li style={{ marginBottom: '0.4rem', fontSize: '1.05rem' }}>{children}</li>
    ),
  },

  marks: {
    strong: ({ children }) => <strong style={{ fontWeight: '700' }}>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <span style={{ textDecoration: 'underline' }}>{children}</span>,
    'strike-through': ({ children }) => <span style={{ textDecoration: 'line-through' }}>{children}</span>,
    code: ({ children }) => (
      <code style={{
        fontFamily: 'monospace',
        backgroundColor: 'rgba(92,121,123,0.12)',
        padding: '0.15em 0.4em',
        borderRadius: '4px',
        fontSize: '0.9em',
        color: '#2c3e40',
      }}>
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : '_self'}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: '500' }}
      >
        {children}
      </a>
    ),
    textColor: ({ value, children }) => (
      <span style={{ color: value?.hex || 'inherit' }}>{children}</span>
    ),
    highlightColor: ({ value, children }) => (
      <span style={{ backgroundColor: value?.hex || 'transparent', padding: '0.1em 0.3em', borderRadius: '3px' }}>
        {children}
      </span>
    ),
  },
};

export default function PortableTextRenderer({ content }) {
  if (!content) return null;
  return (
    <div className="portable-text-body">
      <PortableText value={content} components={portableTextComponents} />
    </div>
  );
}
