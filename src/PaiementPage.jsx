import { useState } from "react";

const WHATSAPP_NUMBER = "237697368463";

function encode(text) {
  return encodeURIComponent(text);
}

const plans = [
  {
    id: "starter",
    name: "Starter",
    members: "Jusqu'à 15 membres",
    amount: "3 000",
    period: "FCFA / mois",
    features: ["Tableau de bord complet", "6 types de caisse", "Rappels WhatsApp"],
    message: "Bonjour GTONTINA 🌿\nJe souhaite m'abonner à la formule *Starter* — 3 000 FCFA/mois (jusqu'à 15 membres).\nPouvez-vous m'envoyer les instructions de paiement ?",
    featured: false,
  },
  {
    id: "standard",
    name: "Standard",
    members: "Membres illimités",
    amount: "6 000",
    period: "FCFA / mois",
    features: ["Tout le Starter inclus", "Membres illimités", "Rapports de réunion", "Messagerie interne"],
    message: "Bonjour GTONTINA 🌿\nJe souhaite m'abonner à la formule *Standard* — 6 000 FCFA/mois (membres illimités).\nPouvez-vous m'envoyer les instructions de paiement ?",
    featured: true,
  },
  {
    id: "premium",
    name: "Premium",
    members: "Jusqu'à 3 groupes",
    amount: "12 000",
    period: "FCFA / mois",
    features: ["Tout le Standard inclus", "3 groupes de tontine", "Support prioritaire"],
    message: "Bonjour GTONTINA 🌿\nJe souhaite m'abonner à la formule *Premium* — 12 000 FCFA/mois (3 groupes).\nPouvez-vous m'envoyer les instructions de paiement ?",
    featured: false,
  },
];

const essaiMessage = "Bonjour GTONTINA 🌿\nJe souhaite démarrer mon *essai gratuit d'une rotation* avec toutes les fonctionnalités.\nNotre groupe se réunit : (hebdomadairement / deux fois par mois / mensuellement).\nPouvez-vous m'activer l'accès ?";

export default function PaiementPage() {
  const waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encode(msg)}`;

  return (
    <div style={styles.page}>
      <div style={styles.logo}>
        <div style={styles.logoText}>🌿 GTONTINA</div>
        <div style={styles.logoSub}>La tontine digitale du Cameroun</div>
      </div>

      <div style={styles.divider} />
      <div style={styles.sectionLabel}>Commencez gratuitement</div>

      <div style={styles.freeCard}>
        <span style={{...styles.badge, ...styles.badgeSuccess}}>Offre de lancement</span>
        <div style={styles.planHeader}>
          <div>
            <div style={styles.planName}>1 rotation offerte</div>
            <div style={styles.planMembers}>Toutes fonctionnalités incluses</div>
          </div>
          <div style={styles.planPrice}>
            <div style={{...styles.planAmount, color: "#16a34a"}}>0 FCFA</div>
            <div style={styles.planPeriod}>premier cycle</div>
          </div>
        </div>
        <div style={styles.rotationBox}>
          <span style={{fontSize: 18, color: "#16a34a"}}>↻</span>
          <div style={styles.rotationText}>
            <strong>Durée adaptée à votre groupe</strong> — 7, 14 ou 30 jours selon votre cycle de réunion.
          </div>
        </div>
        {["Tableau de bord complet", "6 types de caisse", "Rotation des tours + rappels WhatsApp", "Rapports de réunion & messagerie"].map((f) => (
          <div key={f} style={styles.featureRow}><span style={{color:"#16a34a"}}>✓</span> {f}</div>
        ))}
        <a href={waLink(essaiMessage)} target="_blank" rel="noreferrer" style={styles.btnFree}>
          <WhatsAppIcon /> Démarrer ma rotation gratuite
        </a>
        <div style={styles.essaiNote}>Aucun paiement requis · Accès immédiat · Sans engagement</div>
      </div>

      <div style={styles.divider} />
      <div style={styles.sectionLabel}>Après votre rotation — choisissez votre formule</div>

      {plans.map((plan) => (
        <div key={plan.id} style={plan.featured ? styles.featuredCard : styles.planCard}>
          {plan.featured && <span style={{...styles.badge, ...styles.badgeInfo}}>Le plus populaire</span>}
          <div style={styles.planHeader}>
            <div>
              <div style={styles.planName}>{plan.name}</div>
              <div style={styles.planMembers}>{plan.members}</div>
            </div>
            <div style={styles.planPrice}>
              <div style={styles.planAmount}>{plan.amount}</div>
              <div style={styles.planPeriod}>{plan.period}</div>
            </div>
          </div>
          {plan.features.map((f) => (
            <div key={f} style={styles.featureRow}><span style={{color:"#16a34a"}}>✓</span> {f}</div>
          ))}
          <a href={waLink(plan.message)} target="_blank" rel="noreferrer" style={{...styles.btnWa, marginTop: "1rem"}}>
            <WhatsAppIcon /> Choisir {plan.name}
          </a>
        </div>
      ))}

      <div style={styles.fraisNote}>
        <strong>Frais d'installation unique :</strong> 5 000 à 10 000 FCFA. Paiement via <strong>MTN MoMo</strong> et <strong>Orange Money</strong>.
      </div>

      <div style={styles.divider} />
      <div style={styles.sectionLabel}>Besoin d'infos ?</div>
      <div style={styles.contactRow}>
        <a href={waLink("Bonjour GTONTINA, j'ai une question avant de démarrer.")} target="_blank" rel="noreferrer" style={styles.btnContact}>💬 Question</a>
        <a href="mailto:guerinfap@gmail.com" style={styles.btnContact}>✉️ Email</a>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{flexShrink:0}}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.852L.057 23.998l6.305-1.654A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.877 9.877 0 01-5.031-1.378l-.361-.214-3.741.981.999-3.648-.235-.374A9.861 9.861 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106S21.894 6.58 21.894 12 17.42 21.894 12 21.894z"/>
    </svg>
  );
}

const styles = {
  page: { maxWidth: 480, margin: "0 auto", padding: "1.5rem 1rem", fontFamily: "sans-serif", color: "#111" },
  logo: { textAlign: "center", marginBottom: "0.5rem" },
  logoText: { fontSize: 22, fontWeight: 500, letterSpacing: -0.5 },
  logoSub: { fontSize: 13, color: "#666", marginTop: 2 },
  divider: { height: 1, background: "#e5e5e5", margin: "1.25rem 0" },
  sectionLabel: { fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: "1rem" },
  freeCard: { border: "2px solid #16a34a", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "0.75rem" },
  planCard: { border: "1px solid #e5e5e5"
