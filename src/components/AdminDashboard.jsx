"use client";
import { useState, useEffect, useRef } from "react";

const ADMIN_PASSWORD = "enfermera2024";

// ── Palette ───────────────────────────────────────────
const THEME = {
  bg: "#F4F7F5",
  cardBg: "#FFFFFF",
  sidebarBg: "#1F2937",
  sidebarActive: "#10B981",
  primary: "#10B981",
  primaryHover: "#059669",
  danger: "#EF4444",
  dangerHover: "#DC2626",
  textMain: "#111827",
  textMuted: "#6B7280",
  border: "#E5E7EB",
};

export default function AdminDashboard() {
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  // Site content state
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Upload status state
  const [uploadingField, setUploadingField] = useState(null);

  const fileInputRef = useRef(null);
  const [uploadTargetCallback, setUploadTargetCallback] = useState(null);

  // Check stored auth
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch site-content.json
  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    fetch("/api/site-content")
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        showToast("Error al cargar datos del sitio", "error");
        setLoading(false);
      });
  }, [isAuthenticated]);

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  function handleLogin(e) {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
    } else {
      alert("Contraseña incorrecta");
    }
  }

  function handleLogout() {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/site-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": ADMIN_PASSWORD,
        },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (res.ok) {
        showToast("¡Cambios guardados correctamente en la web!");
      } else {
        showToast(data.error || "Error al guardar los cambios", "error");
      }
    } catch (err) {
      showToast("Error de conexión al guardar", "error");
    } finally {
      setSaving(false);
    }
  }

  // Handle direct file upload for any image field
  async function triggerFileUpload(onSuccessUrl) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        showToast("Subiendo imagen...", "info");
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.url) {
          onSuccessUrl(data.url);
          showToast("¡Imagen subida con éxito!");
        } else {
          showToast(data.error || "Error al subir la imagen", "error");
        }
      } catch (err) {
        showToast("Error en la subida de imagen", "error");
      }
    };
    input.click();
  }

  // ── Login Screen ──────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: THEME.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        <div
          style={{
            backgroundColor: THEME.cardBg,
            borderRadius: "16px",
            padding: "2.5rem 2rem",
            maxWidth: "420px",
            width: "100%",
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔐</div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: THEME.textMain,
              marginBottom: "0.5rem",
            }}
          >
            Panel de Administración
          </h1>
          <p
            style={{
              fontSize: "0.9rem",
              color: THEME.textMuted,
              marginBottom: "1.5rem",
            }}
          >
            Enfermera en tu Casa
          </p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Introduce la contraseña"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              style={{
                width: "100%",
                padding: "0.8rem 1rem",
                borderRadius: "8px",
                border: `1px solid ${THEME.border}`,
                marginBottom: "1rem",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.8rem 1rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: THEME.primary,
                color: "white",
                fontWeight: "600",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Acceder al Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading || !content) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
          color: THEME.textMuted,
        }}
      >
        Cargando contenidos del sitio...
      </div>
    );
  }

  const tabs = [
    { id: "hero", label: "🏠 Portada / Hero" },
    { id: "services", label: "💉 Servicios" },
    { id: "rates", label: "💰 Tarifas" },
    { id: "bonos", label: "📦 Bonos Heparina" },
    { id: "team", label: "👩‍⚕️ Sobre Nosotras" },
    { id: "blogs", label: "📰 Blog y Artículos" },
    { id: "reviews", label: "⭐ Reseñas" },
    { id: "faq", label: "❓ Preguntas Frecuentes" },
    { id: "gallery", label: "🖼️ Galería y Cargas" },
    { id: "settings", label: "⚙️ Configuración" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: THEME.bg,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            backgroundColor:
              toast.type === "error"
                ? "#EF4444"
                : toast.type === "info"
                ? "#3B82F6"
                : "#10B981",
            color: "white",
            padding: "0.9rem 1.5rem",
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            zIndex: 9999,
            fontWeight: "600",
          }}
        >
          {toast.msg}
        </div>
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          backgroundColor: THEME.sidebarBg,
          color: "white",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: "1.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            style={{
              fontSize: "1.2rem",
              fontWeight: "700",
              color: THEME.sidebarActive,
            }}
          >
            Enfermera en tu Casa
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "#9CA3AF",
              marginTop: "0.2rem",
            }}
          >
            Panel CMS de Administración
          </div>
        </div>

        <nav
          style={{ flex: 1, padding: "1rem 0.5rem", overflowY: "auto" }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "0.75rem 1rem",
                  margin: "0.2rem 0",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: isActive
                    ? THEME.sidebarActive
                    : "transparent",
                  color: isActive ? "white" : "#D1D5DB",
                  fontWeight: isActive ? "600" : "400",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.15s ease",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div
          style={{
            padding: "1rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "0.6rem",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.2)",
              backgroundColor: "transparent",
              color: "#9CA3AF",
              cursor: "pointer",
              fontSize: "0.85rem",
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Header Bar */}
        <header
          style={{
            height: "70px",
            backgroundColor: THEME.cardBg,
            borderBottom: `1px solid ${THEME.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 2rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "700",
              color: THEME.textMain,
              margin: 0,
            }}
          >
            {tabs.find((t) => t.id === activeTab)?.label}
          </h2>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              backgroundColor: THEME.primary,
              color: "white",
              padding: "0.7rem 1.4rem",
              borderRadius: "8px",
              border: "none",
              fontWeight: "600",
              fontSize: "0.95rem",
              cursor: saving ? "not-allowed" : "pointer",
              boxShadow: "0 2px 8px rgba(16,185,129,0.3)",
            }}
          >
            {saving ? "Guardando..." : "💾 Guardar Todos los Cambios"}
          </button>
        </header>

        {/* Tab Body */}
        <div style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
          {activeTab === "hero" && (
            <HeroTab
              hero={content.hero}
              onChange={(hero) => setContent({ ...content, hero })}
            />
          )}

          {activeTab === "services" && (
            <ServicesTab
              services={content.services || []}
              onChange={(services) => setContent({ ...content, services })}
              onUploadImage={triggerFileUpload}
            />
          )}

          {activeTab === "rates" && (
            <RatesTab
              rates={content.rates || []}
              onChange={(rates) => setContent({ ...content, rates })}
            />
          )}

          {activeTab === "bonos" && (
            <BonosTab
              bonos={content.bonos || []}
              onChange={(bonos) => setContent({ ...content, bonos })}
            />
          )}

          {activeTab === "team" && (
            <TeamTab
              team={content.team || {}}
              onChange={(team) => setContent({ ...content, team })}
              onUploadImage={triggerFileUpload}
            />
          )}

          {activeTab === "blogs" && (
            <BlogsTab
              blogs={content.blogs || []}
              onChange={(blogs) => setContent({ ...content, blogs })}
              onUploadImage={triggerFileUpload}
            />
          )}

          {activeTab === "reviews" && (
            <ReviewsTab
              reviews={content.reviews || []}
              onChange={(reviews) => setContent({ ...content, reviews })}
              onUploadImage={triggerFileUpload}
            />
          )}

          {activeTab === "faq" && (
            <FaqTab
              faq={content.faq || []}
              onChange={(faq) => setContent({ ...content, faq })}
            />
          )}

          {activeTab === "gallery" && (
            <GalleryTab onUploadImage={triggerFileUpload} showToast={showToast} />
          )}

          {activeTab === "settings" && (
            <SettingsTab
              settings={content.settings || {}}
              onChange={(settings) => setContent({ ...content, settings })}
            />
          )}
        </div>
      </main>
    </div>
  );
}

// ── Image Upload Helper Field Component ────────────────────────
function ImageField({ label, value, onChange, onUploadImage }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label
        style={{
          display: "block",
          fontSize: "0.85rem",
          fontWeight: "600",
          marginBottom: "0.4rem",
          color: THEME.textMain,
        }}
      >
        {label}
      </label>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ruta o URL de la imagen (/assets/... o https://...)"
          style={{
            flex: 1,
            padding: "0.6rem 0.8rem",
            borderRadius: "6px",
            border: `1px solid ${THEME.border}`,
            fontSize: "0.9rem",
          }}
        />
        <button
          type="button"
          onClick={() => onUploadImage((url) => onChange(url))}
          style={{
            padding: "0.6rem 1rem",
            backgroundColor: "#3B82F6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "0.85rem",
            whiteSpace: "nowrap",
          }}
        >
          📤 Subir Imagen
        </button>
      </div>
      {value && (
        <div style={{ marginTop: "0.5rem", width: "100px", height: "60px", borderRadius: "6px", overflow: "hidden", border: `1px solid ${THEME.border}` }}>
          <img src={value} alt="Vista previa" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}
    </div>
  );
}

// ── Hero Tab ──────────────────────────────────────────────
function HeroTab({ hero = {}, onChange }) {
  return (
    <div style={{ backgroundColor: THEME.cardBg, padding: "2rem", borderRadius: "12px", border: `1px solid ${THEME.border}` }}>
      <h3 style={{ marginTop: 0, marginBottom: "1.5rem" }}>Sección de Portada / Hero</h3>

      <div style={{ marginBottom: "1.2rem" }}>
        <label style={{ display: "block", fontWeight: "600", marginBottom: "0.4rem" }}>Texto del Badge / Insignia</label>
        <input
          type="text"
          value={hero.badgeText || ""}
          onChange={(e) => onChange({ ...hero, badgeText: e.target.value })}
          style={{ width: "100%", padding: "0.7rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
        />
      </div>

      <div style={{ marginBottom: "1.2rem" }}>
        <label style={{ display: "block", fontWeight: "600", marginBottom: "0.4rem" }}>Título Principal</label>
        <input
          type="text"
          value={hero.heading || ""}
          onChange={(e) => onChange({ ...hero, heading: e.target.value })}
          style={{ width: "100%", padding: "0.7rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
        />
      </div>

      <div style={{ marginBottom: "1.2rem" }}>
        <label style={{ display: "block", fontWeight: "600", marginBottom: "0.4rem" }}>Texto Descriptivo / Puntos</label>
        <textarea
          rows={4}
          value={hero.body || ""}
          onChange={(e) => onChange({ ...hero, body: e.target.value })}
          style={{ width: "100%", padding: "0.7rem", borderRadius: "6px", border: `1px solid ${THEME.border}`, fontFamily: "inherit" }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "0.4rem" }}>Texto Botón Principal (CTA)</label>
          <input
            type="text"
            value={hero.primaryCtaText || ""}
            onChange={(e) => onChange({ ...hero, primaryCtaText: e.target.value })}
            style={{ width: "100%", padding: "0.7rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "0.4rem" }}>Enlace Botón Principal (URL)</label>
          <input
            type="text"
            value={hero.primaryCtaUrl || ""}
            onChange={(e) => onChange({ ...hero, primaryCtaUrl: e.target.value })}
            style={{ width: "100%", padding: "0.7rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Services Tab ──────────────────────────────────────────
function ServicesTab({ services = [], onChange, onUploadImage }) {
  function updateService(index, updatedItem) {
    const list = [...services];
    list[index] = updatedItem;
    onChange(list);
  }

  function addService() {
    onChange([
      ...services,
      {
        id: `service_${Date.now()}`,
        title: "Nuevo Servicio",
        desc: "Descripción del nuevo servicio.",
        price: "Precio a consultar",
        image: "/assets/sample.jpeg",
      },
    ]);
  }

  function deleteService(index) {
    if (confirm("¿Seguro que deseas eliminar este servicio?")) {
      onChange(services.filter((_, i) => i !== index));
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h3 style={{ margin: 0 }}>Gestión de Servicios ({services.length})</h3>
        <button onClick={addService} style={{ padding: "0.6rem 1.2rem", backgroundColor: THEME.primary, color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
          + Añadir Nuevo Servicio
        </button>
      </div>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {services.map((item, idx) => (
          <div key={item.id || idx} style={{ backgroundColor: THEME.cardBg, padding: "1.5rem", borderRadius: "12px", border: `1px solid ${THEME.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ fontWeight: "700", color: THEME.primary }}>Servicio #{idx + 1}</span>
              <button onClick={() => deleteService(idx)} style={{ color: THEME.danger, border: "none", background: "none", cursor: "pointer", fontWeight: "600" }}>
                🗑️ Eliminar
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Título del Servicio</label>
                <input
                  type="text"
                  value={item.title || ""}
                  onChange={(e) => updateService(idx, { ...item, title: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Etiqueta de Precio</label>
                <input
                  type="text"
                  value={item.price || ""}
                  onChange={(e) => updateService(idx, { ...item, price: e.target.value })}
                  placeholder="ej: Desde 12 €/h o Precio a consultar"
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
                />
              </div>
            </div>

            <ImageField
              label="Imagen del Servicio"
              value={item.image}
              onChange={(url) => updateService(idx, { ...item, image: url })}
              onUploadImage={onUploadImage}
            />

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Descripción del Servicio</label>
              <textarea
                rows={3}
                value={item.desc || ""}
                onChange={(e) => updateService(idx, { ...item, desc: e.target.value })}
                style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}`, fontFamily: "inherit" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Rates Tab ─────────────────────────────────────────────
function RatesTab({ rates = [], onChange }) {
  function updateRate(index, updatedItem) {
    const list = [...rates];
    list[index] = updatedItem;
    onChange(list);
  }

  function addRate() {
    onChange([
      ...rates,
      {
        id: `rate_${Date.now()}`,
        title: "Nueva Tarifa",
        price: "Desde 40€",
        desc: "Descripción de la tarifa.",
        features: ["Característica 1", "Característica 2"],
        recommended: false,
      },
    ]);
  }

  function deleteRate(index) {
    if (confirm("¿Eliminar esta tarjeta de tarifa?")) {
      onChange(rates.filter((_, i) => i !== index));
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h3 style={{ margin: 0 }}>Tarjetas de Tarifas y Precios ({rates.length})</h3>
        <button onClick={addRate} style={{ padding: "0.6rem 1.2rem", backgroundColor: THEME.primary, color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
          + Añadir Tarifa
        </button>
      </div>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {rates.map((rate, idx) => (
          <div key={rate.id || idx} style={{ backgroundColor: THEME.cardBg, padding: "1.5rem", borderRadius: "12px", border: `1px solid ${THEME.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ fontWeight: "700", color: THEME.primary }}>Tarifa #{idx + 1}</span>
              <button onClick={() => deleteRate(idx)} style={{ color: THEME.danger, border: "none", background: "none", cursor: "pointer", fontWeight: "600" }}>
                🗑️ Eliminar
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Nombre Tarifa</label>
                <input
                  type="text"
                  value={rate.title || ""}
                  onChange={(e) => updateRate(idx, { ...rate, title: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Precio</label>
                <input
                  type="text"
                  value={rate.price || ""}
                  onChange={(e) => updateRate(idx, { ...rate, price: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>¿Destacado / Popular?</label>
                <select
                  value={rate.recommended ? "true" : "false"}
                  onChange={(e) => updateRate(idx, { ...rate, recommended: e.target.value === "true" })}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
                >
                  <option value="false">No</option>
                  <option value="true">Sí ⭐ (Destacado)</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Descripción breve</label>
              <input
                type="text"
                value={rate.desc || ""}
                onChange={(e) => updateRate(idx, { ...rate, desc: e.target.value })}
                style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Puntos / Incluye (separados por coma)</label>
              <input
                type="text"
                value={Array.isArray(rate.features) ? rate.features.join(", ") : rate.features || ""}
                onChange={(e) => updateRate(idx, { ...rate, features: e.target.value.split(",").map((s) => s.trim()) })}
                style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Bonos Tab ─────────────────────────────────────────────
function BonosTab({ bonos = [], onChange }) {
  function updateBono(index, updatedItem) {
    const list = [...bonos];
    list[index] = updatedItem;
    onChange(list);
  }

  return (
    <div style={{ backgroundColor: THEME.cardBg, padding: "2rem", borderRadius: "12px", border: `1px solid ${THEME.border}` }}>
      <h3 style={{ marginTop: 0, marginBottom: "1.5rem" }}>Tabla de Bonos Heparina / Sesiones</h3>
      <div style={{ display: "grid", gap: "1rem" }}>
        {bonos.map((bono, idx) => (
          <div key={bono.id || idx} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "1rem", alignItems: "center", padding: "1rem", backgroundColor: THEME.bg, borderRadius: "8px" }}>
            <div>
              <label style={{ fontSize: "0.75rem", color: THEME.textMuted }}>Nombre Sesión</label>
              <input
                type="text"
                value={bono.name || ""}
                onChange={(e) => updateBono(idx, { ...bono, name: e.target.value })}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: `1px solid ${THEME.border}` }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.75rem", color: THEME.textMuted }}>Precio/Sesión</label>
              <input
                type="text"
                value={bono.price || ""}
                onChange={(e) => updateBono(idx, { ...bono, price: e.target.value })}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: `1px solid ${THEME.border}` }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.75rem", color: THEME.textMuted }}>Total Bono</label>
              <input
                type="text"
                value={bono.total || ""}
                onChange={(e) => updateBono(idx, { ...bono, total: e.target.value })}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: `1px solid ${THEME.border}` }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.75rem", color: THEME.textMuted }}>Ahorro</label>
              <input
                type="text"
                value={bono.saving || ""}
                onChange={(e) => updateBono(idx, { ...bono, saving: e.target.value })}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: `1px solid ${THEME.border}` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Team Tab ──────────────────────────────────────────────
function TeamTab({ team = {}, onChange, onUploadImage }) {
  const members = team.members || [];
  const paragraphs = team.paragraphs || [];

  function updateMember(index, updatedItem) {
    const list = [...members];
    list[index] = updatedItem;
    onChange({ ...team, members: list });
  }

  function addMember() {
    onChange({
      ...team,
      members: [
        ...members,
        {
          id: `member_${Date.now()}`,
          name: "Nombre Enfermera",
          colegiada: "Colegiada 00000",
          experience: "+5 años de experiencia",
          image: "/assets/wix_img_12_laura.jpg",
        },
      ],
    });
  }

  function deleteMember(index) {
    if (confirm("¿Eliminar este miembro del equipo?")) {
      onChange({ ...team, members: members.filter((_, i) => i !== index) });
    }
  }

  return (
    <div>
      <div style={{ backgroundColor: THEME.cardBg, padding: "2rem", borderRadius: "12px", border: `1px solid ${THEME.border}`, marginBottom: "2rem" }}>
        <h3 style={{ marginTop: 0 }}>Textos de la Sección "¿Quienes Somos?"</h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Título Principal</label>
            <input
              type="text"
              value={team.title || "¿Quienes somos?"}
              onChange={(e) => onChange({ ...team, title: e.target.value })}
              style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Subtítulo</label>
            <input
              type="text"
              value={team.subtitle || "Sobre nosotras:"}
              onChange={(e) => onChange({ ...team, subtitle: e.target.value })}
              style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Párrafos de Biografía (separados por salto de línea)</label>
          <textarea
            rows={5}
            value={paragraphs.join("\n")}
            onChange={(e) => onChange({ ...team, paragraphs: e.target.value.split("\n") })}
            style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}`, fontFamily: "inherit" }}
          />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h3 style={{ margin: 0 }}>Miembros del Equipo / Enfermeras ({members.length})</h3>
        <button onClick={addMember} style={{ padding: "0.6rem 1.2rem", backgroundColor: THEME.primary, color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
          + Añadir Miembro
        </button>
      </div>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {members.map((m, idx) => (
          <div key={m.id || idx} style={{ backgroundColor: THEME.cardBg, padding: "1.5rem", borderRadius: "12px", border: `1px solid ${THEME.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ fontWeight: "700", color: THEME.primary }}>Enfermera #{idx + 1}</span>
              <button onClick={() => deleteMember(idx)} style={{ color: THEME.danger, border: "none", background: "none", cursor: "pointer", fontWeight: "600" }}>
                🗑️ Eliminar
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Nombre Completo</label>
                <input
                  type="text"
                  value={m.name || ""}
                  onChange={(e) => updateMember(idx, { ...m, name: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Número de Colegiada</label>
                <input
                  type="text"
                  value={m.colegiada || ""}
                  onChange={(e) => updateMember(idx, { ...m, colegiada: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Años de Experiencia</label>
                <input
                  type="text"
                  value={m.experience || ""}
                  onChange={(e) => updateMember(idx, { ...m, experience: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
                />
              </div>
            </div>

            <ImageField
              label="Fotografía de la Enfermera"
              value={m.image}
              onChange={(url) => updateMember(idx, { ...m, image: url })}
              onUploadImage={onUploadImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Blogs Tab ─────────────────────────────────────────────
function BlogsTab({ blogs = [], onChange, onUploadImage }) {
  const [editingPost, setEditingPost] = useState(null);

  function updateBlog(index, updatedItem) {
    const list = [...blogs];
    list[index] = updatedItem;
    onChange(list);
  }

  function addBlog() {
    const newBlog = {
      id: `blog_${Date.now()}`,
      title: "Nuevo Artículo de Salud",
      slug: `nuevo-articulo-${Date.now()}`,
      description: "Descripción breve del nuevo artículo para la lista del blog.",
      image: "/assets/sample.jpeg",
      publishedAt: new Date().toISOString().split("T")[0],
      author: "Laura Pueyo",
      content: "Escribe aquí el contenido completo de tu artículo de salud...",
    };
    onChange([newBlog, ...blogs]);
    setEditingPost(newBlog);
  }

  function deleteBlog(index) {
    if (confirm("¿Estás seguro de que deseas eliminar este artículo de blog?")) {
      onChange(blogs.filter((_, i) => i !== index));
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h3 style={{ margin: 0 }}>Gestión del Blog ({blogs.length} artículos)</h3>
        <button onClick={addBlog} style={{ padding: "0.6rem 1.2rem", backgroundColor: THEME.primary, color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
          + Crear Nuevo Artículo
        </button>
      </div>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {blogs.map((post, idx) => (
          <div key={post.id || idx} style={{ backgroundColor: THEME.cardBg, padding: "1.5rem", borderRadius: "12px", border: `1px solid ${THEME.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ fontWeight: "700", color: THEME.primary }}>Artículo #{idx + 1}</span>
              <button onClick={() => deleteBlog(idx)} style={{ color: THEME.danger, border: "none", background: "none", cursor: "pointer", fontWeight: "600" }}>
                🗑️ Eliminar
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Título del Artículo</label>
                <input
                  type="text"
                  value={post.title || ""}
                  onChange={(e) => updateBlog(idx, { ...post, title: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Slug / URL (`/blog/slug`)</label>
                <input
                  type="text"
                  value={post.slug || ""}
                  onChange={(e) => updateBlog(idx, { ...post, slug: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Fecha de Publicación</label>
                <input
                  type="text"
                  value={post.publishedAt || ""}
                  onChange={(e) => updateBlog(idx, { ...post, publishedAt: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
                />
              </div>
            </div>

            <ImageField
              label="Imagen de Portada del Artículo"
              value={post.image}
              onChange={(url) => updateBlog(idx, { ...post, image: url })}
              onUploadImage={onUploadImage}
            />

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Resumen / Descripción breve</label>
              <textarea
                rows={2}
                value={post.description || ""}
                onChange={(e) => updateBlog(idx, { ...post, description: e.target.value })}
                style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}`, fontFamily: "inherit" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Contenido del Artículo (Completo)</label>
              <textarea
                rows={8}
                value={Array.isArray(post.content) ? post.content.join("\n\n") : post.content || ""}
                onChange={(e) => updateBlog(idx, { ...post, content: e.target.value })}
                placeholder="Escribe aquí el contenido completo del post..."
                style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}`, fontFamily: "inherit" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Reviews Tab ───────────────────────────────────────────
function ReviewsTab({ reviews = [], onChange, onUploadImage }) {
  function updateReview(index, updatedItem) {
    const list = [...reviews];
    list[index] = updatedItem;
    onChange(list);
  }

  function addReview() {
    onChange([
      ...reviews,
      {
        id: `rev_${Date.now()}`,
        name: "Nombre del Cliente",
        initial: "N",
        avatarBg: "#10B981",
        rating: 5,
        date: "hace 1 semana",
        text: "Excelente servicio de enfermería en casa. Muy recomendadas!",
      },
    ]);
  }

  function deleteReview(index) {
    if (confirm("¿Eliminar esta reseña?")) {
      onChange(reviews.filter((_, i) => i !== index));
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h3 style={{ margin: 0 }}>Gestión de Reseñas / Opiniones ({reviews.length})</h3>
        <button onClick={addReview} style={{ padding: "0.6rem 1.2rem", backgroundColor: THEME.primary, color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
          + Añadir Reseña
        </button>
      </div>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {reviews.map((rev, idx) => (
          <div key={rev.id || idx} style={{ backgroundColor: THEME.cardBg, padding: "1.5rem", borderRadius: "12px", border: `1px solid ${THEME.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ fontWeight: "700", color: THEME.primary }}>Reseña #{idx + 1}</span>
              <button onClick={() => deleteReview(idx)} style={{ color: THEME.danger, border: "none", background: "none", cursor: "pointer", fontWeight: "600" }}>
                🗑️ Eliminar
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Nombre del Cliente</label>
                <input
                  type="text"
                  value={rev.name || ""}
                  onChange={(e) => updateReview(idx, { ...rev, name: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Puntuación (1-5 ⭐)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rev.rating || 5}
                  onChange={(e) => updateReview(idx, { ...rev, rating: Number(e.target.value) })}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Fecha</label>
                <input
                  type="text"
                  value={rev.date || ""}
                  onChange={(e) => updateReview(idx, { ...rev, date: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Inicial Avatar</label>
                <input
                  type="text"
                  maxLength={2}
                  value={rev.initial || ""}
                  onChange={(e) => updateReview(idx, { ...rev, initial: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Texto de la Reseña</label>
              <textarea
                rows={3}
                value={rev.text || ""}
                onChange={(e) => updateReview(idx, { ...rev, text: e.target.value })}
                style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}`, fontFamily: "inherit" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── FAQ Tab ───────────────────────────────────────────────
function FaqTab({ faq = [], onChange }) {
  function updateFaq(index, updatedItem) {
    const list = [...faq];
    list[index] = updatedItem;
    onChange(list);
  }

  function addFaq() {
    onChange([
      ...faq,
      {
        id: `faq_${Date.now()}`,
        question: "Nueva Pregunta Frecuente",
        answer: "Respuesta detallada a la pregunta frecuente.",
      },
    ]);
  }

  function deleteFaq(index) {
    if (confirm("¿Eliminar esta pregunta frecuente?")) {
      onChange(faq.filter((_, i) => i !== index));
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h3 style={{ margin: 0 }}>Preguntas Frecuentes ({faq.length})</h3>
        <button onClick={addFaq} style={{ padding: "0.6rem 1.2rem", backgroundColor: THEME.primary, color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
          + Añadir Pregunta
        </button>
      </div>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {faq.map((item, idx) => (
          <div key={item.id || idx} style={{ backgroundColor: THEME.cardBg, padding: "1.5rem", borderRadius: "12px", border: `1px solid ${THEME.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ fontWeight: "700", color: THEME.primary }}>Pregunta #{idx + 1}</span>
              <button onClick={() => deleteFaq(idx)} style={{ color: THEME.danger, border: "none", background: "none", cursor: "pointer", fontWeight: "600" }}>
                🗑️ Eliminar
              </button>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Pregunta</label>
              <input
                type="text"
                value={item.question || ""}
                onChange={(e) => updateFaq(idx, { ...item, question: e.target.value })}
                style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>Respuesta</label>
              <textarea
                rows={3}
                value={item.answer || ""}
                onChange={(e) => updateFaq(idx, { ...item, answer: e.target.value })}
                style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${THEME.border}`, fontFamily: "inherit" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Gallery / Image Upload Tab ────────────────────────────
function GalleryTab({ onUploadImage, showToast }) {
  const [uploadedImages, setUploadedImages] = useState([
    "/assets/sample.jpeg",
    "/assets/damil.jpeg",
    "/assets/imgi_8_como-curar-una-herida-infectada.jpg",
    "/assets/imgi_9_inyeccion.webp",
    "/assets/imgi_10_779030c5-a200-421f-8dd8-8e85eb97be20.jpg",
    "/assets/wix_img_12_laura.jpg",
    "/assets/wix_img_13_karen.jpg",
  ]);

  function handleUploadNew() {
    onUploadImage((newUrl) => {
      setUploadedImages((prev) => [newUrl, ...prev]);
    });
  }

  function copyToClipboard(url) {
    navigator.clipboard.writeText(url);
    showToast("¡URL copiada al portapapeles!");
  }

  return (
    <div style={{ backgroundColor: THEME.cardBg, padding: "2rem", borderRadius: "12px", border: `1px solid ${THEME.border}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h3 style={{ margin: 0 }}>Gestor de Imágenes del Sitio</h3>
        <button onClick={handleUploadNew} style={{ padding: "0.7rem 1.4rem", backgroundColor: "#3B82F6", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
          📤 Subir Nueva Imagen
        </button>
      </div>

      <p style={{ color: THEME.textMuted, fontSize: "0.95rem", marginBottom: "2rem" }}>
        Puedes subir imágenes directamente aquí y copiar su URL para usarla en cualquier servicio, banner, miembro del equipo o artículo del blog.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
        {uploadedImages.map((url, i) => (
          <div key={i} style={{ borderRadius: "10px", overflow: "hidden", border: `1px solid ${THEME.border}`, backgroundColor: THEME.bg }}>
            <div style={{ width: "100%", height: "140px", overflow: "hidden" }}>
              <img src={url} alt="Gallery item" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "0.8rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", color: THEME.textMuted, wordBreak: "break-all", marginBottom: "0.5rem" }}>{url}</div>
              <button
                onClick={() => copyToClipboard(url)}
                style={{ padding: "0.4rem 0.8rem", backgroundColor: THEME.primary, color: "white", border: "none", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "600", cursor: "pointer", width: "100%" }}
              >
                📋 Copiar URL
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Settings Tab ──────────────────────────────────────────
function SettingsTab({ settings = {}, onChange }) {
  return (
    <div style={{ backgroundColor: THEME.cardBg, padding: "2rem", borderRadius: "12px", border: `1px solid ${THEME.border}` }}>
      <h3 style={{ marginTop: 0, marginBottom: "1.5rem" }}>Configuración General y Datos de Contacto</h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "0.4rem" }}>Nombre del Sitio / Marca</label>
          <input
            type="text"
            value={settings.siteName || "Enfermera en tu casa"}
            onChange={(e) => onChange({ ...settings, siteName: e.target.value })}
            style={{ width: "100%", padding: "0.7rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "0.4rem" }}>Teléfono de Atención</label>
          <input
            type="text"
            value={settings.phone || ""}
            onChange={(e) => onChange({ ...settings, phone: e.target.value })}
            style={{ width: "100%", padding: "0.7rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "0.4rem" }}>Enlace WhatsApp (`https://wa.me/...`)</label>
          <input
            type="text"
            value={settings.whatsapp || ""}
            onChange={(e) => onChange({ ...settings, whatsapp: e.target.value })}
            style={{ width: "100%", padding: "0.7rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "0.4rem" }}>Correo Electrónico (Email)</label>
          <input
            type="text"
            value={settings.email || ""}
            onChange={(e) => onChange({ ...settings, email: e.target.value })}
            style={{ width: "100%", padding: "0.7rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "0.4rem" }}>Ubicación / Ciudad</label>
          <input
            type="text"
            value={settings.location || ""}
            onChange={(e) => onChange({ ...settings, location: e.target.value })}
            style={{ width: "100%", padding: "0.7rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "0.4rem" }}>Horario de Atención</label>
          <input
            type="text"
            value={settings.hours || ""}
            onChange={(e) => onChange({ ...settings, hours: e.target.value })}
            style={{ width: "100%", padding: "0.7rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
          />
        </div>
      </div>

      <div style={{ marginBottom: "1.2rem" }}>
        <label style={{ display: "block", fontWeight: "600", marginBottom: "0.4rem" }}>Texto del Banner Emergente de Alerta</label>
        <input
          type="text"
          value={settings.emergencyBannerText || ""}
          onChange={(e) => onChange({ ...settings, emergencyBannerText: e.target.value })}
          style={{ width: "100%", padding: "0.7rem", borderRadius: "6px", border: `1px solid ${THEME.border}` }}
        />
      </div>
    </div>
  );
}
