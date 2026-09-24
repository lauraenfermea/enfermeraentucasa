"use client";
import React from 'react';

// Render markdown style [Text](url) hyperlinks
function renderTextWithLinks(text) {
  if (!text) return null;
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const label = match[1];
    const url = match[2];
    parts.push(
      <a
        key={match.index}
        href={url}
        target={url.startsWith('http') ? '_blank' : '_self'}
        rel="noopener noreferrer"
        style={{
          color: '#2563EB',
          fontWeight: '600',
          textDecoration: 'underline',
          textUnderlineOffset: '4px',
          transition: 'color 0.2s ease',
        }}
      >
        {label}
      </a>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

// Smart auto-parser for unformatted blocks/text with inline colons or lists
function SmartParagraph({ text, style }) {
  if (!text) return null;

  // Check if text contains inline list items concatenated with dashes e.g. ":-Caídas-Heridas-Quemaduras"
  if (text.includes(':-') || (text.includes(':') && text.includes('-') && text.length > 30)) {
    const parts = text.split(/:\s*-|\s*:-/);
    if (parts.length > 1) {
      const headerPart = parts[0];
      const listItems = parts[1].split('-').map(s => s.trim()).filter(Boolean);

      return (
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ ...style, fontWeight: '700', color: '#0F172A', marginBottom: '0.8rem' }}>
            {renderTextWithLinks(headerPart)}:
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '0.75rem',
            backgroundColor: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: '14px',
            padding: '1.25rem 1.5rem',
            margin: '1rem 0 1.5rem',
          }}>
            {listItems.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#166534', fontWeight: '600', fontSize: '1.02rem' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#DCFCE7',
                  color: '#15803D',
                  fontSize: '0.85rem',
                  fontWeight: '800',
                  flexShrink: 0
                }}>✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  // Check if text is a bullet list starting with - or •
  if (text.startsWith('- ') || text.startsWith('• ')) {
    const items = text.split('\n').filter(Boolean);
    return (
      <ul style={{
        margin: '1.2rem 0 1.8rem 1rem',
        paddingLeft: '1rem',
        listStyleType: 'disc',
        color: '#0F172A',
        lineHeight: 1.8,
        fontSize: '1.1rem'
      }}>
        {items.map((item, idx) => (
          <li key={idx} style={{ marginBottom: '0.5rem', color: '#334155' }}>
            {renderTextWithLinks(item.replace(/^[-•]\s*/, ''))}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p style={style}>
      {renderTextWithLinks(text)}
    </p>
  );
}

export default function SmartContentRenderer({ blocks, fallbackContent }) {
  const paragraphStyle = {
    marginBottom: '1.6rem',
    lineHeight: '1.85',
    color: '#334155',
    fontSize: '1.125rem',
    letterSpacing: '-0.01em',
  };

  if (Array.isArray(blocks) && blocks.length > 0) {
    return (
      <div className="smart-content-body">
        {blocks.map((block, i) => {
          if (block.type === 'heading2') {
            return (
              <div key={i} style={{ marginTop: i === 0 ? '0' : '3rem', marginBottom: '1.25rem' }}>
                <h2 style={{
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)',
                  fontWeight: '800',
                  color: block.color || '#0F172A',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.3,
                  borderLeft: '5px solid #0D5C63',
                  paddingLeft: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: block.align || 'left',
                }}>
                  {block.text}
                </h2>
              </div>
            );
          }

          if (block.type === 'heading3') {
            return (
              <h3 key={i} style={{
                fontSize: '1.45rem',
                fontWeight: '700',
                color: block.color || '#2563EB',
                marginTop: '2.2rem',
                marginBottom: '0.9rem',
                letterSpacing: '-0.01em',
                textAlign: block.align || 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#2563EB' }}>▪</span> {block.text}
              </h3>
            );
          }

          if (block.type === 'image') {
            const src = block.src ? (block.src.startsWith('/') || block.src.startsWith('http') ? block.src : `/assets/${block.src}`) : '';
            return (
              <figure key={i} style={{ margin: '2.5rem 0', textAlign: block.align || 'center' }}>
                <div style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 35px rgba(15, 23, 42, 0.09)',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#F8FAFC',
                }}>
                  <img
                    src={src}
                    alt={block.caption || 'Imagen del artículo'}
                    style={{
                      width: block.width || '100%',
                      maxWidth: '100%',
                      maxHeight: '540px',
                      objectFit: 'cover',
                      display: 'block',
                      margin: '0 auto',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                </div>
                {block.caption && (
                  <figcaption style={{
                    fontSize: '0.9rem',
                    color: '#64748B',
                    marginTop: '0.75rem',
                    fontStyle: 'italic',
                    textAlign: 'center'
                  }}>
                    📷 {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          if (block.type === 'quote') {
            return (
              <blockquote key={i} style={{
                margin: '2.5rem 0',
                padding: '1.5rem 2rem',
                backgroundColor: block.bgColor || '#EFF6FF',
                borderLeft: `6px solid ${block.borderColor || '#2563EB'}`,
                borderRadius: '0 16px 16px 0',
                color: block.textColor || '#1E40AF',
                fontSize: '1.18rem',
                fontStyle: 'italic',
                lineHeight: 1.75,
                boxShadow: '0 4px 15px rgba(37, 99, 235, 0.05)',
                position: 'relative',
              }}>
                <span style={{ fontSize: '2.5rem', position: 'absolute', top: '-10px', left: '10px', opacity: 0.15 }}>“</span>
                {renderTextWithLinks(block.text)}
              </blockquote>
            );
          }

          if (block.type === 'cta' || block.type === 'button') {
            return (
              <div key={i} style={{ margin: '3rem 0', textAlign: block.align || 'center' }}>
                <a
                  href={block.url || 'https://wa.me/34641635705'}
                  target={block.url?.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem 2.5rem',
                    backgroundColor: block.bgColor || '#10B981',
                    color: block.textColor || '#FFFFFF',
                    borderRadius: '9999px',
                    fontWeight: '800',
                    fontSize: '1.1rem',
                    textDecoration: 'none',
                    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.35)',
                    transition: 'all 0.3s ease',
                    transform: 'translateY(0)',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <span style={{ fontSize: '1.3rem' }}>💬</span>
                  {block.text || 'Solicitar Atención Inmediata por WhatsApp'}
                </a>
              </div>
            );
          }

          if (block.type === 'html') {
            return (
              <div key={i} style={{ margin: '2rem 0' }} dangerouslySetInnerHTML={{ __html: block.html || block.text }} />
            );
          }

          return <SmartParagraph key={i} text={block.text} style={paragraphStyle} />;
        })}
      </div>
    );
  }

  // Fallback for string or array content
  if (Array.isArray(fallbackContent)) {
    return (
      <div className="smart-content-body">
        {fallbackContent.map((item, idx) => {
          if (typeof item === 'string') {
            return <SmartParagraph key={idx} text={item} style={paragraphStyle} />;
          }
          return null;
        })}
      </div>
    );
  }

  if (typeof fallbackContent === 'string') {
    const paragraphs = fallbackContent.split('\n\n').filter(Boolean);
    return (
      <div className="smart-content-body">
        {paragraphs.map((p, idx) => (
          <SmartParagraph key={idx} text={p} style={paragraphStyle} />
        ))}
      </div>
    );
  }

  return null;
}
