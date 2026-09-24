"use client";
import { useState, useEffect, useCallback } from "react";

const ADMIN_PASSWORD = "enfermera2024";

// ── Colour palette ─────────────────────────────────────────────
const C = {
  bg: "#0d1810",
  surface: "rgba(255,255,255,0.04)",
  border: "rgba(78,158,106,0.18)",
  borderHover: "rgba(78,158,106,0.45)",
  green: "#4e9e6a",
  greenDark: "#3a7a52",
  greenGlow: "rgba(78,158,106,0.25)",
  text: "#e8f5ec",
  muted: "#7aab8c",
  danger: "#e05555",
  dangerBg: "rgba(224,85,85,0.12)",
  gold: "#f5a623",
};

// ── Reusable field components ───────────────────────────────────
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", fontSize: "0.78rem", color: C.muted, marginBottom: "0.35rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%", padding: "0.6rem 0.85rem", background: "rgba(0,0,0,0.3)",
        border: `1px solid ${C.border}`, borderRadius: "8px", color: C.text,
        fontSize: "0.9rem", outline: "none", fontFamily: "inherit",
        transition: "border-color 0.2s",
      }}
      onFocus={e => (e.target.style.borderColor = C.green)}
      onBlur={e => (e.target.style.borderColor = C.border)}
    />
  );
}

function Textarea({ value, onChange, rows = 3, placeholder }) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%", padding: "0.6rem 0.85rem", background: "rgba(0,0,0,0.3)",
        border: `1px solid ${C.border}`, borderRadius: "8px", color: C.text,
        fontSize: "0.9rem", outline: "none", resize: "vertical", fontFamily: "inherit",
        transition: "border-color 0.2s",
      }}
      onFocus={e => (e.target.style.borderColor = C.green)}
      onBlur={e => (e.target.style.borderColor = C.border)}
    />
  );
}

function Btn({ children, onClick, variant = "primary", disabled, small }) {
  const styles = {
    primary: { bg: `linear-gradient(135deg,${C.green},${C.greenDark})`, color: "#fff", border: "none", shadow: `0 4px 14px ${C.greenGlow}` },
    secondary: { bg: "rgba(255,255,255,0.07)", color: C.text, border: `1px solid ${C.border}`, shadow: "none" },
    danger: { bg: C.dangerBg, color: C.danger, border: `1px solid ${C.danger}44`, shadow: "none" },
  }[variant];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: small ? "0.35rem 0.75rem" : "0.6rem 1.25rem",
        background: styles.bg, color: styles.color, border: styles.border,
        borderRadius: "8px", fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer",
        fontSize: small ? "0.78rem" : "0.875rem", opacity: disabled ? 0.5 : 1,
        boxShadow: styles.shadow, transition: "all 0.2s", fontFamily: "inherit",
      }}
    >
      {children}
    </button>
  );
}

function Card({ children, style }) {
  return (
    <div style={{
      background: C.surface, border: `1px solid ${C.border}`, borderRadius: "16px",
      padding: "1.5rem", marginBottom: "1.25rem", ...style
    }}>
      {children}
    </div>
  );
}

function SectionHeader({ icon, title, subtitle }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: C.text, display: "flex", alignItems: "center", gap: "0.6rem", margin: 0 }}>
        <span>{icon}</span> {title}
      </h2>
      {subtitle && <p style={{ margin: "0.3rem 0 0 0", color: C.muted, fontSize: "0.85rem" }}>{subtitle}</p>}
    </div>
  );
}

// ── Tab nav ────────────────────────────────────────────────────
const TABS = [
  { id: "services", icon: "💉", label: "Servicios" },
  { id: "rates", icon: "💰", label: "Tarifas" },
  { id: "bonos", icon: "📦", label: "Bonos Heparina" },
  { id: "reviews", icon: "⭐", label: "Reseñas" },
  { id: "faq", icon: "❓", label: "FAQ" },
  { id: "hero", icon: "🏠", label: "Portada" },
  { id: "settings", icon: "⚙️", label: "Contacto" },
];

// ════════════════════════════════════════════════════════════════
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const [tab, setTab] = useState("services");
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // ── Load data ────────────────────────────────────────────────
  const loadData = useCallback(async () => {
    try {
      const res = await fetch("/api/site-content");
      if (!res.ok) throw new Error("Failed to load");
      setData(await res.json());
    } catch (e) {
      setLoadError(e.message);
    }
  }, []);

  useEffect(() => {
    if (authed) loadData();
  }, [authed, loadData]);

  // ── Save data ─────────────────────────────────────────────────
  const saveData = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/site-content", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": ADMIN_PASSWORD },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      alert("Error al guardar: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Login screen ─────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',sans-serif" }}>
        <div style={{ width: "100%", maxWidth: "380px", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>🏥</div>
            <h1 style={{ color: C.text, fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>Panel de Admin</h1>
            <p style={{ color: C.muted, marginTop: "0.4rem", fontSize: "0.9rem" }}>Enfermera en Tu Casa</p>
          </div>
          <Card>
            <Field label="Contraseña">
              <Input type="password" value={pwInput} onChange={setPwInput} placeholder="Introduce la contraseña" />
            </Field>
            {pwError && <p style={{ color: C.danger, fontSize: "0.85rem", marginBottom: "0.75rem" }}>Contraseña incorrecta</p>}
            <Btn onClick={() => {
              if (pwInput === ADMIN_PASSWORD) { setAuthed(true); setPwError(false); }
              else { setPwError(true); setPwInput(""); }
            }}>
              Entrar →
            </Btn>
          </Card>
        </div>
      </div>
    );
  }

  if (loadError) return <div style={{ minHeight: "100vh", background: C.bg, color: C.danger, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>Error: {loadError}</div>;
  if (!data) return <div style={{ minHeight: "100vh", background: C.bg, color: C.muted, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>Cargando…</div>;

  // ── Helpers for array mutations ───────────────────────────────
  const update = (section, newVal) => setData(d => ({ ...d, [section]: newVal }));
  const updateItem = (section, idx, field, val) =>
    setData(d => {
      const arr = [...d[section]];
      arr[idx] = { ...arr[idx], [field]: val };
      return { ...d, [section]: arr };
    });
  const removeItem = (section, idx) =>
    setData(d => ({ ...d, [section]: d[section].filter((_, i) => i !== idx) }));
  const addItem = (section, template) =>
    setData(d => ({ ...d, [section]: [...d[section], { ...template, id: "new-" + Date.now() }] }));

  // ── Render current tab ─────────────────────────────────────────
  const renderTab = () => {
    // SERVICES
    if (tab === "services") return (
      <div>
        <SectionHeader icon="💉" title="Servicios" subtitle="Añade, edita o elimina los servicios del sitio web." />
        {data.services.map((svc, idx) => (
          <Card key={svc.id || idx}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <span style={{ fontWeight: 700, color: C.text, fontSize: "0.95rem" }}>{svc.title || `Servicio ${idx + 1}`}</span>
              <Btn variant="danger" small onClick={() => removeItem("services", idx)}>🗑 Eliminar</Btn>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <Field label="Título"><Input value={svc.title} onChange={v => updateItem("services", idx, "title", v)} /></Field>
              <Field label="Precio (opcional)"><Input value={svc.price || ""} onChange={v => updateItem("services", idx, "price", v)} placeholder="Ej: Precio a consultar" /></Field>
            </div>
            <Field label="Descripción"><Textarea value={svc.desc} onChange={v => updateItem("services", idx, "desc", v)} /></Field>
            <Field label="Nombre de imagen (de /assets/)"><Input value={svc.image || ""} onChange={v => updateItem("services", idx, "image", v)} placeholder="nombre-archivo.jpg" /></Field>
          </Card>
        ))}
        <Btn variant="secondary" onClick={() => addItem("services", { title: "", desc: "", image: "", price: "" })}>+ Añadir servicio</Btn>
      </div>
    );

    // RATES
    if (tab === "rates") return (
      <div>
        <SectionHeader icon="💰" title="Tarifas" subtitle="Edita los precios y descripciones de cada tarifa." />
        {data.rates.map((rate, idx) => (
          <Card key={rate.id || idx}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <span style={{ fontWeight: 700, color: C.text }}>{rate.title || `Tarifa ${idx + 1}`}</span>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: C.muted, fontSize: "0.8rem", cursor: "pointer" }}>
                  <input type="checkbox" checked={!!rate.recommended} onChange={e => updateItem("rates", idx, "recommended", e.target.checked)} />
                  Recomendado
                </label>
                <Btn variant="danger" small onClick={() => removeItem("rates", idx)}>🗑</Btn>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <Field label="Título"><Input value={rate.title} onChange={v => updateItem("rates", idx, "title", v)} /></Field>
              <Field label="Precio"><Input value={rate.price} onChange={v => updateItem("rates", idx, "price", v)} placeholder="Ej: Desde 38€" /></Field>
            </div>
            <Field label="Descripción"><Textarea value={rate.desc} onChange={v => updateItem("rates", idx, "desc", v)} rows={2} /></Field>
            <Field label="Características (una por línea)">
              <Textarea
                value={(rate.features || []).join("\n")}
                onChange={v => updateItem("rates", idx, "features", v.split("\n").filter(Boolean))}
                rows={4}
                placeholder="Característica 1&#10;Característica 2"
              />
            </Field>
          </Card>
        ))}
        <Btn variant="secondary" onClick={() => addItem("rates", { title: "", price: "", desc: "", features: [], recommended: false })}>+ Añadir tarifa</Btn>
      </div>
    );

    // BONOS
    if (tab === "bonos") return (
      <div>
        <SectionHeader icon="📦" title="Bonos de Heparina" subtitle="Tabla de bonos de sesiones de heparina." />
        {data.bonos.map((bono, idx) => (
          <Card key={bono.id || idx}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto", gap: "0.75rem", alignItems: "flex-end" }}>
              <Field label="Nombre"><Input value={bono.name} onChange={v => updateItem("bonos", idx, "name", v)} /></Field>
              <Field label="Precio/sesión"><Input value={bono.price} onChange={v => updateItem("bonos", idx, "price", v)} placeholder="38€" /></Field>
              <Field label="Total"><Input value={bono.total} onChange={v => updateItem("bonos", idx, "total", v)} placeholder="38€" /></Field>
              <Field label="Ahorro"><Input value={bono.saving} onChange={v => updateItem("bonos", idx, "saving", v)} placeholder="—" /></Field>
              <div style={{ paddingBottom: "0.1rem" }}><Btn variant="danger" small onClick={() => removeItem("bonos", idx)}>🗑</Btn></div>
            </div>
          </Card>
        ))}
        <Btn variant="secondary" onClick={() => addItem("bonos", { name: "", price: "", total: "", saving: "—" })}>+ Añadir bono</Btn>
      </div>
    );

    // REVIEWS
    if (tab === "reviews") return (
      <div>
        <SectionHeader icon="⭐" title="Reseñas de Clientes" subtitle="Gestiona las reseñas de Google que aparecen en la web." />
        {data.reviews.map((rev, idx) => (
          <Card key={rev.id || idx}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span style={{ fontWeight: 700, color: C.text }}>{rev.name || `Reseña ${idx + 1}`}</span>
              <Btn variant="danger" small onClick={() => removeItem("reviews", idx)}>🗑 Eliminar</Btn>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <Field label="Nombre"><Input value={rev.name} onChange={v => updateItem("reviews", idx, "name", v)} /></Field>
              <Field label="Inicial (letra avatar)"><Input value={rev.initial} onChange={v => updateItem("reviews", idx, "initial", v)} /></Field>
              <Field label="Color avatar (hex)"><Input value={rev.avatarBg} onChange={v => updateItem("reviews", idx, "avatarBg", v)} placeholder="#e57373" /></Field>
              <Field label="Nº reseñas del autor"><Input value={rev.reviewerReviewsCount} onChange={v => updateItem("reviews", idx, "reviewerReviewsCount", v)} placeholder="3 reseñas" /></Field>
              <Field label="Puntuación (1-5)">
                <select value={rev.rating} onChange={e => updateItem("reviews", idx, "rating", Number(e.target.value))}
                  style={{ width: "100%", padding: "0.6rem 0.85rem", background: "rgba(0,0,0,0.3)", border: `1px solid ${C.border}`, borderRadius: "8px", color: C.text, fontSize: "0.9rem", fontFamily: "inherit" }}>
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} estrellas</option>)}
                </select>
              </Field>
              <Field label="Fecha (ej: hace un mes)"><Input value={rev.date} onChange={v => updateItem("reviews", idx, "date", v)} /></Field>
            </div>
            <Field label="Texto de la reseña"><Textarea value={rev.text} onChange={v => updateItem("reviews", idx, "text", v)} rows={3} /></Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <Field label="Respuesta del propietario"><Input value={rev.ownerReply || ""} onChange={v => updateItem("reviews", idx, "ownerReply", v)} /></Field>
              <Field label="Fecha respuesta"><Input value={rev.ownerReplyDate || ""} onChange={v => updateItem("reviews", idx, "ownerReplyDate", v)} /></Field>
            </div>
          </Card>
        ))}
        <Btn variant="secondary" onClick={() => addItem("reviews", { name: "", initial: "", avatarBg: "#829B8C", reviewerReviewsCount: "1 reseña", text: "", rating: 5, date: "hace un mes", ownerReply: "", ownerReplyDate: "" })}>+ Añadir reseña</Btn>
      </div>
    );

    // FAQ
    if (tab === "faq") return (
      <div>
        <SectionHeader icon="❓" title="Preguntas Frecuentes" subtitle="Añade, edita o elimina las FAQs del sitio." />
        {data.faq.map((item, idx) => (
          <Card key={item.id || idx}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span style={{ fontWeight: 700, color: C.text, fontSize: "0.9rem" }}>Pregunta {idx + 1}</span>
              <Btn variant="danger" small onClick={() => removeItem("faq", idx)}>🗑 Eliminar</Btn>
            </div>
            <Field label="Pregunta"><Input value={item.question} onChange={v => updateItem("faq", idx, "question", v)} /></Field>
            <Field label="Respuesta"><Textarea value={item.answer} onChange={v => updateItem("faq", idx, "answer", v)} rows={3} /></Field>
          </Card>
        ))}
        <Btn variant="secondary" onClick={() => addItem("faq", { question: "", answer: "" })}>+ Añadir pregunta</Btn>
      </div>
    );

    // HERO
    if (tab === "hero") return (
      <div>
        <SectionHeader icon="🏠" title="Portada (Hero)" subtitle="Texto principal que aparece en la portada del sitio." />
        <Card>
          <Field label="Título principal">
            <Input value={data.hero.heading} onChange={v => setData(d => ({ ...d, hero: { ...d.hero, heading: v } }))} />
          </Field>
          <Field label="Texto descriptivo (puedes usar saltos de línea)">
            <Textarea value={data.hero.body} onChange={v => setData(d => ({ ...d, hero: { ...d.hero, body: v } }))} rows={5} />
          </Field>
        </Card>
      </div>
    );

    // SETTINGS
    if (tab === "settings") return (
      <div>
        <SectionHeader icon="⚙️" title="Datos de Contacto" subtitle="Teléfono, WhatsApp, email y ubicación." />
        <Card>
          <Field label="Teléfono"><Input value={data.settings.phone} onChange={v => setData(d => ({ ...d, settings: { ...d.settings, phone: v } }))} /></Field>
          <Field label="Enlace WhatsApp"><Input value={data.settings.whatsapp} onChange={v => setData(d => ({ ...d, settings: { ...d.settings, whatsapp: v } }))} /></Field>
          <Field label="Email"><Input value={data.settings.email} onChange={v => setData(d => ({ ...d, settings: { ...d.settings, email: v } }))} /></Field>
          <Field label="Localización"><Input value={data.settings.location} onChange={v => setData(d => ({ ...d, settings: { ...d.settings, location: v } }))} /></Field>
        </Card>
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Inter',sans-serif", color: C.text }}>

      {/* ── Top Bar ── */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(13,24,16,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}`, padding: "0.85rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <span style={{ fontSize: "1.3rem" }}>🏥</span>
          <div>
            <span style={{ fontWeight: 800, fontSize: "1rem" }}>Panel de Admin</span>
            <span style={{ color: C.muted, fontSize: "0.8rem", marginLeft: "0.6rem" }}>Enfermera en Tu Casa</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          {saved && <span style={{ color: C.green, fontSize: "0.85rem", fontWeight: 600 }}>✓ Guardado</span>}
          <a href="/" target="_blank" style={{ color: C.muted, fontSize: "0.85rem", textDecoration: "none" }}>Ver sitio →</a>
          <Btn onClick={saveData} disabled={saving}>{saving ? "Guardando…" : "💾 Guardar cambios"}</Btn>
        </div>
      </div>

      <div style={{ display: "flex", maxWidth: "1100px", margin: "0 auto", padding: "1.5rem 1rem", gap: "1.5rem" }}>

        {/* ── Sidebar tabs ── */}
        <div style={{ width: "180px", flexShrink: 0 }}>
          <div style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "4px" }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.6rem 0.9rem",
                borderRadius: "10px", border: "none", cursor: "pointer", textAlign: "left",
                fontFamily: "inherit", fontSize: "0.875rem", fontWeight: tab === t.id ? 700 : 500,
                background: tab === t.id ? `linear-gradient(135deg,${C.green}22,${C.greenDark}11)` : "transparent",
                color: tab === t.id ? C.green : C.muted,
                borderLeft: tab === t.id ? `3px solid ${C.green}` : "3px solid transparent",
                transition: "all 0.2s",
              }}>
                <span>{t.icon}</span> {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Main content ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {renderTab()}
        </div>
      </div>
    </div>
  );
}
