const WHATSAPP_NUMBER = "237697368463";
const encode = (t) => encodeURIComponent(t);
const waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encode(msg)}`;

const essaiMsg = "Bonjour GTONTINA 🌿\nJe souhaite démarrer mon *essai gratuit d'une rotation*.\nNotre groupe se réunit : (hebdomadairement / deux fois par mois / mensuellement).\nPouvez-vous m'activer l'accès ?";

const plans = [
  { id: "starter", name: "Starter", members: "Jusqu'à 15 membres", amount: "3 000", features: ["Tableau de bord complet", "6 types de caisse", "Rappels WhatsApp"], msg: "Bonjour GTONTINA 🌿\nFormule *Starter* — 3 000 FCFA/mois.\nInstructions de paiement ?" },
  { id: "standard", name: "Standard", members: "Membres illimités", amount: "6 000", featured: true, features: ["Tout le Starter inclus", "Membres illimités", "Rapports de réunion", "Messagerie interne"], msg: "Bonjour GTONTINA 🌿\nFormule *Standard* — 6 000 FCFA/mois.\nInstructions de paiement ?" },
  { id: "premium", name: "Premium", members: "Jusqu'à 3 groupes", amount: "12 000", features: ["Tout le Standard inclus", "3 groupes de tontine", "Support prioritaire"], msg: "Bonjour GTONTINA 🌿\nFormule *Premium* — 12 000 FCFA/mois.\nInstructions de paiement ?" },
];

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
        <div style={{ background: "#f0fdf4", borderRadius: 8, padding: "0.6rem", marginBottom: 12, fontSize: 12, color: "#555" }}>
          ↻ <strong>Durée adaptée à votre groupe</strong> — 7, 14 ou 30 jours selon votre cycle de réunion.
        </div>
        {["Tableau de bord complet", "6 types de caisse", "Rotation + rappels WhatsApp", "Rapports & messagerie"].map(f => (
          <div key={f} style={{ fontSize: 13, color: "#555", padding: "2px 0" }}>✓ {f}</div>
        ))}
        <a href={waLink(essaiMsg)} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 12, padding: 10, background: "#dcfce7", color: "#166534", border: "1px solid #16a34a", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
          💬 Démarrer ma rotation gratuite
        </a>
        <div style={{ fontSize: 12, color: "#888", textAlign: "center", marginTop: 6 }}>Aucun paiement requis · Sans engagement</div>
      </div>

      <hr style={{ margin: "1.25rem 0", border: "none", borderTop: "1px solid #e5e5e5" }} />
      <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Après votre rotation — choisissez votre formule</div>

      {plans.map(plan => (
        <div key={plan.id} style={{ border: plan.featured ? "2px solid #3b82f6" : "1px solid #e5e5e5", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: 12 }}>
          {plan.featured && <span style={{ background: "#dbeafe", color: "#1d4ed8", fontSize: 11, padding: "3px 10px", borderRadius: 6, display: "inline-block", marginBottom: 8 }}>Le plus populaire</span>}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>{plan.name}</div>
              <div style={{ fontSize: 12, color: "#666" }}>{plan.members}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 20, fontWeight: 600 }}>{plan.amount}</div>
              <div style={{ fontSize: 12, color: "#666" }}>FCFA / mois</div>
            </div>
          </div>
          {plan.features.map(f => (
            <div key={f} style={{ fontSize: 13, color: "#555", padding: "2px 0" }}>✓ {f}</div>
          ))}
          <a href={waLink(plan.msg)} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 12, padding: 10, background: "#25D366", color: "#fff", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            💬 Choisir {plan.name}
          </a>
        </div>
      ))}

      <div style={{ background: "#f5f5f5", borderRadius: 8, padding: "0.75rem 1rem", fontSize: 12, color: "#555" }}>
        <strong>Frais d'installation unique :</strong> 5 000 à 10 000 FCFA. Paiement via <strong>MTN MoMo</strong> et <strong>Orange Money</strong>.
      </div>

      <hr style={{ margin: "1.25rem 0", border: "none", borderTop: "1px solid #e5e5e5" }} />
      <div style={{ display: "flex", gap: 8 }}>
        <a href={waLink("Bonjour GTONTINA, j'ai une question.")} target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 9, border: "1px solid #e5e5e5", borderRadius: 8, fontSize: 13, color: "#555", textDecoration: "none" }}>💬 Question</a>
        <a href="mailto:guerinfap@gmail.com" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 9, border: "1px solid #e5e5e5", borderRadius: 8, fontSize: 13, color: "#555", textDecoration: "none" }}>✉️ Email</a>
      </div>
    </div>
  );
}
