import { useState, useEffect, useRef } from 'react';

const COLORS = {
  gold: '#C8940A',
  goldLight: '#F5E6B0',
  goldDark: '#8B6508',
  brown: '#3D1F00',
  brownLight: '#7A4010',
  cream: '#FDF6E3',
  green: '#1B6B3A',
  greenLight: '#D4EDDA',
  red: '#8B1A1A',
  redLight: '#FDECEA',
  blue: '#1A3A6B',
  blueLight: '#E3EAFD',
  gray: '#6B6B6B',
  grayLight: '#F5F0E8',
};

const INITIAL_MEMBERS = [
  {
    id: 1,
    name: 'Amina Bello',
    phone: '690000001',
    email: 'amina@mail.com',
    photo: 'AB',
    joinDate: '2024-01-01',
    status: 'actif',
    role: 'presidente',
  },
  {
    id: 2,
    name: 'Kwame Asante',
    phone: '690000002',
    email: 'kwame@mail.com',
    photo: 'KA',
    joinDate: '2024-01-01',
    status: 'actif',
    role: 'tresorier',
  },
  {
    id: 3,
    name: 'Fatou Diallo',
    phone: '690000003',
    email: 'fatou@mail.com',
    photo: 'FD',
    joinDate: '2024-01-01',
    status: 'actif',
    role: 'secretaire',
  },
  {
    id: 4,
    name: 'Cédric Mbah',
    phone: '690000004',
    email: 'cedric@mail.com',
    photo: 'CM',
    joinDate: '2024-01-15',
    status: 'actif',
    role: 'membre',
  },
  {
    id: 5,
    name: 'Nana Kofi',
    phone: '690000005',
    email: 'nana@mail.com',
    photo: 'NK',
    joinDate: '2024-01-15',
    status: 'actif',
    role: 'membre',
  },
  {
    id: 6,
    name: 'Bintou Touré',
    phone: '690000006',
    email: 'bintou@mail.com',
    photo: 'BT',
    joinDate: '2024-02-01',
    status: 'actif',
    role: 'membre',
  },
];

const INITIAL_TRANSACTIONS = [
  {
    id: 1,
    date: '2024-03-01',
    type: 'cotisation',
    memberId: 1,
    amount: 25000,
    description: 'Cotisation mars',
    status: 'payé',
  },
  {
    id: 2,
    date: '2024-03-01',
    type: 'cotisation',
    memberId: 2,
    amount: 25000,
    description: 'Cotisation mars',
    status: 'payé',
  },
  {
    id: 3,
    date: '2024-03-01',
    type: 'cotisation',
    memberId: 3,
    amount: 25000,
    description: 'Cotisation mars',
    status: 'payé',
  },
  {
    id: 4,
    date: '2024-03-01',
    type: 'cotisation',
    memberId: 4,
    amount: 25000,
    description: 'Cotisation mars',
    status: 'payé',
  },
  {
    id: 5,
    date: '2024-03-01',
    type: 'cotisation',
    memberId: 5,
    amount: 25000,
    description: 'Cotisation mars',
    status: 'en attente',
  },
  {
    id: 6,
    date: '2024-03-05',
    type: 'tontine',
    memberId: 2,
    amount: 120000,
    description: 'Tour de tontine - Kwame',
    status: 'payé',
  },
  {
    id: 7,
    date: '2024-03-10',
    type: 'epargne',
    memberId: 1,
    amount: 15000,
    description: 'Épargne volontaire',
    status: 'payé',
  },
  {
    id: 8,
    date: '2024-03-12',
    type: 'pret',
    memberId: 4,
    amount: -50000,
    description: 'Prêt accordé - Cédric',
    status: 'payé',
  },
  {
    id: 9,
    date: '2024-03-15',
    type: 'secours_malheur',
    memberId: 3,
    amount: -30000,
    description: 'Aide décès famille Diallo',
    status: 'payé',
  },
  {
    id: 10,
    date: '2024-03-18',
    type: 'secours_joie',
    memberId: 5,
    amount: 10000,
    description: 'Cotisation mariage Nana',
    status: 'payé',
  },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    from: 1,
    to: 'all',
    date: '2024-03-20 09:00',
    subject: 'Rappel réunion mensuelle',
    content:
      'Chers membres, la réunion mensuelle aura lieu samedi 23 mars à 14h00 chez Amina. Votre présence est indispensable.',
    read: false,
  },
  {
    id: 2,
    from: 2,
    to: 'all',
    date: '2024-03-19 16:30',
    subject: 'État de la caisse - Mars',
    content:
      "Bilan de mi-mois : Caisse = 185,000 FCFA. Rappel aux membres n'ayant pas encore cotisé.",
    read: true,
  },
];

const INITIAL_ROTATION = [
  {
    order: 1,
    memberId: 1,
    scheduledDate: '2024-01-01',
    status: 'reçu',
    amount: 120000,
  },
  {
    order: 2,
    memberId: 2,
    scheduledDate: '2024-02-01',
    status: 'reçu',
    amount: 120000,
  },
  {
    order: 3,
    memberId: 3,
    scheduledDate: '2024-03-01',
    status: 'reçu',
    amount: 120000,
  },
  {
    order: 4,
    memberId: 4,
    scheduledDate: '2024-04-01',
    status: 'prévu',
    amount: 120000,
  },
  {
    order: 5,
    memberId: 5,
    scheduledDate: '2024-05-01',
    status: 'prévu',
    amount: 120000,
  },
  {
    order: 6,
    memberId: 6,
    scheduledDate: '2024-06-01',
    status: 'prévu',
    amount: 120000,
  },
];

const INITIAL_MEETINGS = [
  {
    id: 1,
    date: '2024-02-24',
    lieu: 'Domicile Amina Bello',
    presences: [1, 2, 3, 4],
    absences: [5, 6],
    excuses: [],
    points: [
      'Bilan financier de janvier',
      'Organisation rotation février',
      'Point prêts en cours',
    ],
    decisions: [
      "Amina présidera la réunion d'avril",
      "Taux d'intérêt prêt maintenu à 5%",
      'Prochain lieu: domicile Cédric',
    ],
    rapporteur: 3,
  },
];

const fmt = (n) => new Intl.NumberFormat('fr-FR').format(n) + ' FCFA';
const fmtDate = (d) => new Date(d).toLocaleDateString('fr-FR');

const Avatar = ({ initials, size = 36, color = COLORS.gold }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: size * 0.33,
      color: '#fff',
      flexShrink: 0,
      letterSpacing: '0.05em',
    }}
  >
    {initials}
  </div>
);

const Badge = ({ label, color, bg }) => (
  <span
    style={{
      background: bg || COLORS.goldLight,
      color: color || COLORS.goldDark,
      borderRadius: 20,
      padding: '2px 10px',
      fontSize: 11,
      fontWeight: 600,
    }}
  >
    {label}
  </span>
);

const Card = ({ children, style }) => (
  <div
    style={{
      background: '#fff',
      borderRadius: 14,
      border: `1px solid ${COLORS.goldLight}`,
      padding: '1.25rem',
      boxShadow: '0 2px 12px rgba(200,148,10,0.07)',
      ...style,
    }}
  >
    {children}
  </div>
);

const StatCard = ({ label, value, icon, color = COLORS.gold, sub }) => (
  <div
    style={{
      background: `linear-gradient(135deg, ${color}15 0%, #fff 100%)`,
      borderRadius: 14,
      border: `1px solid ${color}30`,
      padding: '1.1rem 1.2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      minWidth: 0,
    }}
  >
    <div style={{ fontSize: 22 }}>{icon}</div>
    <div
      style={{
        fontSize: 22,
        fontWeight: 700,
        color: COLORS.brown,
        lineHeight: 1,
      }}
    >
      {value}
    </div>
    <div style={{ fontSize: 12, color: COLORS.gray }}>{label}</div>
    {sub && (
      <div style={{ fontSize: 11, color: color, fontWeight: 600 }}>{sub}</div>
    )}
  </div>
);

const Input = ({ label, ...props }) => (
  <label
    style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13 }}
  >
    <span style={{ color: COLORS.gray, fontWeight: 600 }}>{label}</span>
    <input
      {...props}
      style={{
        border: `1px solid ${COLORS.goldLight}`,
        borderRadius: 8,
        padding: '7px 10px',
        fontSize: 14,
        background: COLORS.cream,
        color: COLORS.brown,
        outline: 'none',
        ...props.style,
      }}
    />
  </label>
);

const Select = ({ label, children, ...props }) => (
  <label
    style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13 }}
  >
    {label && (
      <span style={{ color: COLORS.gray, fontWeight: 600 }}>{label}</span>
    )}
    <select
      {...props}
      style={{
        border: `1px solid ${COLORS.goldLight}`,
        borderRadius: 8,
        padding: '7px 10px',
        fontSize: 14,
        background: COLORS.cream,
        color: COLORS.brown,
        outline: 'none',
        ...props.style,
      }}
    >
      {children}
    </select>
  </label>
);

const Btn = ({ children, onClick, variant = 'primary', style }) => {
  const styles = {
    primary: { background: COLORS.gold, color: '#fff', border: 'none' },
    outline: {
      background: 'transparent',
      color: COLORS.gold,
      border: `1.5px solid ${COLORS.gold}`,
    },
    danger: { background: COLORS.red, color: '#fff', border: 'none' },
    ghost: {
      background: COLORS.grayLight,
      color: COLORS.brown,
      border: 'none',
    },
  };
  return (
    <button
      onClick={onClick}
      style={{
        borderRadius: 8,
        padding: '8px 18px',
        fontWeight: 600,
        fontSize: 13,
        cursor: 'pointer',
        ...styles[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
};

const typeConfig = {
  cotisation: {
    label: 'Cotisation',
    color: COLORS.green,
    bg: COLORS.greenLight,
    sign: '+',
  },
  tontine: {
    label: 'Tour tontine',
    color: COLORS.gold,
    bg: COLORS.goldLight,
    sign: '+',
  },
  epargne: {
    label: 'Épargne',
    color: COLORS.blue,
    bg: COLORS.blueLight,
    sign: '+',
  },
  pret: { label: 'Prêt', color: COLORS.red, bg: COLORS.redLight, sign: '-' },
  secours_malheur: {
    label: 'Secours malheur',
    color: COLORS.brown,
    bg: COLORS.grayLight,
    sign: '-',
  },
  secours_joie: {
    label: 'Secours joie',
    color: '#6B3FA0',
    bg: '#F3EAFD',
    sign: '+',
  },
  remboursement: {
    label: 'Remboursement',
    color: COLORS.green,
    bg: COLORS.greenLight,
    sign: '+',
  },
};

const roleLabels = {
  presidente: 'Présidente',
  tresorier: 'Trésorier(e)',
  secretaire: 'Secrétaire',
  membre: 'Membre',
};

export default function App() {
  const [tab, setTab] = useState('dashboard');
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [rotation, setRotation] = useState(INITIAL_ROTATION);
  const [meetings, setMeetings] = useState(INITIAL_MEETINGS);
  const [modal, setModal] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeMessage, setActiveMessage] = useState(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [newMsg, setNewMsg] = useState({ to: 'all', subject: '', content: '' });
  const [txFilter, setTxFilter] = useState('all');
  const [searchMember, setSearchMember] = useState('');
  const [memberForm, setMemberForm] = useState({
    name: '',
    phone: '',
    email: '',
    role: 'membre',
  });
  const [txForm, setTxForm] = useState({
    type: 'cotisation',
    memberId: '',
    amount: '',
    description: '',
    date: new Date().toISOString().slice(0, 10),
    status: 'payé',
  });
  const [meetingForm, setMeetingForm] = useState({
    date: '',
    lieu: '',
    points: '',
    decisions: '',
    rapporteur: '',
    presences: [],
    absences: [],
  });
  const [meetingDetail, setMeetingDetail] = useState(null);
  const [activeView, setActiveView] = useState(null);

  const totalIn = transactions
    .filter(
      (t) =>
        !['pret', 'secours_malheur'].includes(t.type) && t.status === 'payé'
    )
    .reduce((s, t) => s + t.amount, 0);
  const totalOut = transactions
    .filter(
      (t) => ['pret', 'secours_malheur'].includes(t.type) && t.status === 'payé'
    )
    .reduce((s, t) => s + Math.abs(t.amount), 0);
  const caisse = totalIn - totalOut;
  const pending = transactions.filter((t) => t.status === 'en attente').length;
  const nextTour = rotation.find((r) => r.status === 'prévu');
  const nextMember = nextTour
    ? members.find((m) => m.id === nextTour.memberId)
    : null;
  const unreadCount = messages.filter((m) => !m.read).length;

  const getMember = (id) => members.find((m) => m.id === id);

  const addMember = () => {
    if (!memberForm.name.trim()) return;
    const initials = memberForm.name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    const newM = {
      id: Date.now(),
      ...memberForm,
      photo: initials,
      joinDate: new Date().toISOString().slice(0, 10),
      status: 'actif',
    };
    setMembers((prev) => [...prev, newM]);
    const newRot = {
      order: rotation.length + 1,
      memberId: newM.id,
      scheduledDate: '',
      status: 'prévu',
      amount: 120000,
    };
    setRotation((prev) => [...prev, newRot]);
    setMemberForm({ name: '', phone: '', email: '', role: 'membre' });
    setModal(null);
  };

  const addTransaction = () => {
    if (!txForm.memberId || !txForm.amount) return;
    const amt = ['pret', 'secours_malheur'].includes(txForm.type)
      ? -Math.abs(parseFloat(txForm.amount))
      : Math.abs(parseFloat(txForm.amount));
    setTransactions((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...txForm,
        amount: amt,
        memberId: parseInt(txForm.memberId),
      },
    ]);
    setTxForm({
      type: 'cotisation',
      memberId: '',
      amount: '',
      description: '',
      date: new Date().toISOString().slice(0, 10),
      status: 'payé',
    });
    setModal(null);
  };

  const addMeeting = () => {
    if (!meetingForm.date || !meetingForm.lieu) return;
    setMeetings((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...meetingForm,
        points: meetingForm.points.split('\n').filter(Boolean),
        decisions: meetingForm.decisions.split('\n').filter(Boolean),
        rapporteur: parseInt(meetingForm.rapporteur) || members[0]?.id,
        presences: meetingForm.presences,
        absences: meetingForm.absences,
      },
    ]);
    setMeetingForm({
      date: '',
      lieu: '',
      points: '',
      decisions: '',
      rapporteur: '',
      presences: [],
      absences: [],
    });
    setModal(null);
  };

  const sendMessage = () => {
    if (!newMsg.subject || !newMsg.content) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        from: 1,
        ...newMsg,
        date: new Date().toLocaleString('fr-FR'),
        read: true,
      },
    ]);
    setNewMsg({ to: 'all', subject: '', content: '' });
    setComposeOpen(false);
  };

  const navItems = [
    { key: 'dashboard', label: 'Tableau de bord', icon: '◉' },
    { key: 'membres', label: 'Membres', icon: '◎' },
    { key: 'caisse', label: 'Caisse', icon: '▣' },
    { key: 'rotation', label: 'Rotation / Rappels', icon: '↻' },
    { key: 'reunions', label: 'Rapports réunion', icon: '◫' },
    { key: 'messages', label: 'Communication', icon: '◻' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: COLORS.cream,
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          background: COLORS.brown,
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem 0',
          position: 'sticky',
          top: 0,
          height: '100vh',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: '0 1.25rem 1.5rem',
            borderBottom: `1px solid ${COLORS.brownLight}`,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: COLORS.gold,
              letterSpacing: '0.05em',
            }}
          >
            🌿 TONTINA
          </div>
          <div
            style={{
              fontSize: 10,
              color: COLORS.goldLight,
              marginTop: 2,
              letterSpacing: '0.12em',
            }}
          >
            GESTION DE TONTINE
          </div>
        </div>
        <nav style={{ flex: 1, padding: '1rem 0' }}>
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '10px 1.25rem',
                background:
                  tab === item.key ? `${COLORS.gold}25` : 'transparent',
                border: 'none',
                borderLeft:
                  tab === item.key
                    ? `3px solid ${COLORS.gold}`
                    : '3px solid transparent',
                color: tab === item.key ? COLORS.gold : `${COLORS.goldLight}90`,
                fontSize: 13,
                fontWeight: tab === item.key ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
              {item.key === 'messages' && unreadCount > 0 && (
                <span
                  style={{
                    marginLeft: 'auto',
                    background: COLORS.gold,
                    color: '#fff',
                    borderRadius: 10,
                    fontSize: 10,
                    padding: '1px 6px',
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div
          style={{
            padding: '1rem 1.25rem',
            borderTop: `1px solid ${COLORS.brownLight}`,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: `${COLORS.goldLight}70`,
              lineHeight: 1.6,
            }}
          >
            Tontine Solidarité
            <br />
            <span style={{ color: COLORS.gold }}>
              {members.filter((m) => m.status === 'actif').length} membres
              actifs
            </span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main
        style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', minWidth: 0 }}
      >
        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div>
              <h1
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: COLORS.brown,
                  margin: 0,
                }}
              >
                Tableau de bord
              </h1>
              <p
                style={{ color: COLORS.gray, fontSize: 13, margin: '4px 0 0' }}
              >
                Vue d'ensemble —{' '}
                {new Date().toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: 12,
              }}
            >
              <StatCard
                icon="💰"
                label="Solde caisse"
                value={fmt(caisse)}
                color={COLORS.gold}
              />
              <StatCard
                icon="📥"
                label="Total entrées"
                value={fmt(totalIn)}
                color={COLORS.green}
              />
              <StatCard
                icon="📤"
                label="Total sorties"
                value={fmt(totalOut)}
                color={COLORS.red}
              />
              <StatCard
                icon="👥"
                label="Membres actifs"
                value={members.filter((m) => m.status === 'actif').length}
                color={COLORS.blue}
              />
              <StatCard
                icon="⏳"
                label="Paiements en attente"
                value={pending}
                color={COLORS.brown}
                sub={pending > 0 ? 'Action requise' : 'À jour'}
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
              }}
            >
              <Card>
                <h3
                  style={{
                    margin: '0 0 1rem',
                    fontSize: 15,
                    color: COLORS.brown,
                    fontWeight: 700,
                  }}
                >
                  Prochain tour de tontine
                </h3>
                {nextMember ? (
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                  >
                    <Avatar
                      initials={nextMember.photo}
                      size={48}
                      color={COLORS.gold}
                    />
                    <div>
                      <div style={{ fontWeight: 700, color: COLORS.brown }}>
                        {nextMember.name}
                      </div>
                      <div style={{ fontSize: 13, color: COLORS.gray }}>
                        Tour n°{nextTour.order}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: COLORS.gold,
                          fontWeight: 600,
                        }}
                      >
                        {fmt(nextTour.amount)}
                      </div>
                      {nextTour.scheduledDate && (
                        <div style={{ fontSize: 12, color: COLORS.gray }}>
                          {fmtDate(nextTour.scheduledDate)}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p style={{ color: COLORS.gray, fontSize: 13 }}>
                    Tous les tours ont été effectués.
                  </p>
                )}
              </Card>

              <Card>
                <h3
                  style={{
                    margin: '0 0 1rem',
                    fontSize: 15,
                    color: COLORS.brown,
                    fontWeight: 700,
                  }}
                >
                  Dernières opérations
                </h3>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                >
                  {transactions
                    .slice(-4)
                    .reverse()
                    .map((tx) => {
                      const cfg = typeConfig[tx.type] || {};
                      const m = getMember(tx.memberId);
                      return (
                        <div
                          key={tx.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            fontSize: 13,
                          }}
                        >
                          <Avatar
                            initials={m?.photo || '?'}
                            size={28}
                            color={cfg.color}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                color: COLORS.brown,
                                fontWeight: 600,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {m?.name || '?'}
                            </div>
                            <div style={{ fontSize: 11, color: COLORS.gray }}>
                              {cfg.label}
                            </div>
                          </div>
                          <div
                            style={{
                              fontWeight: 700,
                              color: tx.amount > 0 ? COLORS.green : COLORS.red,
                            }}
                          >
                            {tx.amount > 0 ? '+' : ''}
                            {fmt(tx.amount)}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Card>
            </div>

            <Card>
              <h3
                style={{
                  margin: '0 0 1rem',
                  fontSize: 15,
                  color: COLORS.brown,
                  fontWeight: 700,
                }}
              >
                État des cotisations — membres
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                  gap: 8,
                }}
              >
                {members
                  .filter((m) => m.status === 'actif')
                  .map((m) => {
                    const paid = transactions.some(
                      (t) =>
                        t.memberId === m.id &&
                        t.type === 'cotisation' &&
                        t.status === 'payé' &&
                        t.date >= '2024-03-01'
                    );
                    return (
                      <div
                        key={m.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '8px 10px',
                          borderRadius: 10,
                          background: paid
                            ? COLORS.greenLight
                            : COLORS.redLight,
                          border: `1px solid ${paid ? '#B2D8BB' : '#F5B8B8'}`,
                        }}
                      >
                        <Avatar
                          initials={m.photo}
                          size={28}
                          color={paid ? COLORS.green : COLORS.red}
                        />
                        <div
                          style={{
                            fontSize: 13,
                            color: COLORS.brown,
                            fontWeight: 600,
                            flex: 1,
                          }}
                        >
                          {m.name}
                        </div>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: paid ? COLORS.green : COLORS.red,
                          }}
                        >
                          {paid ? '✓' : '!'}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </Card>
          </div>
        )}

        {/* MEMBRES */}
        {tab === 'membres' && (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h1
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: COLORS.brown,
                  margin: 0,
                }}
              >
                Membres
              </h1>
              <Btn onClick={() => setModal('addMember')}>+ Nouveau membre</Btn>
            </div>
            <input
              placeholder="Rechercher un membre..."
              value={searchMember}
              onChange={(e) => setSearchMember(e.target.value)}
              style={{
                border: `1px solid ${COLORS.goldLight}`,
                borderRadius: 8,
                padding: '8px 12px',
                fontSize: 14,
                background: COLORS.cream,
                color: COLORS.brown,
                width: '100%',
                maxWidth: 320,
              }}
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 12,
              }}
            >
              {members
                .filter((m) =>
                  m.name.toLowerCase().includes(searchMember.toLowerCase())
                )
                .map((m) => (
                  <Card
                    key={m.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedMember(m)}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        marginBottom: 12,
                      }}
                    >
                      <Avatar
                        initials={m.photo}
                        size={44}
                        color={
                          m.role === 'presidente'
                            ? COLORS.gold
                            : m.role === 'tresorier'
                            ? COLORS.green
                            : COLORS.brown
                        }
                      />
                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            color: COLORS.brown,
                            fontSize: 15,
                          }}
                        >
                          {m.name}
                        </div>
                        <Badge
                          label={roleLabels[m.role]}
                          color={COLORS.goldDark}
                          bg={COLORS.goldLight}
                        />
                      </div>
                      <div style={{ marginLeft: 'auto' }}>
                        <span
                          style={{
                            fontSize: 11,
                            padding: '3px 8px',
                            borderRadius: 10,
                            background:
                              m.status === 'actif'
                                ? COLORS.greenLight
                                : COLORS.redLight,
                            color:
                              m.status === 'actif' ? COLORS.green : COLORS.red,
                            fontWeight: 600,
                          }}
                        >
                          {m.status}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 6,
                        fontSize: 12,
                        color: COLORS.gray,
                      }}
                    >
                      <div>📞 {m.phone}</div>
                      <div>📧 {m.email}</div>
                      <div>📅 Depuis {fmtDate(m.joinDate)}</div>
                      <div>
                        💰{' '}
                        {fmt(
                          transactions
                            .filter(
                              (t) =>
                                t.memberId === m.id &&
                                t.amount > 0 &&
                                t.status === 'payé'
                            )
                            .reduce((s, t) => s + t.amount, 0)
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* CAISSE */}
        {tab === 'caisse' && (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h1
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: COLORS.brown,
                  margin: 0,
                }}
              >
                Gestion de la caisse
              </h1>
              <Btn onClick={() => setModal('addTx')}>+ Nouvelle opération</Btn>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: 10,
              }}
            >
              {Object.entries(typeConfig).map(([k, v]) => {
                const total = transactions
                  .filter((t) => t.type === k && t.status === 'payé')
                  .reduce((s, t) => s + Math.abs(t.amount), 0);
                return (
                  <div
                    key={k}
                    onClick={() => setTxFilter(txFilter === k ? 'all' : k)}
                    style={{
                      background: txFilter === k ? v.bg : '#fff',
                      border: `1.5px solid ${
                        txFilter === k ? v.color : COLORS.goldLight
                      }`,
                      borderRadius: 10,
                      padding: '10px 12px',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div
                      style={{ fontSize: 11, color: v.color, fontWeight: 700 }}
                    >
                      {v.label}
                    </div>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: COLORS.brown,
                        marginTop: 4,
                      }}
                    >
                      {fmt(total)}
                    </div>
                  </div>
                );
              })}
            </div>

            <Card>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <h3 style={{ margin: 0, fontSize: 15, color: COLORS.brown }}>
                  Journal des opérations
                </h3>
                <Select
                  value={txFilter}
                  onChange={(e) => setTxFilter(e.target.value)}
                  style={{ padding: '4px 8px', fontSize: 12 }}
                >
                  <option value="all">Tous types</option>
                  {Object.entries(typeConfig).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v.label}
                    </option>
                  ))}
                </Select>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: 13,
                  }}
                >
                  <thead>
                    <tr style={{ background: COLORS.grayLight }}>
                      {[
                        'Date',
                        'Membre',
                        'Type',
                        'Description',
                        'Montant',
                        'Statut',
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: '8px 10px',
                            textAlign: 'left',
                            color: COLORS.gray,
                            fontWeight: 600,
                            fontSize: 12,
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {transactions
                      .filter((t) => txFilter === 'all' || t.type === txFilter)
                      .sort((a, b) => b.date.localeCompare(a.date))
                      .map((tx) => {
                        const cfg = typeConfig[tx.type] || {};
                        const m = getMember(tx.memberId);
                        return (
                          <tr
                            key={tx.id}
                            style={{
                              borderBottom: `1px solid ${COLORS.goldLight}`,
                            }}
                          >
                            <td
                              style={{
                                padding: '8px 10px',
                                color: COLORS.gray,
                              }}
                            >
                              {fmtDate(tx.date)}
                            </td>
                            <td style={{ padding: '8px 10px' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 6,
                                }}
                              >
                                <Avatar
                                  initials={m?.photo || '?'}
                                  size={22}
                                  color={cfg.color}
                                />
                                <span
                                  style={{
                                    color: COLORS.brown,
                                    fontWeight: 600,
                                  }}
                                >
                                  {m?.name || '?'}
                                </span>
                              </div>
                            </td>
                            <td style={{ padding: '8px 10px' }}>
                              <Badge
                                label={cfg.label}
                                color={cfg.color}
                                bg={cfg.bg}
                              />
                            </td>
                            <td
                              style={{
                                padding: '8px 10px',
                                color: COLORS.gray,
                                maxWidth: 180,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {tx.description}
                            </td>
                            <td
                              style={{
                                padding: '8px 10px',
                                fontWeight: 700,
                                color:
                                  tx.amount >= 0 ? COLORS.green : COLORS.red,
                              }}
                            >
                              {tx.amount >= 0 ? '+' : ''}
                              {fmt(tx.amount)}
                            </td>
                            <td style={{ padding: '8px 10px' }}>
                              <span
                                style={{
                                  fontSize: 11,
                                  padding: '2px 8px',
                                  borderRadius: 10,
                                  fontWeight: 600,
                                  background:
                                    tx.status === 'payé'
                                      ? COLORS.greenLight
                                      : COLORS.goldLight,
                                  color:
                                    tx.status === 'payé'
                                      ? COLORS.green
                                      : COLORS.goldDark,
                                }}
                              >
                                {tx.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* ROTATION */}
        {tab === 'rotation' && (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <h1
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: COLORS.brown,
                margin: 0,
              }}
            >
              Rotation & Rappels
            </h1>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
              }}
            >
              <Card>
                <h3
                  style={{
                    margin: '0 0 1rem',
                    fontSize: 15,
                    color: COLORS.brown,
                  }}
                >
                  Tableau de rotation
                </h3>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                >
                  {rotation.map((rot, i) => {
                    const m = getMember(rot.memberId);
                    const statusColors = {
                      reçu: { bg: COLORS.greenLight, color: COLORS.green },
                      prévu: { bg: COLORS.goldLight, color: COLORS.goldDark },
                      'en attente': { bg: COLORS.redLight, color: COLORS.red },
                    };
                    const sc =
                      statusColors[rot.status] || statusColors['prévu'];
                    const isNext =
                      rot.status === 'prévu' &&
                      rotation.filter((r) => r.status === 'prévu')[0]?.order ===
                        rot.order;
                    return (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '10px 12px',
                          borderRadius: 10,
                          background: isNext ? COLORS.goldLight : '#fff',
                          border: `1.5px solid ${
                            isNext ? COLORS.gold : COLORS.goldLight
                          }`,
                        }}
                      >
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            background: COLORS.brown,
                            color: COLORS.gold,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: 12,
                            flexShrink: 0,
                          }}
                        >
                          {rot.order}
                        </div>
                        <Avatar
                          initials={m?.photo || '?'}
                          size={32}
                          color={isNext ? COLORS.gold : COLORS.brownLight}
                        />
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontWeight: 700,
                              color: COLORS.brown,
                              fontSize: 13,
                            }}
                          >
                            {m?.name}
                          </div>
                          <div style={{ fontSize: 11, color: COLORS.gray }}>
                            {rot.scheduledDate
                              ? fmtDate(rot.scheduledDate)
                              : 'Date à définir'}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: COLORS.brown,
                            }}
                          >
                            {fmt(rot.amount)}
                          </div>
                          <span
                            style={{
                              fontSize: 10,
                              padding: '2px 7px',
                              borderRadius: 8,
                              background: sc.bg,
                              color: sc.color,
                              fontWeight: 600,
                            }}
                          >
                            {rot.status}
                          </span>
                        </div>
                        {isNext && <span style={{ fontSize: 18 }}>👑</span>}
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card>
                <h3
                  style={{
                    margin: '0 0 1rem',
                    fontSize: 15,
                    color: COLORS.brown,
                  }}
                >
                  Rappels & Notifications
                </h3>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
                >
                  {members
                    .filter((m) => m.status === 'actif')
                    .map((m) => {
                      const hasPaid = transactions.some(
                        (t) =>
                          t.memberId === m.id &&
                          t.type === 'cotisation' &&
                          t.status === 'payé' &&
                          t.date >= '2024-03-01'
                      );
                      const rotIdx = rotation.findIndex(
                        (r) => r.memberId === m.id
                      );
                      const rot = rotation[rotIdx];
                      return (
                        <div
                          key={m.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '8px 10px',
                            borderRadius: 8,
                            background: COLORS.grayLight,
                          }}
                        >
                          <Avatar
                            initials={m.photo}
                            size={30}
                            color={hasPaid ? COLORS.green : COLORS.red}
                          />
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: COLORS.brown,
                              }}
                            >
                              {m.name}
                            </div>
                            <div style={{ fontSize: 11, color: COLORS.gray }}>
                              Cotisation:{' '}
                              {hasPaid ? '✅ payée' : '❌ non payée'} · Tour n°
                              {rotIdx + 1}
                            </div>
                          </div>
                          {!hasPaid && (
                            <Btn
                              variant="outline"
                              style={{ fontSize: 11, padding: '4px 10px' }}
                              onClick={() => {
                                alert(
                                  `SMS de rappel envoyé à ${m.name} (${m.phone})`
                                );
                              }}
                            >
                              📱 Rappeler
                            </Btn>
                          )}
                        </div>
                      );
                    })}
                </div>
                <div
                  style={{
                    marginTop: '1rem',
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: COLORS.blueLight,
                    border: `1px solid ${COLORS.blue}30`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: COLORS.blue,
                    }}
                  >
                    📣 Envoyer rappel groupé
                  </div>
                  <div
                    style={{ fontSize: 11, color: COLORS.gray, marginTop: 4 }}
                  >
                    Notifier tous les membres en retard de cotisation
                  </div>
                  <Btn
                    style={{ marginTop: 8, fontSize: 11 }}
                    onClick={() =>
                      alert(
                        'Rappels groupés envoyés à tous les membres en retard.'
                      )
                    }
                  >
                    Envoyer à tous
                  </Btn>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* RÉUNIONS */}
        {tab === 'reunions' && (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h1
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: COLORS.brown,
                  margin: 0,
                }}
              >
                Rapports de réunion
              </h1>
              <Btn onClick={() => setModal('addMeeting')}>
                + Nouveau rapport
              </Btn>
            </div>
            {meetingDetail ? (
              <Card>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <h2 style={{ margin: 0, fontSize: 18, color: COLORS.brown }}>
                    Rapport — {fmtDate(meetingDetail.date)}
                  </h2>
                  <Btn variant="ghost" onClick={() => setMeetingDetail(null)}>
                    ← Retour
                  </Btn>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1.25rem',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: COLORS.gray,
                        marginBottom: 6,
                      }}
                    >
                      LIEU
                    </div>
                    <div style={{ color: COLORS.brown }}>
                      {meetingDetail.lieu}
                    </div>

                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: COLORS.gray,
                        marginTop: '1rem',
                        marginBottom: 6,
                      }}
                    >
                      PRÉSENCES ({meetingDetail.presences?.length || 0})
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {(meetingDetail.presences || []).map((id) => {
                        const m = getMember(id);
                        return m ? (
                          <Badge
                            key={id}
                            label={m.name}
                            color={COLORS.green}
                            bg={COLORS.greenLight}
                          />
                        ) : null;
                      })}
                    </div>

                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: COLORS.gray,
                        marginTop: '1rem',
                        marginBottom: 6,
                      }}
                    >
                      ABSENCES ({meetingDetail.absences?.length || 0})
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {(meetingDetail.absences || []).map((id) => {
                        const m = getMember(id);
                        return m ? (
                          <Badge
                            key={id}
                            label={m.name}
                            color={COLORS.red}
                            bg={COLORS.redLight}
                          />
                        ) : null;
                      })}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: COLORS.gray,
                        marginBottom: 6,
                      }}
                    >
                      POINTS À L'ORDRE DU JOUR
                    </div>
                    <ol
                      style={{
                        margin: 0,
                        paddingLeft: 16,
                        color: COLORS.brown,
                        fontSize: 14,
                        lineHeight: 2,
                      }}
                    >
                      {(meetingDetail.points || []).map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ol>

                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: COLORS.gray,
                        marginTop: '1rem',
                        marginBottom: 6,
                      }}
                    >
                      DÉCISIONS PRISES
                    </div>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: 16,
                        color: COLORS.brown,
                        fontSize: 14,
                        lineHeight: 2,
                      }}
                    >
                      {(meetingDetail.decisions || []).map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>

                    <div style={{ marginTop: '1rem' }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: COLORS.gray,
                          marginBottom: 4,
                        }}
                      >
                        RAPPORTEUR
                      </div>
                      {(() => {
                        const r = getMember(meetingDetail.rapporteur);
                        return r ? (
                          <Badge
                            label={r.name}
                            color={COLORS.blue}
                            bg={COLORS.blueLight}
                          />
                        ) : null;
                      })()}
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                {meetings
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .map((m) => (
                    <Card
                      key={m.id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setMeetingDetail(m)}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                        }}
                      >
                        <div
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 10,
                            background: COLORS.goldLight,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                          }}
                        >
                          <div
                            style={{
                              fontSize: 18,
                              fontWeight: 700,
                              color: COLORS.goldDark,
                              lineHeight: 1,
                            }}
                          >
                            {new Date(m.date).getDate()}
                          </div>
                          <div style={{ fontSize: 10, color: COLORS.goldDark }}>
                            {new Date(m.date)
                              .toLocaleString('fr-FR', { month: 'short' })
                              .toUpperCase()}
                          </div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, color: COLORS.brown }}>
                            Réunion du {fmtDate(m.date)}
                          </div>
                          <div style={{ fontSize: 12, color: COLORS.gray }}>
                            {m.lieu} · {m.presences?.length || 0} présents ·{' '}
                            {m.points?.length || 0} points
                          </div>
                        </div>
                        <div style={{ fontSize: 12, color: COLORS.gold }}>
                          Voir le rapport →
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* MESSAGES */}
        {tab === 'messages' && (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h1
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: COLORS.brown,
                  margin: 0,
                }}
              >
                Communication interne
              </h1>
              <Btn onClick={() => setComposeOpen(true)}>+ Nouveau message</Btn>
            </div>

            {composeOpen && (
              <Card style={{ border: `2px solid ${COLORS.gold}` }}>
                <h3 style={{ margin: '0 0 1rem', color: COLORS.brown }}>
                  Rédiger un message
                </h3>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
                >
                  <Select
                    label="Destinataire"
                    value={newMsg.to}
                    onChange={(e) =>
                      setNewMsg((p) => ({ ...p, to: e.target.value }))
                    }
                  >
                    <option value="all">Tous les membres</option>
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </Select>
                  <Input
                    label="Objet"
                    value={newMsg.subject}
                    onChange={(e) =>
                      setNewMsg((p) => ({ ...p, subject: e.target.value }))
                    }
                    placeholder="Objet du message..."
                  />
                  <label
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: COLORS.gray, fontWeight: 600 }}>
                      Message
                    </span>
                    <textarea
                      value={newMsg.content}
                      onChange={(e) =>
                        setNewMsg((p) => ({ ...p, content: e.target.value }))
                      }
                      rows={4}
                      placeholder="Contenu du message..."
                      style={{
                        border: `1px solid ${COLORS.goldLight}`,
                        borderRadius: 8,
                        padding: '8px 10px',
                        fontSize: 14,
                        background: COLORS.cream,
                        color: COLORS.brown,
                        resize: 'vertical',
                      }}
                    />
                  </label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Btn onClick={sendMessage}>Envoyer</Btn>
                    <Btn variant="ghost" onClick={() => setComposeOpen(false)}>
                      Annuler
                    </Btn>
                  </div>
                </div>
              </Card>
            )}

            {activeMessage ? (
              <Card>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <h2 style={{ margin: 0, fontSize: 16, color: COLORS.brown }}>
                    {activeMessage.subject}
                  </h2>
                  <Btn variant="ghost" onClick={() => setActiveMessage(null)}>
                    ← Retour
                  </Btn>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  {(() => {
                    const s = getMember(activeMessage.from);
                    return s ? (
                      <>
                        <Avatar
                          initials={s.photo}
                          size={32}
                          color={COLORS.gold}
                        />
                        <span style={{ fontSize: 13, color: COLORS.gray }}>
                          De <b>{s.name}</b> · {activeMessage.date}
                        </span>
                      </>
                    ) : null;
                  })()}
                </div>
                <div
                  style={{
                    padding: '12px 16px',
                    background: COLORS.grayLight,
                    borderRadius: 8,
                    fontSize: 14,
                    color: COLORS.brown,
                    lineHeight: 1.8,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {activeMessage.content}
                </div>
              </Card>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {messages
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .map((msg) => {
                    const sender = getMember(msg.from);
                    return (
                      <div
                        key={msg.id}
                        onClick={() => {
                          setActiveMessage(msg);
                          setMessages((prev) =>
                            prev.map((m) =>
                              m.id === msg.id ? { ...m, read: true } : m
                            )
                          );
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '12px 16px',
                          borderRadius: 10,
                          cursor: 'pointer',
                          background: msg.read ? '#fff' : COLORS.goldLight,
                          border: `1px solid ${
                            msg.read ? COLORS.goldLight : COLORS.gold
                          }`,
                        }}
                      >
                        <Avatar
                          initials={sender?.photo || '?'}
                          size={36}
                          color={COLORS.gold}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontWeight: msg.read ? 500 : 700,
                              color: COLORS.brown,
                              fontSize: 14,
                            }}
                          >
                            {msg.subject}
                          </div>
                          <div style={{ fontSize: 12, color: COLORS.gray }}>
                            De {sender?.name || 'Inconnu'} ·{' '}
                            {msg.to === 'all'
                              ? 'Tous les membres'
                              : getMember(parseInt(msg.to))?.name}
                          </div>
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: COLORS.gray,
                            flexShrink: 0,
                          }}
                        >
                          {msg.date.split(' ')[0]}
                        </div>
                        {!msg.read && (
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background: COLORS.gold,
                              flexShrink: 0,
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODALS */}
      {modal && (
        <div
          onClick={() => setModal(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(61,31,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: 16,
              padding: '1.75rem',
              width: '100%',
              maxWidth: 480,
              border: `2px solid ${COLORS.gold}`,
              boxShadow: '0 20px 60px rgba(61,31,0,0.2)',
            }}
          >
            {modal === 'addMember' && (
              <>
                <h2 style={{ margin: '0 0 1.25rem', color: COLORS.brown }}>
                  Nouveau membre
                </h2>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                >
                  <Input
                    label="Nom complet *"
                    value={memberForm.name}
                    onChange={(e) =>
                      setMemberForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Ex: Amina Bello"
                  />
                  <Input
                    label="Téléphone"
                    value={memberForm.phone}
                    onChange={(e) =>
                      setMemberForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="6XXXXXXXX"
                  />
                  <Input
                    label="Email"
                    value={memberForm.email}
                    onChange={(e) =>
                      setMemberForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="email@domaine.com"
                  />
                  <Select
                    label="Rôle"
                    value={memberForm.role}
                    onChange={(e) =>
                      setMemberForm((p) => ({ ...p, role: e.target.value }))
                    }
                  >
                    <option value="membre">Membre</option>
                    <option value="presidente">Présidente</option>
                    <option value="tresorier">Trésorier(e)</option>
                    <option value="secretaire">Secrétaire</option>
                  </Select>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <Btn onClick={addMember}>Ajouter</Btn>
                    <Btn variant="ghost" onClick={() => setModal(null)}>
                      Annuler
                    </Btn>
                  </div>
                </div>
              </>
            )}

            {modal === 'addTx' && (
              <>
                <h2 style={{ margin: '0 0 1.25rem', color: COLORS.brown }}>
                  Nouvelle opération
                </h2>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                >
                  <Select
                    label="Type *"
                    value={txForm.type}
                    onChange={(e) =>
                      setTxForm((p) => ({ ...p, type: e.target.value }))
                    }
                  >
                    {Object.entries(typeConfig).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.label}
                      </option>
                    ))}
                  </Select>
                  <Select
                    label="Membre *"
                    value={txForm.memberId}
                    onChange={(e) =>
                      setTxForm((p) => ({ ...p, memberId: e.target.value }))
                    }
                  >
                    <option value="">Sélectionner...</option>
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </Select>
                  <Input
                    label="Montant (FCFA) *"
                    type="number"
                    value={txForm.amount}
                    onChange={(e) =>
                      setTxForm((p) => ({ ...p, amount: e.target.value }))
                    }
                    placeholder="Ex: 25000"
                  />
                  <Input
                    label="Description"
                    value={txForm.description}
                    onChange={(e) =>
                      setTxForm((p) => ({ ...p, description: e.target.value }))
                    }
                    placeholder="Description..."
                  />
                  <Input
                    label="Date"
                    type="date"
                    value={txForm.date}
                    onChange={(e) =>
                      setTxForm((p) => ({ ...p, date: e.target.value }))
                    }
                  />
                  <Select
                    label="Statut"
                    value={txForm.status}
                    onChange={(e) =>
                      setTxForm((p) => ({ ...p, status: e.target.value }))
                    }
                  >
                    <option value="payé">Payé</option>
                    <option value="en attente">En attente</option>
                  </Select>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <Btn onClick={addTransaction}>Enregistrer</Btn>
                    <Btn variant="ghost" onClick={() => setModal(null)}>
                      Annuler
                    </Btn>
                  </div>
                </div>
              </>
            )}

            {modal === 'addMeeting' && (
              <>
                <h2 style={{ margin: '0 0 1.25rem', color: COLORS.brown }}>
                  Nouveau rapport de réunion
                </h2>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    maxHeight: '60vh',
                    overflowY: 'auto',
                  }}
                >
                  <Input
                    label="Date *"
                    type="date"
                    value={meetingForm.date}
                    onChange={(e) =>
                      setMeetingForm((p) => ({ ...p, date: e.target.value }))
                    }
                  />
                  <Input
                    label="Lieu *"
                    value={meetingForm.lieu}
                    onChange={(e) =>
                      setMeetingForm((p) => ({ ...p, lieu: e.target.value }))
                    }
                    placeholder="Ex: Domicile de Amina Bello"
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: COLORS.gray,
                        marginBottom: 6,
                      }}
                    >
                      Membres présents
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {members.map((m) => (
                        <label
                          key={m.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: 12,
                            cursor: 'pointer',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={meetingForm.presences.includes(m.id)}
                            onChange={(e) =>
                              setMeetingForm((p) => ({
                                ...p,
                                presences: e.target.checked
                                  ? [...p.presences, m.id]
                                  : p.presences.filter((id) => id !== m.id),
                                absences: e.target.checked
                                  ? p.absences.filter((id) => id !== m.id)
                                  : [...p.absences, m.id],
                              }))
                            }
                          />
                          {m.name}
                        </label>
                      ))}
                    </div>
                  </div>
                  <label
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: COLORS.gray, fontWeight: 600 }}>
                      Points à l'ordre du jour (un par ligne)
                    </span>
                    <textarea
                      value={meetingForm.points}
                      onChange={(e) =>
                        setMeetingForm((p) => ({
                          ...p,
                          points: e.target.value,
                        }))
                      }
                      rows={3}
                      placeholder={
                        'Bilan financier\nOrganisation rotation\n...'
                      }
                      style={{
                        border: `1px solid ${COLORS.goldLight}`,
                        borderRadius: 8,
                        padding: '8px 10px',
                        fontSize: 14,
                        background: COLORS.cream,
                        color: COLORS.brown,
                      }}
                    />
                  </label>
                  <label
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: COLORS.gray, fontWeight: 600 }}>
                      Décisions prises (une par ligne)
                    </span>
                    <textarea
                      value={meetingForm.decisions}
                      onChange={(e) =>
                        setMeetingForm((p) => ({
                          ...p,
                          decisions: e.target.value,
                        }))
                      }
                      rows={3}
                      placeholder={'Décision 1\nDécision 2\n...'}
                      style={{
                        border: `1px solid ${COLORS.goldLight}`,
                        borderRadius: 8,
                        padding: '8px 10px',
                        fontSize: 14,
                        background: COLORS.cream,
                        color: COLORS.brown,
                      }}
                    />
                  </label>
                  <Select
                    label="Rapporteur"
                    value={meetingForm.rapporteur}
                    onChange={(e) =>
                      setMeetingForm((p) => ({
                        ...p,
                        rapporteur: e.target.value,
                      }))
                    }
                  >
                    <option value="">Sélectionner...</option>
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </Select>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <Btn onClick={addMeeting}>Sauvegarder</Btn>
                    <Btn variant="ghost" onClick={() => setModal(null)}>
                      Annuler
                    </Btn>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Member detail modal */}
      {selectedMember && (
        <div
          onClick={() => setSelectedMember(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(61,31,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: 16,
              padding: '1.75rem',
              width: '100%',
              maxWidth: 500,
              border: `2px solid ${COLORS.gold}`,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: '1.25rem',
              }}
            >
              <Avatar
                initials={selectedMember.photo}
                size={56}
                color={COLORS.gold}
              />
              <div>
                <h2 style={{ margin: 0, color: COLORS.brown }}>
                  {selectedMember.name}
                </h2>
                <Badge label={roleLabels[selectedMember.role]} />
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                style={{
                  marginLeft: 'auto',
                  background: 'none',
                  border: 'none',
                  fontSize: 20,
                  cursor: 'pointer',
                  color: COLORS.gray,
                }}
              >
                ✕
              </button>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
                fontSize: 13,
                marginBottom: '1.25rem',
              }}
            >
              <div
                style={{
                  padding: '8px 10px',
                  background: COLORS.grayLight,
                  borderRadius: 8,
                }}
              >
                <div style={{ color: COLORS.gray, fontSize: 11 }}>
                  Téléphone
                </div>
                <div style={{ fontWeight: 600, color: COLORS.brown }}>
                  {selectedMember.phone}
                </div>
              </div>
              <div
                style={{
                  padding: '8px 10px',
                  background: COLORS.grayLight,
                  borderRadius: 8,
                }}
              >
                <div style={{ color: COLORS.gray, fontSize: 11 }}>Email</div>
                <div style={{ fontWeight: 600, color: COLORS.brown }}>
                  {selectedMember.email}
                </div>
              </div>
              <div
                style={{
                  padding: '8px 10px',
                  background: COLORS.grayLight,
                  borderRadius: 8,
                }}
              >
                <div style={{ color: COLORS.gray, fontSize: 11 }}>
                  Membre depuis
                </div>
                <div style={{ fontWeight: 600, color: COLORS.brown }}>
                  {fmtDate(selectedMember.joinDate)}
                </div>
              </div>
              <div
                style={{
                  padding: '8px 10px',
                  background: COLORS.grayLight,
                  borderRadius: 8,
                }}
              >
                <div style={{ color: COLORS.gray, fontSize: 11 }}>
                  Total cotisé
                </div>
                <div style={{ fontWeight: 700, color: COLORS.green }}>
                  {fmt(
                    transactions
                      .filter(
                        (t) =>
                          t.memberId === selectedMember.id &&
                          t.amount > 0 &&
                          t.status === 'payé'
                      )
                      .reduce((s, t) => s + t.amount, 0)
                  )}
                </div>
              </div>
            </div>
            <h3
              style={{ margin: '0 0 8px', color: COLORS.brown, fontSize: 14 }}
            >
              Historique des opérations
            </h3>
            <div
              style={{
                maxHeight: 200,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              {transactions
                .filter((t) => t.memberId === selectedMember.id)
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((tx) => {
                  const cfg = typeConfig[tx.type] || {};
                  return (
                    <div
                      key={tx.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '6px 10px',
                        borderRadius: 6,
                        background: COLORS.grayLight,
                      }}
                    >
                      <Badge label={cfg.label} color={cfg.color} bg={cfg.bg} />
                      <span
                        style={{ flex: 1, fontSize: 12, color: COLORS.gray }}
                      >
                        {tx.description}
                      </span>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: 13,
                          color: tx.amount >= 0 ? COLORS.green : COLORS.red,
                        }}
                      >
                        {tx.amount >= 0 ? '+' : ''}
                        {fmt(tx.amount)}
                      </span>
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
