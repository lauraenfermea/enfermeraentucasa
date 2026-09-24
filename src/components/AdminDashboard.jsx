"use client";
import { useState, useEffect } from "react";

const ADMIN_PASSWORD = "enfermera2024";

// ── Design Tokens ─────────────────────────────────────────
const DESIGN = {
  sidebarBg: "#0B132B", // Deep midnight navy
  sidebarGroupTitle: "#64748B",
  sidebarText: "#94A3B8",
  sidebarActiveBg: "#1E293B",
  sidebarActiveAccent: "#2563EB",
  sidebarActiveText: "#FFFFFF",
  
  mainBg: "#F8FAFC",
  cardBg: "#FFFFFF",
  headerBg: "#FFFFFF",
  border: "#E2E8F0",
  
  primary: "#2563EB",
  primaryHover: "#1D4ED8",
  success: "#10B981",
  successLight: "#DCFCE7",
  successText: "#15803D",
  danger: "#EF4444",
  dangerHover: "#DC2626",
  
  textMain: "#0F172A",
  textMuted: "#64748B",
  textLight: "#94A3B8",
};

export default function AdminDashboard() {
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");

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
      .catch(() => {
        showToast("Error al cargar datos del sitio", "error");
        setLoading(false);
      });
  }, [isAuthenticated]);

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
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
        showToast("¡Los contenidos se han actualizado y publicado correctamente en la web!");
      } else {
        showToast(data.error || "Error al guardar los cambios", "error");
      }
    } catch {
      showToast("Error de conexión al guardar", "error");
    } finally {
      setSaving(false);
    }
  }

  // Handle direct file upload for any image field
  function triggerFileUpload(onSuccessUrl) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        showToast("Subiendo imagen al servidor...", "info");
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.url) {
          onSuccessUrl(data.url);
          showToast("¡Imagen subida y vinculada con éxito!");
        } else {
          showToast(data.error || "Error al subir la imagen", "error");
        }
      } catch {
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
          backgroundColor: DESIGN.mainBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <div
          style={{
            backgroundColor: DESIGN.cardBg,
            borderRadius: "16px",
            padding: "3rem 2.5rem",
            maxWidth: "420px",
            width: "100%",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
            border: `1px solid ${DESIGN.border}`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "14px",
              backgroundColor: DESIGN.sidebarBg,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.8rem",
              margin: "0 auto 1.5rem",
              boxShadow: "0 10px 15px -3px rgba(11, 19, 43, 0.3)",
            }}
          >
            🩺
          </div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "800",
              color: DESIGN.textMain,
              marginBottom: "0.25rem",
              letterSpacing: "-0.02em",
            }}
          >
            Enfermera en tu Casa
          </h1>
          <p
            style={{
              fontSize: "0.9rem",
              color: DESIGN.textMuted,
              marginBottom: "2rem",
            }}
          >
            Panel de Control y Gestión CMS
          </p>
          <form onSubmit={handleLogin}>
            <div style={{ textAlign: "left", marginBottom: "1.2rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: "600", color: DESIGN.textMuted, display: "block", marginBottom: "0.4rem" }}>Contraseña de Acceso</label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  borderRadius: "10px",
                  border: `1px solid ${DESIGN.border}`,
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.85rem 1rem",
                borderRadius: "10px",
                border: "none",
                backgroundColor: DESIGN.primary,
                color: "white",
                fontWeight: "700",
                fontSize: "1rem",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
              }}
            >
              Iniciar Sesión →
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
          backgroundColor: DESIGN.mainBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.1rem",
          fontWeight: "600",
          color: DESIGN.textMuted,
        }}
      >
        <span style={{ marginRight: "0.5rem" }}>⏳</span> Cargando base de datos del sitio...
      </div>
    );
  }

  const menuGroups = [
    {
      group: "CONTENT CMS",
      items: [
        { id: "hero", label: "Dashboard & Hero", icon: "📊" },
        { id: "services", label: "Servicios", icon: "💉", count: content.services?.length },
        { id: "rates", label: "Tarifas & Planes", icon: "💰", count: content.rates?.length },
        { id: "bonos", label: "Bonos Heparina", icon: "📦", count: content.bonos?.length },
        { id: "team", label: "Sobre Nosotras", icon: "👩‍⚕️", count: content.team?.members?.length },
        { id: "blogs", label: "Blog & Artículos", icon: "📰", count: content.blogs?.length },
        { id: "reviews", label: "Reseñas & Opiniones", icon: "⭐", count: content.reviews?.length },
        { id: "faq", label: "Preguntas Frecuentes", icon: "❓", count: content.faq?.length },
      ],
    },
    {
      group: "MULTIMEDIA & SYSTEM",
      items: [
        { id: "gallery", label: "Gestor de Imágenes", icon: "🖼️" },
        { id: "settings", label: "Configuración Web", icon: "⚙️" },
      ],
    },
  ];

  const currentTabItem = menuGroups.flatMap((g) => g.items).find((i) => i.id === activeTab);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: DESIGN.mainBg,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: DESIGN.textMain,
      }}
    >
      {/* Toast Notification Banner */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "1.5rem",
            right: "2rem",
            backgroundColor:
              toast.type === "error"
                ? "#EF4444"
                : toast.type === "info"
                ? "#3B82F6"
                : "#10B981",
            color: "white",
            padding: "1rem 1.75rem",
            borderRadius: "12px",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15)",
            zIndex: 9999,
            fontWeight: "600",
            fontSize: "0.95rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span>{toast.type === "error" ? "❌" : toast.type === "info" ? "ℹ️" : "✅"}</span>
          {toast.msg}
        </div>
      )}

      {/* ── Left Sidebar ──────────────────────────────────────── */}
      <aside
        style={{
          width: "270px",
          backgroundColor: DESIGN.sidebarBg,
          color: "white",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            padding: "1.75rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              backgroundColor: DESIGN.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "900",
              fontSize: "1.2rem",
            }}
          >
            EC
          </div>
          <div>
            <div style={{ fontWeight: "800", fontSize: "1.05rem", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
              ENFERMERA
            </div>
            <div style={{ fontSize: "0.75rem", color: DESIGN.sidebarText, fontWeight: "600", letterSpacing: "0.08em" }}>
              EN TU CASA CMS
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "1.25rem 0.85rem", overflowY: "auto" }}>
          {menuGroups.map((group, idx) => (
            <div key={idx} style={{ marginBottom: "1.75rem" }}>
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: "700",
                  color: DESIGN.sidebarGroupTitle,
                  letterSpacing: "0.1em",
                  padding: "0 0.75rem",
                  marginBottom: "0.6rem",
                }}
              >
                {group.group}
              </div>

              {group.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "0.7rem 0.85rem",
                      margin: "0.15rem 0",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: isActive ? DESIGN.sidebarActiveBg : "transparent",
                      color: isActive ? DESIGN.sidebarActiveText : DESIGN.sidebarText,
                      fontWeight: isActive ? "700" : "500",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "all 0.15s ease",
                      position: "relative",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                      <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>

                    {isActive && (
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "20%",
                          bottom: "20%",
                          width: "4px",
                          backgroundColor: DESIGN.sidebarActiveAccent,
                          borderRadius: "0 4px 4px 0",
                        }}
                      />
                    )}

                    {item.count !== undefined && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: "700",
                          backgroundColor: isActive ? DESIGN.primary : "rgba(255,255,255,0.1)",
                          color: isActive ? "white" : DESIGN.sidebarText,
                          padding: "0.15rem 0.5rem",
                          borderRadius: "12px",
                        }}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: DESIGN.success,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "0.85rem",
              }}
            >
              A
            </div>
            <div>
              <div style={{ fontSize: "0.85rem", fontWeight: "700" }}>Administrador</div>
              <div style={{ fontSize: "0.7rem", color: DESIGN.sidebarText }}>Sesión Activa</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Cerrar Sesión"
            style={{
              background: "none",
              border: "none",
              color: DESIGN.sidebarText,
              cursor: "pointer",
              fontSize: "1.1rem",
              padding: "0.3rem",
            }}
          >
            🚪
          </button>
        </div>
      </aside>

      {/* ── Main Content Body ──────────────────────────────────── */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top Header Navbar */}
        <header
          style={{
            height: "75px",
            backgroundColor: DESIGN.headerBg,
            borderBottom: `1px solid ${DESIGN.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 2.5rem",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.02)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "1.5rem" }}>{currentTabItem?.icon}</span>
            <div>
              <h1
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "800",
                  color: DESIGN.textMain,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                {currentTabItem?.label}
              </h1>
              <span style={{ fontSize: "0.8rem", color: DESIGN.textMuted }}>
                Gestión de contenidos en tiempo real
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <input
              type="text"
              placeholder="🔍 Buscar contenidos..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                padding: "0.55rem 1rem",
                borderRadius: "8px",
                border: `1px solid ${DESIGN.border}`,
                backgroundColor: DESIGN.mainBg,
                fontSize: "0.88rem",
                width: "220px",
                outline: "none",
              }}
            />

            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                backgroundColor: DESIGN.success,
                color: "white",
                padding: "0.65rem 1.5rem",
                borderRadius: "10px",
                border: "none",
                fontWeight: "700",
                fontSize: "0.92rem",
                cursor: saving ? "not-allowed" : "pointer",
                boxShadow: "0 4px 12px rgba(16, 185, 129, 0.25)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>{saving ? "⏳" : "💾"}</span>
              <span>{saving ? "Guardando..." : "Guardar Cambios"}</span>
            </button>
          </div>
        </header>

        {/* Content Container */}
        <div style={{ flex: 1, padding: "2.5rem", overflowY: "auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <StatCard icon="💉" label="SERVICIOS ACTIVOS" count={content.services?.length || 0} color="#3B82F6" />
            <StatCard icon="💰" label="TARIFAS Y PLANES" count={content.rates?.length || 0} color="#F59E0B" />
            <StatCard icon="📰" label="ARTÍCULOS BLOG" count={content.blogs?.length || 0} color="#8B5CF6" />
            <StatCard icon="⭐" label="RESEÑAS GOOGLE" count={content.reviews?.length || 0} color="#10B981" />
          </div>

          <div
            style={{
              backgroundColor: DESIGN.successLight,
              border: `1px solid #A7F3D0`,
              color: DESIGN.successText,
              padding: "0.9rem 1.25rem",
              borderRadius: "10px",
              fontSize: "0.9rem",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "2rem",
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>✅</span>
            <span>Al pulsar "Añadir Nuevo", los campos se crean limpios y vacíos para que introduzcas el título, descripción e imagen deseados.</span>
          </div>

          {activeTab === "hero" && (
            <HeroTab hero={content.hero} onChange={(hero) => setContent({ ...content, hero })} />
          )}

          {activeTab === "services" && (
            <ServicesTab
              services={content.services || []}
              filter={searchFilter}
              onChange={(services) => setContent({ ...content, services })}
              onUploadImage={triggerFileUpload}
            />
          )}

          {activeTab === "rates" && (
            <RatesTab
              rates={content.rates || []}
              filter={searchFilter}
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
              filter={searchFilter}
              onChange={(blogs) => setContent({ ...content, blogs })}
              onUploadImage={triggerFileUpload}
            />
          )}

          {activeTab === "reviews" && (
            <ReviewsTab
              reviews={content.reviews || []}
              filter={searchFilter}
              onChange={(reviews) => setContent({ ...content, reviews })}
              onUploadImage={triggerFileUpload}
            />
          )}

          {activeTab === "faq" && (
            <FaqTab
              faq={content.faq || []}
              filter={searchFilter}
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

// ── KPI Summary Card Component ─────────────────────────────────
function StatCard({ icon, label, count, color }) {
  return (
    <div
      style={{
        backgroundColor: DESIGN.cardBg,
        borderRadius: "12px",
        padding: "1.25rem 1.5rem",
        border: `1px solid ${DESIGN.border}`,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
        display: "flex",
        alignItems: "center",
        gap: "1.2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "4px",
          backgroundColor: color,
        }}
      />
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          backgroundColor: `${color}15`,
          color: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontSize: "0.72rem", fontWeight: "800", color: DESIGN.textMuted, letterSpacing: "0.05em" }}>
          {label}
        </div>
        <div style={{ fontSize: "1.75rem", fontWeight: "900", color: DESIGN.textMain, lineHeight: 1.1 }}>
          {count}
        </div>
      </div>
    </div>
  );
}

// ── Reusable Form Image Upload Field Component ────────────────
function ImageField({ label, value, onChange, onUploadImage }) {
  return (
    <div style={{ marginBottom: "1.2rem" }}>
      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem", color: DESIGN.textMain }}>
        {label}
      </label>
      <div style={{ display: "flex", gap: "0.6rem" }}>
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Subir imagen o pegar URL..."
          style={{
            flex: 1,
            padding: "0.65rem 0.9rem",
            borderRadius: "8px",
            border: `1px solid ${DESIGN.border}`,
            fontSize: "0.9rem",
            backgroundColor: DESIGN.mainBg,
          }}
        />
        <button
          type="button"
          onClick={() => onUploadImage((url) => onChange(url))}
          style={{
            padding: "0.65rem 1.1rem",
            backgroundColor: DESIGN.primary,
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "700",
            cursor: "pointer",
            fontSize: "0.85rem",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 6px rgba(37, 99, 235, 0.2)",
          }}
        >
          📤 Subir Imagen
        </button>
      </div>
      {value ? (
        <div style={{ marginTop: "0.6rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: "90px", height: "60px", borderRadius: "8px", overflow: "hidden", border: `1px solid ${DESIGN.border}` }}>
            <img src={value} alt="Vista previa" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <span style={{ fontSize: "0.78rem", color: DESIGN.textMuted }}>
            Vista previa de la imagen cargada
          </span>
        </div>
      ) : (
        <div style={{ marginTop: "0.4rem", fontSize: "0.78rem", color: DESIGN.textMuted }}>
          📷 Ninguna imagen asignada aún. Pulsa <strong>"Subir Imagen"</strong> para seleccionar una foto de tu equipo.
        </div>
      )}
    </div>
  );
}

// ── Hero Tab ──────────────────────────────────────────────────
function HeroTab({ hero = {}, onChange }) {
  return (
    <div style={{ backgroundColor: DESIGN.cardBg, padding: "2rem", borderRadius: "14px", border: `1px solid ${DESIGN.border}` }}>
      <h2 style={{ marginTop: 0, marginBottom: "1.5rem", fontSize: "1.2rem", fontWeight: "800" }}>
        Sección de Portada / Hero Banner
      </h2>

      <div style={{ marginBottom: "1.2rem" }}>
        <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Insignia / Badge Superior</label>
        <input
          type="text"
          value={hero.badgeText || ""}
          placeholder="ej: ⭐ Servicio de Enfermería Profesional"
          onChange={(e) => onChange({ ...hero, badgeText: e.target.value })}
          style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
        />
      </div>

      <div style={{ marginBottom: "1.2rem" }}>
        <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Título Principal (H1)</label>
        <input
          type="text"
          value={hero.heading || ""}
          placeholder="ej: Enfermera a domicilio en Zaragoza"
          onChange={(e) => onChange({ ...hero, heading: e.target.value })}
          style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
        />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Descripción / Puntos Clave</label>
        <textarea
          rows={4}
          value={hero.body || ""}
          placeholder="Escribe la descripción o puntos principales del encabezado..."
          onChange={(e) => onChange({ ...hero, body: e.target.value })}
          style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}`, fontFamily: "inherit" }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Texto Botón Principal</label>
          <input
            type="text"
            value={hero.primaryCtaText || ""}
            placeholder="ej: Solicitar Atención"
            onChange={(e) => onChange({ ...hero, primaryCtaText: e.target.value })}
            style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Enlace Botón Principal (URL)</label>
          <input
            type="text"
            value={hero.primaryCtaUrl || ""}
            placeholder="ej: https://wa.me/34641635705"
            onChange={(e) => onChange({ ...hero, primaryCtaUrl: e.target.value })}
            style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Services Tab ──────────────────────────────────────────────
function ServicesTab({ services = [], filter = "", onChange, onUploadImage }) {
  function updateService(index, updatedItem) {
    const list = [...services];
    list[index] = updatedItem;
    onChange(list);
  }

  // CLEAN EMPTY CREATION: NO hardcoded sample images or dummy text!
  function addService() {
    onChange([
      {
        id: `service_${Date.now()}`,
        title: "",
        desc: "",
        price: "",
        image: "",
      },
      ...services,
    ]);
  }

  function deleteService(index) {
    if (confirm("¿Seguro que deseas eliminar este servicio?")) {
      onChange(services.filter((_, i) => i !== index));
    }
  }

  const filtered = services.filter((s) => (s.title || "").toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "800" }}>Catálogo de Servicios</h2>
          <span style={{ fontSize: "0.85rem", color: DESIGN.textMuted }}>{services.length} servicios registrados</span>
        </div>
        <button
          onClick={addService}
          style={{
            padding: "0.75rem 1.4rem",
            backgroundColor: DESIGN.primary,
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(37, 99, 235, 0.2)",
          }}
        >
          + Añadir Nuevo Servicio
        </button>
      </div>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {filtered.map((item, idx) => (
          <div
            key={item.id || idx}
            style={{
              backgroundColor: DESIGN.cardBg,
              padding: "1.75rem",
              borderRadius: "14px",
              border: `1px solid ${DESIGN.border}`,
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontWeight: "800", color: DESIGN.primary, backgroundColor: `${DESIGN.primary}15`, padding: "0.2rem 0.6rem", borderRadius: "6px", fontSize: "0.85rem" }}>
                  #{idx + 1}
                </span>
                <span style={{ fontWeight: "800", fontSize: "1.1rem" }}>{item.title || "Nuevo Servicio Sin Título"}</span>
              </div>
              <button
                onClick={() => deleteService(idx)}
                style={{ color: DESIGN.danger, border: "none", background: "none", cursor: "pointer", fontWeight: "700", fontSize: "0.9rem" }}
              >
                🗑️ Eliminar
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Título del Servicio</label>
                <input
                  type="text"
                  value={item.title || ""}
                  placeholder="Introduce el título del servicio..."
                  onChange={(e) => updateService(idx, { ...item, title: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Etiqueta de Precio</label>
                <input
                  type="text"
                  value={item.price || ""}
                  placeholder="ej: Desde 12 €/h o Precio a consultar"
                  onChange={(e) => updateService(idx, { ...item, price: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
                />
              </div>
            </div>

            <ImageField
              label="Fotografía / Ilustración del Servicio"
              value={item.image}
              onChange={(url) => updateService(idx, { ...item, image: url })}
              onUploadImage={onUploadImage}
            />

            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Descripción del Servicio</label>
              <textarea
                rows={3}
                value={item.desc || ""}
                placeholder="Escribe la descripción del servicio que verán tus pacientes..."
                onChange={(e) => updateService(idx, { ...item, desc: e.target.value })}
                style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}`, fontFamily: "inherit" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Rates Tab ─────────────────────────────────────────────────
function RatesTab({ rates = [], filter = "", onChange }) {
  function updateRate(index, updatedItem) {
    const list = [...rates];
    list[index] = updatedItem;
    onChange(list);
  }

  // CLEAN EMPTY CREATION: NO hardcoded dummy text!
  function addRate() {
    onChange([
      {
        id: `rate_${Date.now()}`,
        title: "",
        price: "",
        desc: "",
        features: [],
        recommended: false,
      },
      ...rates,
    ]);
  }

  function deleteRate(index) {
    if (confirm("¿Eliminar esta tarjeta de tarifa?")) {
      onChange(rates.filter((_, i) => i !== index));
    }
  }

  const filtered = rates.filter((r) => (r.title || "").toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "800" }}>Tarifas y Tarjetas de Precios</h2>
          <span style={{ fontSize: "0.85rem", color: DESIGN.textMuted }}>{rates.length} tarifas configuradas</span>
        </div>
        <button
          onClick={addRate}
          style={{
            padding: "0.75rem 1.4rem",
            backgroundColor: DESIGN.primary,
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          + Añadir Tarifa
        </button>
      </div>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {filtered.map((rate, idx) => (
          <div
            key={rate.id || idx}
            style={{
              backgroundColor: DESIGN.cardBg,
              padding: "1.75rem",
              borderRadius: "14px",
              border: `1px solid ${DESIGN.border}`,
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
              <span style={{ fontWeight: "800", color: DESIGN.primary }}>Tarifa #{idx + 1}</span>
              <button onClick={() => deleteRate(idx)} style={{ color: DESIGN.danger, border: "none", background: "none", cursor: "pointer", fontWeight: "700" }}>
                🗑️ Eliminar
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Nombre Tarifa</label>
                <input
                  type="text"
                  value={rate.title || ""}
                  placeholder="ej: Servicio Básico"
                  onChange={(e) => updateRate(idx, { ...rate, title: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Precio Mostrado</label>
                <input
                  type="text"
                  value={rate.price || ""}
                  placeholder="ej: Desde 38€"
                  onChange={(e) => updateRate(idx, { ...rate, price: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>¿Destacado / Popular?</label>
                <select
                  value={rate.recommended ? "true" : "false"}
                  onChange={(e) => updateRate(idx, { ...rate, recommended: e.target.value === "true" })}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
                >
                  <option value="false">No</option>
                  <option value="true">Sí ⭐ (Destacado)</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: "1.2rem" }}>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Descripción breve</label>
              <input
                type="text"
                value={rate.desc || ""}
                placeholder="Escribe un breve resumen de esta tarifa..."
                onChange={(e) => updateRate(idx, { ...rate, desc: e.target.value })}
                style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Puntos Incluidos (separados por coma)</label>
              <input
                type="text"
                value={Array.isArray(rate.features) ? rate.features.join(", ") : rate.features || ""}
                placeholder="Inyectables, Control de constantes, Curas sencillas..."
                onChange={(e) => updateRate(idx, { ...rate, features: e.target.value ? e.target.value.split(",").map((s) => s.trim()) : [] })}
                style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Bonos Tab ─────────────────────────────────────────────────
function BonosTab({ bonos = [], onChange }) {
  function updateBono(index, updatedItem) {
    const list = [...bonos];
    list[index] = updatedItem;
    onChange(list);
  }

  return (
    <div style={{ backgroundColor: DESIGN.cardBg, padding: "2rem", borderRadius: "14px", border: `1px solid ${DESIGN.border}` }}>
      <h2 style={{ marginTop: 0, marginBottom: "1.5rem", fontSize: "1.2rem", fontWeight: "800" }}>
        Tabla de Bonos de Heparina / Sesiones
      </h2>
      <div style={{ display: "grid", gap: "1rem" }}>
        {bonos.map((bono, idx) => (
          <div key={bono.id || idx} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "1rem", alignItems: "center", padding: "1rem", backgroundColor: DESIGN.mainBg, borderRadius: "10px", border: `1px solid ${DESIGN.border}` }}>
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: "700", color: DESIGN.textMuted }}>Sesión</label>
              <input
                type="text"
                value={bono.name || ""}
                onChange={(e) => updateBono(idx, { ...bono, name: e.target.value })}
                style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${DESIGN.border}` }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: "700", color: DESIGN.textMuted }}>Precio/Sesión</label>
              <input
                type="text"
                value={bono.price || ""}
                onChange={(e) => updateBono(idx, { ...bono, price: e.target.value })}
                style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${DESIGN.border}` }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: "700", color: DESIGN.textMuted }}>Total Bono</label>
              <input
                type="text"
                value={bono.total || ""}
                onChange={(e) => updateBono(idx, { ...bono, total: e.target.value })}
                style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${DESIGN.border}` }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: "700", color: DESIGN.textMuted }}>Ahorro</label>
              <input
                type="text"
                value={bono.saving || ""}
                onChange={(e) => updateBono(idx, { ...bono, saving: e.target.value })}
                style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: `1px solid ${DESIGN.border}` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Team Tab ──────────────────────────────────────────────────
function TeamTab({ team = {}, onChange, onUploadImage }) {
  const members = team.members || [];
  const paragraphs = team.paragraphs || [];

  function updateMember(index, updatedItem) {
    const list = [...members];
    list[index] = updatedItem;
    onChange({ ...team, members: list });
  }

  // CLEAN EMPTY CREATION: NO hardcoded sample images!
  function addMember() {
    onChange({
      ...team,
      members: [
        {
          id: `member_${Date.now()}`,
          name: "",
          colegiada: "",
          experience: "",
          image: "",
        },
        ...members,
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
      <div style={{ backgroundColor: DESIGN.cardBg, padding: "2rem", borderRadius: "14px", border: `1px solid ${DESIGN.border}`, marginBottom: "2rem" }}>
        <h2 style={{ marginTop: 0, marginBottom: "1.2rem", fontSize: "1.2rem", fontWeight: "800" }}>Sección "¿Quiénes Somos?"</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Título Principal</label>
            <input
              type="text"
              value={team.title || ""}
              placeholder="¿Quienes somos?"
              onChange={(e) => onChange({ ...team, title: e.target.value })}
              style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Subtítulo</label>
            <input
              type="text"
              value={team.subtitle || ""}
              placeholder="Sobre nosotras:"
              onChange={(e) => onChange({ ...team, subtitle: e.target.value })}
              style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Párrafos de Biografía (separados por línea)</label>
          <textarea
            rows={5}
            value={paragraphs.join("\n")}
            placeholder="Escribe cada párrafo de presentación..."
            onChange={(e) => onChange({ ...team, paragraphs: e.target.value.split("\n") })}
            style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}`, fontFamily: "inherit" }}
          />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "800" }}>Enfermeras y Equipo ({members.length})</h2>
        <button onClick={addMember} style={{ padding: "0.75rem 1.4rem", backgroundColor: DESIGN.primary, color: "white", border: "none", borderRadius: "10px", fontWeight: "700", cursor: "pointer" }}>
          + Añadir Miembro
        </button>
      </div>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {members.map((m, idx) => (
          <div key={m.id || idx} style={{ backgroundColor: DESIGN.cardBg, padding: "1.75rem", borderRadius: "14px", border: `1px solid ${DESIGN.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
              <span style={{ fontWeight: "800", color: DESIGN.primary }}>Enfermera #{idx + 1}</span>
              <button onClick={() => deleteMember(idx)} style={{ color: DESIGN.danger, border: "none", background: "none", cursor: "pointer", fontWeight: "700" }}>
                🗑️ Eliminar
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Nombre Completo</label>
                <input
                  type="text"
                  value={m.name || ""}
                  placeholder="Introduce el nombre completo..."
                  onChange={(e) => updateMember(idx, { ...m, name: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Número Colegiada</label>
                <input
                  type="text"
                  value={m.colegiada || ""}
                  placeholder="ej: Colegiada 16521"
                  onChange={(e) => updateMember(idx, { ...m, colegiada: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Experiencia</label>
                <input
                  type="text"
                  value={m.experience || ""}
                  placeholder="ej: +8 años de experiencia"
                  onChange={(e) => updateMember(idx, { ...m, experience: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
                />
              </div>
            </div>

            <ImageField
              label="Fotografía del Miembro del Equipo"
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

// ── Blogs Tab ─────────────────────────────────────────────────
function BlogsTab({ blogs = [], filter = "", onChange, onUploadImage }) {
  function updateBlog(index, updatedItem) {
    const list = [...blogs];
    list[index] = updatedItem;
    onChange(list);
  }

  // CLEAN EMPTY CREATION: NO hardcoded sample images or dummy text!
  function addBlog() {
    const timeId = Date.now();
    const newBlog = {
      id: `blog_${timeId}`,
      title: "",
      slug: "",
      description: "",
      image: "",
      publishedAt: new Date().toISOString().split("T")[0],
      author: "",
      content: "",
    };
    onChange([newBlog, ...blogs]);
  }

  function deleteBlog(index) {
    if (confirm("¿Estás seguro de que deseas eliminar este artículo de blog?")) {
      onChange(blogs.filter((_, i) => i !== index));
    }
  }

  const filtered = blogs.filter((b) => (b.title || "").toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "800" }}>Gestión del Blog y Noticias</h2>
          <span style={{ fontSize: "0.85rem", color: DESIGN.textMuted }}>{blogs.length} artículos publicados</span>
        </div>
        <button
          onClick={addBlog}
          style={{
            padding: "0.75rem 1.4rem",
            backgroundColor: DESIGN.primary,
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          + Crear Nuevo Artículo
        </button>
      </div>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {filtered.map((post, idx) => (
          <div
            key={post.id || idx}
            style={{
              backgroundColor: DESIGN.cardBg,
              padding: "1.75rem",
              borderRadius: "14px",
              border: `1px solid ${DESIGN.border}`,
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
              <span style={{ fontWeight: "800", color: DESIGN.primary }}>Artículo #{idx + 1}</span>
              <button onClick={() => deleteBlog(idx)} style={{ color: DESIGN.danger, border: "none", background: "none", cursor: "pointer", fontWeight: "700" }}>
                🗑️ Eliminar
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Título del Artículo</label>
                <input
                  type="text"
                  value={post.title || ""}
                  placeholder="Introduce el título del artículo..."
                  onChange={(e) => {
                    const titleVal = e.target.value;
                    const autoSlug = titleVal.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    updateBlog(idx, { ...post, title: titleVal, slug: post.slug || autoSlug });
                  }}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Slug / URL (`/blog/slug`)</label>
                <input
                  type="text"
                  value={post.slug || ""}
                  placeholder="slug-del-articulo"
                  onChange={(e) => updateBlog(idx, { ...post, slug: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Fecha de Publicación</label>
                <input
                  type="text"
                  value={post.publishedAt || ""}
                  placeholder="YYYY-MM-DD"
                  onChange={(e) => updateBlog(idx, { ...post, publishedAt: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
                />
              </div>
            </div>

            <ImageField
              label="Imagen de Portada del Artículo"
              value={post.image}
              onChange={(url) => updateBlog(idx, { ...post, image: url })}
              onUploadImage={onUploadImage}
            />

            <div style={{ marginBottom: "1.2rem" }}>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Resumen / Descripción breve</label>
              <textarea
                rows={2}
                value={post.description || ""}
                placeholder="Escribe un breve extracto del artículo para el listado..."
                onChange={(e) => updateBlog(idx, { ...post, description: e.target.value })}
                style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}`, fontFamily: "inherit" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Contenido del Artículo (Texto completo)</label>
              <textarea
                rows={8}
                value={Array.isArray(post.content) ? post.content.join("\n\n") : post.content || ""}
                placeholder="Escribe el texto completo de tu artículo aquí..."
                onChange={(e) => updateBlog(idx, { ...post, content: e.target.value })}
                style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}`, fontFamily: "inherit" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Reviews Tab ───────────────────────────────────────────────
function ReviewsTab({ reviews = [], filter = "", onChange, onUploadImage }) {
  function updateReview(index, updatedItem) {
    const list = [...reviews];
    list[index] = updatedItem;
    onChange(list);
  }

  // CLEAN EMPTY CREATION: NO hardcoded dummy reviews!
  function addReview() {
    onChange([
      {
        id: `rev_${Date.now()}`,
        name: "",
        initial: "",
        avatarBg: "#10B981",
        rating: 5,
        date: "hace unos días",
        text: "",
      },
      ...reviews,
    ]);
  }

  function deleteReview(index) {
    if (confirm("¿Eliminar esta reseña?")) {
      onChange(reviews.filter((_, i) => i !== index));
    }
  }

  const filtered = reviews.filter((r) => (r.name || "").toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "800" }}>Reseñas de Clientes (Google Reviews)</h2>
          <span style={{ fontSize: "0.85rem", color: DESIGN.textMuted }}>{reviews.length} opiniones registradas</span>
        </div>
        <button
          onClick={addReview}
          style={{
            padding: "0.75rem 1.4rem",
            backgroundColor: DESIGN.primary,
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          + Añadir Reseña
        </button>
      </div>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {filtered.map((rev, idx) => (
          <div
            key={rev.id || idx}
            style={{
              backgroundColor: DESIGN.cardBg,
              padding: "1.75rem",
              borderRadius: "14px",
              border: `1px solid ${DESIGN.border}`,
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
              <span style={{ fontWeight: "800", color: DESIGN.primary }}>Reseña #{idx + 1}</span>
              <button onClick={() => deleteReview(idx)} style={{ color: DESIGN.danger, border: "none", background: "none", cursor: "pointer", fontWeight: "700" }}>
                🗑️ Eliminar
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Nombre del Cliente</label>
                <input
                  type="text"
                  value={rev.name || ""}
                  placeholder="ej: María Dolores"
                  onChange={(e) => {
                    const val = e.target.value;
                    const initial = val ? val.charAt(0).toUpperCase() : "";
                    updateReview(idx, { ...rev, name: val, initial: rev.initial || initial });
                  }}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Puntuación (1-5 ⭐)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rev.rating || 5}
                  onChange={(e) => updateReview(idx, { ...rev, rating: Number(e.target.value) })}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Fecha</label>
                <input
                  type="text"
                  value={rev.date || ""}
                  placeholder="ej: hace un mes"
                  onChange={(e) => updateReview(idx, { ...rev, date: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Inicial Avatar</label>
                <input
                  type="text"
                  maxLength={2}
                  value={rev.initial || ""}
                  placeholder="M"
                  onChange={(e) => updateReview(idx, { ...rev, initial: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Texto de la Opinión</label>
              <textarea
                rows={3}
                value={rev.text || ""}
                placeholder="Escribe el comentario del cliente..."
                onChange={(e) => updateReview(idx, { ...rev, text: e.target.value })}
                style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}`, fontFamily: "inherit" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── FAQ Tab ───────────────────────────────────────────────────
function FaqTab({ faq = [], filter = "", onChange }) {
  function updateFaq(index, updatedItem) {
    const list = [...faq];
    list[index] = updatedItem;
    onChange(list);
  }

  // CLEAN EMPTY CREATION: NO hardcoded dummy questions!
  function addFaq() {
    onChange([
      {
        id: `faq_${Date.now()}`,
        question: "",
        answer: "",
      },
      ...faq,
    ]);
  }

  function deleteFaq(index) {
    if (confirm("¿Eliminar esta pregunta frecuente?")) {
      onChange(faq.filter((_, i) => i !== index));
    }
  }

  const filtered = faq.filter((f) => (f.question || "").toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "800" }}>Preguntas Frecuentes (FAQ)</h2>
          <span style={{ fontSize: "0.85rem", color: DESIGN.textMuted }}>{faq.length} preguntas disponibles</span>
        </div>
        <button
          onClick={addFaq}
          style={{
            padding: "0.75rem 1.4rem",
            backgroundColor: DESIGN.primary,
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          + Añadir Pregunta
        </button>
      </div>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {filtered.map((item, idx) => (
          <div
            key={item.id || idx}
            style={{
              backgroundColor: DESIGN.cardBg,
              padding: "1.75rem",
              borderRadius: "14px",
              border: `1px solid ${DESIGN.border}`,
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
              <span style={{ fontWeight: "800", color: DESIGN.primary }}>Pregunta #{idx + 1}</span>
              <button onClick={() => deleteFaq(idx)} style={{ color: DESIGN.danger, border: "none", background: "none", cursor: "pointer", fontWeight: "700" }}>
                🗑️ Eliminar
              </button>
            </div>

            <div style={{ marginBottom: "1.2rem" }}>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Pregunta</label>
              <input
                type="text"
                value={item.question || ""}
                placeholder="¿Cuál es tu pregunta?"
                onChange={(e) => updateFaq(idx, { ...item, question: e.target.value })}
                style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Respuesta</label>
              <textarea
                rows={3}
                value={item.answer || ""}
                placeholder="Escribe aquí la respuesta detallada..."
                onChange={(e) => updateFaq(idx, { ...item, answer: e.target.value })}
                style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}`, fontFamily: "inherit" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Gallery / Image Upload Tab ────────────────────────────────
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
    <div style={{ backgroundColor: DESIGN.cardBg, padding: "2rem", borderRadius: "14px", border: `1px solid ${DESIGN.border}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "800" }}>Gestor de Imágenes e Ilustraciones</h2>
          <span style={{ fontSize: "0.85rem", color: DESIGN.textMuted }}>Archivos y fotos disponibles</span>
        </div>
        <button
          onClick={handleUploadNew}
          style={{
            padding: "0.75rem 1.4rem",
            backgroundColor: DESIGN.primary,
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          📤 Subir Nueva Imagen
        </button>
      </div>

      <p style={{ color: DESIGN.textMuted, fontSize: "0.92rem", marginBottom: "2rem" }}>
        Sube imágenes aquí para obtener su enlace interno y usarlas en cualquier banner, servicio o artículo.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
        {uploadedImages.map((url, i) => (
          <div key={i} style={{ borderRadius: "12px", overflow: "hidden", border: `1px solid ${DESIGN.border}`, backgroundColor: DESIGN.mainBg }}>
            <div style={{ width: "100%", height: "140px", overflow: "hidden" }}>
              <img src={url} alt="Gallery item" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "0.85rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", color: DESIGN.textMuted, wordBreak: "break-all", marginBottom: "0.6rem" }}>{url}</div>
              <button
                onClick={() => copyToClipboard(url)}
                style={{ padding: "0.45rem 0.8rem", backgroundColor: DESIGN.primary, color: "white", border: "none", borderRadius: "6px", fontSize: "0.8rem", fontWeight: "700", cursor: "pointer", width: "100%" }}
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

// ── Settings Tab ──────────────────────────────────────────────
function SettingsTab({ settings = {}, onChange }) {
  return (
    <div style={{ backgroundColor: DESIGN.cardBg, padding: "2rem", borderRadius: "14px", border: `1px solid ${DESIGN.border}` }}>
      <h2 style={{ marginTop: 0, marginBottom: "1.5rem", fontSize: "1.2rem", fontWeight: "800" }}>Configuración del Sitio & Contacto</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Nombre Marca / Empresa</label>
          <input
            type="text"
            value={settings.siteName || ""}
            placeholder="Enfermera en tu casa"
            onChange={(e) => onChange({ ...settings, siteName: e.target.value })}
            style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Teléfono Principal</label>
          <input
            type="text"
            value={settings.phone || ""}
            placeholder="+34 641 63 57 05"
            onChange={(e) => onChange({ ...settings, phone: e.target.value })}
            style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Enlace WhatsApp (`https://wa.me/...`)</label>
          <input
            type="text"
            value={settings.whatsapp || ""}
            placeholder="https://wa.me/34641635705"
            onChange={(e) => onChange({ ...settings, whatsapp: e.target.value })}
            style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Correo Electrónico (Email)</label>
          <input
            type="text"
            value={settings.email || ""}
            placeholder="info@enfermeraentucasa.es"
            onChange={(e) => onChange({ ...settings, email: e.target.value })}
            style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Ubicación / Ciudad</label>
          <input
            type="text"
            value={settings.location || ""}
            placeholder="Zaragoza, España"
            onChange={(e) => onChange({ ...settings, location: e.target.value })}
            style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Horarios de Atención</label>
          <input
            type="text"
            value={settings.hours || ""}
            placeholder="Lunes a Domingo - Adaptación total"
            onChange={(e) => onChange({ ...settings, hours: e.target.value })}
            style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
          />
        </div>
      </div>

      <div style={{ marginBottom: "1.2rem" }}>
        <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.4rem" }}>Texto del Banner Rojo de Alerta Superior</label>
        <input
          type="text"
          value={settings.emergencyBannerText || ""}
          placeholder="🚨 ¿Necesitas atención urgente o consulta rápida? Contáctanos por WhatsApp o Teléfono"
          onChange={(e) => onChange({ ...settings, emergencyBannerText: e.target.value })}
          style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: `1px solid ${DESIGN.border}` }}
        />
      </div>
    </div>
  );
}
