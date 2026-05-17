import { useState, useEffect } from "react";

const SUPABASE_URL = "https://efvdubwbpforbwjokvrl.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const PLAN_LABELS = { starter: "Starter", standard: "Standard", premium: "Premium" };
const PLAN_COLORS = { starter: "#22c55e", standard: "#3b82f6", premium: "#f59e0b" };
const OPERATEUR_LABELS = { mtn_momo: "MTN MoMo", orange_money: "Orange Money", wave: "Wave" };

function formatFCFA(amount) {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div style={{
      background: "#0f172a",
      border: `1px solid ${color}33`,
      borderRadius: 16,
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 80, height: 80,
        background: `radial-gradient(circle at top right, ${color}22, transparent 70%)`,
      }} />
      <div style={{ fontSize: 28 }}>{icon}</div>
      <div style={{ color: "#94a3b8", fontSize: 13, fontFamily: "monospace", letterSpacing: 1 }}>{label.toUpperCase()}</div>
      <div style={{ color: color, fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ color: "#64748b", fontSize: 12 }}>{sub}</div>}
    </div>
  );
}

function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.montant), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 100, padding: "0 4px" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{
            width: "100%",
            height: `${(d.montant / max) * 80}px`,
            background: `linear-gradient(to top, #22c55e, #4ade80)`,
            borderRadius: "4px 4px 0 0",
            minHeight: d.montant > 0 ? 4 : 0,
            transition: "height 0.6s ease",
          }} />
          <div style={{ color: "#64748b", fontSize: 10, textAlign: "center" }}>{d.mois}</div>
        </div>
      ))}
    </div>
  );
}

export default function DashboardRevenuPage() {
  const [paiements, setPaiements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/abonnements_paiements?select=*&order=created_at.desc`,
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
        }
      );
      if (!res.ok) throw new Error("Erreur Supabase");
      const data = await res.json();
      setPaiements(data);
      setLastRefresh(new Date());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Stats calculées
  const confirmes = paiements.filter(p => p.statut === "confirme");
  const totalRevenu = confirmes.reduce((sum, p) => sum + (p.montant || 0), 0);
  const abonnesActifs = confirmes.filter(p => new Date(p.periode_fin) >= new Date()).length;

  // Par plan
  const parPlan = ["starter", "standard", "premium"].map(plan => ({
    plan,
    count: confirmes.filter(p => p.plan === plan).length,
    montant: confirmes.filter(p => p.plan === plan).reduce((s, p) => s + (p.montant || 0), 0),
  }));

  // Par opérateur
  const parOperateur = ["mtn_momo", "orange_money"].map(op => ({
    op,
    count: confirmes.filter(p => p.operateur === op).length,
    montant: confirmes.filter(p => p.operateur === op).reduce((s, p) => s + (p.montant || 0), 0),
  }));

  // Évolution 6 derniers mois
  const moisLabels = [];
  const evolution = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const label = d.toLocaleDateString("fr-FR", { month: "short" });
    const mois = d.getMonth();
    const annee = d.getFullYear();
    const montant = confirmes
      .filter(p => {
        const c = new Date(p.created_at);
        return c.getMonth() === mois && c.getFullYear() === annee;
      })
      .reduce((s, p) => s + (p.montant || 0), 0);
    moisLabels.push(label);
    evolution.push({ mois: label, montant });
  }

  // Derniers paiements
  const derniers = paiements.slice(0, 5);

  if (loading && paiements.length === 0) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", color: "#22c55e", fontFamily: "monospace" }}>
      Chargement du dashboard...
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "#020617",
      color: "#e2e8f0",
      fontFamily: "'DM Sans', sans-serif",
      padding: "24px 16px 80px",
      maxWidth: 480,
      margin: "0 auto",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#f8fafc", margin: 0, letterSpacing: -0.5 }}>
              💰 Dashboard Revenus
            </h1>
            <p style={{ color: "#475569", fontSize: 12, margin: "4px 0 0", fontFamily: "monospace" }}>
              GTONTINA · Actualisé {lastRefresh.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
          <button
            onClick={fetchData}
            style={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: 10,
              color: "#22c55e",
              padding: "8px 14px",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            ↻ Sync
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: "#1e1010", border: "1px solid #ef4444", borderRadius: 12, padding: 16, marginBottom: 16, color: "#f87171", fontSize: 13 }}>
          ⚠️ {error}
        </div>
      )}

      {/* Stats principales */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        <StatCard icon="💵" label="Revenus totaux" value={formatFCFA(totalRevenu)} sub={`${confirmes.length} paiements`} color="#22c55e" />
        <StatCard icon="👥" label="Abonnés actifs" value={abonnesActifs} sub="Ce mois" color="#3b82f6" />
        <StatCard icon="📅" label="Ce mois" value={formatFCFA(evolution[evolution.length - 1]?.montant || 0)} color="#f59e0b" />
        <StatCard icon="⏳" label="En attente" value={paiements.filter(p => p.statut === "en_attente").length} color="#8b5cf6" />
      </div>

      {/* Évolution mensuelle */}
      <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: "#94a3b8", fontFamily: "monospace", letterSpacing: 1, marginBottom: 16 }}>ÉVOLUTION 6 MOIS</div>
        <BarChart data={evolution} />
      </div>

      {/* Par plan */}
      <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: "#94a3b8", fontFamily: "monospace", letterSpacing: 1, marginBottom: 16 }}>PAR FORMULE</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {parPlan.map(({ plan, count, montant }) => (
            <div key={plan}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: PLAN_COLORS[plan], fontWeight: 600 }}>
                  {PLAN_LABELS[plan]}
                </span>
                <span style={{ fontSize: 13, color: "#94a3b8" }}>
                  {count} abonné{count > 1 ? "s" : ""} · {formatFCFA(montant)}
                </span>
              </div>
              <div style={{ height: 6, background: "#1e293b", borderRadius: 999 }}>
                <div style={{
                  height: "100%",
                  width: `${totalRevenu > 0 ? (montant / totalRevenu) * 100 : 0}%`,
                  background: PLAN_COLORS[plan],
                  borderRadius: 999,
                  transition: "width 0.6s ease",
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Par opérateur */}
      <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: "#94a3b8", fontFamily: "monospace", letterSpacing: 1, marginBottom: 16 }}>PAR OPÉRATEUR</div>
        <div style={{ display: "flex", gap: 12 }}>
          {parOperateur.map(({ op, count, montant }) => (
            <div key={op} style={{
              flex: 1, background: "#020617", borderRadius: 12, padding: 14,
              border: "1px solid #1e293b", textAlign: "center"
            }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>
                {op === "mtn_momo" ? "🟡" : "🟠"}
              </div>
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>{OPERATEUR_LABELS[op]}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#f8fafc" }}>{count}</div>
              <div style={{ fontSize: 11, color: "#475569" }}>{formatFCFA(montant)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Derniers paiements */}
      <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: 20 }}>
        <div style={{ fontSize: 13, color: "#94a3b8", fontFamily: "monospace", letterSpacing: 1, marginBottom: 16 }}>DERNIERS PAIEMENTS</div>
        {derniers.length === 0 ? (
          <div style={{ color: "#475569", fontSize: 13, textAlign: "center", padding: "20px 0" }}>
            Aucun paiement enregistré
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {derniers.map((p) => (
              <div key={p.id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 14px", background: "#020617", borderRadius: 10,
                border: `1px solid ${p.statut === "confirme" ? "#22c55e22" : "#1e293b"}`,
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>
                    {PLAN_LABELS[p.plan] || p.plan}
                  </div>
                  <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>
                    {OPERATEUR_LABELS[p.operateur] || p.operateur} · {formatDate(p.created_at)}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: p.statut === "confirme" ? "#22c55e" : "#f59e0b" }}>
                    {formatFCFA(p.montant)}
                  </div>
                  <div style={{
                    fontSize: 10, fontFamily: "monospace",
                    color: p.statut === "confirme" ? "#22c55e" : "#f59e0b",
                    textTransform: "uppercase", letterSpacing: 1,
                  }}>
                    {p.statut}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
