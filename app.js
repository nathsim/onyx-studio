// ===================== ONYX STUDIO — Application =====================
// SPA vanilla JS. Toutes les données restent en local (localStorage).
// Design : sombre premium noir + accent personnalisable (doré par défaut).
// Comptes : multi-comptes locaux avec mot de passe (démo — pas de vraie sécurité).

'use strict';

/* ---------------- Thèmes d'accent ---------------- */
const THEMES = {
  gold:   { name: 'Doré',    main: '#E0BE72' },
  violet: { name: 'Violet',  main: '#B79CFF' },
  mint:   { name: 'Menthe',  main: '#7FE0B2' },
  rose:   { name: 'Rose',    main: '#F49AC1' },
};
// `state` est déclaré ici (assigné plus bas) pour éviter la zone morte temporelle (TDZ)
let state = null;
const themeMain = () => THEMES[(state && state.user && state.user.theme) || 'gold'].main;

/* ---------------- Icônes SVG ---------------- */
function I(name, size = 22, extra = '') {
  const P = {
    search:   '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.2" y2="16.2"/>',
    heart:    '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>',
    calendar: '<rect x="3" y="5" width="18" height="17" rx="3"/><line x1="8" y1="2.5" x2="8" y2="7"/><line x1="16" y1="2.5" x2="16" y2="7"/><line x1="3" y1="10.5" x2="21" y2="10.5"/>',
    clock:    '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/>',
    user:     '<circle cx="12" cy="8" r="4"/><path d="M4.5 21c.8-4 4-6 7.5-6s6.7 2 7.5 6"/>',
    pin:      '<path d="M21 10c0 6.5-9 12-9 12S3 16.5 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    cartAdd:  '<path d="M4 6h2.5l2 11.5h9.5L20 9H7"/><circle cx="10" cy="20.5" r="1.6" fill="currentColor"/><circle cx="16.5" cy="20.5" r="1.6" fill="currentColor"/><line x1="15.5" y1="4" x2="20.5" y2="4"/><line x1="18" y1="1.5" x2="18" y2="6.5"/>',
    cart:     '<path d="M3 5h3l2.2 12h10L21 8H7.5"/><circle cx="10" cy="20.5" r="1.6" fill="currentColor"/><circle cx="16.5" cy="20.5" r="1.6" fill="currentColor"/>',
    chevR:    '<polyline points="9 6 15 12 9 18"/>',
    chevD:    '<polyline points="6 9 12 15 18 9"/>',
    back:     '<line x1="20" y1="12" x2="4" y2="12"/><polyline points="10 6 4 12 10 18"/>',
    pencil:   '<path d="M17 3.5l3.5 3.5L8 19.5 3.5 20.5 4.5 16z"/>',
    xcircle:  '<circle cx="12" cy="12" r="9"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>',
    navArrow: '<path d="M12 2.5 L18.5 21 L12 16.2 L5.5 21 Z" fill="currentColor" stroke="none"/>',
    download: '<path d="M12 3v11"/><polyline points="7 10 12 15 17 10"/><path d="M4 19h16"/>',
    scan:     '<path d="M3 8V5a2 2 0 0 1 2-2h3"/><path d="M16 3h3a2 2 0 0 1 2 2v3"/><path d="M21 16v3a2 2 0 0 1-2 2h-3"/><path d="M8 21H5a2 2 0 0 1-2-2v-3"/><line x1="7" y1="12" x2="17" y2="12"/>',
    card:     '<rect x="2.5" y="5" width="19" height="14.5" rx="3"/><line x1="2.5" y1="10" x2="21.5" y2="10" stroke-width="3.4"/>',
    tag:      '<path d="M20.6 13.3l-7.3 7.3a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.7z"/><circle cx="7.5" cy="7.5" r="1.6" fill="currentColor" stroke="none"/>',
    receipt:  '<path d="M5 2.5h14V21l-2.3-1.5L14.4 21l-2.4-1.5L9.6 21l-2.3-1.5L5 21z"/><line x1="8.5" y1="7.5" x2="15.5" y2="7.5"/><line x1="8.5" y1="11.5" x2="15.5" y2="11.5"/><line x1="8.5" y1="15.5" x2="13" y2="15.5"/>',
    gift:     '<rect x="3" y="8" width="18" height="4"/><path d="M5 12v9h14v-9"/><line x1="12" y1="8" x2="12" y2="21"/><path d="M12 8c-1.7-3.2-6.2-3-6-.4.1 1.6 3.4 1 6 .4zm0 0c1.7-3.2 6.2-3 6-.4-.1 1.6-3.4 1-6 .4z"/>',
    house:    '<path d="M3 10.8 12 3l9 7.8"/><path d="M5.5 9.8V21h13V9.8"/><path d="M10 21v-6h4v6"/>',
    ticket:   '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><line x1="13.5" y1="5.5" x2="13.5" y2="7.5"/><line x1="13.5" y1="11" x2="13.5" y2="13"/><line x1="13.5" y1="16.5" x2="13.5" y2="18.5"/>',
    bag:      '<path d="M6.5 8h11L19 21H5z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
    figure:   '<circle cx="12" cy="3.6" r="2"/><path d="M12 6v8.4"/><path d="M12 8.2c-2.4 1.4-4.3 1.1-6 .2M12 8.2c2.4 1.4 4.3 1.1 6 .2"/><path d="M12 14.4l-3.2 5M12 14.4l3.2 5"/><line x1="6.5" y1="21" x2="17.5" y2="21"/>',
    check:    '<polyline points="4.5 12.5 9.5 17.5 19.5 6.5"/>',
    plus:     '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    minus:    '<line x1="5" y1="12" x2="19" y2="12"/>',
    logout:   '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    bell:     '<path d="M18 9a6 6 0 0 0-12 0c0 6-2.5 7.5-2.5 7.5h17S18 15 18 9z"/><path d="M10 20a2.2 2.2 0 0 0 4 0"/>',
    sync:     '<polyline points="22 3.5 22 9.5 16 9.5"/><polyline points="2 20.5 2 14.5 8 14.5"/><path d="M4.6 9A8 8 0 0 1 20 6.5l2 3M20 15a8 8 0 0 1-15.4 2.5l-2-3"/>',
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${P[name] || ''}</svg>`;
}

const LOGO = (s = 46, color = null) => {
  const c = color || themeMain();
  return `<svg width="${s}" height="${s}" viewBox="0 0 100 100"><circle cx="46" cy="44" r="25" fill="none" stroke="${c}" stroke-width="15"/><circle cx="76" cy="75" r="10" fill="${c}"/></svg>`;
};

/* ---------------- Utilitaires ---------------- */
const $ = s => document.querySelector(s);
const DAYS = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];
const MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
const pad = n => String(n).padStart(2, '0');
const dayKey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fmtTime = d => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
const fmtPill = d => `${DAYS[d.getDay()]}. ${d.getDate()} ${MONTHS[d.getMonth()]} · ${fmtTime(d)}`;
const fmtDate = d => `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
const fmtSlash = d => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
const eur = n => n.toFixed(2);
const uid = () => Math.random().toString(16).slice(2, 10);
const plural = (n, w) => `${n} ${w}${n > 1 && !/[sxz]$/.test(w) ? 's' : ''}`;
// Échappement HTML des textes saisis (noms, commentaires, annonces…)
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Échappement pour un argument de chaîne dans un onclick="act.x('…')"
const arg = s => esc(String(s ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'"));

function addMonths(d, m) { const x = new Date(d); x.setMonth(x.getMonth() + m); return x; }
function hash(s) { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0; return h; }
function countdown(d) {
  const days = Math.floor((new Date(dayKey(d) + 'T00:00') - new Date(dayKey(new Date()) + 'T00:00')) / 864e5);
  if (days <= 0) return "aujourd'hui";
  if (days === 1) return 'demain';
  return `dans ${days} jours`;
}

/* ---------------- Séances (générées sur ±3 semaines) ---------------- */
function buildSessions() {
  const list = [];
  const start = new Date(); start.setHours(0, 0, 0, 0);
  for (let off = -21; off <= 21; off++) {
    const d = new Date(start); d.setDate(d.getDate() + off);
    for (const s of (WEEK_TEMPLATE[d.getDay()] || [])) {
      const [h, m] = s.time.split(':');
      const dt = new Date(d); dt.setHours(+h, +m, 0, 0);
      const type = CLASS_TYPES.find(t => t.id === s.type);
      list.push({ id: `${dayKey(d)}_${s.time.replace(':', '')}_${type.id}`, date: dt, type, teacher: s.teacher });
    }
  }
  return list.sort((a, b) => a.date - b.date);
}
/* Config du studio modifiable depuis l'Espace gérant (surcharge data.js) */
const C_KEY = 'onyx_config_v1';
let ANNONCES = []; // annonces publiées par le gérant
function loadConfig() {
  try {
    const c = JSON.parse(localStorage.getItem(C_KEY));
    if (!c) return;
    if (c.brand) Object.assign(BRAND, c.brand);
    if (c.teachers) TEACHERS = c.teachers;
    if (c.classTypes) CLASS_TYPES = c.classTypes;
    if (c.weekTemplate) WEEK_TEMPLATE = c.weekTemplate;
    if (c.packs) PACKS = c.packs;
    if (c.subs) SUBS = c.subs;
    if (c.products) PRODUCTS = c.products;
    if (c.annonces) ANNONCES = c.annonces;
  } catch { /* config invalide → défauts */ }
}
function persistConfig() {
  localStorage.setItem(C_KEY, JSON.stringify({
    brand: { name: BRAND.name, full: BRAND.full, tagline: BRAND.tagline, address: BRAND.address, phone: BRAND.phone, email: BRAND.email },
    teachers: TEACHERS, classTypes: CLASS_TYPES, weekTemplate: WEEK_TEMPLATE, packs: PACKS, subs: SUBS,
    products: PRODUCTS, annonces: ANNONCES,
  }));
  rebuildSessions();
  document.title = BRAND.name + ' studio';
}
loadConfig();
document.title = BRAND.name + ' studio';

let SESSIONS = buildSessions();
let SESSION_BY_ID = Object.fromEntries(SESSIONS.map(s => [s.id, s]));
function rebuildSessions() {
  SESSIONS = buildSessions();
  SESSION_BY_ID = Object.fromEntries(SESSIONS.map(s => [s.id, s]));
}
const futureSessions = () => SESSIONS.filter(s => s.date > new Date());

function seatsInfo(sess) {
  const h = hash(sess.id);
  if (h % 13 === 0) {
    // une place s'est peut-être libérée pour toi (promotion liste d'attente)
    const promoted = state && state.waitPromos && state.waitPromos.includes(sess.id);
    return promoted ? { full: false, left: 1, promoted: true } : { full: true, left: 0 };
  }
  return { full: false, left: 2 + (h % 7) };
}

/* ---------------- Comptes locaux ---------------- */
const A_KEY = 'onyx_accounts_v1';
const S_KEY = 'onyx_session_v1';
const DEMO_EMAIL = 'demo@onyx-studio.fr';

// Hachage simple pour la démo (PAS une vraie sécurité — tout reste local)
const passHash = (email, pass) => 'h' + hash(email.toLowerCase() + '|' + pass);

let ACCOUNTS = (() => {
  try { return JSON.parse(localStorage.getItem(A_KEY)) || {}; } catch { return {}; }
})();
let SESSION = localStorage.getItem(S_KEY) || null;

function persistAccounts() {
  localStorage.setItem(A_KEY, JSON.stringify(ACCOUNTS));
  if (SESSION) localStorage.setItem(S_KEY, SESSION); else localStorage.removeItem(S_KEY);
}

function emptyData() {
  return { favorites: [], cart: [], cards: [], subs: [], invoices: [], reservations: [], waitlist: [], waitPromos: [], ratings: {}, notifs: [], challenges: {}, invTab: 'paid', resaTab: 'up' };
}

function defaultState() { return Object.assign({ user: null }, emptyData()); }

/* Données de démo pour le compte demo@onyx-studio.fr */
function seedData() {
  const now = new Date();
  const iso = d => d.toISOString();
  const firstNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1, 9, 0, 0);
  const d = emptyData();
  d.cards = [
    { id: uid(), label: 'ABONNEMENT 8 CRÉDITS/MOIS', total: 8, remaining: 6, expires: iso(addMonths(now, 3)) },
    { id: uid(), label: '1 COURS MAT', total: 1, remaining: 1, expires: iso(new Date(now.getTime() + 5 * 864e5)) },
    { id: uid(), label: 'ABONNEMENT 8 CRÉDITS/MOIS', total: 8, remaining: 0, expires: iso(addMonths(now, 2)) },
    { id: uid(), label: 'ABONNEMENT 8 CRÉDITS/MOIS', total: 8, remaining: 0, expires: iso(addMonths(now, 1)) },
  ];
  d.subs = [{ id: uid(), ref: 's8', label: '8 CRÉDITS/MOIS', price: 99, credits: 8, status: 'active', nextBilling: iso(firstNextMonth) }];
  d.invoices = [
    { id: uid(), num: uid(), date: iso(new Date(now.getTime() - 20 * 864e5)), label: 'ABONNEMENT 8 CRÉDITS/MOIS', amount: 99, status: 'paid' },
    { id: uid(), num: uid(), date: iso(new Date(now.getTime() - 24 * 864e5)), label: '1 COURS MAT', amount: 0, status: 'paid' },
    { id: uid(), num: uid(), date: iso(new Date(now.getTime() - 50 * 864e5)), label: 'ABONNEMENT 8 CRÉDITS/MOIS', amount: 99, status: 'paid' },
  ];
  d.favorites = ['vinyasa-flow', 'power-pilates'];
  const fut = futureSessions().filter(s => s.type.id === 'reformer-flow' && !seatsInfo(s).full);
  if (fut[1]) d.reservations.push({ id: uid(), sessionId: fut[1].id, status: 'active', guests: 0, cost: 2 });
  const past = SESSIONS.filter(s => s.date < now && (s.type.id === 'reformer-flow' || s.type.id === 'vinyasa-flow')).slice(-3);
  for (const p of past) d.reservations.push({ id: uid(), sessionId: p.id, status: 'active', guests: 0, cost: p.type.credits });
  return d;
}

function makeAccount(name, email, pass, data, extra = {}) {
  const e = email.toLowerCase();
  return {
    name, email: e,
    passHash: passHash(e, pass),
    phone: extra.phone || '', address: extra.address || '', emergency: '',
    memberId: 'OX-' + (1000 + hash(e) % 9000),
    since: extra.since || new Date().toISOString(),
    theme: 'gold', weeklyGoal: 3,
    role: extra.role || 'member',
    data,
  };
}

const ADMIN_EMAIL = 'admin@onyx-studio.fr';

function ensureDemoAccount() {
  let changed = false;
  if (!ACCOUNTS[DEMO_EMAIL]) {
    ACCOUNTS[DEMO_EMAIL] = makeAccount('Léa', DEMO_EMAIL, 'demo1234', seedData(),
      { phone: '+33 6 00 00 00 00', address: 'La Rochelle, France' });
    changed = true;
  }
  if (!ACCOUNTS[ADMIN_EMAIL]) {
    ACCOUNTS[ADMIN_EMAIL] = makeAccount('Gérant·e', ADMIN_EMAIL, 'admin1234', emptyData(), { role: 'admin' });
    changed = true;
  }
  if (changed) persistAccounts();
}

/* Migration depuis l'ancienne version mono-compte */
function migrateLegacy() {
  try {
    const old = JSON.parse(localStorage.getItem('onyx_state_v2'));
    if (old && old.user && old.user.email) {
      const e = old.user.email.toLowerCase();
      if (!ACCOUNTS[e]) {
        const data = Object.assign(emptyData(), {
          favorites: old.favorites || [], cart: old.cart || [], cards: old.cards || [],
          subs: old.subs || [], invoices: old.invoices || [],
          reservations: (old.reservations || []).map(r => Object.assign({ guests: 0, cost: null }, r)),
          invTab: old.invTab || 'paid',
          resaTab: ['up', 'past', 'fav'].includes(old.resaTab) ? old.resaTab : 'up',
        });
        ACCOUNTS[e] = makeAccount(old.user.name || 'Membre', e, 'demo1234', data,
          { phone: old.user.phone, address: old.user.address, since: old.user.since });
        persistAccounts();
      }
    }
  } catch { /* rien */ }
  localStorage.removeItem('onyx_state_v2');
}

function hydrate(acc) {
  const d = Object.assign(emptyData(), acc.data || {});
  // migration : anciennes notes stockées en simple nombre → objet {stars, comment}
  for (const k of Object.keys(d.ratings)) {
    if (typeof d.ratings[k] === 'number') d.ratings[k] = { stars: d.ratings[k], comment: '' };
  }
  return Object.assign({
    user: {
      name: acc.name, email: acc.email, phone: acc.phone, address: acc.address,
      emergency: acc.emergency, memberId: acc.memberId, since: acc.since,
      theme: acc.theme || 'gold', weeklyGoal: acc.weeklyGoal || 3,
      role: acc.role || 'member',
    },
  }, d);
}

migrateLegacy();
ensureDemoAccount();
state = (SESSION && ACCOUNTS[SESSION]) ? hydrate(ACCOUNTS[SESSION]) : defaultState();

function save() {
  if (state.user) {
    const e = state.user.email.toLowerCase();
    const a = ACCOUNTS[e];
    if (a) {
      a.name = state.user.name; a.phone = state.user.phone; a.address = state.user.address;
      a.emergency = state.user.emergency; a.theme = state.user.theme; a.weeklyGoal = state.user.weeklyGoal;
      a.data = {
        favorites: state.favorites, cart: state.cart, cards: state.cards, subs: state.subs,
        invoices: state.invoices, reservations: state.reservations, waitlist: state.waitlist,
        ratings: state.ratings, invTab: state.invTab, resaTab: state.resaTab,
      };
    }
  }
  persistAccounts();
}

// Filtres transitoires (non sauvegardés)
let Q = '';
let AUTH_TAB = 'login';
let ADMIN_DAY = 1;      // jour sélectionné dans l'éditeur de planning (1 = lundi)
let PWA_PROMPT = null;  // événement beforeinstallprompt (installation PWA)
const F = { lieu: null, prof: null, date: null };

/* ---------------- Crédits ---------------- */
const activeCards = () => state.cards.filter(c => new Date(c.expires) > new Date() && (c.total === -1 || c.remaining > 0));
const hasUnlimited = () => activeCards().some(c => c.total === -1);
const creditBalance = () => hasUnlimited() ? Infinity : activeCards().reduce((s, c) => s + c.remaining, 0);

function payCredits(cost) {
  if (hasUnlimited()) return true;
  if (creditBalance() < cost) return false;
  const cards = activeCards().filter(c => c.total !== -1).sort((a, b) => new Date(a.expires) - new Date(b.expires));
  for (const c of cards) {
    const take = Math.min(c.remaining, cost);
    c.remaining -= take; cost -= take;
    if (!cost) break;
  }
  save(); return true;
}

function refundCredits(cost) {
  if (hasUnlimited()) return;
  const cards = state.cards.filter(c => new Date(c.expires) > new Date() && c.total > 0)
    .sort((a, b) => new Date(a.expires) - new Date(b.expires));
  const target = cards.find(c => c.remaining + cost <= c.total);
  if (target) target.remaining += cost;
  else state.cards.unshift({ id: uid(), label: 'AVOIR — REMBOURSEMENT', total: cost, remaining: cost, expires: addMonths(new Date(), 3).toISOString() });
  save();
}

/* Facturation mensuelle simulée de l'abonnement actif */
function tickSubscription() {
  if (!state.user) return;
  const sub = state.subs.find(s => s.status === 'active');
  if (!sub) return;
  let nb = new Date(sub.nextBilling);
  const now = new Date();
  let changed = false;
  while (nb <= now) {
    state.invoices.unshift({ id: uid(), num: uid(), date: nb.toISOString(), label: 'ABONNEMENT ' + sub.label, amount: sub.price, status: 'paid' });
    state.cards.unshift({ id: uid(), label: 'ABONNEMENT ' + sub.label, total: sub.credits, remaining: sub.credits === -1 ? -1 : sub.credits, expires: addMonths(nb, 3).toISOString() });
    nb = addMonths(nb, 1); changed = true;
  }
  if (changed) { sub.nextBilling = nb.toISOString(); save(); }
}

/* ---------------- Objectif hebdo & badges ---------------- */
function weekRange() {
  const now = new Date();
  const mon = new Date(now); mon.setHours(0, 0, 0, 0);
  mon.setDate(mon.getDate() - ((now.getDay() + 6) % 7));
  const end = new Date(mon); end.setDate(end.getDate() + 7);
  return [mon, end];
}
function weekCount() {
  const [a, b] = weekRange();
  return state.reservations.filter(r => {
    if (r.status !== 'active') return false;
    const s = SESSION_BY_ID[r.sessionId];
    return s && s.date >= a && s.date < b;
  }).length;
}

function pastSessionsDone() {
  const now = new Date();
  return state.reservations
    .filter(r => r.status === 'active')
    .map(r => SESSION_BY_ID[r.sessionId])
    .filter(s => s && s.date < now);
}

function computeBadges() {
  const past = pastSessionsDone();
  const types = new Set(past.map(s => s.type.id));
  return [
    { emoji: '🎟️', name: '1ʳᵉ séance', ok: past.length >= 1 },
    { emoji: '🔥', name: '5 séances', ok: past.length >= 5 },
    { emoji: '💎', name: '10 séances', ok: past.length >= 10 },
    { emoji: '🌅', name: 'Lève-tôt', ok: past.some(s => s.date.getHours() < 10) },
    { emoji: '🦋', name: 'Curiosité', ok: types.size >= 3 },
    { emoji: '🖤', name: 'Abonné·e', ok: state.subs.some(s => s.status === 'active') },
    { emoji: '✅', name: 'Présent·e ×3', ok: state.reservations.filter(r => r.checkedIn).length >= 3 },
    { emoji: '🤝', name: 'Parrainage', ok: state.cards.some(c => (c.label || '').includes('PARRAINAGE')) },
    { emoji: '🏆', name: '1ᵉʳ défi', ok: Object.keys(state.challenges || {}).length >= 1 },
  ];
}

const waitPos = id => 1 + hash(id + (state.user ? state.user.email : '')) % 4;

/* ---------------- Niveaux & série ---------------- */
const LEVELS = [
  { min: 0,  name: 'Découverte', emoji: '🌱' },
  { min: 3,  name: 'Bronze',     emoji: '🥉' },
  { min: 10, name: 'Argent',     emoji: '🥈' },
  { min: 25, name: 'Or',         emoji: '🥇' },
  { min: 50, name: 'Platine',    emoji: '💠' },
];
function levelInfo() {
  const n = pastSessionsDone().length;
  let cur = LEVELS[0], next = null;
  for (const l of LEVELS) { if (n >= l.min) cur = l; else { next = l; break; } }
  return { n, cur, next, prog: next ? Math.round(((n - cur.min) / (next.min - cur.min)) * 100) : 100 };
}
function streakWeeks() {
  const wk = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x.getTime(); };
  const weeks = new Set(state.reservations
    .filter(r => r.status === 'active')
    .map(r => SESSION_BY_ID[r.sessionId]).filter(Boolean)
    .map(s => wk(s.date)));
  let w = wk(new Date()), n = 0;
  if (!weeks.has(w)) w -= 7 * 864e5; // la semaine en cours peut être encore vide
  while (weeks.has(w)) { n++; w -= 7 * 864e5; }
  return n;
}

/* ---------------- Avis (tous comptes confondus) ---------------- */
function collectRatings(filterFn) {
  let sum = 0, count = 0;
  for (const a of Object.values(ACCOUNTS)) {
    const ratings = (a.data && a.data.ratings) || {};
    for (const [sid, val] of Object.entries(ratings)) {
      const stars = typeof val === 'number' ? val : val.stars;
      const s = SESSION_BY_ID[sid];
      if (s && stars && filterFn(s)) { sum += stars; count++; }
    }
  }
  return count ? { avg: (sum / count), count } : null;
}
const typeRating = typeId => collectRatings(s => s.type.id === typeId);
const teacherRating = name => collectRatings(s => s.teacher === name);

/* ---------------- Recommandations « Pour toi » ---------------- */
function recoSessions() {
  if (!state.user) return [];
  const past = pastSessionsDone();
  if (!past.length && !state.favorites.length) return [];
  const pastTypes = new Set(past.map(s => s.type.id));
  const pastTeachers = new Set(past.map(s => s.teacher));
  const pastHours = new Set(past.map(s => s.date.getHours()));
  const booked = new Set(state.reservations.filter(r => r.status === 'active').map(r => r.sessionId));
  const horizon = Date.now() + 7 * 864e5;
  return futureSessions()
    .filter(s => s.date.getTime() < horizon && !booked.has(s.id) && !seatsInfo(s).full)
    .map(s => {
      let score = 0;
      if (state.favorites.includes(s.type.id)) score += 3;
      if (pastTeachers.has(s.teacher)) score += 2;
      if (pastTypes.has(s.type.id)) score += 1;
      if (pastHours.has(s.date.getHours()) || pastHours.has(s.date.getHours() - 1) || pastHours.has(s.date.getHours() + 1)) score += 1;
      return { s, score };
    })
    .filter(x => x.score >= 2)
    .sort((a, b) => b.score - a.score || a.s.date - b.s.date)
    .slice(0, 5)
    .map(x => x.s);
}

/* ---------------- Plan de salle (choix de ta place) ---------------- */
function spotInfo(sess) {
  const reformer = sess.type.studio === 'REFORMER';
  return { cap: reformer ? 8 : 12, cols: 4, label: reformer ? 'Machine' : 'Tapis' };
}
function occupiedSpots(sess) {
  const { cap } = spotInfo(sess);
  const seats = seatsInfo(sess);
  const taken = new Set();
  // places réellement choisies (tous comptes)
  for (const a of Object.values(ACCOUNTS)) {
    for (const r of ((a.data && a.data.reservations) || [])) {
      if (r.status === 'active' && r.sessionId === sess.id && r.spot) taken.add(r.spot);
    }
  }
  // remplissage fictif déterministe pour coller aux places restantes
  const targetTaken = Math.max(taken.size, cap - (seats.full ? 0 : seats.left));
  const order = Array.from({ length: cap }, (_, i) => i + 1)
    .sort((a, b) => hash(sess.id + '#' + a) - hash(sess.id + '#' + b));
  for (const n of order) {
    if (taken.size >= targetTaken) break;
    taken.add(n);
  }
  return taken;
}
const firstFreeSpot = (occ, cap) => { for (let n = 1; n <= cap; n++) if (!occ.has(n)) return n; return null; };

/* ---------------- Inscriptions par séance (tous comptes) ---------------- */
function bookingsFor(sessionId) {
  const names = [];
  for (const a of Object.values(ACCOUNTS)) {
    if (a.role === 'admin') continue;
    for (const r of ((a.data && a.data.reservations) || [])) {
      if (r.status === 'active' && r.sessionId === sessionId) {
        names.push(a.name + (r.guests ? ' (+1)' : ''));
      }
    }
  }
  return names;
}

/* ---------------- Politique d'annulation & récurrence ---------------- */
const canCancel = sess => sess.date - new Date() > 2 * 3600e3; // jusqu'à 2h avant

function repeatTargets(id) {
  // les 3 occurrences suivantes du même créneau (même jour/heure/cours)
  const s = SESSION_BY_ID[id];
  if (!s) return [];
  const booked = new Set(state.reservations.filter(r => r.status === 'active').map(r => r.sessionId));
  const out = [];
  for (let w = 1; w <= 3; w++) {
    const d = new Date(s.date); d.setDate(d.getDate() + 7 * w);
    const tid = `${dayKey(d)}_${fmtTime(s.date).replace(':', '')}_${s.type.id}`;
    const t = SESSION_BY_ID[tid];
    if (t && t.date > new Date() && !seatsInfo(t).full && !booked.has(t.id)) out.push(t);
  }
  return out;
}

/* ---------------- Défis du mois ---------------- */
const monthKey = () => { const n = new Date(); return n.getFullYear() + '-' + pad(n.getMonth() + 1); };
function monthChallenges() {
  const mk = monthKey();
  const inMonth = state.reservations
    .filter(r => r.status === 'active')
    .map(r => SESSION_BY_ID[r.sessionId])
    .filter(s => s && dayKey(s.date).startsWith(mk));
  const types = new Set(inMonth.map(s => s.type.id));
  const ref = inMonth.filter(s => s.type.studio === 'REFORMER').length;
  return [
    { key: 'rythme',   emoji: '📆', name: 'Régularité',     desc: '6 séances dans le mois',  cur: Math.min(6, inMonth.length), target: 6 },
    { key: 'curieux',  emoji: '🦋', name: 'Curiosité',      desc: '3 cours différents',      cur: Math.min(3, types.size),     target: 3 },
    { key: 'reformer', emoji: '⚙️', name: 'Reformer power', desc: '2 cours de Reformer',     cur: Math.min(2, ref),            target: 2 },
  ];
}
function grantChallenges() {
  if (!state.user || state.user.role === 'admin') return;
  let changed = false;
  for (const c of monthChallenges()) {
    if (c.cur < c.target) continue;
    const k = monthKey() + '_' + c.key;
    if (state.challenges[k]) continue;
    state.challenges[k] = true;
    state.cards.unshift({ id: uid(), label: 'DÉFI RÉUSSI 🏆 — ' + c.name.toUpperCase(), total: 1, remaining: 1, expires: addMonths(new Date(), 2).toISOString() });
    pushNotif({ id: 'chal_' + k, emoji: '🏆', title: `Défi « ${c.name} » réussi !`, body: '+1 crédit offert — bravo, continue comme ça !', route: '#/stats' });
    changed = true;
  }
  if (changed) save();
}

/* ---------------- Notifications ---------------- */
function timeAgo(ts) {
  const m = Math.floor((Date.now() - ts) / 60000);
  if (m < 1) return "à l'instant";
  if (m < 60) return `il y a ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `il y a ${h} h`;
  return `il y a ${Math.floor(h / 24)} j`;
}
const unreadCount = () => state.notifs.filter(n => !n.read).length;

function pushNotif(n) {
  if (state.notifs.some(x => x.id === n.id)) return false;
  state.notifs.unshift(Object.assign({ read: false, ts: Date.now() }, n));
  if (state.notifs.length > 30) state.notifs.length = 30;
  // rappel système (Windows/Android) si activé dans le profil
  try {
    if (state.user && state.user.sysNotifs && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      new Notification(n.title, { body: n.body, icon: 'icon-192.png' });
    }
  } catch { /* rien */ }
  return true;
}

function generateNotifs() {
  if (!state.user) return;
  let changed = false;
  const now = new Date();
  // rappels de séances (aujourd'hui / demain)
  for (const r of state.reservations.filter(x => x.status === 'active')) {
    const s = SESSION_BY_ID[r.sessionId];
    if (!s || s.date <= now) continue;
    const days = Math.floor((new Date(dayKey(s.date) + 'T00:00') - new Date(dayKey(now) + 'T00:00')) / 864e5);
    if (days <= 1) {
      changed = pushNotif({
        id: 'rap_' + s.id, emoji: '⏰',
        title: days === 0 ? "Séance aujourd'hui !" : 'Séance demain',
        body: `${s.type.name} à ${fmtTime(s.date)} avec ${s.teacher}. Prépare tes affaires !`,
        sess: s.id,
      }) || changed;
    }
  }
  // crédits qui expirent bientôt
  for (const c of state.cards) {
    const exp = new Date(c.expires);
    const inDays = (exp - now) / 864e5;
    if (c.total !== -1 && c.remaining > 0 && inDays > 0 && inDays <= 7) {
      changed = pushNotif({
        id: 'exp_' + c.id, emoji: '⏳', title: 'Crédits bientôt expirés',
        body: `${plural(c.remaining, 'crédit')} expirent le ${fmtDate(exp)} — utilise-les !`,
        route: '#/studio/mes-cartes',
      }) || changed;
    }
  }
  // liste d'attente : une place se libère (simulation déterministe ~1 fois sur 3)
  for (const id of state.waitlist) {
    const s = SESSION_BY_ID[id];
    if (!s || s.date <= now) continue;
    if (hash(id + 'promo') % 3 === 0 && !state.waitPromos.includes(id)) {
      state.waitPromos.push(id);
      pushNotif({
        id: 'wl_' + id, emoji: '🎉', title: "Une place s'est libérée !",
        body: `${s.type.name} — ${fmtPill(s.date)}. Fonce, elle est pour toi !`,
        sess: id,
      });
      changed = true;
    }
  }
  // annonces du studio
  if (state.user.role !== 'admin') {
    for (const a of ANNONCES) {
      changed = pushNotif({ id: 'ann_' + a.id, emoji: '📣', title: a.title, body: a.body }) || changed;
    }
  }
  if (changed) save();
  grantChallenges();
  // badge sur l'icône de l'app installée (PWA)
  try {
    const u = unreadCount();
    if (navigator.setAppBadge) { u ? navigator.setAppBadge(u) : navigator.clearAppBadge(); }
  } catch { /* non supporté */ }
}

/* ---------------- Confettis 🎉 ---------------- */
function confetti() {
  const cv = document.createElement('canvas');
  cv.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:99;';
  cv.width = innerWidth; cv.height = innerHeight;
  document.body.appendChild(cv);
  const ctx = cv.getContext('2d');
  const colors = [themeMain(), '#FFFFFF', '#F0D48E', '#8E8E9A'];
  const parts = Array.from({ length: 90 }, () => ({
    x: cv.width / 2 + (Math.random() - 0.5) * 160,
    y: cv.height * 0.35,
    vx: (Math.random() - 0.5) * 11,
    vy: -(4 + Math.random() * 9),
    size: 4 + Math.random() * 5,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
  const t0 = performance.now();
  (function frame(t) {
    const dt = (t - t0) / 1000;
    ctx.clearRect(0, 0, cv.width, cv.height);
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.35; p.rot += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.color; ctx.globalAlpha = Math.max(0, 1 - dt / 1.4);
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }
    if (dt < 1.4) requestAnimationFrame(frame); else cv.remove();
  })(t0);
}

/* ---------------- Router ---------------- */
const nav = h => { location.hash = h; };
function route() { return (location.hash || '#/home').slice(2).split('/'); }

function applyTheme() {
  document.documentElement.setAttribute('data-theme', (state.user && state.user.theme) || 'gold');
}

function render() {
  tickSubscription();
  applyTheme();
  const [page, sub] = route();
  const authPages = ['reservations', 'profil', 'studio', 'produit', 'notifs', 'stats'];
  if (!state.user && authPages.includes(page)) { nav('#/login'); return; }
  if (page === 'admin' && (!state.user || state.user.role !== 'admin')) { nav('#/home'); return; }
  generateNotifs();

  const view = $('#view');
  view.className = 'view' + (page === 'login' ? ' noscrollpad' : '');
  switch (page) {
    case 'login':        view.innerHTML = vLogin(); break;
    case 'planning':     view.innerHTML = vPlanning(); break;
    case 'reservations': view.innerHTML = vReservations(); break;
    case 'studio':
      if (sub === 'cartes')          view.innerHTML = vPacks();
      else if (sub === 'abos')       view.innerHTML = vSubs();
      else if (sub === 'cadeaux')    view.innerHTML = vGifts();
      else if (sub === 'mes-cartes') view.innerHTML = vMyCards();
      else if (sub === 'mes-abos')   view.innerHTML = vMySubs();
      else if (sub === 'factures')   view.innerHTML = vInvoices();
      else if (sub === 'panier')     view.innerHTML = vCart();
      else                           view.innerHTML = vStudio();
      break;
    case 'produit':      view.innerHTML = vProduct(sub); break;
    case 'profil':       view.innerHTML = vProfil(); break;
    case 'notifs':       view.innerHTML = vNotifs(); break;
    case 'stats':        view.innerHTML = vStats(); break;
    case 'admin':
      if (sub === 'cours')         view.innerHTML = vAdminCours();
      else if (sub === 'planning') view.innerHTML = vAdminPlanning();
      else if (sub === 'tarifs')   view.innerHTML = vAdminTarifs();
      else if (sub === 'profs')    view.innerHTML = vAdminProfs();
      else if (sub === 'membres')  view.innerHTML = vAdminMembres();
      else                         view.innerHTML = vAdminDash();
      break;
    default:             view.innerHTML = vHome(); break;
  }
  renderNav(page);
  renderFab(page);
  // animation d'entrée + scroll en haut uniquement quand on change de page
  const routeKey = page + '/' + (sub || '');
  if (render._last !== routeKey) {
    view.style.animation = 'none';
    void view.offsetWidth;
    view.style.animation = '';
    window.scrollTo(0, 0);
  }
  render._last = routeKey;
}

function renderNav(page) {
  const el = $('#bottomnav');
  if (!state.user || page === 'login') { el.className = 'hide'; el.innerHTML = ''; return; }
  el.className = '';
  const item = (id, icon, label, target, extraOn = []) => `
    <button class="nvbtn ${page === id || extraOn.includes(page) ? 'on' : ''}" onclick="nav('${target}')">
      ${I(icon, 23)}<span>${label}</span>
    </button>`;
  el.innerHTML =
    item('home', 'house', 'Accueil', '#/home') +
    item('planning', 'calendar', 'Planning', '#/planning') +
    item('reservations', 'ticket', 'Séances', '#/reservations') +
    item('studio', 'bag', 'Boutique', '#/studio', ['produit']) +
    item('profil', 'user', 'Profil', '#/profil');
}

function renderFab(page) {
  const root = $('#fabRoot');
  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  const show = state.user && count > 0 && ['studio', 'produit'].includes(page) && route()[1] !== 'panier';
  root.innerHTML = show ? `
    <button class="fab" onclick="nav('#/studio/panier')">
      <span class="fb-badge">${count}</span>${I('cart', 26)}
    </button>` : '';
}

/* ---------------- Composants ---------------- */
function heartSpan(typeId, size = 22) {
  const on = state.favorites.includes(typeId);
  return `<span class="${on ? 'on' : ''}">${I('heart', size, on ? 'fill="currentColor"' : '')}</span>`;
}

function carouselCard(s) {
  return `
  <button class="ccard" onclick="act.openSession('${s.id}')">
    <div class="cc-imgwrap">
      <div class="cc-emoji">${s.type.emoji}</div>
      <img src="${s.type.img}" alt="" loading="lazy" onerror="this.remove()">
      ${state.user ? `<span class="cc-heart" onclick="event.stopPropagation();act.toggleFav('${s.type.id}')">${heartSpan(s.type.id, 22)}</span>` : ''}
    </div>
    <div class="cc-body">
      <div class="cc-time">${fmtPill(s.date)}</div>
      <div class="cc-name">${esc(s.type.name)} ${s.type.emoji}</div>
      <div class="cc-meta">${s.teacher} · ${STUDIOS[s.type.studio].label}</div>
    </div>
  </button>`;
}

function homeCarouselHtml() {
  const list = futureSessions().slice(0, 10);
  if (!list.length) return `<div class="emptystate" style="width:100%">🔍 Aucun cours à venir</div>`;
  return list.map(carouselCard).join('');
}

/* ----- Recherche universelle (séances, profs, boutique) ----- */
function searchResultsHtml() {
  const q = Q.toLowerCase();
  const sess = futureSessions()
    .filter(s => (s.type.name + ' ' + s.teacher + ' ' + STUDIOS[s.type.studio].label).toLowerCase().includes(q))
    .slice(0, 5);
  const profs = TEACHERS.filter(t => t.toLowerCase().includes(q));
  const prods = PRODUCTS.filter(p => (p.name + ' ' + p.sub).toLowerCase().includes(q));
  if (!sess.length && !profs.length && !prods.length) {
    return `<div class="emptystate"><div class="es-emoji">🔍</div>Aucun résultat pour « ${esc(Q)} »</div>`;
  }
  let h = '';
  if (sess.length) {
    h += `<div class="sechead"><span class="overline">Séances</span></div><div class="sesslist">` +
      sess.map(s => {
        const seats = seatsInfo(s);
        return `
        <button class="sesscard" onclick="act.openSession('${s.id}')">
          <div><div class="sc-time">${fmtTime(s.date)}</div><div class="sc-dur">${DAYS[s.date.getDay()]}. ${s.date.getDate()} ${MONTHS[s.date.getMonth()]}</div></div>
          <div>
            <div class="sc-name">${esc(s.type.name)} ${s.type.emoji}</div>
            <div class="sc-meta">${esc(s.teacher)} <span class="tag ${s.type.studio.toLowerCase()}">${s.type.studio}</span></div>
          </div>
          ${seats.full ? `<span class="credchip full">COMPLET</span>` : `<span class="credchip">${plural(s.type.credits, 'crédit')}</span>`}
        </button>`;
      }).join('') + '</div>';
  }
  if (profs.length) {
    h += `<div class="sechead"><span class="overline">Profs</span></div><div class="listrows">` +
      profs.map(t => `
      <button class="listrow" onclick="act.openTeacher('${arg(t)}')">
        <span class="lr-ico">${I('user', 22)}</span>
        <span class="lr-txt"><span class="lr-name">${esc(t)}</span><br><span class="lr-sub">Voir le profil & ses cours</span></span>
        <span class="lr-chev">${I('chevR', 18)}</span>
      </button>`).join('') + '</div>';
  }
  if (prods.length) {
    h += `<div class="sechead"><span class="overline">Boutique</span></div><div class="listrows">` +
      prods.map(p => `
      <button class="listrow" onclick="nav('#/produit/${p.id}')">
        <span class="lr-ico">${I('bag', 22)}</span>
        <span class="lr-txt"><span class="lr-name">${esc(p.name)}</span><br><span class="lr-sub">${eur(p.price)} €</span></span>
        <span class="lr-chev">${I('chevR', 18)}</span>
      </button>`).join('') + '</div>';
  }
  return h;
}

function homeDynHtml() {
  if (Q.trim()) return searchResultsHtml();
  const recos = recoSessions();
  return `
  ${recos.length ? `
  <div class="sechead"><span class="overline">Pour toi ✨</span></div>
  <div class="carousel">${recos.map(carouselCard).join('')}</div>` : ''}
  <div class="sechead">
    <span class="overline">Prochains cours</span>
    <span class="sec-link" onclick="nav('#/planning')">Tout le planning →</span>
  </div>
  <div class="carousel">${homeCarouselHtml()}</div>
  <div class="sechead"><span class="overline">Nos cours</span></div>
  ${typeGridHtml(true)}`;
}

function typeGridHtml(withHearts) {
  return `<div class="typegrid">
    ${CLASS_TYPES.map(t => `
    <button class="typetile" onclick="act.openType('${t.id}')">
      <img src="${t.img}" alt="" loading="lazy" onerror="this.remove()">
      <div class="tt-grad"></div>
      ${withHearts ? `<span class="tt-heart" onclick="event.stopPropagation();act.toggleFav('${t.id}')">${heartSpan(t.id, 19)}</span>` : ''}
      <div class="tt-name">${esc(t.name)} ${t.emoji}</div>
    </button>`).join('')}
  </div>`;
}

/* ---------------- Vues ---------------- */
function vHome() {
  if (!state.user) {
    return `
    <div class="herowrap">
      <span class="hw-logo">${LOGO(52)}</span>
      <h1>Bouge avec <i>${esc(BRAND.name)}</i></h1>
      <p>${BRAND.tagline} — La Rochelle</p>
      <button class="cta-main" style="max-width:300px;margin:22px auto 0;" onclick="act.gotoAuth('login')">SE CONNECTER</button>
      <button class="cta-ghost" style="max-width:300px;margin:10px auto 0;" onclick="act.gotoAuth('signup')">CRÉER UN COMPTE</button>
    </div>
    <div class="sechead"><span class="overline">Prochains cours</span></div>
    <div class="carousel" id="homeCarousel">${homeCarouselHtml()}</div>
    <div class="sechead"><span class="overline">Nos cours</span></div>
    ${typeGridHtml(false)}
    <div style="height:30px"></div>`;
  }
  const bal = creditBalance();
  const balNum = bal === Infinity ? '∞' : bal;
  const sub = state.subs.find(s => s.status === 'active');
  const h = new Date().getHours();
  const hello = h >= 5 && h < 18 ? 'Bonjour' : 'Bonsoir';
  const initials = state.user.name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const wc = weekCount();
  const goal = state.user.weeklyGoal || 3;
  const streak = streakWeeks();
  const unread = unreadCount();
  const annonce = state.notifs.find(n => !n.read && n.id.startsWith('ann_'));
  return `
  <div class="topbar">
    <div class="tb-txt">
      <div class="tb-hello">${hello} ${esc(state.user.name.split(' ')[0])} 👋</div>
      <div class="tb-sub">${streak > 1 ? `Série en cours : ${streak} semaines 🔥` : 'Prêt·e à bouger aujourd\'hui ?'}</div>
    </div>
    <button class="bellbtn" onclick="nav('#/notifs')">${I('bell', 22)}${unread ? `<span class="belldot">${unread}</span>` : ''}</button>
    <button class="avatarbtn" onclick="nav('#/profil')">${initials}</button>
  </div>
  ${annonce ? `
  <button class="annonce" onclick="act.openNotif('${annonce.id}')">
    <span class="an-emoji">📣</span>
    <span class="an-txt"><b>${esc(annonce.title)}</b><br><span>${esc(annonce.body)}</span></span>
    <span class="an-x" onclick="event.stopPropagation();act.readNotif('${annonce.id}')">${I('xcircle', 20)}</span>
  </button>` : ''}
  <button class="wallet" onclick="nav('#/studio/mes-cartes')">
    <div>
      <div class="wl-num">${balNum}</div>
      <div class="wl-label">crédit${bal > 1 ? 's' : ''} dispo</div>
      ${sub ? `<div class="wl-abo">● Abo ${sub.label.toLowerCase()} actif</div>` : ''}
    </div>
    <div class="wl-spacer"></div>
    <span class="wl-cta" onclick="event.stopPropagation();nav('#/studio/cartes')">RECHARGER</span>
  </button>
  <button class="weekgoal" onclick="act.goalSheet()">
    <div class="wg-txt"><b>Objectif de la semaine ${wc >= goal ? '🔥' : ''}</b><span>${wc}/${goal} séance${goal > 1 ? 's' : ''}</span></div>
    <div class="wg-bar"><i style="width:${Math.min(100, Math.round(wc / goal * 100))}%"></i></div>
  </button>
  <div class="searchwrap">
    <div class="searchbar">
      ${I('search', 20)}
      <input id="searchInput" placeholder="Un cours, un prof…" value="${Q.replace(/"/g, '&quot;')}" oninput="act.search(this.value)">
    </div>
  </div>
  <button class="coachbtn" onclick="act.coach(1)">
    <span class="cb-spark">✨</span>
    <span class="cb-txt"><b>Coach ${esc(BRAND.name)}</b><br><span class="cb-sub">2 questions et je te trouve le cours parfait</span></span>
    <span class="cb-arrow">${I('chevR', 18)}</span>
  </button>
  <div id="homeDyn">${homeDynHtml()}</div>
  <div style="height:26px"></div>`;
}

/* ----- Notifications ----- */
function vNotifs() {
  const list = state.notifs;
  return pagehead('Notifications', 'Quoi de neuf ?') + `
  ${list.some(n => !n.read) ? `<div class="pad20 mt14"><button class="cta-ghost" style="margin-top:0" onclick="act.readAllNotifs()">TOUT MARQUER COMME LU</button></div>` : ''}
  <div class="pad20 stack12 mt14">
    ${list.length ? list.map(n => `
    <button class="notifrow ${n.read ? '' : 'unread'}" onclick="act.openNotif('${n.id}')">
      <span class="nf-emoji">${n.emoji}</span>
      <span class="nf-txt">
        <span class="nf-title">${esc(n.title)}</span>
        <span class="nf-body">${esc(n.body)}</span>
        <span class="nf-time">${timeAgo(n.ts)}</span>
      </span>
      ${n.read ? '' : '<span class="nf-dot"></span>'}
    </button>`).join('') : `<div class="emptystate"><div class="es-emoji">🔕</div>Aucune notification pour le moment.</div>`}
  </div>
  <div style="height:26px"></div>`;
}

/* ----- Mes statistiques ----- */
function vStats() {
  const past = pastSessionsDone();
  const lv = levelInfo();
  const streak = streakWeeks();
  const hours = Math.round(past.reduce((s, x) => s + x.type.dur, 0) / 6) / 10;
  const spent = state.reservations.filter(r => r.status === 'active').map(r => ({ r, s: SESSION_BY_ID[r.sessionId] }))
    .filter(x => x.s && x.s.date < new Date()).reduce((sum, x) => sum + (x.r.cost || x.s.type.credits), 0);
  // 8 dernières semaines
  const wk = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x.getTime(); };
  const thisWeek = wk(new Date());
  const weeks = Array.from({ length: 8 }, (_, i) => thisWeek - (7 - i) * 7 * 864e5);
  const counts = weeks.map(w => past.filter(s => wk(s.date) === w).length);
  const max = Math.max(1, ...counts);
  // tops
  const countBy = (arr, fn) => { const m = {}; arr.forEach(x => { const k = fn(x); m[k] = (m[k] || 0) + 1; }); return Object.entries(m).sort((a, b) => b[1] - a[1])[0]; };
  const topType = countBy(past, s => s.type.name + ' ' + s.type.emoji);
  const topTeacher = countBy(past, s => s.teacher);
  const matCount = past.filter(s => s.type.studio === 'MAT').length;
  const refCount = past.length - matCount;
  const matPct = past.length ? Math.round(matCount / past.length * 100) : 50;
  return pagehead('Mes statistiques', 'Ton parcours') + `
  <div class="pad20 mt14">
    <div class="wallet" style="width:100%;margin:0;">
      <div>
        <div class="wl-num" style="font-size:28px">${lv.cur.emoji} ${lv.cur.name}</div>
        <div class="wl-label">${lv.next ? `encore ${lv.next.min - lv.n} séance${lv.next.min - lv.n > 1 ? 's' : ''} avant ${lv.next.emoji} ${lv.next.name}` : 'niveau maximum !'}</div>
      </div>
    </div>
    <div class="prog" style="margin-top:12px"><i style="width:${lv.prog}%"></i></div>
  </div>
  <div class="statrow" style="grid-template-columns:1fr 1fr;">
    <div class="statcard"><b>${past.length}</b><span>séances au total</span></div>
    <div class="statcard"><b>${hours} h</b><span>de mouvement</span></div>
    <div class="statcard"><b>${streak}</b><span>sem. de série 🔥</span></div>
    <div class="statcard"><b>${spent}</b><span>crédits utilisés</span></div>
  </div>
  <div class="sechead"><span class="overline">Défis de ${['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'][new Date().getMonth()]} 🏆</span></div>
  <div class="pad20 stack12">
    ${monthChallenges().map(c => {
      const done = c.cur >= c.target;
      return `
      <div class="walletcard" style="${done ? 'border-color:rgba(224,190,114,.45)' : ''}">
        <div class="wc-top">
          <span class="wc-remain ${done ? 'gold' : ''}">${c.emoji} ${c.name}</span>
          <span class="wc-exp" style="${done ? 'color:var(--gold);font-weight:800' : ''}">${done ? '✓ +1 crédit gagné' : c.cur + '/' + c.target}</span>
        </div>
        <div class="wc-label">${c.desc}</div>
        <div class="prog"><i style="width:${Math.round(c.cur / c.target * 100)}%"></i></div>
      </div>`;
    }).join('')}
  </div>
  <div class="sechead"><span class="overline">Classement du mois 🏅</span></div>
  <div class="pad20 stack12">
    ${(() => {
      const board = Object.values(ACCOUNTS).filter(a => a.role !== 'admin').map(a => ({
        name: a.name,
        me: state.user && a.email === state.user.email.toLowerCase(),
        n: ((a.data && a.data.reservations) || []).filter(r => {
          const s = SESSION_BY_ID[r.sessionId];
          return r.status === 'active' && s && dayKey(s.date).startsWith(monthKey());
        }).length,
      })).sort((x, y) => y.n - x.n).slice(0, 5);
      const medals = ['🥇', '🥈', '🥉', '4.', '5.'];
      let h = board.map((b, i) => `
      <div class="rankrow ${b.me ? 'me' : ''}">
        <span class="rk-medal">${medals[i]}</span>
        <span class="rk-name">${esc(b.name)}${b.me ? ' <small>(toi)</small>' : ''}</span>
        <span class="rk-count">${plural(b.n, 'séance')}</span>
      </div>`).join('');
      if (board.length < 2) h += `<div class="smallnote" style="padding:8px 0 0">Parraine des amis pour lancer la compétition 😏 (Profil → Parrainage)</div>`;
      return h;
    })()}
  </div>
  <div class="sechead"><span class="overline">8 dernières semaines</span></div>
  <div class="barchart">
    ${counts.map((c, i) => `
    <div class="barcol">
      <div class="barval">${c || ''}</div>
      <div class="bar" style="height:${Math.max(6, c / max * 100)}%"></div>
      <div class="barlbl">${i === 7 ? 'now' : 'S-' + (7 - i)}</div>
    </div>`).join('')}
  </div>
  ${past.length ? `
  <div class="sechead"><span class="overline">Tes tops</span></div>
  <div class="listrows">
    <div class="listrow" style="cursor:default"><span class="lr-ico">🏆</span>
      <span class="lr-txt"><span class="lr-name">${topType[0]}</span><br><span class="lr-sub">Ton cours le plus pratiqué (${topType[1]}×)</span></span></div>
    <div class="listrow" onclick="act.openTeacher('${arg(topTeacher[0])}')"><span class="lr-ico">🧑‍🏫</span>
      <span class="lr-txt"><span class="lr-name">${esc(topTeacher[0])}</span><br><span class="lr-sub">Ton prof préféré (${topTeacher[1]} séances)</span></span>
      <span class="lr-chev">${I('chevR', 18)}</span></div>
  </div>
  <div class="sechead"><span class="overline">Mat vs Reformer</span></div>
  <div class="pad20">
    <div class="splitbar"><i style="width:${matPct}%"></i></div>
    <div class="splitlbl"><span>MAT ${matPct}%</span><span>REFORMER ${100 - matPct}%</span></div>
  </div>` : `<div class="emptystate"><div class="es-emoji">📊</div>Fais ta première séance pour débloquer tes stats !</div>`}
  <div style="height:26px"></div>`;
}

/* ----- Planning ----- */
function vPlanning() {
  const days = [...new Set(futureSessions().map(s => dayKey(s.date)))];
  if (!F.date || !days.includes(F.date)) F.date = days[0];

  let list = futureSessions().filter(s => dayKey(s.date) === F.date);
  if (F.lieu) list = list.filter(s => s.type.studio === F.lieu);
  if (F.prof) list = list.filter(s => s.teacher === F.prof);

  const strip = days.map(dk => {
    const d = new Date(dk + 'T12:00');
    return `<button class="daybtn ${F.date === dk ? 'on' : ''}" onclick="act.pickDay('${dk}')">
      <div class="db-dow">${DAYS[d.getDay()]}</div><div class="db-num">${d.getDate()}</div>
    </button>`;
  }).join('');

  const rows = list.length ? list.map(s => {
    const seats = seatsInfo(s);
    const inWait = state.waitlist.includes(s.id);
    return `
    <button class="sesscard" onclick="act.openSession('${s.id}')">
      <div><div class="sc-time">${fmtTime(s.date)}</div><div class="sc-dur">${s.type.dur === 60 ? '1h' : s.type.dur + ' min'}</div></div>
      <div>
        <div class="sc-name">${esc(s.type.name)} ${s.type.emoji}</div>
        <div class="sc-meta">${s.teacher} <span class="tag ${s.type.studio.toLowerCase()}">${s.type.studio}</span>${inWait ? ' <span class="tag wait">EN ATTENTE</span>' : ''}</div>
      </div>
      ${seats.full ? `<span class="credchip full">COMPLET</span>` : `<span class="credchip">${plural(s.type.credits, 'crédit')}</span>`}
    </button>`;
  }).join('') : `<div class="emptystate"><div class="es-emoji">📅</div>Aucun cours ce jour-là avec ces filtres.
    ${(F.lieu || F.prof) ? `<br><button class="ghostbtn" style="margin-top:14px" onclick="act.resetFilters()">RÉINITIALISER LES FILTRES</button>` : ''}</div>`;

  return `
  <div class="pagehead">
    <div class="overline">Planning</div>
    <h1>Réserve ta séance</h1>
  </div>
  <div class="daystrip">${strip}</div>
  <div class="filterrow">
    <button class="fchip ${F.lieu ? 'on' : ''}" onclick="act.pickFilter('lieu')">${I('pin', 16)} ${F.lieu ? STUDIOS[F.lieu].label : 'Tous les lieux'} ${I('chevD', 15)}</button>
    <button class="fchip ${F.prof ? 'on' : ''}" onclick="act.pickFilter('prof')">${I('user', 16)} ${F.prof || 'Prof'} ${I('chevD', 15)}</button>
  </div>
  <div class="sesslist">${rows}</div>
  <div style="height:26px"></div>`;
}

/* ----- Calendrier mensuel ----- */
let CAL_OFF = 0;
const MOIS_FULL = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
function calHtml() {
  const base = new Date(); base.setDate(1); base.setHours(0, 0, 0, 0); base.setMonth(base.getMonth() + CAL_OFF);
  const y = base.getFullYear(), m = base.getMonth();
  const firstDow = (base.getDay() + 6) % 7; // 0 = lundi
  const daysIn = new Date(y, m + 1, 0).getDate();
  const today = dayKey(new Date());
  const marks = {};
  for (const r of state.reservations.filter(x => x.status === 'active')) {
    const s = SESSION_BY_ID[r.sessionId]; if (!s) continue;
    const dk = dayKey(s.date);
    if (s.date > new Date()) marks[dk] = 'future';
    else if (!marks[dk]) marks[dk] = 'past';
  }
  let cells = '';
  for (let i = 0; i < firstDow; i++) cells += '<span class="cal-day empty"></span>';
  for (let d = 1; d <= daysIn; d++) {
    const dk = `${y}-${pad(m + 1)}-${pad(d)}`;
    const mark = marks[dk];
    cells += `<button class="cal-day ${dk === today ? 'today' : ''} ${mark ? 'has-' + mark : ''}" onclick="act.calDay('${dk}')">${d}${mark ? '<i></i>' : ''}</button>`;
  }
  return `
  <div class="cal">
    <div class="cal-head">
      <button class="iconbtn" style="width:36px;height:36px" onclick="act.calNav(-1)">${I('back', 16)}</button>
      <b>${MOIS_FULL[m]} ${y}</b>
      <button class="iconbtn" style="width:36px;height:36px;transform:rotate(180deg)" onclick="act.calNav(1)">${I('back', 16)}</button>
    </div>
    <div class="cal-grid">
      ${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(d => `<span class="cal-dow">${d}</span>`).join('')}
      ${cells}
    </div>
  </div>`;
}

/* ----- Mes séances ----- */
function resCardHtml(sess, { past = false, resaId = null, guests = 0, rating = 0, checkedIn = false, spot = null } = {}) {
  const d = sess.date;
  const checkinOpen = !past && !checkedIn && (d - Date.now() <= 30 * 60000); // 30 min avant le début
  return `
  <div class="rescard ${past ? 'past' : ''}">
    <div class="rs-top" onclick="act.openSession('${sess.id}')">
      <div class="rs-date"><b>${d.getDate()}</b><span>${MONTHS[d.getMonth()]}</span></div>
      <div>
        <div class="rs-name">${esc(sess.type.name)} ${sess.type.emoji}</div>
        <div class="rs-meta">${fmtTime(d)} · ${esc(sess.teacher)} · ${STUDIOS[sess.type.studio].label}${spot ? ` · <b style="color:var(--gold)">${spotInfo(sess).label} ${spot}</b>` : ''}${guests ? ' · +1 invité' : ''}${past && checkedIn ? ' · ✅' : ''}</div>
        ${past ? '' : `<div class="rs-count">${checkedIn ? '✅ Présence validée — bonne séance !' : '⏳ ' + countdown(d)}</div>`}
      </div>
    </div>
    ${!past && resaId ? `
    <div class="rs-actions">
      ${checkinOpen ? `<button class="gold" onclick="act.checkin('${resaId}')">✅ Je suis là !</button>` : ''}
      <button onclick="act.itinerary()">${I('navArrow', 15)} Itinéraire</button>
      <button class="danger" onclick="act.askCancel('${resaId}')">${I('xcircle', 17)} Annuler</button>
    </div>` : ''}
    ${past ? `
    <div class="rs-actions">
      ${rating ? `<div class="stars">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>`
                : `<button onclick="act.rateSheet('${sess.id}')">☆ Noter cette séance</button>`}
    </div>` : ''}
  </div>`;
}

function vReservations() {
  const tab = state.resaTab;
  const now = new Date();
  const resas = state.reservations.filter(r => r.status === 'active').map(r => ({ r, s: SESSION_BY_ID[r.sessionId] })).filter(x => x.s);
  let body = '';

  if (tab === 'up') {
    const fut = resas.filter(x => x.s.date > now).sort((a, b) => a.s.date - b.s.date);
    body = calHtml();
    body += fut.length
      ? `<div class="reslist">${fut.map(x => resCardHtml(x.s, { resaId: x.r.id, guests: x.r.guests, checkedIn: x.r.checkedIn, spot: x.r.spot })).join('')}</div>
         <div class="pad20"><button class="cta-ghost" onclick="act.exportIcs()">${I('download', 17)} EXPORTER DANS MON AGENDA (.ICS)</button></div>`
      : `<div class="emptystate"><div class="es-emoji">🧘</div>Aucune séance à venir.<br>Va faire un tour sur le <b>planning</b> !</div>`;
    // liste d'attente
    const waits = state.waitlist.map(id => SESSION_BY_ID[id]).filter(s => s && s.date > now).sort((a, b) => a.date - b.date);
    if (waits.length) {
      body += `<div class="sechead"><span class="overline">Liste d'attente</span></div>
      <div class="reslist">${waits.map(s => `
        <div class="rescard wait">
          <div class="rs-top" onclick="act.openSession('${s.id}')">
            <div class="rs-date"><b>${s.date.getDate()}</b><span>${MONTHS[s.date.getMonth()]}</span></div>
            <div>
              <div class="rs-name">${esc(s.type.name)} ${s.type.emoji}</div>
              <div class="rs-meta">${fmtTime(s.date)} · ${s.teacher} · position #${waitPos(s.id)}</div>
              <div class="rs-count">🕐 On te préviendra si une place se libère</div>
            </div>
          </div>
          <div class="rs-actions">
            <button class="danger" onclick="act.leaveWait('${s.id}')">${I('xcircle', 17)} Quitter la liste</button>
          </div>
        </div>`).join('')}</div>`;
    }
  } else if (tab === 'past') {
    const past = resas.filter(x => x.s.date <= now).sort((a, b) => b.s.date - a.s.date).slice(0, 10);
    body = past.length
      ? `<div class="reslist">${past.map(x => resCardHtml(x.s, { past: true, rating: (state.ratings[x.s.id] || {}).stars || 0, checkedIn: x.r.checkedIn })).join('')}</div>`
      : `<div class="emptystate"><div class="es-emoji">📼</div>Rien pour le moment.</div>`;
  } else {
    const favs = state.favorites.map(id => CLASS_TYPES.find(t => t.id === id)).filter(Boolean);
    body = favs.length ? `<div class="reslist">${favs.map(t => {
      const next = futureSessions().find(s => s.type.id === t.id && !seatsInfo(s).full);
      return `
      <div class="favcard" onclick="${next ? `act.openSession('${next.id}')` : ''}">
        <img src="${t.img}" alt="" onerror="this.style.display='none'">
        <div class="fc-txt">
          <div class="fc-name">${esc(t.name)} ${t.emoji}</div>
          <div class="fc-next">${next ? 'Prochain : ' + fmtPill(next.date) : 'Aucune date à venir'}</div>
        </div>
        <button class="fc-heart" onclick="event.stopPropagation();act.toggleFav('${t.id}')">${I('heart', 22, 'fill="currentColor"')}</button>
      </div>`;
    }).join('')}</div>`
      : `<div class="emptystate"><div class="es-emoji">🖤</div>Ajoute des cours en favoris avec le petit cœur.</div>`;
  }

  return `
  <div class="pagehead">
    <div class="overline">Mes séances</div>
    <h1>Ton programme</h1>
  </div>
  <div class="pilltabs">
    <button class="${tab === 'up' ? 'on' : ''}" onclick="act.resaTab('up')">À venir</button>
    <button class="${tab === 'past' ? 'on' : ''}" onclick="act.resaTab('past')">Historique</button>
    <button class="${tab === 'fav' ? 'on' : ''}" onclick="act.resaTab('fav')">Favoris</button>
  </div>
  ${body}
  <div style="height:26px"></div>`;
}

/* ----- Boutique ----- */
function vStudio() {
  const bal = creditBalance();
  const sub = state.subs.find(s => s.status === 'active');
  const tile = (name, icon, target) => `
    <button class="shoptile" onclick="nav('${target}')">
      <span class="st-ico">${I(icon, 24)}</span>
      <span class="st-name">${name}</span>
    </button>`;
  return `
  <div class="pagehead">
    <div class="overline">Boutique</div>
    <h1>De quoi bouger</h1>
  </div>
  <button class="wallet" style="margin-top:16px" onclick="nav('#/studio/mes-cartes')">
    <div>
      <div class="wl-num">${bal === Infinity ? '∞' : bal}</div>
      <div class="wl-label">crédit${bal > 1 ? 's' : ''} dispo</div>
      ${sub ? `<div class="wl-abo">● Abo ${sub.label.toLowerCase()} actif</div>` : ''}
    </div>
    <div class="wl-spacer"></div>
    <span class="wl-cta">${I('chevR', 18)}</span>
  </button>
  <div class="shopgrid">
    ${tile('Packs de crédits', 'card', '#/studio/cartes')}
    ${tile('Abonnements', 'tag', '#/studio/abos')}
    ${tile('Cartes-cadeaux', 'gift', '#/studio/cadeaux')}
    ${tile('Mes factures', 'receipt', '#/studio/factures')}
  </div>
  <div class="sechead"><span class="overline">Mon inventaire</span></div>
  <div class="listrows">
    <button class="listrow" onclick="nav('#/studio/mes-cartes')">
      <span class="lr-ico">${I('card', 22)}</span>
      <span class="lr-txt"><span class="lr-name">Mes cartes</span><br><span class="lr-sub">Crédits restants & validité</span></span>
      <span class="lr-chev">${I('chevR', 18)}</span>
    </button>
    <button class="listrow" onclick="nav('#/studio/mes-abos')">
      <span class="lr-ico">${I('tag', 22)}</span>
      <span class="lr-txt"><span class="lr-name">Mes abonnements</span><br><span class="lr-sub">Gérer / résilier</span></span>
      <span class="lr-chev">${I('chevR', 18)}</span>
    </button>
  </div>
  <div class="sechead"><span class="overline">Le shop</span></div>
  <div class="prodgrid">
    ${PRODUCTS.map(p => `
    <button class="prodtile" onclick="nav('#/produit/${p.id}')">
      <img src="${p.img}" alt="" loading="lazy" onerror="this.style.display='none'">
      <div class="pt-body"><div class="pt-name">${esc(p.name)}</div><div class="pt-price">${eur(p.price)} €</div></div>
    </button>`).join('')}
  </div>
  <div class="smallnote">Version démo locale — paiements simulés, aucune vraie transaction.</div>
  <div style="height:20px"></div>`;
}

const pagehead = (over, title) => `
  <div class="pagehead" style="display:flex;gap:14px;align-items:flex-start;">
    <button class="iconbtn" style="margin-top:4px" onclick="history.back()">${I('back', 20)}</button>
    <div><div class="overline">${over}</div><h1 style="font-size:26px;">${esc(title)}</h1></div>
  </div>`;

function vPacks() {
  return pagehead('Boutique', 'Packs de crédits') + `
  <div class="pad20 stack12 mt14">
    ${PACKS.map(p => `
    <div class="packrow">
      <span class="pk-badge">${p.credits}</span>
      <div class="pk-info">
        <div class="pk-name">${p.label}</div>
        <div class="pk-sub">Valable ${p.months} mois · jusqu'au ${fmtDate(addMonths(new Date(), p.months))}</div>
      </div>
      <span class="pk-price">${eur(p.price)} €</span>
      <button class="addbtn" onclick="act.addCart('pack','${p.id}')">${I('plus', 20)}</button>
    </div>`).join('')}
  </div>
  <div style="height:26px"></div>`;
}

function vSubs() {
  const active = state.subs.find(s => s.status === 'active');
  return pagehead('Boutique', 'Abonnements') + `
  <div class="pad20 stack14" style="margin-top:18px;">
    ${SUBS.map(p => {
      const isActive = active && active.ref === p.id;
      return `
    <div class="subcard ${p.id === 'sinf' ? 'hot' : ''}">
      ${p.id === 'sinf' ? '<span class="sb-flag">SANS LIMITE</span>' : ''}
      <div class="sb-row">
        <div>
          <div class="sb-price">${eur(p.price)}€ <small>/ mois</small></div>
          <div class="sb-label">${p.label}</div>
        </div>
        ${isActive
          ? `<span class="sb-active">● ACTIF</span>`
          : `<button class="ghostbtn" onclick="act.addCart('sub','${p.id}')">CHOISIR</button>`}
      </div>
    </div>`;
    }).join('')}
  </div>
  <div style="height:26px"></div>`;
}

function vGifts() {
  return pagehead('Boutique', 'Cartes-cadeaux') + `
  <div class="pad20 stack14 mt14">
    ${GIFTCARDS.map(g => `
    <div class="giftcard">
      <img src="${g.img}" alt="" onerror="this.style.display='none'">
      <div class="gc-body">
        <div class="gc-txt">
          <div class="gc-name">${g.label}</div>
          <div class="gc-price">${eur(g.price)} €</div>
        </div>
        <button class="ghostbtn" onclick="act.giftDetails('${g.id}')">DÉTAILS</button>
      </div>
    </div>`).join('')}
  </div>
  <div style="height:26px"></div>`;
}

function vMyCards() {
  const rows = state.cards.slice().sort((a, b) => new Date(b.expires) - new Date(a.expires));
  return pagehead('Inventaire', 'Mes cartes') + `
  <div class="pad20 stack12 mt14">
    ${rows.length ? rows.map(c => {
      const unlimited = c.total === -1;
      const empty = !unlimited && c.remaining === 0;
      const expired = new Date(c.expires) < new Date();
      const pct = unlimited ? 100 : Math.round((c.remaining / c.total) * 100);
      return `
      <div class="walletcard" style="${expired ? 'opacity:.55' : ''}">
        <div class="wc-top">
          <span class="wc-remain ${empty ? 'empty' : unlimited ? 'gold' : ''}">${unlimited ? 'ILLIMITÉ' : `${c.remaining}/${c.total} restant${c.remaining > 1 ? 's' : ''}`}</span>
          <span class="wc-exp">${expired ? 'Expirée le' : 'Expire le'} ${fmtDate(new Date(c.expires))}</span>
        </div>
        <div class="wc-label">${c.label}</div>
        <div class="prog"><i class="${empty ? 'empty' : ''}" style="width:${pct}%"></i></div>
      </div>`;
    }).join('') : `<div class="emptystate"><div class="es-emoji">💳</div>Aucune carte pour le moment.</div>`}
  </div>
  <div style="height:26px"></div>`;
}

function vMySubs() {
  const g = st => state.subs.filter(s => s.status === st);
  const row = (s, extra = '') => `
    <div class="walletcard">
      <div class="wc-top">
        <span class="wc-remain gold">${eur(s.price)}€ / mois</span>
        ${s.status === 'active' ? `<span class="wc-exp" style="color:var(--ok)">● actif</span>` : ''}
      </div>
      <div class="wc-label">${s.label} · ${esc(state.user.name)}</div>
      ${extra}
    </div>`;
  const section = (over, arr, extraFn) => `
    <div class="sechead"><span class="overline">${over}</span></div>
    <div class="pad20 stack12">
      ${arr.length ? arr.map(s => row(s, extraFn ? extraFn(s) : '')).join('') : `<div class="emptystate" style="padding:18px">Rien ici.</div>`}
    </div>`;
  return pagehead('Inventaire', 'Mes abonnements') +
    section('En cours', g('active'), s => `
      <div class="wc-label" style="margin-top:8px;color:var(--text)">Prochaine facturation le ${fmtDate(new Date(s.nextBilling))}</div>
      <button class="ghostbtn danger" style="margin-top:12px" onclick="act.askCancelSub('${s.id}')">RÉSILIER</button>`) +
    section('Terminés', g('ended')) +
    section('Résiliés', g('cancelled')) +
    `<div style="height:26px"></div>`;
}

function vInvoices() {
  const tab = state.invTab;
  const inv = state.invoices.filter(i => i.status === tab);
  return pagehead('Inventaire', 'Mes factures') + `
  <div class="pilltabs">
    <button class="${tab === 'unpaid' ? 'on' : ''}" onclick="act.invTab('unpaid')">Impayé</button>
    <button class="${tab === 'paid' ? 'on' : ''}" onclick="act.invTab('paid')">Payé</button>
    <button class="${tab === 'refunded' ? 'on' : ''}" onclick="act.invTab('refunded')">Remboursé</button>
  </div>
  <div class="pad20 stack12 mt14">
    ${inv.length ? inv.map(i => `
    <div class="invrow">
      <div class="iv-txt">
        <div class="iv-num">Facture n° ${i.num}</div>
        <div class="iv-sub">${fmtSlash(new Date(i.date))} · ${i.label}</div>
      </div>
      <span class="iv-amt">${eur(i.amount)} €</span>
      <button class="iconbtn" onclick="act.downloadInvoice('${i.id}')">${I('download', 19)}</button>
    </div>`).join('') : `<div class="emptystate"><div class="es-emoji">🧾</div>Aucune facture ici.</div>`}
  </div>
  <div style="height:26px"></div>`;
}

function vProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return pagehead('Shop', 'Introuvable') + `<div class="emptystate">Produit introuvable.</div>`;
  return pagehead('Le shop', p.name) + `
  <div class="prodpage">
    <img class="pp-img" src="${p.img}" alt="" onerror="this.style.display='none'">
    <div class="pp-titlerow"><div class="pp-name">${esc(p.name)}</div><div class="pp-price">${eur(p.price)} €</div></div>
    <div class="pp-sub">${esc(p.sub)}</div>
    <div class="pp-desc">${esc(p.desc)}</div>
    <button class="cta-main" onclick="act.addCart('product','${p.id}')">${I('cartAdd', 19)}&nbsp; AJOUTER AU PANIER</button>
  </div>
  <div style="height:26px"></div>`;
}

function cartItemInfo(item) {
  const gone = { name: 'Article retiré du catalogue', price: 0 };
  if (item.type === 'pack') { const p = PACKS.find(x => x.id === item.id); return p ? { name: `Pack ${p.label}`, price: p.price } : gone; }
  if (item.type === 'sub') { const p = SUBS.find(x => x.id === item.id); return p ? { name: `Abonnement ${p.label}`, price: p.price } : gone; }
  if (item.type === 'gift') { const p = GIFTCARDS.find(x => x.id === item.id); return p ? { name: p.label, price: p.price } : gone; }
  const p = PRODUCTS.find(x => x.id === item.id); return p ? { name: p.name, price: p.price } : gone;
}

function vCart() {
  const items = state.cart;
  const total = items.reduce((s, i) => s + cartItemInfo(i).price * i.qty, 0);
  return pagehead('Boutique', 'Mon panier') + `
  <div class="pad20 stack12 mt14">
    ${items.length ? items.map((it, idx) => {
      const info = cartItemInfo(it);
      return `
      <div class="cartrow">
        <div class="ct-txt"><div class="ct-name">${esc(info.name)}</div><div class="ct-price">${eur(info.price)} € / unité</div></div>
        <div class="qty">
          <button onclick="act.qty(${idx},-1)">${I('minus', 15)}</button>
          <b>${it.qty}</b>
          <button onclick="act.qty(${idx},1)">${I('plus', 15)}</button>
        </div>
      </div>`;
    }).join('') : `<div class="emptystate"><div class="es-emoji">🛒</div>Ton panier est vide.</div>`}
    ${items.length ? `
    <div class="totalrow"><span>Total</span><span>${eur(total)} €</span></div>
    <button class="cta-main" onclick="act.checkout()">PAYER ${eur(total)} € · DÉMO</button>
    <div class="smallnote">Paiement simulé : rien n'est débité, tout reste sur ton PC.</div>` : ''}
  </div>`;
}

/* ----- Profil ----- */
function vProfil() {
  const u = state.user;
  const initials = u.name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const doneCount = pastSessionsDone().length;
  const bal = creditBalance();
  const badges = computeBadges();
  const field = (label, value) => `<div class="field"><div class="f-label">${label}</div><div class="f-value">${value || '—'}</div></div>`;
  return `
  <div class="profhero">
    <div class="avatar">${esc(initials)}</div>
    <div class="pname">${esc(u.name)}</div>
    <div class="psince">Membre depuis le ${fmtDate(new Date(u.since))} · ${u.memberId}</div>
    ${u.role !== 'admin' ? `<div class="levelchip" onclick="nav('#/stats')">${levelInfo().cur.emoji} Niveau ${levelInfo().cur.name}${streakWeeks() > 1 ? ` · 🔥 ${streakWeeks()} sem.` : ''}</div>` : ''}
  </div>
  <div class="statrow">
    <div class="statcard"><b>${doneCount}</b><span>séances</span></div>
    <div class="statcard"><b>${bal === Infinity ? '∞' : bal}</b><span>crédits</span></div>
    <div class="statcard"><b>${state.favorites.length}</b><span>favoris</span></div>
  </div>
  <div class="sechead"><span class="overline">Mes badges</span></div>
  <div class="badgegrid">
    ${badges.map(b => `<div class="badge ${b.ok ? '' : 'locked'}"><div class="b-emoji">${b.emoji}</div><div class="b-name">${b.name}</div></div>`).join('')}
  </div>
  <button class="passbtn" onclick="act.showQr()">${I('scan', 22)} MON PASS D'ENTRÉE</button>
  <div class="sechead"><span class="overline">Préférences</span></div>
  <div class="listrows">
    ${u.role === 'admin' ? `
    <button class="listrow" style="border-color:rgba(224,190,114,.4)" onclick="nav('#/admin')">
      <span class="lr-ico">${I('pencil', 22)}</span>
      <span class="lr-txt"><span class="lr-name">⚙️ Espace gérant</span><br><span class="lr-sub">Cours, planning, tarifs, marque</span></span>
      <span class="lr-chev">${I('chevR', 18)}</span>
    </button>` : ''}
    ${PWA_PROMPT ? `
    <button class="listrow" onclick="act.installApp()">
      <span class="lr-ico">${I('download', 22)}</span>
      <span class="lr-txt"><span class="lr-name">📲 Installer l'application</span><br><span class="lr-sub">Ajouter ${esc(BRAND.name)} sur ton PC / téléphone</span></span>
      <span class="lr-chev">${I('chevR', 18)}</span>
    </button>` : ''}
    <button class="listrow" onclick="nav('#/stats')">
      <span class="lr-ico">${I('receipt', 22)}</span>
      <span class="lr-txt"><span class="lr-name">📈 Mes statistiques</span><br><span class="lr-sub">Niveau, série, semaines, tops</span></span>
      <span class="lr-chev">${I('chevR', 18)}</span>
    </button>
    <button class="listrow" onclick="act.toggleSysNotifs()">
      <span class="lr-ico">${I('bell', 22)}</span>
      <span class="lr-txt"><span class="lr-name">🔔 Rappels système</span><br><span class="lr-sub">${!('Notification' in window) ? 'Non supporté ici'
        : Notification.permission === 'denied' ? 'Bloqués par le navigateur'
        : (u.sysNotifs && Notification.permission === 'granted') ? 'Activés ✓ — notifications Windows'
        : 'Désactivés — touche pour activer'}</span></span>
      <span class="lr-chev">${I('chevR', 18)}</span>
    </button>
    <button class="listrow" onclick="act.referralSheet()">
      <span class="lr-ico">${I('gift', 22)}</span>
      <span class="lr-txt"><span class="lr-name">🤝 Parrainage</span><br><span class="lr-sub">Ton code : ${u.memberId} — 1 crédit offert chacun</span></span>
      <span class="lr-chev">${I('chevR', 18)}</span>
    </button>
    <button class="listrow" onclick="act.goalSheet()">
      <span class="lr-ico">${I('clock', 22)}</span>
      <span class="lr-txt"><span class="lr-name">Objectif hebdo</span><br><span class="lr-sub">${plural(u.weeklyGoal || 3, 'séance')} par semaine</span></span>
      <span class="lr-chev">${I('chevR', 18)}</span>
    </button>
    <div class="listrow" style="cursor:default">
      <span class="lr-ico">${I('pencil', 22)}</span>
      <span class="lr-txt"><span class="lr-name">Couleur de l'app</span></span>
      <span class="swatchrow">
        ${Object.entries(THEMES).map(([k, t]) => `
        <button class="swatch ${u.theme === k ? 'on' : ''}" style="background:${t.main}" title="${t.name}" onclick="act.setTheme('${k}')"></button>`).join('')}
      </span>
    </div>
  </div>
  <div class="fieldlist">
    <button class="editfab" onclick="act.editProfile()">${I('pencil', 20)}</button>
    ${field('EMAIL', u.email)}
    ${field('TÉLÉPHONE', u.phone)}
    ${field('ADRESSE', u.address)}
    ${field('CONTACT D’URGENCE', u.emergency)}
  </div>
  <div class="logoutwrap">
    <button class="cta-danger" onclick="act.askLogout()">${I('logout', 17)}&nbsp; SE DÉCONNECTER</button>
  </div>
  <div style="height:20px"></div>`;
}

/* ===================== ESPACE GÉRANT ===================== */
function adminStats() {
  const members = Object.values(ACCOUNTS).filter(a => a.role !== 'admin');
  let upcoming = 0, done = 0, revenue = 0;
  const typeCount = {};
  for (const a of members) {
    const d = a.data || {};
    for (const inv of (d.invoices || [])) if (inv.status === 'paid') revenue += inv.amount;
    for (const r of (d.reservations || [])) {
      if (r.status !== 'active') continue;
      const s = SESSION_BY_ID[r.sessionId];
      if (!s) continue;
      if (s.date > new Date()) upcoming++; else done++;
      typeCount[s.type.id] = (typeCount[s.type.id] || 0) + 1;
    }
  }
  const topId = Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0];
  const top = topId ? CLASS_TYPES.find(t => t.id === topId[0]) : null;
  // activité : réservations par semaine (8 dernières)
  const wkOf = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x.getTime(); };
  const thisWeek = wkOf(new Date());
  const weeks = Array.from({ length: 8 }, (_, i) => thisWeek - (7 - i) * 7 * 864e5);
  const allDates = [];
  for (const a of members) for (const r of ((a.data && a.data.reservations) || [])) {
    if (r.status !== 'active') continue;
    const s = SESSION_BY_ID[r.sessionId];
    if (s) allDates.push(s.date);
  }
  const weekly = weeks.map(w => allDates.filter(d => wkOf(d) === w).length);
  return { members: members.length, upcoming, done, revenue, top, weekly };
}

function vAdminDash() {
  const st = adminStats();
  const row = (emoji, name, sub, target) => `
    <button class="listrow" onclick="nav('${target}')">
      <span class="lr-ico" style="font-size:20px">${emoji}</span>
      <span class="lr-txt"><span class="lr-name">${name}</span><br><span class="lr-sub">${sub}</span></span>
      <span class="lr-chev">${I('chevR', 18)}</span>
    </button>`;
  return `
  <div class="pagehead">
    <div class="overline">Espace gérant</div>
    <h1>Ton studio</h1>
    <div class="ph-sub">Tout ce que tu changes ici s'applique direct dans l'app.</div>
  </div>
  <div class="statrow" style="grid-template-columns:1fr 1fr;">
    <div class="statcard"><b>${st.members}</b><span>membres</span></div>
    <div class="statcard"><b>${eur(st.revenue)} €</b><span>encaissés (démo)</span></div>
    <div class="statcard"><b>${st.upcoming}</b><span>résas à venir</span></div>
    <div class="statcard"><b>${st.done}</b><span>séances données</span></div>
  </div>
  ${st.top ? `<div class="smallnote" style="padding-top:10px">⭐ Cours le plus réservé : <b style="color:var(--gold)">${st.top.name} ${st.top.emoji}</b></div>` : ''}
  <div class="sechead"><span class="overline">Réservations · 8 semaines</span></div>
  <div class="barchart" style="height:120px;">
    ${st.weekly.map((c, i) => `
    <div class="barcol">
      <div class="barval">${c || ''}</div>
      <div class="bar" style="height:${Math.max(6, c / Math.max(1, ...st.weekly) * 100)}%"></div>
      <div class="barlbl">${i === 7 ? 'now' : 'S-' + (7 - i)}</div>
    </div>`).join('')}
  </div>
  <div class="sechead"><span class="overline">Gestion</span></div>
  <div class="listrows">
    ${row('🧘', 'Les cours', plural(CLASS_TYPES.length, 'type') + ' de cours', '#/admin/cours')}
    ${row('🗓️', 'Le planning hebdo', 'Horaires par jour de la semaine', '#/admin/planning')}
    ${row('💶', 'Les tarifs', 'Packs de crédits & abonnements', '#/admin/tarifs')}
    ${row('🧑‍🏫', 'Les profs', TEACHERS.join(', '), '#/admin/profs')}
    ${row('👥', 'Les membres', plural(st.members, 'compte') + ' membre' + (st.members > 1 ? 's' : ''), '#/admin/membres')}
  </div>
  <div class="sechead"><span class="overline">Studio</span></div>
  <div class="listrows">
    <button class="listrow" onclick="act.adminAnnounceSheet()">
      <span class="lr-ico" style="font-size:20px">📣</span>
      <span class="lr-txt"><span class="lr-name">Publier une annonce</span><br><span class="lr-sub">${ANNONCES.length ? 'Dernière : « ' + esc(ANNONCES[0].title) + ' »' : 'Envoyée à tous les membres'}</span></span>
      <span class="lr-chev">${I('chevR', 18)}</span>
    </button>
    <button class="listrow" onclick="act.adminBrandSheet()">
      <span class="lr-ico">${I('tag', 22)}</span>
      <span class="lr-txt"><span class="lr-name">Marque & infos</span><br><span class="lr-sub">${esc(BRAND.name)} · ${esc(BRAND.address)}</span></span>
      <span class="lr-chev">${I('chevR', 18)}</span>
    </button>
    <button class="listrow" onclick="act.adminBackup()">
      <span class="lr-ico">${I('download', 22)}</span>
      <span class="lr-txt"><span class="lr-name">💾 Sauvegarde complète</span><br><span class="lr-sub">Exporte comptes + config en fichier .json</span></span>
    </button>
    <button class="listrow" onclick="act.adminRestoreSheet()">
      <span class="lr-ico">${I('sync', 22)}</span>
      <span class="lr-txt"><span class="lr-name">📥 Restaurer une sauvegarde</span><br><span class="lr-sub">Depuis un fichier .json exporté</span></span>
    </button>
    <button class="listrow" onclick="act.adminAskReset()">
      <span class="lr-ico" style="color:var(--danger)">${I('xcircle', 22)}</span>
      <span class="lr-txt"><span class="lr-name" style="color:var(--danger)">Réinitialiser la config</span><br><span class="lr-sub">Revenir aux cours/tarifs d'origine</span></span>
    </button>
  </div>
  <div style="height:26px"></div>`;
}

function vAdminCours() {
  return pagehead('Espace gérant', 'Les cours') + `
  <div class="pad20 stack12 mt14">
    ${CLASS_TYPES.map(t => `
    <div class="invrow">
      <span style="font-size:22px">${t.emoji}</span>
      <div class="iv-txt">
        <div class="iv-num">${esc(t.name)}</div>
        <div class="iv-sub">${STUDIOS[t.studio].label} · ${t.dur} min · ${plural(t.credits, 'crédit')}</div>
      </div>
      <button class="iconbtn" onclick="act.adminCourseSheet('${t.id}')">${I('pencil', 18)}</button>
      <button class="iconbtn" style="color:var(--danger)" onclick="act.adminAskDelCourse('${t.id}')">${I('xcircle', 18)}</button>
    </div>`).join('')}
    <button class="cta-ghost" onclick="act.adminCourseSheet(null)">＋ AJOUTER UN COURS</button>
  </div>
  <div style="height:26px"></div>`;
}

function vAdminPlanning() {
  const strip = [1, 2, 3, 4, 5, 6, 0].map(d => `
    <button class="daybtn ${ADMIN_DAY === d ? 'on' : ''}" onclick="act.adminDaySel(${d})">
      <div class="db-dow">${DAYS[d]}</div><div class="db-num">${(WEEK_TEMPLATE[d] || []).length}</div>
    </button>`).join('');
  const slots = (WEEK_TEMPLATE[ADMIN_DAY] || []);
  // prochaine occurrence de ce jour (pour compter les inscrits réels)
  const nextD = new Date(); nextD.setHours(0, 0, 0, 0);
  while (nextD.getDay() !== ADMIN_DAY) nextD.setDate(nextD.getDate() + 1);
  return pagehead('Espace gérant', 'Planning hebdo') + `
  <div class="daystrip">${strip}</div>
  <div class="smallnote" style="text-align:left;padding:6px 22px 0">Le chiffre = nombre de cours ce jour-là. Les résas affichées = prochaine occurrence (${fmtDate(nextD)}).</div>
  <div class="pad20 stack12 mt14">
    ${slots.length ? slots.map((s, i) => {
      const t = CLASS_TYPES.find(x => x.id === s.type);
      const sid = `${dayKey(nextD)}_${s.time.replace(':', '')}_${s.type}`;
      const n = bookingsFor(sid).length;
      return `
      <div class="invrow">
        <div class="iv-txt" style="cursor:pointer" onclick="act.adminSlotDetail('${sid}')">
          <div class="iv-num">${s.time} — ${t ? esc(t.name) + ' ' + t.emoji : esc(s.type)}</div>
          <div class="iv-sub">${esc(s.teacher)} · ${t ? STUDIOS[t.studio].label : ''} · <b style="color:${n ? 'var(--gold)' : 'inherit'}">${plural(n, 'résa')}</b></div>
        </div>
        <button class="iconbtn" style="color:var(--danger)" onclick="act.adminDelSlot(${i})">${I('xcircle', 18)}</button>
      </div>`;
    }).join('') : `<div class="emptystate">Aucun cours le ${DAYS[ADMIN_DAY]} — jour de repos 😴</div>`}
    <button class="cta-ghost" onclick="act.adminSlotSheet()">＋ AJOUTER UN CRÉNEAU</button>
    <button class="cta-ghost" onclick="act.adminCopyDaySheet()">📋 COPIER CE JOUR VERS…</button>
  </div>
  <div style="height:26px"></div>`;
}

function vAdminTarifs() {
  return pagehead('Espace gérant', 'Les tarifs') + `
  <div class="sechead"><span class="overline">Packs de crédits</span></div>
  <div class="pad20 stack12">
    ${PACKS.map(p => `
    <div class="invrow">
      <span class="pk-badge" style="width:44px;height:44px;font-size:16px;border-radius:13px">${p.credits}</span>
      <div class="iv-txt">
        <div class="iv-num">${eur(p.price)} € · ${p.label}</div>
        <div class="iv-sub">Validité ${p.months} mois</div>
      </div>
      <button class="iconbtn" onclick="act.adminPackSheet('${p.id}')">${I('pencil', 18)}</button>
      <button class="iconbtn" style="color:var(--danger)" onclick="act.adminAskDelPack('${p.id}')">${I('xcircle', 18)}</button>
    </div>`).join('')}
    <button class="cta-ghost" onclick="act.adminPackSheet(null)">＋ AJOUTER UN PACK</button>
  </div>
  <div class="sechead"><span class="overline">Abonnements mensuels</span></div>
  <div class="pad20 stack12">
    ${SUBS.map(p => `
    <div class="invrow">
      <div class="iv-txt">
        <div class="iv-num">${eur(p.price)}€ / mois</div>
        <div class="iv-sub">${p.label}</div>
      </div>
      <button class="iconbtn" onclick="act.adminSubSheet('${p.id}')">${I('pencil', 18)}</button>
    </div>`).join('')}
  </div>
  <div class="sechead"><span class="overline">Le shop (produits)</span></div>
  <div class="pad20 stack12">
    ${PRODUCTS.map(p => `
    <div class="invrow">
      <div class="iv-txt">
        <div class="iv-num">${esc(p.name)}</div>
        <div class="iv-sub">${eur(p.price)} € · ${esc(p.sub)}</div>
      </div>
      <button class="iconbtn" onclick="act.adminProductSheet('${p.id}')">${I('pencil', 18)}</button>
      <button class="iconbtn" style="color:var(--danger)" onclick="act.adminAskDelProduct('${p.id}')">${I('xcircle', 18)}</button>
    </div>`).join('')}
    <button class="cta-ghost" onclick="act.adminProductSheet(null)">＋ AJOUTER UN PRODUIT</button>
  </div>
  <div style="height:26px"></div>`;
}

function accBalance(acc) {
  const cards = (acc.data && acc.data.cards) || [];
  const active = cards.filter(c => new Date(c.expires) > new Date());
  if (active.some(c => c.total === -1)) return '∞';
  return active.reduce((s, c) => s + Math.max(0, c.remaining), 0);
}

function vAdminMembres() {
  const members = Object.entries(ACCOUNTS).filter(([, a]) => a.role !== 'admin');
  return pagehead('Espace gérant', 'Les membres') + `
  <div class="pad20 stack12 mt14">
    ${members.length ? members.map(([email, a]) => {
      const resas = ((a.data && a.data.reservations) || []).filter(r => r.status === 'active').length;
      return `
      <div class="invrow">
        <span class="tavatar" style="width:42px;height:42px;font-size:15px;">${esc(a.name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase())}</span>
        <div class="iv-txt">
          <div class="iv-num">${esc(a.name)} <span style="color:var(--gold);font-size:12px;">${a.memberId}</span></div>
          <div class="iv-sub">${esc(email)} · ${accBalance(a)} crédit(s) · ${plural(resas, 'résa')}</div>
        </div>
        <button class="iconbtn" title="Offrir des crédits" onclick="act.adminGiftSheet('${arg(email)}')">${I('gift', 18)}</button>
        <button class="iconbtn" style="color:var(--danger)" onclick="act.adminAskDelMember('${arg(email)}')">${I('xcircle', 18)}</button>
      </div>`;
    }).join('') : `<div class="emptystate"><div class="es-emoji">👥</div>Aucun membre pour le moment.</div>`}
  </div>
  <div style="height:26px"></div>`;
}

function vAdminProfs() {
  return pagehead('Espace gérant', 'Les profs') + `
  <div class="pad20 stack12 mt14">
    ${TEACHERS.map(t => `
    <div class="invrow">
      <span class="lr-ico">${I('user', 20)}</span>
      <div class="iv-txt"><div class="iv-num">${esc(t)}</div>
        <div class="iv-sub">${plural(Object.values(WEEK_TEMPLATE).flat().filter(s => s.teacher === t).length, 'cours')} / semaine</div></div>
      <button class="iconbtn" style="color:var(--danger)" onclick="act.adminDelTeacher('${arg(t)}')">${I('xcircle', 18)}</button>
    </div>`).join('')}
    <button class="cta-ghost" onclick="act.adminTeacherSheet()">＋ AJOUTER UN·E PROF</button>
  </div>
  <div style="height:26px"></div>`;
}

/* ----- Login / Inscription ----- */
function vLogin() {
  const loginForm = `
    <div class="loginform">
      <input id="li-email" type="email" placeholder="Email" value="${DEMO_EMAIL}">
      <input id="li-pass" type="password" placeholder="Mot de passe" value="demo1234">
      <div class="formerror" id="authError"></div>
      <button class="cta-main" style="margin-top:2px" onclick="act.login()">SE CONNECTER</button>
    </div>
    <div class="logindemo">Compte démo : ${DEMO_EMAIL} · demo1234<br>Tout reste sur ton PC — aucune donnée envoyée.</div>`;
  const signupForm = `
    <div class="loginform">
      <input id="su-name" placeholder="Prénom (ou pseudo)">
      <input id="su-email" type="email" placeholder="Email">
      <input id="su-pass" type="password" placeholder="Mot de passe (6 caractères min.)">
      <input id="su-pass2" type="password" placeholder="Confirme le mot de passe">
      <input id="su-ref" placeholder="Code de parrainage (optionnel)" style="text-transform:uppercase">
      <div class="formerror" id="authError"></div>
      <button class="cta-main" style="margin-top:2px" onclick="act.signup()">CRÉER MON COMPTE</button>
    </div>
    <div class="logindemo">🎁 2 crédits offerts à l'inscription.<br>Compte 100% local — n'utilise pas un vrai mot de passe.</div>`;
  return `
  <div class="loginwrap">
    <button class="loginback" onclick="nav('#/home')">${I('back', 22)}</button>
    <div class="loginlogo">${LOGO(58)}</div>
    <h1>${esc(BRAND.name)}<i>.</i></h1>
    <div class="lw-tag">${BRAND.tagline}</div>
    <div class="authtabs">
      <button class="${AUTH_TAB === 'login' ? 'on' : ''}" onclick="act.authTab('login')">Se connecter</button>
      <button class="${AUTH_TAB === 'signup' ? 'on' : ''}" onclick="act.authTab('signup')">Créer un compte</button>
    </div>
    ${AUTH_TAB === 'login' ? loginForm : signupForm}
  </div>`;
}

/* ---------------- Sheets & toasts ---------------- */
function openSheet(html) {
  $('#sheetRoot').innerHTML = `
  <div class="sheet-overlay" onclick="if(event.target===this)act.closeSheet()">
    <div class="sheet"><div class="grab"></div>${html}</div>
  </div>`;
}
function toast(msg) {
  const root = $('#toastRoot');
  root.innerHTML = `<div class="toast">${msg}</div>`;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { root.innerHTML = ''; }, 2400);
}
function authError(msg) {
  const el = $('#authError');
  if (el) el.textContent = msg;
}

/* ---------------- Actions ---------------- */
const act = {
  search(v) { Q = v; const el = $('#homeDyn'); if (el) el.innerHTML = homeDynHtml(); },
  closeSheet() { $('#sheetRoot').innerHTML = ''; },

  /* notifications */
  openNotif(id) {
    const n = state.notifs.find(x => x.id === id);
    if (!n) return;
    n.read = true; save();
    if (n.sess && SESSION_BY_ID[n.sess]) { render(); act.openSession(n.sess); }
    else if (n.route) nav(n.route);
    else render();
  },
  readNotif(id) {
    const n = state.notifs.find(x => x.id === id);
    if (n) { n.read = true; save(); render(); }
  },
  readAllNotifs() {
    state.notifs.forEach(n => { n.read = true; });
    save(); render();
  },

  /* parrainage */
  referralSheet() {
    openSheet(`
      <h2>🤝 Parrainage</h2>
      <div class="sh-sub">1 CRÉDIT OFFERT POUR TOI ET TON FILLEUL·E</div>
      <div class="sh-desc" style="margin-top:14px;">
        Partage ton code : quand quelqu'un crée son compte avec, vous recevez
        <b style="color:var(--gold)">1 crédit chacun</b>. Simple, efficace.
      </div>
      <div class="codebox" style="margin-top:14px;font-size:20px;">${state.user.memberId}</div>
      <button class="cta-main" onclick="act.copyReferral()">COPIER MON CODE</button>`);
  },
  copyReferral() {
    try { navigator.clipboard.writeText(state.user.memberId); toast('Code copié ✓'); }
    catch { toast('Code : ' + state.user.memberId); }
  },
  resaTab(t) { state.resaTab = t; save(); render(); },
  invTab(t) { state.invTab = t; save(); render(); },
  pickDay(dk) { F.date = dk; render(); },
  calNav(d) { CAL_OFF = Math.max(-2, Math.min(2, CAL_OFF + d)); render(); },
  calDay(dk) {
    const resa = state.reservations.find(r => {
      const s = SESSION_BY_ID[r.sessionId];
      return r.status === 'active' && s && dayKey(s.date) === dk;
    });
    if (resa) { act.openSession(resa.sessionId); return; }
    if (futureSessions().some(s => dayKey(s.date) === dk)) { F.date = dk; nav('#/planning'); return; }
    toast('Rien de prévu ce jour-là');
  },
  resetFilters() { F.lieu = null; F.prof = null; render(); },

  /* ----- Coach : trouve ton cours en 2 questions ----- */
  coach(step, val) {
    if (step === 1) {
      act._coach = {};
      const opt = (v, l) => `<button class="optrow" onclick="act.coach(2,'${v}')"><span>${l}</span>${I('chevR', 18)}</button>`;
      openSheet(`
        <h2>✨ Coach ${esc(BRAND.name)}</h2>
        <div class="sh-sub">QUESTION 1/2 — TU VEUX BOUGER QUAND ?</div>
        <div style="margin-top:10px;">
          ${opt('today', "🌞 Aujourd'hui")}
          ${opt('tomorrow', '🌅 Demain')}
          ${opt('weekend', '🎉 Ce week-end')}
          ${opt('any', '🤷 Peu importe')}
        </div>`);
      return;
    }
    if (step === 2) {
      act._coach.when = val;
      const opt = (v, l) => `<button class="optrow" onclick="act.coach(3,'${v}')"><span>${l}</span>${I('chevR', 18)}</button>`;
      openSheet(`
        <h2>✨ Coach ${esc(BRAND.name)}</h2>
        <div class="sh-sub">QUESTION 2/2 — T'AS ENVIE DE QUOI ?</div>
        <div style="margin-top:10px;">
          ${opt('push', '💪 Me dépenser à fond')}
          ${opt('soft', '🧘 M\'assouplir & respirer')}
          ${opt('discover', '✨ Découvrir un nouveau cours')}
          ${opt('any', '⚖️ Un peu de tout')}
        </div>`);
      return;
    }
    // étape 3 : résultats
    act._coach.mood = val;
    const c = act._coach;
    const now = new Date();
    const todayK = dayKey(now);
    const tmr = new Date(now); tmr.setDate(tmr.getDate() + 1);
    const tomorrowK = dayKey(tmr);
    const pastTypes = new Set(pastSessionsDone().map(s => s.type.id));
    const booked = new Set(state.reservations.filter(r => r.status === 'active').map(r => r.sessionId));
    const PUSH = ['power-pilates', 'abs-butt', 'reformer-flow', 'reformer-deep-core'];
    const SOFT = ['souplesse', 'yin-yoga', 'vinyasa-flow', 'yoga-ashtanga', 'pilates-tradi', 'reformer-essentials'];
    let list = futureSessions().filter(s => {
      if (s.date.getTime() > Date.now() + 7 * 864e5) return false;
      if (booked.has(s.id) || seatsInfo(s).full) return false;
      const dk = dayKey(s.date);
      if (c.when === 'today' && dk !== todayK) return false;
      if (c.when === 'tomorrow' && dk !== tomorrowK) return false;
      if (c.when === 'weekend' && ![0, 6].includes(s.date.getDay())) return false;
      if (c.mood === 'push' && !PUSH.includes(s.type.id)) return false;
      if (c.mood === 'soft' && !SOFT.includes(s.type.id)) return false;
      if (c.mood === 'discover' && pastTypes.has(s.type.id)) return false;
      return true;
    }).slice(0, 3);
    openSheet(`
      <h2>✨ Mes recommandations</h2>
      <div class="sh-sub">${list.length ? 'CHOISIS, JE M\'OCCUPE DU RESTE' : 'HMMM…'}</div>
      <div style="margin-top:10px;">
        ${list.length ? list.map(s => `
        <button class="optrow" onclick="act.openSession('${s.id}')">
          <span>${esc(s.type.name)} ${s.type.emoji}<br><small style="color:var(--muted);font-weight:500">${fmtPill(s.date)} · ${esc(s.teacher)} · ${plural(s.type.credits, 'crédit')}</small></span>
          ${I('chevR', 18)}
        </button>`).join('')
        : `<div class="sh-desc">Rien qui colle parfaitement sur cette période 😕 Essaie d'autres réponses ou va voir tout le planning.</div>`}
      </div>
      ${list.length ? `<button class="cta-ghost" onclick="act.coach(1)">↺ RECOMMENCER</button>`
        : `<button class="cta-main" onclick="act.closeSheet();nav('#/planning')">VOIR LE PLANNING</button>
           <button class="cta-ghost" onclick="act.coach(1)">↺ RECOMMENCER</button>`}`);
  },

  /* ----- Rappels système (Notification API) ----- */
  toggleSysNotifs() {
    if (!('Notification' in window)) { toast('Non supporté par ce navigateur'); return; }
    if (Notification.permission === 'denied') { toast('Bloqués par le navigateur — réautorise-les dans les réglages du site'); return; }
    const enable = !state.user.sysNotifs;
    if (enable && Notification.permission !== 'granted') {
      Notification.requestPermission().then(p => {
        if (p === 'granted') {
          state.user.sysNotifs = true; save(); render();
          toast('Rappels système activés 🔔');
          try { new Notification(BRAND.full, { body: 'Parfait ! Tes rappels de séance arriveront ici ✓', icon: 'icon-192.png' }); } catch { /* rien */ }
        } else { toast('Permission refusée'); render(); }
      });
      return;
    }
    state.user.sysNotifs = enable; save(); render();
    toast(enable ? 'Rappels système activés 🔔' : 'Rappels système désactivés');
  },
  gotoAuth(t) { AUTH_TAB = t; if (route()[0] === 'login') render(); else nav('#/login'); },
  authTab(t) { AUTH_TAB = t; render(); },

  toggleFav(typeId) {
    if (!state.user) { act.gotoAuth('login'); return; }
    const i = state.favorites.indexOf(typeId);
    if (i >= 0) { state.favorites.splice(i, 1); toast('Retiré des favoris'); }
    else { state.favorites.push(typeId); toast('Ajouté aux favoris 🖤'); }
    save(); render();
  },

  openType(typeId) {
    const next = futureSessions().find(s => s.type.id === typeId && !seatsInfo(s).full);
    if (next) act.openSession(next.id);
    else toast('Aucune date à venir pour ce cours');
  },

  pickFilter(kind) {
    let opts;
    if (kind === 'lieu') opts = [{ v: null, l: 'Tous les lieux' }, ...Object.values(STUDIOS).map(s => ({ v: s.id, l: s.label }))];
    else opts = [{ v: null, l: 'Tous les professeurs' }, ...TEACHERS.map(t => ({ v: t, l: t }))];
    openSheet(`
      <h2>${kind === 'lieu' ? 'Choisir un lieu' : 'Choisir un prof'}</h2>
      <div style="margin-top:10px;">
      ${opts.map(o => `<button class="optrow ${F[kind] === o.v ? 'on' : ''}" onclick="act.setFilter('${kind}',${o.v === null ? 'null' : `'${o.v}'`})">
        <span>${o.l}</span>${F[kind] === o.v ? I('check', 20) : ''}</button>`).join('')}
      </div>`);
  },
  setFilter(kind, v) { F[kind] = v; act.closeSheet(); render(); },

  /* fiche cours + réservation */
  openSession(id) {
    const s = SESSION_BY_ID[id];
    if (!s) return;
    act._spotSel = null;
    const seats = seatsInfo(s);
    const booked = state.reservations.find(r => r.status === 'active' && r.sessionId === id);
    const isPast = s.date <= new Date();
    const cost = s.type.credits;
    const bal = creditBalance();
    const inWait = state.waitlist.includes(id);
    let cta = '';
    if (isPast) {
      const rating = state.ratings[id];
      cta = `<div class="good">Séance passée — bien joué 💪</div>` +
        (booked && !rating ? `<button class="cta-ghost" onclick="act.rateSheet('${id}')">☆ NOTER CETTE SÉANCE</button>` : '');
    } else if (booked) {
      cta = `<div class="good">✓ Tu es inscrit·e${booked.guests ? ' (+1 invité)' : ''}${booked.spot ? ` — ${spotInfo(s).label} n°${booked.spot}` : ''}.</div>
             <button class="cta-ghost" onclick="act.askCancel('${booked.id}')">ANNULER MA PLACE</button>`;
    } else if (seats.full) {
      cta = `<div class="warn">Ce cours est complet.</div>` +
        (!state.user
          ? `<button class="cta-main" onclick="act.closeSheet();act.gotoAuth('login')">SE CONNECTER</button>`
          : inWait
            ? `<div class="good">🕐 Tu es en liste d'attente — position #${waitPos(id)}</div>
               <button class="cta-ghost" onclick="act.leaveWait('${id}')">QUITTER LA LISTE D'ATTENTE</button>`
            : `<button class="cta-main" onclick="act.joinWait('${id}')">REJOINDRE LA LISTE D'ATTENTE</button>`);
    } else if (!state.user) {
      cta = `<button class="cta-main" onclick="act.closeSheet();act.gotoAuth('login')">SE CONNECTER POUR RÉSERVER</button>`;
    } else if (bal !== Infinity && bal < cost) {
      cta = `<div class="warn">Il te manque des crédits (${plural(cost, 'crédit')} requis, ${bal} dispo).</div>
             <button class="cta-main" onclick="act.closeSheet();nav('#/studio/cartes')">RECHARGER MES CRÉDITS</button>`;
    } else {
      const canGuest = seats.left >= 2 && (bal === Infinity || bal >= cost * 2);
      const repN = repeatTargets(id).length;
      const si = spotInfo(s);
      const occ = occupiedSpots(s);
      cta = `
        <div class="overline" style="margin-top:4px">Choisis ta place · ${si.label.toLowerCase()}s</div>
        <div class="spotmap" style="grid-template-columns:repeat(${si.cols},1fr)">
          ${Array.from({ length: si.cap }, (_, i) => i + 1).map(n => `
          <button class="spot ${occ.has(n) ? 'taken' : ''}" id="spot-${n}" ${occ.has(n) ? 'disabled' : ''} onclick="act.pickSpot(${n})">${n}</button>`).join('')}
        </div>
        <div class="spotlbl" id="spotLbl">Pas de préférence ? On te placera automatiquement.</div>
        ${canGuest ? `
        <label class="guestrow">
          <input type="checkbox" id="guestChk" onchange="act.updateBookBtn('${id}')">
          <span>Venir avec un invité <b>(+${plural(cost, 'crédit')})</b></span>
        </label>` : ''}
        ${repN ? `
        <label class="guestrow">
          <input type="checkbox" id="repeatChk" onchange="act.updateBookBtn('${id}')">
          <span>Répéter les ${repN} prochaines semaines <b>(même créneau)</b></span>
        </label>` : ''}
        <button class="cta-main" id="bookBtn" onclick="act.book('${id}')">RÉSERVER · ${plural(cost, 'CRÉDIT').toUpperCase()}</button>`;
    }
    const nbIns = bookingsFor(id).length;
    const tr = typeRating(s.type.id);
    openSheet(`
      <img class="sheet-img" src="${s.type.img}" alt="" onerror="this.remove()">
      <h2>${esc(s.type.name)} ${s.type.emoji}</h2>
      <div class="sh-sub">${STUDIOS[s.type.studio].label} · ${s.type.dur} MIN${seats.promoted ? ' · 1 PLACE POUR TOI 🎉' : seats.full || isPast ? '' : ' · ' + plural(seats.left, 'PLACE') + ' RESTANTE' + (seats.left > 1 ? 'S' : '')}${tr ? ` · ★ ${tr.avg.toFixed(1)}` : ''}${nbIns ? ` · ${nbIns} INSCRIT·E·S` : ''}</div>
      <div class="sh-rows">
        <div class="sh-row">${I('calendar', 19)} ${fmtPill(s.date)}</div>
        <button class="sh-row shlink" onclick="act.openTeacher('${arg(s.teacher)}')">${I('user', 19)} ${esc(s.teacher)} <span class="shlink-more">voir le profil →</span></button>
        <div class="sh-row">${I('pin', 19)} ${BRAND.address}</div>
        <div class="sh-row">${I('figure', 19)} Tous niveaux</div>
      </div>
      <div class="sh-desc">${s.type.desc}</div>
      ${cta}
      ${!isPast ? `<button class="cta-ghost" onclick="act.shareSession('${id}')">📤 INVITER UN AMI</button>` : ''}`);
  },

  shareSession(id) {
    const s = SESSION_BY_ID[id];
    if (!s) return;
    const txt = `Rejoins-moi au ${s.type.name} ${s.type.emoji} — ${fmtPill(s.date)} chez ${BRAND.full} !${state.user ? ` Mon code parrainage : ${state.user.memberId} (1 crédit offert à l'inscription 😉)` : ''}`;
    if (navigator.share) navigator.share({ text: txt }).catch(() => { });
    else {
      try { navigator.clipboard.writeText(txt); toast('Invitation copiée 📋 — colle-la où tu veux !'); }
      catch { toast(txt.slice(0, 60) + '…'); }
    }
  },

  updateBookBtn(id) {
    const s = SESSION_BY_ID[id];
    const btn = $('#bookBtn');
    if (!s || !btn) return;
    const guest = $('#guestChk') && $('#guestChk').checked ? 1 : 0;
    const repeat = $('#repeatChk') && $('#repeatChk').checked;
    const nb = 1 + (repeat ? repeatTargets(id).length : 0);
    const total = s.type.credits * (1 + guest) * nb;
    btn.innerText = `RÉSERVER${nb > 1 ? ' ×' + nb + ' SEMAINES' : ''} · ${plural(total, 'CRÉDIT').toUpperCase()}`;
    const bal = creditBalance();
    btn.disabled = bal !== Infinity && bal < total;
  },

  openTeacher(name) {
    const initials = name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const info = (typeof TEACHER_INFO !== 'undefined' && TEACHER_INFO[name]) ||
      { spe: 'Cours collectifs', bio: `${name} fait partie de l'équipe ${BRAND.name} et t'accompagne à chaque séance avec bienveillance.` };
    const tr = teacherRating(name);
    const next = futureSessions().filter(s => s.teacher === name).slice(0, 3);
    // derniers avis avec commentaire (tous comptes)
    const reviews = [];
    for (const a of Object.values(ACCOUNTS)) {
      for (const [sid, val] of Object.entries((a.data && a.data.ratings) || {})) {
        const stars = typeof val === 'number' ? val : val.stars;
        const comment = typeof val === 'number' ? '' : (val.comment || '');
        const sess = SESSION_BY_ID[sid];
        if (sess && sess.teacher === name && comment) reviews.push({ stars, comment, who: a.name.split(' ')[0], ts: sess.date });
      }
    }
    reviews.sort((x, y) => y.ts - x.ts);
    openSheet(`
      <div class="teachhead">
        <span class="tavatar">${esc(initials)}</span>
        <div>
          <h2>${esc(name)}</h2>
          <div class="sh-sub">${esc(info.spe.toUpperCase())}</div>
        </div>
      </div>
      ${tr ? `<div class="good">★ ${tr.avg.toFixed(1)} / 5 — ${plural(tr.count, 'avis')} des membres</div>` : `<div class="sh-desc" style="margin-top:10px">Pas encore d'avis — sois le·la premier·ère à noter ses cours !</div>`}
      <div class="sh-desc" style="margin-top:12px">${esc(info.bio)}</div>
      ${reviews.length ? `
      <div class="overline" style="margin-top:16px">Ce qu'en disent les membres</div>
      <div style="margin-top:8px;display:flex;flex-direction:column;gap:8px;">
        ${reviews.slice(0, 3).map(r => `
        <div class="reviewbox">
          <span class="rv-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
          « ${esc(r.comment)} » <span class="rv-who">— ${esc(r.who)}</span>
        </div>`).join('')}
      </div>` : ''}
      <div class="overline" style="margin-top:16px">Ses prochains cours</div>
      <div style="margin-top:4px;">
        ${next.length ? next.map(s => `
        <button class="optrow" onclick="act.openSession('${s.id}')">
          <span>${esc(s.type.name)} ${s.type.emoji} — ${fmtPill(s.date)}</span>${I('chevR', 18)}
        </button>`).join('') : `<div class="sh-desc">Aucun cours planifié pour le moment.</div>`}
      </div>`);
  },

  pickSpot(n) {
    act._spotSel = act._spotSel === n ? null : n;
    document.querySelectorAll('.spot.sel').forEach(e => e.classList.remove('sel'));
    if (act._spotSel) { const el = $('#spot-' + n); if (el) el.classList.add('sel'); }
    const lbl = $('#spotLbl');
    if (lbl) lbl.textContent = act._spotSel ? `Ta place : n°${act._spotSel} ✓` : 'Pas de préférence ? On te placera automatiquement.';
  },

  book(id) {
    const s = SESSION_BY_ID[id];
    const guests = $('#guestChk') && $('#guestChk').checked ? 1 : 0;
    const repeat = $('#repeatChk') && $('#repeatChk').checked;
    const targets = [s, ...(repeat ? repeatTargets(id) : [])];
    const wanted = act._spotSel || null;
    let booked = 0, spent = 0, firstSpot = null;
    for (const t of targets) {
      const cost = t.type.credits * (1 + guests);
      if (!payCredits(cost)) break;
      const occ = occupiedSpots(t);
      const cap = spotInfo(t).cap;
      const spot = (wanted && !occ.has(wanted)) ? wanted : firstFreeSpot(occ, cap);
      if (firstSpot === null) firstSpot = spot;
      state.reservations.push({ id: uid(), sessionId: t.id, status: 'active', guests, cost, spot });
      state.waitlist = state.waitlist.filter(x => x !== t.id);
      state.waitPromos = state.waitPromos.filter(x => x !== t.id);
      booked++; spent += cost;
    }
    if (!booked) { toast('Crédits insuffisants'); return; }
    save();
    act.closeSheet();
    const spotTxt = firstSpot ? ` · ${spotInfo(s).label} n°${firstSpot}` : '';
    toast(booked > 1
      ? `✅ ${booked} séances réservées · ${spent} crédits`
      : guests ? `✅ Réservé pour vous deux !${spotTxt}` : `✅ Réservation confirmée !${spotTxt}`);
    confetti();
    render();
  },

  askCancel(resaId) {
    const r = state.reservations.find(x => x.id === resaId);
    if (!r) return;
    const s = SESSION_BY_ID[r.sessionId];
    if (!canCancel(s)) {
      openSheet(`
        <h2>Trop tard pour annuler 😬</h2>
        <div class="warn">Les annulations sont possibles jusqu'à <b>2h avant</b> le début du cours.
        Là, le cours commence ${countdown(s.date) === "aujourd'hui" ? 'dans moins de 2h' : 'très bientôt'} — les crédits ne peuvent plus être rendus.</div>
        <button class="cta-ghost" onclick="act.closeSheet()">OK, J'Y SERAI</button>`);
      return;
    }
    const refund = r.cost || s.type.credits;
    openSheet(`
      <h2>Annuler ta place ?</h2>
      <div class="sh-rows">
        <div class="sh-row">${I('calendar', 19)} ${s.type.name} — ${fmtPill(s.date)}</div>
        <div class="sh-row">${I('card', 19)} ${plural(refund, 'crédit')} te seront rendus</div>
        <div class="sh-row">${I('clock', 19)} Annulation gratuite jusqu'à 2h avant le cours</div>
      </div>
      <button class="cta-danger" onclick="act.cancelResa('${resaId}')">OUI, ANNULER</button>
      <button class="cta-ghost" onclick="act.closeSheet()">GARDER MA PLACE</button>`);
  },
  cancelResa(resaId) {
    const i = state.reservations.findIndex(x => x.id === resaId);
    if (i < 0) return;
    const r = state.reservations[i];
    const s = SESSION_BY_ID[r.sessionId];
    if (!canCancel(s)) { act.closeSheet(); toast('Trop tard pour annuler (moins de 2h)'); return; }
    state.reservations.splice(i, 1);
    refundCredits(r.cost || s.type.credits);
    save();
    act.closeSheet();
    toast('Place annulée — crédits rendus 👍');
    render();
  },

  checkin(resaId) {
    const r = state.reservations.find(x => x.id === resaId);
    if (!r) return;
    r.checkedIn = true;
    save();
    toast('Bonne séance ! 💪');
    confetti();
    render();
  },

  /* liste d'attente */
  joinWait(id) {
    if (!state.user) { act.closeSheet(); act.gotoAuth('login'); return; }
    if (!state.waitlist.includes(id)) state.waitlist.push(id);
    save();
    act.closeSheet();
    toast(`🕐 Ajouté à la liste d'attente (position #${waitPos(id)})`);
    render();
  },
  leaveWait(id) {
    state.waitlist = state.waitlist.filter(x => x !== id);
    save();
    act.closeSheet();
    toast("Retiré de la liste d'attente");
    render();
  },

  /* notes des séances (étoiles + commentaire) */
  rateSheet(sessionId) {
    act._rateTmp = { stars: 0, comment: '' };
    act._rateRender(sessionId);
  },
  _rateRender(sessionId) {
    const s = SESSION_BY_ID[sessionId];
    const t = act._rateTmp;
    openSheet(`
      <h2>Noter « ${s.type.name} »</h2>
      <div class="sh-sub">${s.teacher.toUpperCase()} · ${fmtPill(s.date)}</div>
      <div class="starpick">
        ${[1, 2, 3, 4, 5].map(n => `<button class="${n <= t.stars ? 'on' : ''}" onclick="act.pickStar('${sessionId}',${n})">★</button>`).join('')}
      </div>
      <div class="formfield"><label>UN PETIT MOT ? (OPTIONNEL)</label>
        <textarea id="rate-comment" rows="2" placeholder="ex : super cours, prof au top !">${t.comment}</textarea></div>
      <button class="cta-main" onclick="act.saveRating('${sessionId}')">ENVOYER MA NOTE</button>`);
  },
  pickStar(sessionId, n) {
    act._rateTmp.comment = ($('#rate-comment') && $('#rate-comment').value) || '';
    act._rateTmp.stars = n;
    act._rateRender(sessionId);
  },
  saveRating(sessionId) {
    const t = act._rateTmp;
    if (!t.stars) { toast("Choisis d'abord un nombre d'étoiles ⭐"); return; }
    state.ratings[sessionId] = { stars: t.stars, comment: (($('#rate-comment') && $('#rate-comment').value) || '').trim() };
    save();
    act.closeSheet();
    toast(`Merci pour ta note ${'★'.repeat(t.stars)} !`);
    render();
  },

  itinerary() {
    window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(BRAND.address), '_blank');
  },

  exportIcs() {
    const fut = state.reservations.filter(r => r.status === 'active')
      .map(r => SESSION_BY_ID[r.sessionId]).filter(s => s && s.date > new Date());
    if (!fut.length) { toast('Aucune séance future à exporter'); return; }
    const dt = d => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const icsEsc = t => String(t).replace(/\\/g, '\\\\').replace(/[,;]/g, m => '\\' + m);
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//onyx studio//FR'];
    for (const s of fut) {
      const end = new Date(s.date.getTime() + s.type.dur * 60000);
      ics.push('BEGIN:VEVENT', `UID:${s.id}@onyx`, `DTSTART:${dt(s.date)}`, `DTEND:${dt(end)}`,
        `SUMMARY:${icsEsc(s.type.name + ' — ' + BRAND.full)}`, `LOCATION:${icsEsc(BRAND.address)}`, 'END:VEVENT');
    }
    ics.push('END:VCALENDAR');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics.join('\r\n')], { type: 'text/calendar' }));
    a.download = 'onyx-agenda.ics';
    a.click();
    toast('📅 Agenda exporté (.ics)');
  },

  /* panier */
  addCart(type, id) {
    const found = state.cart.find(i => i.type === type && i.id === id);
    if (found) found.qty++;
    else state.cart.push({ type, id, qty: 1 });
    save();
    toast('Ajouté au panier ✓');
    renderFab(route()[0]);
  },
  qty(idx, d) {
    const it = state.cart[idx];
    if (!it) return;
    it.qty += d;
    if (it.qty <= 0) state.cart.splice(idx, 1);
    save(); render();
  },
  giftDetails(id) {
    const g = GIFTCARDS.find(x => x.id === id);
    openSheet(`
      <h2>${g.label}</h2>
      <div class="sh-sub">${eur(g.price)} € · VALABLE 12 MOIS</div>
      <div class="sh-desc" style="margin-top:14px;">
        Offre un moment de mouvement : la carte-cadeau est générée avec un code unique,
        utilisable sur n'importe quel cours du studio.
      </div>
      <button class="cta-main" onclick="act.addCart('gift','${g.id}');act.closeSheet()">AJOUTER AU PANIER</button>`);
  },
  checkout() {
    if (!state.cart.length) return;
    const now = new Date();
    for (const it of state.cart) {
      const info = cartItemInfo(it);
      for (let k = 0; k < it.qty; k++) {
        state.invoices.unshift({ id: uid(), num: uid(), date: now.toISOString(), label: info.name.toUpperCase(), amount: info.price, status: 'paid' });
        if (it.type === 'pack') {
          const p = PACKS.find(x => x.id === it.id);
          state.cards.unshift({ id: uid(), label: p.label, total: p.credits, remaining: p.credits, expires: addMonths(now, p.months).toISOString() });
        } else if (it.type === 'sub') {
          const p = SUBS.find(x => x.id === it.id);
          const old = state.subs.find(s => s.status === 'active');
          if (old) old.status = 'ended';
          state.subs.unshift({ id: uid(), ref: p.id, label: p.label, price: p.price, credits: p.credits, status: 'active', nextBilling: addMonths(now, 1).toISOString() });
          state.cards.unshift({ id: uid(), label: 'ABONNEMENT ' + p.label, total: p.credits, remaining: p.credits === -1 ? -1 : p.credits, expires: addMonths(now, 3).toISOString() });
        }
      }
    }
    const gifts = state.cart.filter(i => i.type === 'gift');
    state.cart = [];
    save();
    toast('✅ Paiement effectué (démo)');
    if (gifts.length) {
      const codes = gifts.flatMap(g => Array.from({ length: g.qty }, () =>
        'ONYX-' + uid().slice(0, 4).toUpperCase() + '-' + uid().slice(0, 4).toUpperCase()));
      openSheet(`
        <h2>🎁 Tes cartes-cadeaux</h2>
        <div class="sh-sub">À OFFRIR SANS MODÉRATION</div>
        <div style="margin:16px 0;display:flex;flex-direction:column;gap:10px;">
          ${codes.map(c => `<div class="codebox">${c}</div>`).join('')}
        </div>
        <button class="cta-main" onclick="act.closeSheet()">C'EST NOTÉ</button>`);
    }
    nav('#/studio');
    render();
  },

  /* abonnements / factures */
  askCancelSub(id) {
    openSheet(`
      <h2>Résilier l'abonnement ?</h2>
      <div class="sh-desc" style="margin-top:10px;">
        Tes crédits déjà reçus restent utilisables jusqu'à leur date d'expiration.
      </div>
      <button class="cta-danger" onclick="act.cancelSub('${id}')">RÉSILIER</button>
      <button class="cta-ghost" onclick="act.closeSheet()">GARDER MON ABONNEMENT</button>`);
  },
  cancelSub(id) {
    const s = state.subs.find(x => x.id === id);
    if (s) s.status = 'cancelled';
    save(); act.closeSheet(); toast('Abonnement résilié'); render();
  },

  downloadInvoice(id) {
    const inv = state.invoices.find(i => i.id === id);
    if (!inv) return;
    const html = `<!DOCTYPE html><html lang="fr"><meta charset="utf-8"><title>Facture ${inv.num}</title>
<body style="font-family:system-ui,sans-serif;max-width:640px;margin:40px auto;color:#1a1a1a;">
<h1 style="letter-spacing:4px;">${BRAND.full}</h1>
<p>${BRAND.address}<br>${BRAND.email}</p><hr>
<h2>Facture n° ${inv.num}</h2>
<p>Date : ${fmtSlash(new Date(inv.date))}<br>Client : ${state.user.name} (${state.user.email})</p>
<table style="width:100%;border-collapse:collapse;margin-top:20px;">
<tr style="text-align:left;border-bottom:2px solid #1a1a1a;"><th style="padding:8px 0;">Désignation</th><th style="text-align:right;">Montant</th></tr>
<tr><td style="padding:12px 0;">${inv.label}</td><td style="text-align:right;">${eur(inv.amount)} €</td></tr>
<tr style="border-top:2px solid #1a1a1a;font-weight:bold;"><td style="padding:10px 0;">TOTAL</td><td style="text-align:right;">${eur(inv.amount)} €</td></tr>
</table>
<p style="color:#999;margin-top:30px;">Document de démonstration — généré en local par onyx studio.</p>
</body></html>`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
    a.download = `facture-${inv.num}.html`;
    a.click();
    toast('📄 Facture téléchargée');
  },

  /* profil & préférences */
  showQr() {
    openSheet(`
      <h2>${I('scan', 22)} Mon pass d'entrée</h2>
      <div class="sh-sub">PRÉSENTE CE CODE À L'ENTRÉE DU STUDIO</div>
      <div class="qrbox"><canvas id="qrCanvas" width="210" height="210"></canvas></div>
      <div class="membercode">${state.user.memberId}</div>
      <button class="cta-main" onclick="act.closeSheet()">FERMER</button>`);
    drawQr($('#qrCanvas'), state.user.memberId);
  },

  goalSheet() {
    const goal = state.user.weeklyGoal || 3;
    openSheet(`
      <h2>🎯 Objectif hebdo</h2>
      <div class="sh-desc" style="margin-top:8px;">Combien de séances par semaine ?</div>
      <div style="margin-top:10px;">
      ${[1, 2, 3, 4, 5].map(n => `<button class="optrow ${goal === n ? 'on' : ''}" onclick="act.setGoal(${n})">
        <span>${plural(n, 'séance')} / semaine</span>${goal === n ? I('check', 20) : ''}</button>`).join('')}
      </div>`);
  },
  setGoal(n) {
    state.user.weeklyGoal = n;
    save(); act.closeSheet(); toast(`Objectif : ${plural(n, 'séance')}/semaine 🎯`); render();
  },

  setTheme(t) {
    state.user.theme = t;
    save(); applyTheme(); render();
    toast(`Couleur « ${THEMES[t].name} » appliquée 🎨`);
  },

  editProfile() {
    const u = state.user;
    const f = (id, label, val, type = 'text') => `
      <div class="formfield"><label>${label}</label><input id="${id}" type="${type}" value="${(val || '').replace(/"/g, '&quot;')}"></div>`;
    openSheet(`
      <h2>Modifier mon profil</h2>
      <div class="sh-desc" style="margin-top:6px;">L'email ne peut pas être changé (c'est ton identifiant).</div>
      ${f('ep-name', 'PRÉNOM / NOM', u.name)}
      ${f('ep-phone', 'TÉLÉPHONE', u.phone)}
      ${f('ep-address', 'ADRESSE', u.address)}
      ${f('ep-emergency', 'CONTACT D’URGENCE', u.emergency)}
      <button class="cta-main" onclick="act.saveProfile()">ENREGISTRER</button>`);
  },
  saveProfile() {
    const u = state.user;
    u.name = $('#ep-name').value.trim() || u.name;
    u.phone = $('#ep-phone').value.trim();
    u.address = $('#ep-address').value.trim();
    u.emergency = $('#ep-emergency').value.trim();
    save(); act.closeSheet(); toast('Profil mis à jour ✓'); render();
  },

  askLogout() {
    openSheet(`
      <h2>Se déconnecter ?</h2>
      <div class="sh-desc" style="margin-top:8px;">Ton compte et tes données restent enregistrés sur ce PC — tu pourras te reconnecter.</div>
      <button class="cta-danger" onclick="act.logout()">SE DÉCONNECTER</button>
      <button class="cta-ghost" onclick="act.closeSheet()">ANNULER</button>`);
  },
  logout() {
    save();
    SESSION = null;
    persistAccounts();
    state = defaultState();
    act.closeSheet();
    nav('#/home'); render();
    toast('À bientôt 👋');
  },

  /* auth */
  login() {
    const email = ($('#li-email').value || '').trim().toLowerCase();
    const pass = $('#li-pass').value || '';
    if (!email || !pass) { authError('Remplis ton email et ton mot de passe.'); return; }
    const acc = ACCOUNTS[email];
    if (!acc) { authError('Aucun compte avec cet email — crée-en un !'); return; }
    if (acc.passHash !== passHash(email, pass)) { authError('Mot de passe incorrect.'); return; }
    SESSION = email;
    state = hydrate(acc);
    persistAccounts();
    nav(state.user.role === 'admin' ? '#/admin' : '#/home'); render();
    toast(`Bienvenue ${state.user.name.split(' ')[0]} 👋`);
  },

  signup() {
    const name = ($('#su-name').value || '').trim();
    const email = ($('#su-email').value || '').trim().toLowerCase();
    const pass = $('#su-pass').value || '';
    const pass2 = $('#su-pass2').value || '';
    if (name.length < 2) { authError('Ton prénom doit faire au moins 2 caractères.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { authError("Cet email n'a pas l'air valide."); return; }
    if (ACCOUNTS[email]) { authError('Un compte existe déjà avec cet email.'); return; }
    if (pass.length < 6) { authError('Mot de passe : 6 caractères minimum.'); return; }
    if (pass !== pass2) { authError('Les deux mots de passe ne correspondent pas.'); return; }

    // parrainage (optionnel)
    const refCode = (($('#su-ref') && $('#su-ref').value) || '').trim().toUpperCase();
    let sponsor = null;
    if (refCode) {
      sponsor = Object.values(ACCOUNTS).find(a => a.memberId === refCode && a.email !== email && a.role !== 'admin');
      if (!sponsor) { authError('Code de parrainage inconnu.'); return; }
    }

    const data = emptyData();
    data.cards.push({ id: uid(), label: 'CADEAU DE BIENVENUE 🎁', total: 2, remaining: 2, expires: addMonths(new Date(), 2).toISOString() });
    data.notifs.push({ id: 'welcome', read: false, ts: Date.now(), emoji: '🖤', title: `Bienvenue chez ${BRAND.name} !`, body: '2 crédits offerts t\'attendent — réserve ta première séance.' });
    if (sponsor) {
      data.cards.push({ id: uid(), label: 'PARRAINAGE 🤝', total: 1, remaining: 1, expires: addMonths(new Date(), 2).toISOString() });
      sponsor.data.cards.unshift({ id: uid(), label: 'PARRAINAGE 🤝', total: 1, remaining: 1, expires: addMonths(new Date(), 2).toISOString() });
      sponsor.data.notifs = sponsor.data.notifs || [];
      sponsor.data.notifs.unshift({ id: 'ref_' + uid(), read: false, ts: Date.now(), emoji: '🤝', title: 'Parrainage réussi !', body: `${name} s'est inscrit·e avec ton code — +1 crédit offert !` });
    }
    ACCOUNTS[email] = makeAccount(name, email, pass, data);
    SESSION = email;
    state = hydrate(ACCOUNTS[email]);
    persistAccounts();
    nav('#/home'); render();
    confetti();
    openSheet(`
      <h2>🎉 Bienvenue ${name} !</h2>
      <div class="sh-sub">TON COMPTE EST PRÊT</div>
      <div class="good" style="margin-top:16px;">🎁 ${sponsor ? '3 crédits offerts (2 de bienvenue + 1 de parrainage 🤝)' : '2 crédits offerts pour tester tes premiers cours'} — valables 2 mois.</div>
      <div class="sh-desc" style="margin-top:12px;">Explore le planning, réserve ta première séance, et personnalise la couleur de l'app dans ton profil.</div>
      <button class="cta-main" onclick="act.closeSheet()">C'EST PARTI</button>`);
  },

  /* ===== PWA ===== */
  installApp() {
    if (PWA_PROMPT) { PWA_PROMPT.prompt(); PWA_PROMPT = null; render(); }
    else toast("Installation indisponible ici — utilise le menu du navigateur");
  },

  /* ===== Espace gérant ===== */
  adminDaySel(d) { ADMIN_DAY = d; render(); },

  adminCourseSheet(id) {
    const t = id ? CLASS_TYPES.find(x => x.id === id) : null;
    const f = (fid, label, val, type = 'text') => `
      <div class="formfield"><label>${label}</label><input id="${fid}" type="${type}" value="${String(val ?? '').replace(/"/g, '&quot;')}"></div>`;
    openSheet(`
      <h2>${t ? 'Modifier « ' + esc(t.name) + ' »' : 'Nouveau cours'}</h2>
      ${f('ac-name', 'NOM DU COURS', t ? t.name : '')}
      ${f('ac-emoji', 'EMOJI', t ? t.emoji : '💪')}
      <div class="formfield"><label>STUDIO</label>
        <select id="ac-studio">
          <option value="MAT" ${t && t.studio === 'MAT' ? 'selected' : ''}>STUDIO MAT (1 crédit conseillé)</option>
          <option value="REFORMER" ${t && t.studio === 'REFORMER' ? 'selected' : ''}>STUDIO REFORMER (2 crédits conseillés)</option>
        </select></div>
      ${f('ac-dur', 'DURÉE (MINUTES)', t ? t.dur : 60, 'number')}
      ${f('ac-credits', 'PRIX EN CRÉDITS', t ? t.credits : 1, 'number')}
      ${f('ac-desc', 'DESCRIPTION', t ? t.desc : '')}
      ${f('ac-img', 'PHOTO (URL, optionnel)', t ? t.img : '')}
      <button class="cta-main" onclick="act.adminSaveCourse('${id || ''}')">ENREGISTRER</button>`);
  },
  adminSaveCourse(id) {
    const name = $('#ac-name').value.trim().toUpperCase();
    if (name.length < 2) { toast('Donne un nom au cours !'); return; }
    const vals = {
      name,
      emoji: $('#ac-emoji').value.trim() || '💪',
      studio: $('#ac-studio').value,
      dur: Math.max(15, parseInt($('#ac-dur').value) || 60),
      credits: Math.min(5, Math.max(1, parseInt($('#ac-credits').value) || 1)),
      desc: $('#ac-desc').value.trim(),
      img: $('#ac-img').value.trim(),
    };
    if (id) Object.assign(CLASS_TYPES.find(x => x.id === id), vals);
    else CLASS_TYPES.push(Object.assign({ id: 'c' + uid().slice(0, 6) }, vals));
    persistConfig(); act.closeSheet(); toast('Cours enregistré ✓'); render();
  },
  adminAskDelCourse(id) {
    const t = CLASS_TYPES.find(x => x.id === id);
    const used = Object.values(WEEK_TEMPLATE).flat().filter(s => s.type === id).length;
    openSheet(`
      <h2>Supprimer « ${esc(t.name)} » ?</h2>
      <div class="sh-desc" style="margin-top:8px;">${used ? `Ce cours a ${plural(used, 'créneau').replace('créneaus', 'créneaux')} au planning — ils seront supprimés aussi.` : 'Ce cours n\'a aucun créneau au planning.'}</div>
      <button class="cta-danger" onclick="act.adminDelCourse('${id}')">SUPPRIMER</button>
      <button class="cta-ghost" onclick="act.closeSheet()">ANNULER</button>`);
  },
  adminDelCourse(id) {
    CLASS_TYPES = CLASS_TYPES.filter(x => x.id !== id);
    for (const d of Object.keys(WEEK_TEMPLATE)) WEEK_TEMPLATE[d] = WEEK_TEMPLATE[d].filter(s => s.type !== id);
    persistConfig(); act.closeSheet(); toast('Cours supprimé'); render();
  },

  adminSlotSheet() {
    openSheet(`
      <h2>Nouveau créneau — ${DAYS[ADMIN_DAY]}</h2>
      <div class="formfield"><label>HEURE</label><input id="as-time" type="time" value="18:30"></div>
      <div class="formfield"><label>COURS</label>
        <select id="as-type">${CLASS_TYPES.map(t => `<option value="${t.id}">${esc(t.name)} ${t.emoji}</option>`).join('')}</select></div>
      <div class="formfield"><label>PROF</label>
        <select id="as-teacher">${TEACHERS.map(t => `<option>${t}</option>`).join('')}</select></div>
      <button class="cta-main" onclick="act.adminAddSlot()">AJOUTER</button>`);
  },
  adminAddSlot() {
    const time = $('#as-time').value;
    if (!time) { toast('Choisis une heure'); return; }
    if (!WEEK_TEMPLATE[ADMIN_DAY]) WEEK_TEMPLATE[ADMIN_DAY] = [];
    WEEK_TEMPLATE[ADMIN_DAY].push({ time, type: $('#as-type').value, teacher: $('#as-teacher').value });
    WEEK_TEMPLATE[ADMIN_DAY].sort((a, b) => a.time.localeCompare(b.time));
    persistConfig(); act.closeSheet(); toast('Créneau ajouté ✓'); render();
  },
  adminDelSlot(idx) {
    (WEEK_TEMPLATE[ADMIN_DAY] || []).splice(idx, 1);
    persistConfig(); toast('Créneau supprimé'); render();
  },
  adminCopyDaySheet() {
    const n = (WEEK_TEMPLATE[ADMIN_DAY] || []).length;
    openSheet(`
      <h2>📋 Copier le ${DAYS[ADMIN_DAY]} (${plural(n, 'cours')})</h2>
      <div class="sh-desc" style="margin-top:6px;">Le jour choisi sera <b>remplacé</b> par une copie de ce planning.</div>
      <div style="margin-top:8px;">
      ${[1, 2, 3, 4, 5, 6, 0].filter(d => d !== ADMIN_DAY).map(d => `
      <button class="optrow" onclick="act.adminCopyDay(${d})">
        <span>${DAYS[d]} <small style="color:var(--muted)">(${plural((WEEK_TEMPLATE[d] || []).length, 'cours')} actuellement)</small></span>${I('chevR', 18)}
      </button>`).join('')}
      </div>`);
  },
  adminCopyDay(target) {
    WEEK_TEMPLATE[target] = JSON.parse(JSON.stringify(WEEK_TEMPLATE[ADMIN_DAY] || []));
    persistConfig();
    act.closeSheet();
    toast(`${DAYS[ADMIN_DAY]} copié vers ${DAYS[target]} ✓`);
    ADMIN_DAY = target;
    render();
  },

  adminPackSheet(id) {
    const p = id ? PACKS.find(x => x.id === id) : null;
    openSheet(`
      <h2>${p ? 'Modifier le pack' : 'Nouveau pack'}</h2>
      <div class="formfield"><label>PRIX (€)</label><input id="ap-price" type="number" value="${p ? p.price : 50}"></div>
      <div class="formfield"><label>CRÉDITS</label><input id="ap-credits" type="number" value="${p ? p.credits : 3}"></div>
      <div class="formfield"><label>VALIDITÉ (MOIS)</label><input id="ap-months" type="number" value="${p ? p.months : 3}"></div>
      <div class="formfield"><label>LIBELLÉ</label><input id="ap-label" value="${p ? p.label.replace(/"/g, '&quot;') : ''}" placeholder="ex : 3 CRÉDITS MAT + REFORMER"></div>
      <button class="cta-main" onclick="act.adminSavePack('${id || ''}')">ENREGISTRER</button>`);
  },
  adminSavePack(id) {
    const credits = Math.max(1, parseInt($('#ap-credits').value) || 1);
    const vals = {
      price: Math.max(0, parseFloat($('#ap-price').value) || 0),
      credits,
      months: Math.max(1, parseInt($('#ap-months').value) || 1),
      label: $('#ap-label').value.trim().toUpperCase() || `${credits} CRÉDITS MAT + REFORMER`,
    };
    if (id) Object.assign(PACKS.find(x => x.id === id), vals);
    else PACKS.push(Object.assign({ id: 'p' + uid().slice(0, 5) }, vals));
    PACKS.sort((a, b) => a.credits - b.credits);
    persistConfig(); act.closeSheet(); toast('Pack enregistré ✓'); render();
  },
  adminAskDelPack(id) {
    const p = PACKS.find(x => x.id === id);
    openSheet(`
      <h2>Supprimer le pack ${eur(p.price)} € ?</h2>
      <button class="cta-danger" onclick="act.adminDelPack('${id}')">SUPPRIMER</button>
      <button class="cta-ghost" onclick="act.closeSheet()">ANNULER</button>`);
  },
  adminDelPack(id) {
    PACKS = PACKS.filter(x => x.id !== id);
    persistConfig(); act.closeSheet(); toast('Pack supprimé'); render();
  },

  adminSubSheet(id) {
    const p = SUBS.find(x => x.id === id);
    openSheet(`
      <h2>Modifier l'abonnement</h2>
      <div class="sh-sub">${p.label}</div>
      <div class="formfield"><label>PRIX PAR MOIS (€)</label><input id="asu-price" type="number" value="${p.price}"></div>
      <div class="formfield"><label>CRÉDITS / MOIS (-1 = illimité)</label><input id="asu-credits" type="number" value="${p.credits}"></div>
      <button class="cta-main" onclick="act.adminSaveSub('${id}')">ENREGISTRER</button>`);
  },
  adminSaveSub(id) {
    const p = SUBS.find(x => x.id === id);
    p.price = Math.max(0, parseFloat($('#asu-price').value) || 0);
    const c = parseInt($('#asu-credits').value);
    p.credits = (c === -1) ? -1 : Math.max(1, c || 1);
    p.label = p.credits === -1 ? 'ILLIMITÉ' : `${p.credits} CRÉDITS/MOIS`;
    persistConfig(); act.closeSheet(); toast('Abonnement modifié ✓'); render();
  },

  adminTeacherSheet() {
    openSheet(`
      <h2>Nouveau·elle prof</h2>
      <div class="formfield"><label>PRÉNOM</label><input id="at-name" placeholder="ex : Jade"></div>
      <button class="cta-main" onclick="act.adminAddTeacher()">AJOUTER</button>`);
  },
  adminAddTeacher() {
    const n = $('#at-name').value.trim();
    if (n.length < 2) { toast('Donne un prénom !'); return; }
    if (TEACHERS.includes(n)) { toast('Ce prénom existe déjà'); return; }
    TEACHERS.push(n);
    persistConfig(); act.closeSheet(); toast(`${n} rejoint l'équipe 🎉`); render();
  },
  adminDelTeacher(name) {
    const used = Object.values(WEEK_TEMPLATE).flat().some(s => s.teacher === name);
    if (used) { toast(`${name} a des cours au planning — retire-les d'abord`); return; }
    TEACHERS = TEACHERS.filter(t => t !== name);
    persistConfig(); toast(`${name} retiré·e de l'équipe`); render();
  },

  adminBrandSheet() {
    openSheet(`
      <h2>Marque & infos du studio</h2>
      <div class="formfield"><label>NOM (COURT, MINUSCULES)</label><input id="ab-name" value="${BRAND.name}"></div>
      <div class="formfield"><label>SLOGAN</label><input id="ab-tag" value="${BRAND.tagline.replace(/"/g, '&quot;')}"></div>
      <div class="formfield"><label>ADRESSE</label><input id="ab-address" value="${BRAND.address.replace(/"/g, '&quot;')}"></div>
      <button class="cta-main" onclick="act.adminSaveBrand()">ENREGISTRER</button>`);
  },
  adminSaveBrand() {
    const n = $('#ab-name').value.trim().toLowerCase();
    if (n.length < 2) { toast('Le nom est trop court'); return; }
    BRAND.name = n;
    BRAND.full = n.toUpperCase() + ' STUDIO';
    BRAND.tagline = $('#ab-tag').value.trim() || BRAND.tagline;
    BRAND.address = $('#ab-address').value.trim() || BRAND.address;
    persistConfig(); act.closeSheet(); toast(`Le studio s'appelle « ${n} » ✨`); render();
  },

  /* membres */
  adminGiftSheet(email) {
    const a = ACCOUNTS[email];
    openSheet(`
      <h2>🎁 Offrir des crédits</h2>
      <div class="sh-sub">À ${esc(a.name.toUpperCase())} (${a.memberId})</div>
      <div class="formfield"><label>NOMBRE DE CRÉDITS</label><input id="ag-amount" type="number" value="1" min="1" max="20"></div>
      <div class="formfield"><label>PETIT MESSAGE (OPTIONNEL)</label><input id="ag-msg" placeholder="ex : merci pour ta fidélité !"></div>
      <button class="cta-main" onclick="act.adminGift('${arg(email)}')">OFFRIR</button>`);
  },
  adminGift(email) {
    const a = ACCOUNTS[email];
    const amount = Math.min(20, Math.max(1, parseInt($('#ag-amount').value) || 1));
    const msg = $('#ag-msg').value.trim();
    a.data.cards.unshift({ id: uid(), label: 'CADEAU DU STUDIO 🎁', total: amount, remaining: amount, expires: addMonths(new Date(), 3).toISOString() });
    a.data.notifs = a.data.notifs || [];
    a.data.notifs.unshift({ id: 'gift_' + uid(), read: false, ts: Date.now(), emoji: '🎁', title: `${BRAND.name} t'offre ${plural(amount, 'crédit')} !`, body: msg || 'Un petit cadeau du studio — fais-toi plaisir.' });
    persistAccounts();
    act.closeSheet();
    toast(`${plural(amount, 'crédit')} offert${amount > 1 ? 's' : ''} à ${a.name} 🎁`);
    render();
  },
  adminAskDelMember(email) {
    const a = ACCOUNTS[email];
    openSheet(`
      <h2>Supprimer le compte de ${esc(a.name)} ?</h2>
      <div class="sh-desc" style="margin-top:8px;">Toutes ses données (crédits, réservations, factures) seront définitivement supprimées de ce PC.</div>
      <button class="cta-danger" onclick="act.adminDelMember('${arg(email)}')">SUPPRIMER LE COMPTE</button>
      <button class="cta-ghost" onclick="act.closeSheet()">ANNULER</button>`);
  },
  adminDelMember(email) {
    delete ACCOUNTS[email];
    persistAccounts();
    act.closeSheet();
    toast('Compte supprimé');
    render();
  },

  /* annonces */
  adminAnnounceSheet() {
    openSheet(`
      <h2>📣 Publier une annonce</h2>
      <div class="sh-desc" style="margin-top:6px;">Tous les membres la reçoivent en notification + bannière sur leur accueil.</div>
      <div class="formfield"><label>TITRE</label><input id="an-title" placeholder="ex : Nouveau cours le samedi !"></div>
      <div class="formfield"><label>MESSAGE</label><input id="an-body" placeholder="ex : Le YIN YOGA arrive tous les samedis à 11h 🌙"></div>
      <button class="cta-main" onclick="act.adminPublish()">PUBLIER</button>`);
  },
  adminPublish() {
    const title = $('#an-title').value.trim();
    const body = $('#an-body').value.trim();
    if (title.length < 3) { toast('Donne un titre à ton annonce'); return; }
    ANNONCES.unshift({ id: uid(), ts: Date.now(), title, body });
    ANNONCES = ANNONCES.slice(0, 5);
    persistConfig();
    act.closeSheet();
    toast('Annonce publiée 📣');
    render();
  },

  /* produits du shop */
  adminProductSheet(id) {
    const p = id ? PRODUCTS.find(x => x.id === id) : null;
    const f = (fid, label, val, type = 'text') => `
      <div class="formfield"><label>${label}</label><input id="${fid}" type="${type}" value="${String(val ?? '').replace(/"/g, '&quot;')}"></div>`;
    openSheet(`
      <h2>${p ? 'Modifier « ' + esc(p.name) + ' »' : 'Nouveau produit'}</h2>
      ${f('apr-name', 'NOM', p ? p.name : '')}
      ${f('apr-sub', 'SOUS-TITRE', p ? p.sub : '')}
      ${f('apr-price', 'PRIX (€)', p ? p.price : 15, 'number')}
      ${f('apr-desc', 'DESCRIPTION', p ? p.desc : '')}
      ${f('apr-img', 'PHOTO (URL, optionnel)', p ? p.img : '')}
      <button class="cta-main" onclick="act.adminSaveProduct('${id || ''}')">ENREGISTRER</button>`);
  },
  adminSaveProduct(id) {
    const name = $('#apr-name').value.trim();
    if (name.length < 2) { toast('Donne un nom au produit !'); return; }
    const vals = {
      name,
      sub: $('#apr-sub').value.trim(),
      price: Math.max(0, parseFloat($('#apr-price').value) || 0),
      desc: $('#apr-desc').value.trim(),
      img: $('#apr-img').value.trim(),
    };
    if (id) Object.assign(PRODUCTS.find(x => x.id === id), vals);
    else PRODUCTS.push(Object.assign({ id: 'pr' + uid().slice(0, 5) }, vals));
    persistConfig(); act.closeSheet(); toast('Produit enregistré ✓'); render();
  },
  adminAskDelProduct(id) {
    const p = PRODUCTS.find(x => x.id === id);
    openSheet(`
      <h2>Supprimer « ${esc(p.name)} » ?</h2>
      <button class="cta-danger" onclick="act.adminDelProduct('${id}')">SUPPRIMER</button>
      <button class="cta-ghost" onclick="act.closeSheet()">ANNULER</button>`);
  },
  adminDelProduct(id) {
    PRODUCTS = PRODUCTS.filter(x => x.id !== id);
    persistConfig(); act.closeSheet(); toast('Produit supprimé'); render();
  },

  /* détail d'un créneau : qui est inscrit */
  adminSlotDetail(sid) {
    const s = SESSION_BY_ID[sid];
    const names = bookingsFor(sid);
    openSheet(`
      <h2>${s ? s.type.name + ' ' + s.type.emoji : 'Créneau'}</h2>
      <div class="sh-sub">${s ? fmtPill(s.date).toUpperCase() + ' · ' + s.teacher.toUpperCase() : ''}</div>
      <div class="overline" style="margin-top:16px">${plural(names.length, 'inscrit·e')}</div>
      <div style="margin-top:6px;">
        ${names.length ? names.map(n => `
        <div class="optrow" style="cursor:default"><span>👤 ${esc(n)}</span></div>`).join('')
        : `<div class="sh-desc">Personne pour l'instant — ça va se remplir !</div>`}
      </div>
      <button class="cta-main" onclick="act.closeSheet()">FERMER</button>`);
  },

  /* sauvegarde / restauration */
  adminBackup() {
    const payload = {
      app: 'onyx-studio', exported: new Date().toISOString(),
      accounts: ACCOUNTS,
      config: JSON.parse(localStorage.getItem(C_KEY) || 'null'),
    };
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
    const d = new Date();
    a.download = `sauvegarde-${BRAND.name}-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}.json`;
    a.click();
    toast('💾 Sauvegarde téléchargée');
  },
  adminRestoreSheet() {
    openSheet(`
      <h2>📥 Restaurer une sauvegarde</h2>
      <div class="sh-desc" style="margin-top:8px;">Choisis un fichier <b>.json</b> exporté depuis « Sauvegarde complète ». Les données actuelles seront remplacées.</div>
      <div class="formfield"><label>FICHIER</label><input id="restoreFile" type="file" accept=".json"></div>
      <button class="cta-main" onclick="act.adminRestore()">RESTAURER</button>
      <button class="cta-ghost" onclick="act.closeSheet()">ANNULER</button>`);
  },
  adminRestore() {
    const file = $('#restoreFile') && $('#restoreFile').files[0];
    if (!file) { toast('Choisis un fichier .json'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data.accounts || data.app !== 'onyx-studio') { toast('Fichier invalide'); return; }
        localStorage.setItem(A_KEY, JSON.stringify(data.accounts));
        if (data.config) localStorage.setItem(C_KEY, JSON.stringify(data.config));
        else localStorage.removeItem(C_KEY);
        toast('Restauration OK — rechargement…');
        setTimeout(() => location.reload(), 700);
      } catch { toast('Fichier illisible'); }
    };
    reader.readAsText(file);
  },

  adminAskReset() {
    openSheet(`
      <h2>Réinitialiser la config ?</h2>
      <div class="sh-desc" style="margin-top:8px;">Cours, planning, tarifs, profs et marque reviennent aux valeurs d'origine. Les comptes et réservations sont conservés.</div>
      <button class="cta-danger" onclick="act.adminReset()">RÉINITIALISER</button>
      <button class="cta-ghost" onclick="act.closeSheet()">ANNULER</button>`);
  },
  adminReset() {
    localStorage.removeItem(C_KEY);
    location.reload();
  },
};

/* ---------------- Pseudo QR (visuel) ---------------- */
function drawQr(canvas, seedStr) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const N = 25, m = 8, padx = 5;
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0D0D10';
  let seed = hash(seedStr);
  const rnd = () => { seed = (seed * 1103515245 + 12345) >>> 0; return seed / 4294967296; };
  const finder = (x, y) => {
    ctx.fillRect(x * m + padx, y * m + padx, 7 * m, 7 * m);
    ctx.fillStyle = '#fff'; ctx.fillRect((x + 1) * m + padx, (y + 1) * m + padx, 5 * m, 5 * m);
    ctx.fillStyle = '#0D0D10'; ctx.fillRect((x + 2) * m + padx, (y + 2) * m + padx, 3 * m, 3 * m);
  };
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const inFinder = (x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9);
    if (!inFinder && rnd() > 0.52) ctx.fillRect(x * m + padx, y * m + padx, m - 1, m - 1);
  }
  finder(0, 0); finder(N - 7, 0); finder(0, N - 7);
}

/* ---------------- Init ---------------- */
window.act = act;
window.nav = nav;
window.addEventListener('hashchange', render);

// PWA : service worker (hors-ligne) + invitation à installer
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => { /* pas bloquant */ });
}
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  PWA_PROMPT = e;
  if (route()[0] === 'profil') render();
});

if (!location.hash) location.hash = '#/home';
render();
