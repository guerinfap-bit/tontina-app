import { useState } from "react";

const WHATSAPP_NUMBER = "237697368463";
const encode = (t) => encodeURIComponent(t);
const waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encode(msg)}`;

const CINETPAY_API_KEY = import.meta.env.VITE_CINETPAY_API_KEY;
const CINETPAY_SITE_ID = import.meta.env.VITE_CINETPAY_SITE_ID;
const CINETPAY_BASE_URL = import.meta.env.VITE_CINETPAY_BASE_URL;

const essaiMsg = "Bonjour GTONTINA 🌿\nJe souhaite démarrer mon *essai gratuit d'une rotation*.\nNotre groupe se réunit : (hebdomadairement / deux fois par mois / mensuellement).\nPouvez-vous m'activer l'accès ?";

const plans = [
  { id: "starter", name: "Starter", members: "Jusqu'à 15 membres", amount: 3000, amountDisplay: "3 000", features: ["Tableau de bord complet", "6 types de caisse", "Rappels WhatsApp"], msg: "Bonjour GTONTINA 🌿\nFormule *Starter* — 3 000 FCFA/mois.\nInstructions de paiement ?" },
  { id: "standard", name: "Standard", members: "Membres illimités", amount: 6000, amountDisplay: "6 000", featured: true, features: ["Tout le Starter inclus", "Membres illimités", "Rapports de réunion", "Messagerie interne"], msg: "Bonjour GTONTINA 🌿\nFormule *Standard* — 6 000 FCFA/mois.\nInstructions de paiement ?" },
  { id: "premium", name: "Premium", members: "Jusqu'à 3 groupes", amount: 12000, amountDisplay: "12 000", features: ["Tout le Standard inclus", "3 groupes de tontine", "Support prioritaire"], msg: "Bonjour GTONTINA 🌿\nFormule *Premium* — 12 000 FCFA/mois.\nInstructions de paiement ?" },
];

const generateTransactionId = () => "GTONTINA-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9).toUpperCase();

async function initierPaiement(plan, client, setStatus) {
  setStatus({ loading: true, error: null, success: false });

  const payload = {
    apikey: CINETPAY_API_KEY,
    site_id: CINETPAY_SITE_ID,
    transaction_id: generateTransactionId(),
    amount: plan.amount,
    currency: "XAF",
    description: `Abonnement GTONTINA ${plan.name}`,
    notify_url: "https://tontina-app.vercel.app/api/cinetpay-notify",
    return_url: "https://tontina-app.vercel.app/?payment=success",
    channels: "MOBILE_MONEY",
    lang: "fr",
    customer_name: client.nom,
    customer_surname: client.nom,
    customer_email: client.email || "client@gtontina.com",
    customer_phone_number: client.telephone,
    customer_address: "Cameroun",
    customer_city: "Douala",
    customer_country: "CM",
    customer_state: "CM",
    customer_zip_code: "00237",
  };

  try {
    const res = await fetch(`${CINETPAY_BASE_URL}/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (data.code === "201" && data.data?.payment_url) {
      setStatus({ loading: false, error: null, success: true });
      window.open(data.data.payment_url, "_blank");
    } else {
      setStatus({ loading: false, error: data.message || "Erreur. Utilisez WhatsApp ci-dessous.", success: false });
    }
  } catch {
    setStatus({ loading: false, error: "Connexion impossible. Utilisez WhatsApp ci-dessous.", success: false });
  }
}

function PlanCard({ plan }) {
  const [status, setStatus] = useState({ loading: false, error: null, success: false });
  const [showForm, setShowForm] = useState(false);
  const [client, setClient] = useState({ nom: "", telephone: "", email: "" });

  const handlePayer = () => {
    if (!showForm) { setShowForm(true); return; }
    if (!client.nom || !client.telephone) {
      setStatus({ loading: false, error: "Veuillez remplir votre nom et téléphone.", success: false });
      return;
    }
    initierPaiement(plan, client, setStatus);
  };

  return (
    <div style={{ border: plan.featured ? "2px solid #3b82f6" : "1px solid #e5e5e5", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: 12 }}>
      {plan.featured && (
        <span style={{ background: "#dbeafe", color: "#1d4ed8", fontSize: 11, padding: "3px 10px", borderRadius: 6, display: "inline-block", marginBottom: 8 }}>
          Le plus populaire
        </span>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{plan.name}</div>
          <div style={{ fontSize: 12, color: "#666" }}>{plan.members}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{plan.amountDisplay}</div>
          <div style={{ fontSize: 12, color: "#666" }}>FCFA / mois</div>
        </div>
      </div>

      {plan.features.map(f => (
        <div key={f} style={{ fontSize: 13, color: "#555", padding: "2px 0" }}>✓ {f}</div>
      ))}

      {showForm && (
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>Vos informations :</div>
          <input
            placeholder="Nom complet *"
            value={client.nom}
            onChange={e => setClient(p => ({ ...p, nom: e.target.value }))}
            style={{ padding: "8px 10px", border: "1px solid #ddd", borderRadius: 8, fontSize: 14, width: "100%", boxSizing: "border-box" }}
          />
          <input
            placeholder="Téléphone MTN/Orange * (ex: 6XXXXXXXX)"
            value={client.telephone}
            onChange={e => setClient(p => ({ ...p, telephone: e.target.value }))}
            style={{ padding: "8px 10px", border: "1px solid #ddd", borderRadius: 8, fontSize: 14, width: "100%", boxSizing: "border-box" }}
          />
          <input
            placeholder="Email (optionnel)"
            value={client.email}
            onChange={e => setClient(p => ({ ...p, email: e.target.value }))}
            style={{ padding: "8px 10px", border: "1px solid #ddd", borderRadius: 8, fontSize: 14, width: "100%", boxSizing: "border-box" }}
          />
        </div>
      )}

      {status.error && (
        <div style={{ marginTop: 10, padding: "8px 10px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, fontSize: 12, color: "#dc2626" }}>
          ⚠️ {status.error}
        </div>
      )}

      {status.success && (
        <div style={{ marginTop: 10, padding: "8px 10px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, fontSize: 12, color: "#16a34a" }}>
          ✅ Redirection vers le paiement...
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
        <button
          onClick={handlePayer}
          disabled={status.loading}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 10, background: status.loading ? "#94a3b8" : "#FF6600", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: status.loading ? "not-allowed" : "pointer" }}
        >
          {status.loading ? "⏳ Connexion..." : showForm ? "✅ Confirmer et payer" : "📱 Payer MTN MoMo / Orange Money"}
        </button>

        <a href={waLink(plan.msg)} target="_blank" rel="noreferrer"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 10, background: "#25D366", color: "#fff", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
          💬 Payer via WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function PaiementPage() {
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "1.5rem 1rem", fontFamily: "sans-serif" }}>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 22, fontWeight: 600 }}>🌿 GTONTINA</div>
        <div style={{ fontSize: 13, color: "#666" }}>La tontine digitale du Cameroun</div>
      </div>

      <hr style={{ margin: "1.25rem 0", border: "none", borderTop: "1px solid #e5e5e5" }} />
      <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Commencez gratuitement</div>

      <div style={{ border: "2px solid #16a34a", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: 12 }}>
        <span style={{ background: "#dcfce7", color: "#166534", fontSize: 11, padding: "3px 10px", borderRadius: 6, display: "inline-block", marginBottom: 8 }}>Offre de lancement</span>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>1 rotation offerte</div>
            <div style={{ fontSize: 12, color: "#666" }}>Toutes fonctionnalités incluses</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 20, fontWeight: 600, color: "#16a34a" }}>0 FCFA</div>
            <div style={{ fontSize: 12, color: "#666" }}>premier cycle</div>
          </div>
        </div>
        {["Tableau de bord complet", "6 types de caisse", "Rotation + rappels WhatsApp", "Rapports & messagerie"].map(f => (
