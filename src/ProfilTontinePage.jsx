import { useState, useEffect } from "react";

const SUPABASE_URL = "https://efvdubwbpforbwjokvrl.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

function api(path, options = {}) {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(options.headers || {}),
    },
  });
}

function formatFCFA(n) {
  return new Intl.NumberFormat("fr-FR").format(n || 0) + " FCFA";
}

function formatPct(n) {
  return (Number(n) || 0).toFixed(1) + "%";
}

// ─── Écran de connexion par téléphone ────────────────────────────────────────
function EcranConnexion({ onConnect }) {
  const [tel, setTel] = useState("");
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState("");

  async function handleSubmit() {
    const clean = tel.replace(/\s/g, "");
    if (clean.length < 9) { setErreur("Numéro invalide"); return; }
    setLoading(true); setErreur("");
    try {
      const res = await api(`profils?telephone=eq.${encodeURIComponent(clean)}&select=*`);
      const data = await res.json();
      if (!data.length) { setErreur("Numéro non trouvé dans GTONTINA"); return; }
      onConnect(data[0]);
    } catch {
      setErreur("Erreur de connexion, réessayez");
    } finally { setLoading(false); }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={{ fontSize: 48, textAlign: "center", marginBottom: 8 }}>🤝</div>
        <h2 style={styles.title}>Mon espace tontine</h2>
        <p style={{ color: "#64748b", fontSize: 13, textAlign: "center", marginBottom: 24 }}>
          Entrez votre numéro pour accéder à votre tontine
        </p>
        <label style={styles.label}>Numéro de téléphone</label>
        <input
          style={styles.input}
          type="tel"
          placeholder="Ex: 697368463"
          value={tel}
          onChange={e => setTel(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
        />
        {erreur && <div style={styles.erreur}>{erreur}</div>}
        <button
          style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Recherche..." : "Accéder à ma tontine →"}
        </button>
      </div>
    </div>
  );
}

// ─── Indicateur taux d'intérêt ────────────────────────────────────────────────
function TauxCard({ prets }) {
  const actifs = prets.filter(p => p.statut === "approuve" || p.statut === "en_cours");
  const totalEmprunte = actifs.reduce((s, p) => s + (p.montant_demande || 0), 0);
  const totalDu = actifs.reduce((s, p) => s + (p.montant_total_du || 0), 0);
  const totalRembourse = actifs.reduce((s, p) => s + (p.montant_rembourse || 0), 0);
  const resteAPayer = totalDu - totalRembourse;
  const tauxMoyen = actifs.length
    ? actifs.reduce((s, p) => s + Number(p.taux_interet || 0), 0) / actifs.length
    : 0;
  const progression = totalDu > 0 ? (totalRembourse / totalDu) * 100 : 0;

  if (!actifs.length) return (
    <div style={{ ...styles.section, textAlign: "center", color: "#475569", padding: "32px 20px" }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
      <div style={{ fontSize: 14 }}>Aucun prêt actif en cours</div>
    </div>
  );

  return (
    <div style={styles.section}>
      <div style={styles.sectionTitle}>📈 Taux d'intérêt en temps réel</div>

      {/* Taux moyen */}
      <div style={styles.tauxBadge}>
        <div style={{ fontSize: 36, fontWeight: 800, color: "#22c55e" }}>
          {formatPct(tauxMoyen)}
        </div>
        <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Taux mensuel moyen</div>
      </div>

      {/* Détails */}
      <div style={styles.rowGrid}>
        <div style={styles.miniCard}>
          <div style={styles.miniLabel}>Emprunté</div>
          <div style={styles.miniVal}>{formatFCFA(totalEmprunte)}</div>
        </div>
        <div style={styles.miniCard}>
          <div style={styles.miniLabel}>Total dû</div>
          <div style={{ ...styles.miniVal, color: "#f59e0b" }}>{formatFCFA(totalDu)}</div>
        </div>
        <div style={styles.miniCard}>
          <div style={styles.miniLabel}>Remboursé</div>
          <div style={{ ...styles.miniVal, color: "#22c55e" }}>{formatFCFA(totalRembourse)}</div>
        </div>
        <div style={styles.miniCard}>
          <div style={styles.miniLabel}>Reste à payer</div>
          <div style={{ ...styles.miniVal, color: "#ef4444" }}>{formatFCFA(resteAPayer)}</div>
        </div>
      </div>

      {/* Barre de progression */}
      <div style={{ marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>Progression remboursement</span>
          <span style={{ fontSize: 12, color: "#22c55e", fontWeight: 700 }}>{progression.toFixed(0)}%</span>
        </div>
        <div style={{ height: 8, background: "#1e293b", borderRadius: 999 }}>
          <div style={{
            height: "100%",
            width: `${progression}%`,
            background: "linear-gradient(to right, #22c55e, #4ade80)",
            borderRadius: 999,
            transition: "width 0.6s ease",
          }} />
        </div>
      </div>

      {/* Liste des prêts actifs */}
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 10, fontFamily: "monospace", letterSpacing: 1 }}>
          PRÊTS ACTIFS
        </div>
        {actifs.map(p => (
          <div key={p.id} style={styles.pretRow}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>
                {formatFCFA(p.montant_demande)}
              </div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>
                {p.duree_mois} mois · {p.date_fin_prevue ? `Fin: ${new Date(p.date_fin_prevue).toLocaleDateString("fr-FR")}` : ""}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, color: "#22c55e", fontWeight: 700 }}>
                {formatPct(p.taux_interet)}/mois
              </div>
              <div style={{ fontSize: 11, color: "#64748b" }}>
                Reste: {formatFCFA((p.montant_total_du || 0) - (p.montant_rembourse || 0))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function ProfilTontinePage() {
  const [profil, setProfil] = useState(null);
  const [organisation, setOrganisation] = useState(null);
  const [prets, setPrets] = useState([]);
  const [membre, setMembre] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nomEdit, setNomEdit] = useState(false);
  const [nomValue, setNomValue] = useState("");
  const [savingNom, setSavingNom] = useState(false);
  const [nomMsg, setNomMsg] = useState("");

  useEffect(() => {
    if (!profil) return;
    chargerDonnees();
  }, [profil]);

  async function chargerDonnees() {
    setLoading(true);
    try {
      // Récupérer membre → organisation
      const memRes = await api(`membres?profil_id=eq.${profil.id}&select=*`);
      const memData = await memRes.json();
      if (memData.length) {
        setMembre(memData[0]);
        // Organisation
        const orgRes = await api(`organisations?id=eq.${memData[0].organisation_id}&select=*`);
        const orgData = await orgRes.json();
        if (orgData.length) {
          setOrganisation(orgData[0]);
          setNomValue(orgData[0].nom || "");
          // Prêts du membre dans cette caisse
          const pretRes = await api(
            `prets?demandeur_id=eq.${profil.id}&select=*&order=created_at.desc`
          );
          const pretData = await pretRes.json();
          setPrets(pretData);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function sauvegarderNom() {
    if (!organisation || !nomValue.trim()) return;
    setSavingNom(true); setNomMsg("");
    try {
      const res = await api(
        `organisations?id=eq.${organisation.id}`,
        { method: "PATCH", body: JSON.stringify({ nom: nomValue.trim(), updated_at: new Date().toISOString() }) }
      );
      if (res.ok) {
        setOrganisation({ ...organisation, nom: nomValue.trim() });
        setNomEdit(false);
        setNomMsg("✅ Nom mis à jour !");
        setTimeout(() => setNomMsg(""), 3000);
      }
    } catch { setNomMsg("❌ Erreur, réessayez"); }
    finally { setSavingNom(false); }
  }

  if (!profil) return <EcranConnexion onConnect={setProfil} />;

  if (loading) return (
    <div style={{ ...styles.page, justifyContent: "center", alignItems: "center" }}>
      <div style={{ color: "#22c55e", fontFamily: "monospace" }}>Chargement...</div>
    </div>
  );

  return (
    <div style={styles.page}>
      {/* Header profil */}
      <div style={styles.header}>
        <div style={styles.avatar}>
          {(profil.prenom || "?")[0].toUpperCase()}
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#f8fafc" }}>
            {profil.prenom} {profil.nom}
          </div>
          <div style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>
            📱 {profil.telephone}
          </div>
          {membre && (
            <div style={{ fontSize: 11, color: "#22c55e", marginTop: 4, fontFamily: "monospace" }}>
              {membre.role?.toUpperCase()} · {membre.statut}
            </div>
          )}
        </div>
        <button
          style={styles.logoutBtn}
          onClick={() => { setProfil(null); setOrganisation(null); setPrets([]); setMembre(null); }}
        >
          ⏏
        </button>
      </div>

      {!organisation ? (
        <div style={{ ...styles.section, textAlign: "center", color: "#475569", padding: "32px 20px" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
          <div>Aucune tontine trouvée pour ce profil</div>
        </div>
      ) : (
        <>
          {/* Nom de la tontine */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>🏷️ Nom de ma tontine</div>
            {nomEdit ? (
              <div>
                <input
                  style={styles.input}
                  value={nomValue}
                  onChange={e => setNomValue(e.target.value)}
                  placeholder="Ex: Tontine des Femmes Actives"
                  autoFocus
                />
                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <button style={styles.btn} onClick={sauvegarderNom} disabled={savingNom}>
                    {savingNom ? "Sauvegarde..." : "✅ Sauvegarder"}
                  </button>
                  <button
                    style={{ ...styles.btn, background: "#1e293b", color: "#94a3b8" }}
                    onClick={() => { setNomEdit(false); setNomValue(organisation.nom || ""); }}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#22c55e" }}>
                  {organisation.nom || "Sans nom"}
                </div>
                <button style={styles.editBtn} onClick={() => setNomEdit(true)}>
                  ✏️ Modifier
                </button>
              </div>
            )}
            {nomMsg && <div style={{ fontSize: 13, color: "#22c55e", marginTop: 8 }}>{nomMsg}</div>}

            {/* Infos tontine */}
            <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
              {organisation.ville && (
                <span style={styles.badge}>📍 {organisation.ville}</span>
              )}
              {organisation.plan && (
                <span style={styles.badge}>⭐ {organisation.plan}</span>
              )}
              {organisation.max_membres && (
                <span style={styles.badge}>👥 Max {organisation.max_membres} membres</span>
              )}
            </div>
          </div>

          {/* Taux d'intérêt */}
          <TauxCard prets={prets} />
        </>
      )}
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  page: {
    minHeight: "100vh",
    background: "#020617",
    color: "#e2e8f0",
    fontFamily: "'DM Sans', sans-serif",
    padding: "24px 16px 100px",
    maxWidth: 480,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  card: {
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: 20,
    padding: 28,
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 800,
    color: "#f8fafc",
    textAlign: "center",
    margin: "0 0 4px",
  },
  label: { fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 6 },
  input: {
    width: "100%",
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: 10,
    padding: "12px 14px",
    color: "#f8fafc",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    marginBottom: 4,
  },
  erreur: {
    color: "#ef4444",
    fontSize: 13,
    margin: "8px 0",
    padding: "8px 12px",
    background: "#1e1010",
    borderRadius: 8,
    border: "1px solid #ef444433",
  },
  btn: {
    width: "100%",
    background: "#22c55e",
    color: "#020617",
    border: "none",
    borderRadius: 12,
    padding: "14px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 12,
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: 16,
    padding: "16px 20px",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: 800,
    color: "#020617",
    flexShrink: 0,
  },
  logoutBtn: {
    marginLeft: "auto",
    background: "#1e293b",
    border: "none",
    borderRadius: 8,
    color: "#64748b",
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: 16,
  },
  section: {
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#94a3b8",
    marginBottom: 16,
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
  editBtn: {
    background: "#1e293b",
    border: "none",
    borderRadius: 8,
    color: "#94a3b8",
    padding: "6px 12px",
    fontSize: 12,
    cursor: "pointer",
    flexShrink: 0,
  },
  badge: {
    background: "#1e293b",
    color: "#94a3b8",
    borderRadius: 999,
    padding: "4px 10px",
    fontSize: 11,
    fontFamily: "monospace",
  },
  tauxBadge: {
    textAlign: "center",
    background: "#020617",
    borderRadius: 12,
    padding: "20px 16px",
    border: "1px solid #22c55e33",
    marginBottom: 16,
  },
  rowGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  miniCard: {
    background: "#020617",
    borderRadius: 10,
    padding: "12px 14px",
    border: "1px solid #1e293b",
  },
  miniLabel: { fontSize: 11, color: "#64748b", marginBottom: 4, fontFamily: "monospace" },
  miniVal: { fontSize: 15, fontWeight: 700, color: "#f8fafc" },
  pretRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 14px",
    background: "#020617",
    borderRadius: 10,
    border: "1px solid #1e293b",
    marginBottom: 8,
  },
};
