import { useState, useEffect } from "react";
import PaiementPage from "./PaiementPage";

const BRAND = {
  name: "GTONTINA",
  slogan: "La tontine digitale du Cameroun",
  whatsapp: "+237 697 368 463",
  email: "gtechai340@gmail.com",
  whatsappLink: "https://wa.me/237697368463",
};

const COLORS = {
  gold: "#C8940A", goldLight: "#F5E6B0", goldDark: "#8B6508",
  brown: "#3D1F00", brownLight: "#7A4010", cream: "#FDF6E3",
  green: "#1B6B3A", greenLight: "#D4EDDA", red: "#8B1A1A",
  redLight: "#FDECEA", blue: "#1A3A6B", blueLight: "#E3EAFD",
  gray: "#6B6B6B", grayLight: "#F5F0E8",
};

const INITIAL_MEMBERS = [
  { id: 1, name: "Amina Bello", phone: "690000001", email: "amina@mail.com", photo: "AB", joinDate: "2024-01-01", status: "actif", role: "presidente" },
  { id: 2, name: "Kwame Asante", phone: "690000002", email: "kwame@mail.com", photo: "KA", joinDate: "2024-01-01", status: "actif", role: "tresorier" },
  { id: 3, name: "Fatou Diallo", phone: "690000003", email: "fatou@mail.com", photo: "FD", joinDate: "2024-01-01", status: "actif", role: "secretaire" },
  { id: 4, name: "Cédric Mbah", phone: "690000004", email: "cedric@mail.com", photo: "CM", joinDate: "2024-01-15", status: "actif", role: "membre" },
  { id: 5, name: "Nana Kofi", phone: "690000005", email: "nana@mail.com", photo: "NK", joinDate: "2024-01-15", status: "actif", role: "membre" },
  { id: 6, name: "Bintou Touré", phone: "690000006", email: "bintou@mail.com", photo: "BT", joinDate: "2024-02-01", status: "actif", role: "membre" },
];

const INITIAL_TRANSACTIONS = [
  { id: 1, date: "2024-03-01", type: "cotisation", memberId: 1, amount: 25000, description: "Cotisation mars", status: "payé" },
  { id: 2, date: "2024-03-01", type: "cotisation", memberId: 2, amount: 25000, description: "Cotisation mars", status: "payé" },
  { id: 3, date: "2024-03-01", type: "cotisation", memberId: 3, amount: 25000, description: "Cotisation mars", status: "payé" },
  { id: 4, date: "2024-03-01", type: "cotisation", memberId: 4, amount: 25000, description: "Cotisation mars", status: "payé" },
  { id: 5, date: "2024-03-01", type: "cotisation", memberId: 5, amount: 25000, description: "Cotisation mars", status: "en attente" },
  { id: 6, date: "2024-03-05", type: "tontine", memberId: 2, amount: 120000, description: "Tour tontine - Kwame", status: "payé" },
  { id: 7, date: "2024-03-10", type: "epargne", memberId: 1, amount: 15000, description: "Épargne volontaire", status: "payé" },
  { id: 8, date: "2024-03-12", type: "pret", memberId: 4, amount: -50000, description: "Prêt accordé - Cédric", status: "payé" },
  { id: 9, date: "2024-03-15", type: "secours_malheur", memberId: 3, amount: -30000, description: "Aide décès famille Diallo", status: "payé" },
  { id: 10, date: "2024-03-18", type: "secours_joie", memberId: 5, amount: 10000, description: "Cotisation mariage Nana", status: "payé" },
];

const INITIAL_MESSAGES = [
  { id: 1, from: 1, to: "all", date: "2024-03-20 09:00", subject: "Rappel réunion mensuelle", content: "Chers membres, la réunion mensuelle aura lieu samedi 23 mars à 14h00. Votre présence est indispensable.", read: false },
  { id: 2, from: 2, to: "all", date: "2024-03-19 16:30", subject: "État de la caisse - Mars", content: "Bilan de mi-mois : Caisse = 185,000 FCFA. Rappel aux membres n'ayant pas encore cotisé.", read: true },
];

const INITIAL_ROTATION = [
  { order: 1, memberId: 1, scheduledDate: "2024-01-01", status: "reçu", amount: 120000 },
  { order: 2, memberId: 2, scheduledDate: "2024-02-01", status: "reçu", amount: 120000 },
  { order: 3, memberId: 3, scheduledDate: "2024-03-01", status: "reçu", amount: 120000 },
  { order: 4, memberId: 4, scheduledDate: "2024-04-01", status: "prévu", amount: 120000 },
  { order: 5, memberId: 5, scheduledDate: "2024-05-01", status: "prévu", amount: 120000 },
  { order: 6, memberId: 6, scheduledDate: "2024-06-01", status: "prévu", amount: 120000 },
];

const INITIAL_MEETINGS = [
  { id: 1, date: "2024-02-24", lieu: "Domicile Amina Bello", presences: [1, 2, 3, 4], absences: [5, 6], excuses: [], points: ["Bilan financier de janvier", "Organisation rotation février", "Point prêts en cours"], decisions: ["Taux d'intérêt prêt maintenu à 5%", "Prochain lieu: domicile Cédric"], rapporteur: 3 },
];

const fmt = (n) => new Intl.NumberFormat("fr-FR").format(n) + " FCFA";
const fmtDate = (d) => new Date(d).toLocaleDateString("fr-FR");

const typeConfig = {
  cotisation: { label: "Cotisation", color: COLORS.green, bg: COLORS.greenLight },
  tontine: { label: "Tour tontine", color: COLORS.gold, bg: COLORS.goldLight },
  epargne: { label: "Épargne", color: COLORS.blue, bg: COLORS.blueLight },
  pret: { label: "Prêt", color: COLORS.red, bg: COLORS.redLight },
  secours_malheur: { label: "Secours malheur", color: COLORS.brown, bg: COLORS.grayLight },
  secours_joie: { label: "Secours joie", color: "#6B3FA0", bg: "#F3EAFD" },
  remboursement: { label: "Remboursement", color: COLORS.green, bg: COLORS.greenLight },
};

const roleLabels = { presidente: "Présidente", tresorier: "Trésorier(e)", secretaire: "Secrétaire", membre: "Membre" };

const Avatar = ({ initials, size = 36, color = COLORS.gold }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: size * 0.33, color: "#fff", flexShrink: 0 }}>{initials}</div>
);

const Badge = ({ label, color, bg }) => (
  <span style={{ background: bg || COLORS.goldLight, color: color || COLORS.goldDark, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600 }}>{label}</span>
);

const Card = ({ children, style }) => (
  <div style={{ background: "#fff", borderRadius: 14, border: `1px solid ${COLORS.goldLight}`, padding: "1rem", boxShadow: "0 2px 12px rgba(200,148,10,0.07)", ...style }}>{children}</div>
);

const Btn = ({ children, onClick, variant = "primary", style }) => {
  const styles = {
    primary: { background: COLORS.gold, color: "#fff", border: "none" },
    outline: { background: "transparent", color: COLORS.gold, border: `1.5px solid ${COLORS.gold}` },
    danger: { background: COLORS.red, color: "#fff", border: "none" },
    ghost: { background: COLORS.grayLight, color: COLORS.brown, border: "none" },
    whatsapp: { background: "#25D366", color: "#fff", border: "none" },
  };
  return <button onClick={onClick} style={{ borderRadius: 8, padding: "8px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer", ...styles[variant], ...style }}>{children}</button>;
};

const Input = ({ label, ...props }) => (
  <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 13 }}>
    {label && <span style={{ color: COLORS.gray, fontWeight: 600 }}>{label}</span>}
    <input {...props} style={{ border: `1px solid ${COLORS.goldLight}`, borderRadius: 8, padding: "8px 10px", fontSize: 14, background: COLORS.cream, color: COLORS.brown, outline: "none", width: "100%", boxSizing: "border-box", ...props.style }} />
  </label>
);

const Select = ({ label, children, ...props }) => (
  <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 13 }}>
    {label && <span style={{ color: COLORS.gray, fontWeight: 600 }}>{label}</span>}
    <select {...props} style={{ border: `1px solid ${COLORS.goldLight}`, borderRadius: 8, padding: "8px 10px", fontSize: 14, background: COLORS.cream, color: COLORS.brown, outline: "none", width: "100%", ...props.style }}>{children}</select>
  </label>
);

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [rotation, setRotation] = useState(INITIAL_ROTATION);
  const [meetings, setMeetings] = useState(INITIAL_MEETINGS);
  const [modal, setModal] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeMessage, setActiveMessage] = useState(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [newMsg, setNewMsg] = useState({ to: "all", subject: "", content: "" });
  const [txFilter, setTxFilter] = useState("all");
  const [memberForm, setMemberForm] = useState({ name: "", phone: "", email: "", role: "membre" });
  const [txForm, setTxForm] = useState({ type: "cotisation", memberId: "", amount: "", description: "", date: new Date().toISOString().slice(0, 10), status: "payé" });
  const [meetingForm, setMeetingForm] = useState({ date: "", lieu: "", points: "", decisions: "", rapporteur: "", presences: [] });
  const [meetingDetail, setMeetingDetail] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalIn = transactions.filter(t => !["pret", "secours_malheur"].includes(t.type) && t.status === "payé").reduce((s, t) => s + t.amount, 0);
  const totalOut = transactions.filter(t => ["pret", "secours_malheur"].includes(t.type) && t.status === "payé").reduce((s, t) => s + Math.abs(t.amount), 0);
  const caisse = totalIn - totalOut;
  const pending = transactions.filter(t => t.status === "en attente").length;
  const nextTour = rotation.find(r => r.status === "prévu");
  const nextMember = nextTour ? members.find(m => m.id === nextTour.memberId) : null;
  const unreadCount = messages.filter(m => !m.read).length;
  const getMember = (id) => members.find(m => m.id === id);

  const addMember = () => {
    if (!memberForm.name.trim()) return;
    const initials = memberForm.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    const newM = { id: Date.now(), ...memberForm, photo: initials, joinDate: new Date().toISOString().slice(0, 10), status: "actif" };
    setMembers(prev => [...prev, newM]);
    setRotation(prev => [...prev, { order: prev.length + 1, memberId: newM.id, scheduledDate: "", status: "prévu", amount: 120000 }]);
    setMemberForm({ name: "", phone: "", email: "", role: "membre" });
    setModal(null);
  };

  const addTransaction = () => {
    if (!txForm.memberId || !txForm.amount) return;
    const amt = ["pret", "secours_malheur"].includes(txForm.type) ? -Math.abs(parseFloat(txForm.amount)) : Math.abs(parseFloat(txForm.amount));
    setTransactions(prev => [...prev, { id: Date.now(), ...txForm, amount: amt, memberId: parseInt(txForm.memberId) }]);
    setTxForm({ type: "cotisation", memberId: "", amount: "", description: "", date: new Date().toISOString().slice(0, 10), status: "payé" });
    setModal(null);
  };

  const addMeeting = () => {
    if (!meetingForm.date || !meetingForm.lieu) return;
    setMeetings(prev => [...prev, { id: Date.now(), ...meetingForm, points: meetingForm.points.split("\n").filter(Boolean), decisions: meetingForm.decisions.split("\n").filter(Boolean), rapporteur: parseInt(meetingForm.rapporteur) || members[0]?.id }]);
    setMeetingForm({ date: "", lieu: "", points: "", decisions: "", rapporteur: "", presences: [] });
    setModal(null);
  };

  const sendMessage = () => {
    if (!newMsg.subject || !newMsg.content) return;
    setMessages(prev => [...prev, { id: Date.now(), from: 1, ...newMsg, date: new Date().toLocaleString("fr-FR"), read: true }]);
    setNewMsg({ to: "all", subject: "", content: "" });
    setComposeOpen(false);
  };

  const navItems = [
    { key: "dashboard", label: "Tableau de bord", icon: "◉" },
    { key: "membres", label: "Membres", icon: "◎" },
    { key: "caisse", label: "Caisse", icon: "▣" },
    { key: "rotation", label: "Rotation", icon: "↻" },
    { key: "reunions", label: "Réunions", icon: "◫" },
    { key: "messages", label: "Messages", icon: "◻" },
    { key: "paiement", label: "Paiement", icon: "💳" },
  ];

  const changeTab = (key) => { setTab(key); setMobileMenuOpen(false); };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: COLORS.cream, fontFamily: "'Georgia', serif" }}>

      {/* TOP HEADER — mobile & desktop */}
      <header style={{ background: COLORS.brown, padding: isMobile ? "10px 16px" : "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 200, minHeight: isMobile ? 56 : 60 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: isMobile ? 20 : 24 }}>🌿</span>
          <div>
            <div style={{ fontSize: isMobile ? 16 : 20, fontWeight: 700, color: COLORS.gold, letterSpacing: "0.05em" }}>{BRAND.name}</div>
            {!isMobile && <div style={{ fontSize: 9, color: `${COLORS.goldLight}80`, letterSpacing: "0.1em" }}>{BRAND.slogan}</div>}
          </div>
        </div>
        {isMobile ? (
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: "none", border: "none", color: COLORS.gold, fontSize: 24, cursor: "pointer", padding: 4 }}>
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        ) : (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <a href={BRAND.whatsappLink} target="_blank" rel="noreferrer" style={{ background: "#25D366", color: "#fff", borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>📱 WhatsApp</a>
            <span style={{ color: `${COLORS.goldLight}60`, fontSize: 11 }}>{BRAND.email}</span>
          </div>
        )}
      </header>

      {/* MOBILE DROPDOWN MENU */}
      {isMobile && mobileMenuOpen && (
        <div style={{ background: COLORS.brown, borderBottom: `2px solid ${COLORS.gold}`, zIndex: 150 }}>
          {navItems.map(item => (
            <button key={item.key} onClick={() => changeTab(item.key)} style={{ width: "100%", textAlign: "left", padding: "13px 20px", background: tab === item.key ? `${COLORS.gold}25` : "transparent", border: "none", borderLeft: tab === item.key ? `3px solid ${COLORS.gold}` : "3px solid transparent", color: tab === item.key ? COLORS.gold : `${COLORS.goldLight}90`, fontSize: 14, fontWeight: tab === item.key ? 700 : 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
              <span>{item.icon}</span>{item.label}
              {item.key === "messages" && unreadCount > 0 && <span style={{ marginLeft: "auto", background: COLORS.gold, color: "#fff", borderRadius: 10, fontSize: 10, padding: "1px 6px" }}>{unreadCount}</span>}
            </button>
          ))}
          <div style={{ padding: "12px 20px", borderTop: `1px solid ${COLORS.brownLight}` }}>
            <a href={BRAND.whatsappLink} target="_blank" rel="noreferrer" style={{ background: "#25D366", color: "#fff", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>📱 Nous contacter</a>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flex: 1 }}>
        {/* SIDEBAR — desktop only */}
        {!isMobile && (
          <aside style={{ width: 210, background: COLORS.brown, display: "flex", flexDirection: "column", padding: "1rem 0", flexShrink: 0 }}>
            <nav style={{ flex: 1 }}>
              {navItems.map(item => (
                <button key={item.key} onClick={() => changeTab(item.key)} style={{ width: "100%", textAlign: "left", padding: "10px 1.25rem", background: tab === item.key ? `${COLORS.gold}25` : "transparent", border: "none", borderLeft: tab === item.key ? `3px solid ${COLORS.gold}` : "3px solid transparent", color: tab === item.key ? COLORS.gold : `${COLORS.goldLight}90`, fontSize: 13, fontWeight: tab === item.key ? 700 : 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16 }}>{item.icon}</span>{item.label}
                  {item.key === "messages" && unreadCount > 0 && <span style={{ marginLeft: "auto", background: COLORS.gold, color: "#fff", borderRadius: 10, fontSize: 10, padding: "1px 6px" }}>{unreadCount}</span>}
                </button>
              ))}
            </nav>
            <div style={{ padding: "1rem", borderTop: `1px solid ${COLORS.brownLight}`, fontSize: 11, color: `${COLORS.goldLight}70` }}>
              {members.filter(m => m.status === "actif").length} membres actifs
            </div>
          </aside>
        )}

        {/* MAIN CONTENT */}
        <main style={{ flex: 1, padding: isMobile ? "1rem" : "1.5rem", overflowY: "auto", minWidth: 0 }}>

          {tab === "paiement" && <PaiementPage />}
          {/* DASHBOARD */}
          {tab === "dashboard" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <h1 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: COLORS.brown, margin: 0 }}>Tableau de bord</h1>
                <p style={{ color: COLORS.gray, fontSize: 12, margin: "4px 0 0" }}>{new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                {[
                  { icon: "💰", label: "Solde caisse", value: fmt(caisse), color: COLORS.gold },
                  { icon: "📥", label: "Total entrées", value: fmt(totalIn), color: COLORS.green },
                  { icon: "📤", label: "Total sorties", value: fmt(totalOut), color: COLORS.red },
                  { icon: "👥", label: "Membres actifs", value: members.filter(m => m.status === "actif").length, color: COLORS.blue },
                ].map((s, i) => (
                  <div key={i} style={{ background: `${s.color}10`, borderRadius: 12, border: `1px solid ${s.color}30`, padding: "12px" }}>
                    <div style={{ fontSize: 20 }}>{s.icon}</div>
                    <div style={{ fontSize: isMobile ? 16 : 20, fontWeight: 700, color: COLORS.brown, lineHeight: 1.2, marginTop: 4 }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: COLORS.gray, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {nextMember && (
                <Card>
                  <h3 style={{ margin: "0 0 10px", fontSize: 14, color: COLORS.brown }}>Prochain tour de tontine</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar initials={nextMember.photo} size={44} color={COLORS.gold} />
                    <div>
                      <div style={{ fontWeight: 700, color: COLORS.brown }}>{nextMember.name}</div>
                      <div style={{ fontSize: 12, color: COLORS.gray }}>Tour n°{nextTour.order}</div>
                      <div style={{ fontSize: 14, color: COLORS.gold, fontWeight: 700 }}>{fmt(nextTour.amount)}</div>
                    </div>
                    <span style={{ marginLeft: "auto", fontSize: 24 }}>👑</span>
                  </div>
                </Card>
              )}

              <Card>
                <h3 style={{ margin: "0 0 10px", fontSize: 14, color: COLORS.brown }}>Dernières opérations</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {transactions.slice(-4).reverse().map(tx => {
                    const cfg = typeConfig[tx.type] || {};
                    const m = getMember(tx.memberId);
                    return (
                      <div key={tx.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                        <Avatar initials={m?.photo || "?"} size={28} color={cfg.color} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ color: COLORS.brown, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m?.name}</div>
                          <div style={{ fontSize: 11, color: COLORS.gray }}>{cfg.label}</div>
                        </div>
                        <div style={{ fontWeight: 700, color: tx.amount > 0 ? COLORS.green : COLORS.red, fontSize: 12 }}>
                          {tx.amount > 0 ? "+" : ""}{fmt(tx.amount)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card>
                <h3 style={{ margin: "0 0 10px", fontSize: 14, color: COLORS.brown }}>État des cotisations</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {members.filter(m => m.status === "actif").map(m => {
                    const paid = transactions.some(t => t.memberId === m.id && t.type === "cotisation" && t.status === "payé" && t.date >= "2024-03-01");
                    return (
                      <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, background: paid ? COLORS.greenLight : COLORS.redLight }}>
                        <Avatar initials={m.photo} size={26} color={paid ? COLORS.green : COLORS.red} />
                        <span style={{ fontSize: 13, color: COLORS.brown, fontWeight: 600, flex: 1 }}>{m.name}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: paid ? COLORS.green : COLORS.red }}>{paid ? "✓ Payé" : "✗ En attente"}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Contact card */}
              <div style={{ background: COLORS.brown, borderRadius: 14, padding: "1rem", textAlign: "center" }}>
                <div style={{ color: COLORS.gold, fontWeight: 700, fontSize: 15, marginBottom: 6 }}>🌿 {BRAND.name}</div>
                <div style={{ color: `${COLORS.goldLight}90`, fontSize: 12, marginBottom: 12 }}>{BRAND.slogan}</div>
                <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                  <a href={BRAND.whatsappLink} target="_blank" rel="noreferrer" style={{ background: "#25D366", color: "#fff", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>📱 {BRAND.whatsapp}</a>
                  <a href={`mailto:${BRAND.email}`} style={{ background: COLORS.gold, color: "#fff", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>✉️ Email</a>
                </div>
              </div>
            </div>
          )}

          {/* MEMBRES */}
          {tab === "membres" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: COLORS.brown, margin: 0 }}>Membres</h1>
                <Btn onClick={() => setModal("addMember")}>+ Ajouter</Btn>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {members.map(m => (
                  <Card key={m.id} style={{ cursor: "pointer" }} onClick={() => setSelectedMember(m)}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <Avatar initials={m.photo} size={44} color={m.role === "presidente" ? COLORS.gold : m.role === "tresorier" ? COLORS.green : COLORS.brown} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, color: COLORS.brown, fontSize: 14 }}>{m.name}</div>
                        <div style={{ fontSize: 12, color: COLORS.gray }}>{roleLabels[m.role]} · {m.phone}</div>
                        <div style={{ fontSize: 12, color: COLORS.green, fontWeight: 600 }}>
                          {fmt(transactions.filter(t => t.memberId === m.id && t.amount > 0 && t.status === "payé").reduce((s, t) => s + t.amount, 0))}
                        </div>
                      </div>
                      <span style={{ fontSize: 12, padding: "3px 8px", borderRadius: 10, background: m.status === "actif" ? COLORS.greenLight : COLORS.redLight, color: m.status === "actif" ? COLORS.green : COLORS.red, fontWeight: 600 }}>{m.status}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* CAISSE */}
          {tab === "caisse" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: COLORS.brown, margin: 0 }}>Caisse</h1>
                <Btn onClick={() => setModal("addTx")}>+ Opération</Btn>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                {Object.entries(typeConfig).slice(0, 4).map(([k, v]) => {
                  const total = transactions.filter(t => t.type === k && t.status === "payé").reduce((s, t) => s + Math.abs(t.amount), 0);
                  return (
                    <div key={k} onClick={() => setTxFilter(txFilter === k ? "all" : k)} style={{ background: txFilter === k ? v.bg : "#fff", border: `1.5px solid ${txFilter === k ? v.color : COLORS.goldLight}`, borderRadius: 10, padding: "10px", cursor: "pointer" }}>
                      <div style={{ fontSize: 11, color: v.color, fontWeight: 700 }}>{v.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.brown, marginTop: 4 }}>{fmt(total)}</div>
                    </div>
                  );
                })}
              </div>

              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <h3 style={{ margin: 0, fontSize: 14, color: COLORS.brown }}>Journal des opérations</h3>
                  <select value={txFilter} onChange={e => setTxFilter(e.target.value)} style={{ border: `1px solid ${COLORS.goldLight}`, borderRadius: 6, padding: "4px 6px", fontSize: 11, background: COLORS.cream }}>
                    <option value="all">Tous</option>
                    {Object.entries(typeConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {transactions.filter(t => txFilter === "all" || t.type === txFilter).sort((a, b) => b.date.localeCompare(a.date)).map(tx => {
                    const cfg = typeConfig[tx.type] || {};
                    const m = getMember(tx.memberId);
                    return (
                      <div key={tx.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px", borderRadius: 8, background: COLORS.grayLight }}>
                        <Avatar initials={m?.photo || "?"} size={28} color={cfg.color} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.brown, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m?.name}</div>
                          <div style={{ fontSize: 11, color: COLORS.gray }}>{cfg.label} · {fmtDate(tx.date)}</div>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: tx.amount >= 0 ? COLORS.green : COLORS.red }}>
                          {tx.amount >= 0 ? "+" : ""}{fmt(tx.amount)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          )}

          {/* ROTATION */}
          {tab === "rotation" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h1 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: COLORS.brown, margin: 0 }}>Rotation & Rappels</h1>
              <Card>
                <h3 style={{ margin: "0 0 10px", fontSize: 14, color: COLORS.brown }}>Tableau de rotation</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {rotation.map((rot, i) => {
                    const m = getMember(rot.memberId);
                    const isNext = rot.status === "prévu" && rotation.filter(r => r.status === "prévu")[0]?.order === rot.order;
                    const sc = rot.status === "reçu" ? { bg: COLORS.greenLight, color: COLORS.green } : { bg: COLORS.goldLight, color: COLORS.goldDark };
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px", borderRadius: 10, background: isNext ? COLORS.goldLight : "#fff", border: `1.5px solid ${isNext ? COLORS.gold : COLORS.goldLight}` }}>
                        <div style={{ width: 26, height: 26, borderRadius: "50%", background: COLORS.brown, color: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{rot.order}</div>
                        <Avatar initials={m?.photo || "?"} size={32} color={isNext ? COLORS.gold : COLORS.brownLight} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, color: COLORS.brown, fontSize: 13 }}>{m?.name}</div>
                          <div style={{ fontSize: 11, color: COLORS.gray }}>{rot.scheduledDate ? fmtDate(rot.scheduledDate) : "Date à définir"}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.brown }}>{fmt(rot.amount)}</div>
                          <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 8, background: sc.bg, color: sc.color, fontWeight: 600 }}>{rot.status}</span>
                        </div>
                        {isNext && <span>👑</span>}
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card>
                <h3 style={{ margin: "0 0 10px", fontSize: 14, color: COLORS.brown }}>Rappels membres</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {members.filter(m => m.status === "actif").map(m => {
                    const hasPaid = transactions.some(t => t.memberId === m.id && t.type === "cotisation" && t.status === "payé" && t.date >= "2024-03-01");
                    return (
                      <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, background: COLORS.grayLight }}>
                        <Avatar initials={m.photo} size={30} color={hasPaid ? COLORS.green : COLORS.red} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.brown }}>{m.name}</div>
                          <div style={{ fontSize: 11, color: COLORS.gray }}>Cotisation: {hasPaid ? "✅ payée" : "❌ non payée"}</div>
                        </div>
                        {!hasPaid && (
                          <a href={`https://wa.me/237${m.phone}?text=Bonjour ${m.name}, rappel de votre cotisation mensuelle. Merci. - ${BRAND.name}`} target="_blank" rel="noreferrer" style={{ background: "#25D366", color: "#fff", borderRadius: 6, padding: "4px 8px", fontSize: 11, fontWeight: 600, textDecoration: "none" }}>📱</a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          )}

          {/* RÉUNIONS */}
          {tab === "reunions" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: COLORS.brown, margin: 0 }}>Réunions</h1>
                <Btn onClick={() => setModal("addMeeting")}>+ Rapport</Btn>
              </div>
              {meetingDetail ? (
                <Card>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <h2 style={{ margin: 0, fontSize: 16, color: COLORS.brown }}>Réunion du {fmtDate(meetingDetail.date)}</h2>
                    <Btn variant="ghost" onClick={() => setMeetingDetail(null)}>← Retour</Btn>
                  </div>
                  <div style={{ fontSize: 13, color: COLORS.gray, marginBottom: 8 }}>📍 {meetingDetail.lieu}</div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.gray, marginBottom: 6 }}>PRÉSENCES</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {(meetingDetail.presences || []).map(id => { const m = getMember(id); return m ? <Badge key={id} label={m.name} color={COLORS.green} bg={COLORS.greenLight} /> : null; })}
                    </div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.gray, marginBottom: 6 }}>POINTS À L'ORDRE DU JOUR</div>
                    <ol style={{ margin: 0, paddingLeft: 16, color: COLORS.brown, fontSize: 13, lineHeight: 2 }}>
                      {(meetingDetail.points || []).map((p, i) => <li key={i}>{p}</li>)}
                    </ol>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.gray, marginBottom: 6 }}>DÉCISIONS</div>
                    <ul style={{ margin: 0, paddingLeft: 16, color: COLORS.brown, fontSize: 13, lineHeight: 2 }}>
                      {(meetingDetail.decisions || []).map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                </Card>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {meetings.sort((a, b) => b.date.localeCompare(a.date)).map(m => (
                    <Card key={m.id} style={{ cursor: "pointer" }} onClick={() => setMeetingDetail(m)}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 10, background: COLORS.goldLight, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", flexShrink: 0 }}>
                          <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.goldDark, lineHeight: 1 }}>{new Date(m.date).getDate()}</div>
                          <div style={{ fontSize: 9, color: COLORS.goldDark }}>{new Date(m.date).toLocaleString("fr-FR", { month: "short" }).toUpperCase()}</div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, color: COLORS.brown, fontSize: 13 }}>Réunion du {fmtDate(m.date)}</div>
                          <div style={{ fontSize: 11, color: COLORS.gray }}>{m.lieu} · {m.presences?.length || 0} présents</div>
                        </div>
                        <span style={{ fontSize: 12, color: COLORS.gold }}>→</span>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MESSAGES */}
          {tab === "messages" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: COLORS.brown, margin: 0 }}>Messages</h1>
                <Btn onClick={() => setComposeOpen(true)}>+ Nouveau</Btn>
              </div>
              {composeOpen && (
                <Card style={{ border: `2px solid ${COLORS.gold}` }}>
                  <h3 style={{ margin: "0 0 10px", color: COLORS.brown, fontSize: 14 }}>Nouveau message</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <Select value={newMsg.to} onChange={e => setNewMsg(p => ({ ...p, to: e.target.value }))}>
                      <option value="all">Tous les membres</option>
                      {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </Select>
                    <Input placeholder="Objet..." value={newMsg.subject} onChange={e => setNewMsg(p => ({ ...p, subject: e.target.value }))} />
                    <textarea value={newMsg.content} onChange={e => setNewMsg(p => ({ ...p, content: e.target.value }))} rows={4} placeholder="Message..." style={{ border: `1px solid ${COLORS.goldLight}`, borderRadius: 8, padding: "8px 10px", fontSize: 14, background: COLORS.cream, color: COLORS.brown, resize: "vertical", width: "100%", boxSizing: "border-box" }} />
                    <div style={{ display: "flex", gap: 8 }}>
                      <Btn onClick={sendMessage}>Envoyer</Btn>
                      <Btn variant="ghost" onClick={() => setComposeOpen(false)}>Annuler</Btn>
                    </div>
                  </div>
                </Card>
              )}
              {activeMessage ? (
                <Card>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <h2 style={{ margin: 0, fontSize: 15, color: COLORS.brown }}>{activeMessage.subject}</h2>
                    <Btn variant="ghost" onClick={() => setActiveMessage(null)}>← Retour</Btn>
                  </div>
                  <div style={{ padding: "12px", background: COLORS.grayLight, borderRadius: 8, fontSize: 14, color: COLORS.brown, lineHeight: 1.8 }}>{activeMessage.content}</div>
                </Card>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {messages.sort((a, b) => b.date.localeCompare(a.date)).map(msg => {
                    const sender = getMember(msg.from);
                    return (
                      <div key={msg.id} onClick={() => { setActiveMessage(msg); setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m)); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px", borderRadius: 10, cursor: "pointer", background: msg.read ? "#fff" : COLORS.goldLight, border: `1px solid ${msg.read ? COLORS.goldLight : COLORS.gold}` }}>
                        <Avatar initials={sender?.photo || "?"} size={34} color={COLORS.gold} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: msg.read ? 500 : 700, color: COLORS.brown, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{msg.subject}</div>
                          <div style={{ fontSize: 11, color: COLORS.gray }}>De {sender?.name || "Inconnu"}</div>
                        </div>
                        {!msg.read && <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.gold, flexShrink: 0 }} />}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* BOTTOM NAV — mobile only */}
      {isMobile && (
        <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: COLORS.brown, display: "flex", borderTop: `2px solid ${COLORS.gold}`, zIndex: 200 }}>
          {navItems.map(item => (
            <button key={item.key} onClick={() => changeTab(item.key)} style={{ flex: 1, padding: "8px 4px", background: "none", border: "none", color: tab === item.key ? COLORS.gold : `${COLORS.goldLight}60`, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, position: "relative" }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ fontSize: 9, fontWeight: tab === item.key ? 700 : 400 }}>{item.label}</span>
              {item.key === "messages" && unreadCount > 0 && <span style={{ position: "absolute", top: 4, right: "25%", background: COLORS.gold, color: "#fff", borderRadius: 10, fontSize: 8, padding: "1px 4px" }}>{unreadCount}</span>}
            </button>
          ))}
        </nav>
      )}

      {/* FOOTER */}
      {!isMobile && (
        <footer style={{ background: COLORS.brown, padding: "12px 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: `${COLORS.goldLight}70`, fontSize: 11 }}>© 2026 {BRAND.name} · {BRAND.slogan}</span>
          <div style={{ display: "flex", gap: 16, fontSize: 11 }}>
            <a href={BRAND.whatsappLink} target="_blank" rel="noreferrer" style={{ color: "#25D366", textDecoration: "none" }}>📱 {BRAND.whatsapp}</a>
            <a href={`mailto:${BRAND.email}`} style={{ color: COLORS.gold, textDecoration: "none" }}>✉️ {BRAND.email}</a>
          </div>
        </footer>
      )}

      {/* MOBILE BOTTOM PADDING */}
      {isMobile && <div style={{ height: 65 }} />}

      {/* MODALS */}
      {modal && (
        <div onClick={() => setModal(null)} style={{ position: "fixed", inset: 0, background: "rgba(61,31,0,0.5)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 300, padding: isMobile ? 0 : 16 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: isMobile ? "16px 16px 0 0" : 16, padding: "1.5rem", width: "100%", maxWidth: isMobile ? "100%" : 480, border: `2px solid ${COLORS.gold}`, maxHeight: "85vh", overflowY: "auto" }}>
            {modal === "addMember" && (
              <>
                <h2 style={{ margin: "0 0 1rem", color: COLORS.brown, fontSize: 18 }}>Nouveau membre</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <Input label="Nom complet *" value={memberForm.name} onChange={e => setMemberForm(p => ({ ...p, name: e.target.value }))} placeholder="Ex: Amina Bello" />
                  <Input label="Téléphone" value={memberForm.phone} onChange={e => setMemberForm(p => ({ ...p, phone: e.target.value }))} placeholder="6XXXXXXXX" />
                  <Input label="Email" value={memberForm.email} onChange={e => setMemberForm(p => ({ ...p, email: e.target.value }))} placeholder="email@domaine.com" />
                  <Select label="Rôle" value={memberForm.role} onChange={e => setMemberForm(p => ({ ...p, role: e.target.value }))}>
                    <option value="membre">Membre</option>
                    <option value="presidente">Présidente</option>
                    <option value="tresorier">Trésorier(e)</option>
                    <option value="secretaire">Secrétaire</option>
                  </Select>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <Btn onClick={addMember} style={{ flex: 1 }}>Ajouter</Btn>
                    <Btn variant="ghost" onClick={() => setModal(null)} style={{ flex: 1 }}>Annuler</Btn>
                  </div>
                </div>
              </>
            )}
            {modal === "addTx" && (
              <>
                <h2 style={{ margin: "0 0 1rem", color: COLORS.brown, fontSize: 18 }}>Nouvelle opération</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <Select label="Type *" value={txForm.type} onChange={e => setTxForm(p => ({ ...p, type: e.target.value }))}>
                    {Object.entries(typeConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </Select>
                  <Select label="Membre *" value={txForm.memberId} onChange={e => setTxForm(p => ({ ...p, memberId: e.target.value }))}>
                    <option value="">Sélectionner...</option>
                    {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </Select>
                  <Input label="Montant (FCFA) *" type="number" value={txForm.amount} onChange={e => setTxForm(p => ({ ...p, amount: e.target.value }))} placeholder="Ex: 25000" />
                  <Input label="Description" value={txForm.description} onChange={e => setTxForm(p => ({ ...p, description: e.target.value }))} placeholder="Description..." />
                  <Input label="Date" type="date" value={txForm.date} onChange={e => setTxForm(p => ({ ...p, date: e.target.value }))} />
                  <Select label="Statut" value={txForm.status} onChange={e => setTxForm(p => ({ ...p, status: e.target.value }))}>
                    <option value="payé">Payé</option>
                    <option value="en attente">En attente</option>
                  </Select>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <Btn onClick={addTransaction} style={{ flex: 1 }}>Enregistrer</Btn>
                    <Btn variant="ghost" onClick={() => setModal(null)} style={{ flex: 1 }}>Annuler</Btn>
                  </div>
                </div>
              </>
            )}
            {modal === "addMeeting" && (
              <>
                <h2 style={{ margin: "0 0 1rem", color: COLORS.brown, fontSize: 18 }}>Rapport de réunion</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <Input label="Date *" type="date" value={meetingForm.date} onChange={e => setMeetingForm(p => ({ ...p, date: e.target.value }))} />
                  <Input label="Lieu *" value={meetingForm.lieu} onChange={e => setMeetingForm(p => ({ ...p, lieu: e.target.value }))} placeholder="Ex: Domicile de Amina" />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.gray, marginBottom: 6 }}>Membres présents</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {members.map(m => (
                        <label key={m.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                          <input type="checkbox" checked={meetingForm.presences.includes(m.id)} onChange={e => setMeetingForm(p => ({ ...p, presences: e.target.checked ? [...p.presences, m.id] : p.presences.filter(id => id !== m.id) }))} />
                          {m.name}
                        </label>
                      ))}
                    </div>
                  </div>
                  <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 13 }}>
                    <span style={{ color: COLORS.gray, fontWeight: 600 }}>Points à l'ordre du jour</span>
                    <textarea value={meetingForm.points} onChange={e => setMeetingForm(p => ({ ...p, points: e.target.value }))} rows={3} placeholder={"Un point par ligne..."} style={{ border: `1px solid ${COLORS.goldLight}`, borderRadius: 8, padding: "8px", fontSize: 14, background: COLORS.cream, color: COLORS.brown, width: "100%", boxSizing: "border-box" }} />
                  </label>
                  <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 13 }}>
                    <span style={{ color: COLORS.gray, fontWeight: 600 }}>Décisions prises</span>
                    <textarea value={meetingForm.decisions} onChange={e => setMeetingForm(p => ({ ...p, decisions: e.target.value }))} rows={3} placeholder={"Une décision par ligne..."} style={{ border: `1px solid ${COLORS.goldLight}`, borderRadius: 8, padding: "8px", fontSize: 14, background: COLORS.cream, color: COLORS.brown, width: "100%", boxSizing: "border-box" }} />
                  </label>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <Btn onClick={addMeeting} style={{ flex: 1 }}>Sauvegarder</Btn>
                    <Btn variant="ghost" onClick={() => setModal(null)} style={{ flex: 1 }}>Annuler</Btn>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* MEMBER DETAIL MODAL */}
      {selectedMember && (
        <div onClick={() => setSelectedMember(null)} style={{ position: "fixed", inset: 0, background: "rgba(61,31,0,0.5)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 300 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: isMobile ? "16px 16px 0 0" : 16, padding: "1.5rem", width: "100%", maxWidth: isMobile ? "100%" : 500, border: `2px solid ${COLORS.gold}`, maxHeight: "85vh", overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "1rem" }}>
              <Avatar initials={selectedMember.photo} size={52} color={COLORS.gold} />
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: 0, color: COLORS.brown, fontSize: 17 }}>{selectedMember.name}</h2>
                <Badge label={roleLabels[selectedMember.role]} />
              </div>
              <button onClick={() => setSelectedMember(null)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: COLORS.gray }}>✕</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 13, marginBottom: "1rem" }}>
              {[["📞 Téléphone", selectedMember.phone], ["📧 Email", selectedMember.email], ["📅 Membre depuis", fmtDate(selectedMember.joinDate)], ["💰 Total cotisé", fmt(transactions.filter(t => t.memberId === selectedMember.id && t.amount > 0 && t.status === "payé").reduce((s, t) => s + t.amount, 0))]].map(([label, val]) => (
                <div key={label} style={{ padding: "8px", background: COLORS.grayLight, borderRadius: 8 }}>
                  <div style={{ color: COLORS.gray, fontSize: 11 }}>{label}</div>
                  <div style={{ fontWeight: 600, color: COLORS.brown, fontSize: 12 }}>{val}</div>
                </div>
              ))}
            </div>
            <h3 style={{ margin: "0 0 8px", color: COLORS.brown, fontSize: 13 }}>Historique</h3>
            <div style={{ maxHeight: 180, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
              {transactions.filter(t => t.memberId === selectedMember.id).sort((a, b) => b.date.localeCompare(a.date)).map(tx => {
                const cfg = typeConfig[tx.type] || {};
                return (
                  <div key={tx.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", borderRadius: 6, background: COLORS.grayLight }}>
                    <Badge label={cfg.label} color={cfg.color} bg={cfg.bg} />
                    <span style={{ flex: 1, fontSize: 11, color: COLORS.gray }}>{tx.description}</span>
                    <span style={{ fontWeight: 700, fontSize: 12, color: tx.amount >= 0 ? COLORS.green : COLORS.red }}>{tx.amount >= 0 ? "+" : ""}{fmt(tx.amount)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
