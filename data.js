// ===================== ONYX STUDIO — Données =====================
// Marque, cours, planning hebdo, offres boutique. Tout est local (démo).

// NOTE : déclarés avec `let` pour pouvoir être personnalisés depuis l'Espace gérant
let BRAND = {
  name: 'onyx',
  full: 'ONYX STUDIO',
  tagline: 'Pilates · Yoga · Mouvement',
  address: '6 Quai Georges Simenon, 17000 La Rochelle, France',
  phone: '+33 5 46 00 00 00',
  email: 'hello@onyx-studio.fr',
};

const STUDIOS = {
  MAT:      { id: 'MAT',      label: 'STUDIO MAT' },
  REFORMER: { id: 'REFORMER', label: 'STUDIO REFORMER' },
};

let TEACHERS = ['Nina', 'Salomé', 'Inès', 'Camille', 'Louane'];

// Bios des profs (fallback auto pour les profs ajoutés par le gérant)
const TEACHER_INFO = {
  Nina:    { spe: 'Reformer · Force',        bio: "Formée à Londres, Nina est la reine du Reformer : précise, exigeante et toujours à l'écoute. Avec elle, chaque centimètre de mouvement compte." },
  Salomé:  { spe: 'Vinyasa · Ashtanga',      bio: "Salomé enseigne le yoga comme on raconte une histoire : un souffle, un mouvement. Ses flows sont créatifs, solaires et accessibles à tous." },
  Inès:    { spe: 'Power Pilates · Cardio',  bio: "Inès aime quand ça chauffe. Son truc : te pousser 10% plus loin que ce que tu pensais possible, avec le sourire (elle, pas toi)." },
  Camille: { spe: 'Pilates tradi · Posture', bio: "Kiné de formation, Camille est obsédée par l'alignement. Ses cours reconstruisent ta posture séance après séance." },
  Louane:  { spe: 'Yin · Souplesse',         bio: "Louane, c'est la pause que ton corps réclame : étirements profonds, respiration, et ce calme qu'on ne trouve nulle part ailleurs." },
};

// Types de cours (le prix est en crédits)
let CLASS_TYPES = [
  { id: 'reformer-flow',       name: 'REFORMER FLOW',       emoji: '⚡', studio: 'REFORMER', dur: 50, credits: 2,
    img: 'https://images.pexels.com/photos/6111616/pexels-photo-6111616.jpeg?auto=compress&cs=tinysrgb&w=900',
    desc: 'Un enchaînement fluide et dynamique sur Reformer pour renforcer tout le corps en profondeur.' },
  { id: 'reformer-deep-core',  name: 'REFORMER DEEP CORE',  emoji: '🍫', studio: 'REFORMER', dur: 50, credits: 2,
    img: 'https://images.pexels.com/photos/6111690/pexels-photo-6111690.jpeg?auto=compress&cs=tinysrgb&w=900',
    desc: 'Le cours signature abdos : un travail intense et précis du centre, sur Reformer.' },
  { id: 'reformer-essentials', name: 'REFORMER ESSENTIALS', emoji: '✨', studio: 'REFORMER', dur: 50, credits: 2,
    img: 'https://images.pexels.com/photos/6453396/pexels-photo-6453396.jpeg?auto=compress&cs=tinysrgb&w=900',
    desc: 'Les fondamentaux du Reformer, idéal pour débuter en toute confiance.' },
  { id: 'power-pilates',       name: 'POWER PILATES',       emoji: '🌶️', studio: 'MAT', dur: 60, credits: 1,
    img: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=900',
    desc: 'Un Pilates tapis rythmé qui monte en température. Ça pique (un peu).' },
  { id: 'vinyasa-flow',        name: 'VINYASA FLOW',        emoji: '🌈', studio: 'MAT', dur: 60, credits: 1,
    img: 'https://images.pexels.com/photos/3823086/pexels-photo-3823086.jpeg?auto=compress&cs=tinysrgb&w=900',
    desc: 'Un yoga dynamique où le souffle guide le mouvement. Fluide, créatif, libérateur.' },
  { id: 'yoga-ashtanga',       name: 'YOGA ASHTANGA',       emoji: '🤸', studio: 'MAT', dur: 60, credits: 1,
    img: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=900',
    desc: 'La série traditionnelle : exigeante, structurée, transformatrice.' },
  { id: 'souplesse',           name: '100% SOUPLESSE',      emoji: '🧘', studio: 'MAT', dur: 60, credits: 1,
    img: 'https://images.pexels.com/photos/3823495/pexels-photo-3823495.jpeg?auto=compress&cs=tinysrgb&w=900',
    desc: 'Étirements profonds et mobilité : gagne en amplitude séance après séance.' },
  { id: 'abs-butt',            name: 'ABS & BUTT',          emoji: '🍑', studio: 'MAT', dur: 60, credits: 1,
    img: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=900',
    desc: 'Le combo abdos-fessiers qui sculpte. Simple, efficace, redoutable.' },
  { id: 'pilates-tradi',       name: 'PILATES TRADI',       emoji: '💙', studio: 'MAT', dur: 60, credits: 1,
    img: 'https://images.pexels.com/photos/917653/pexels-photo-917653.jpeg?auto=compress&cs=tinysrgb&w=900',
    desc: 'La méthode originale de Joseph Pilates, dans les règles de l\'art.' },
  { id: 'yin-yoga',            name: 'YIN YOGA',            emoji: '🌙', studio: 'MAT', dur: 60, credits: 1,
    img: 'https://images.pexels.com/photos/4327024/pexels-photo-4327024.jpeg?auto=compress&cs=tinysrgb&w=900',
    desc: 'Postures longues et douces pour relâcher les tensions. Le cours cocon.' },
];

// Planning hebdomadaire : 0 = dimanche … 6 = samedi
let WEEK_TEMPLATE = {
  1: [ // lundi
    { time: '09:00', type: 'reformer-flow',       teacher: 'Nina' },
    { time: '10:15', type: 'pilates-tradi',       teacher: 'Camille' },
    { time: '12:15', type: 'vinyasa-flow',        teacher: 'Salomé' },
    { time: '18:30', type: 'power-pilates',       teacher: 'Inès' },
    { time: '19:30', type: 'reformer-essentials', teacher: 'Nina' },
  ],
  2: [ // mardi
    { time: '09:00', type: 'abs-butt',            teacher: 'Camille' },
    { time: '11:30', type: 'reformer-flow',       teacher: 'Nina' },
    { time: '12:30', type: 'reformer-deep-core',  teacher: 'Nina' },
    { time: '18:30', type: 'yoga-ashtanga',       teacher: 'Salomé' },
    { time: '20:00', type: 'yin-yoga',            teacher: 'Louane' },
  ],
  3: [ // mercredi
    { time: '09:15', type: 'reformer-flow',       teacher: 'Inès' },
    { time: '12:15', type: 'pilates-tradi',       teacher: 'Camille' },
    { time: '18:30', type: 'souplesse',           teacher: 'Louane' },
    { time: '19:30', type: 'yoga-ashtanga',       teacher: 'Salomé' },
  ],
  4: [ // jeudi
    { time: '11:30', type: 'reformer-flow',       teacher: 'Nina' },
    { time: '12:15', type: 'vinyasa-flow',        teacher: 'Camille' },
    { time: '12:30', type: 'reformer-deep-core',  teacher: 'Nina' },
    { time: '18:30', type: 'power-pilates',       teacher: 'Inès' },
    { time: '18:30', type: 'reformer-essentials', teacher: 'Nina' },
    { time: '20:00', type: 'reformer-flow',       teacher: 'Inès' },
  ],
  5: [ // vendredi
    { time: '09:00', type: 'abs-butt',            teacher: 'Camille' },
    { time: '09:00', type: 'reformer-flow',       teacher: 'Nina' },
    { time: '10:15', type: 'pilates-tradi',       teacher: 'Camille' },
    { time: '12:30', type: 'reformer-deep-core',  teacher: 'Inès' },
    { time: '18:00', type: 'vinyasa-flow',        teacher: 'Salomé' },
  ],
  6: [ // samedi
    { time: '09:30', type: 'reformer-flow',       teacher: 'Nina' },
    { time: '10:00', type: 'yoga-ashtanga',       teacher: 'Salomé' },
    { time: '11:00', type: 'souplesse',           teacher: 'Louane' },
    { time: '11:30', type: 'reformer-essentials', teacher: 'Inès' },
  ],
  0: [ // dimanche
    { time: '10:00', type: 'yin-yoga',            teacher: 'Louane' },
    { time: '10:30', type: 'reformer-flow',       teacher: 'Nina' },
  ],
};

// Cartes de cours (packs de crédits)
let PACKS = [
  { id: 'p1',  price: 20,  credits: 1,  months: 1,  label: '1 COURS MAT' },
  { id: 'p2',  price: 30,  credits: 2,  months: 1,  label: '1 COURS REFORMER' },
  { id: 'p5',  price: 85,  credits: 5,  months: 3,  label: '5 CRÉDITS MAT + REFORMER' },
  { id: 'p10', price: 160, credits: 10, months: 4,  label: '10 CRÉDITS MAT + REFORMER' },
  { id: 'p15', price: 220, credits: 15, months: 8,  label: '15 CRÉDITS MAT + REFORMER' },
  { id: 'p20', price: 285, credits: 20, months: 10, label: '20 CRÉDITS MAT + REFORMER' },
  { id: 'p30', price: 410, credits: 30, months: 12, label: '30 CRÉDITS MAT + REFORMER' },
];

// Abonnements mensuels
let SUBS = [
  { id: 's4',   price: 59,  credits: 4,  label: '4 CRÉDITS/MOIS' },
  { id: 's8',   price: 99,  credits: 8,  label: '8 CRÉDITS/MOIS' },
  { id: 's12',  price: 139, credits: 12, label: '12 CRÉDITS/MOIS' },
  { id: 's16',  price: 179, credits: 16, label: '16 CRÉDITS/MOIS' },
  { id: 'sinf', price: 259, credits: -1, label: 'ILLIMITÉ' },
];

// Cartes-cadeaux
const GIFTCARDS = [
  { id: 'g1',  price: 20, label: 'CARTE CADEAU - 1 COURS SUR TAPIS',
    img: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: 'g2',  price: 30, label: 'CARTE CADEAU - 1 COURS DE REFORMER',
    img: 'https://images.pexels.com/photos/6111616/pexels-photo-6111616.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: 'g3',  price: 50, label: 'CARTE CADEAU - 3 CRÉDITS',
    img: 'https://images.pexels.com/photos/3823086/pexels-photo-3823086.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: 'g5',  price: 85, label: 'CARTE CADEAU - 5 CRÉDITS',
    img: 'https://images.pexels.com/photos/6453396/pexels-photo-6453396.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: 'g10', price: 160, label: 'CARTE CADEAU - 10 CRÉDITS',
    img: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=900' },
];

// Magasin
let PRODUCTS = [
  { id: 'socks',  price: 10, name: 'Chaussettes antidérapantes', sub: 'Obligatoires pour les cours de Reformer',
    img: 'https://images.pexels.com/photos/6111690/pexels-photo-6111690.jpeg?auto=compress&cs=tinysrgb&w=900',
    desc: 'Le port de chaussettes antidérapantes est obligatoire pour tous les cours de Pilates Reformer.\nSi tu les achètes en ligne, tu pourras les récupérer directement au studio.' },
  { id: 'bottle', price: 18, name: 'Gourde onyx 50cl', sub: 'Inox isotherme, gravée onyx',
    img: 'https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=900',
    desc: 'Notre gourde isotherme en inox brossé noir, gravée du logo onyx. Garde ton eau fraîche pendant 24h.' },
  { id: 'mat',    price: 45, name: 'Tapis onyx signature', sub: 'Antidérapant · 5mm · noir',
    img: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=900',
    desc: 'Le tapis officiel du studio : 5mm de confort, grip parfait même en sueur, et un noir profond assorti à ta motivation.' },
];
