import { Customer } from '../types';

export const CUSTOMER_PRESETS: Array<{
  name: string;
  role: string;
  avatarType: Customer['avatarType'];
  avatarColor: string;
  shirtColor: string;
  greeting: string;
  successQuote: string;
  missQuote: string;
}> = [
  {
    name: 'Bocil Ical',
    role: 'Pelanggan Ceria',
    avatarType: 'bocil1',
    avatarColor: '#f97316',
    shirtColor: '#f8fafc',
    greeting: 'Om beli tahu kotak satu om, lari-lari lapar banget!',
    successQuote: 'Asikkk! Gurih banget tahu kotaknya, mantul!',
    missQuote: 'Enak om! Renyah kriuk-kriuk!'
  },
  {
    name: 'Bocil Budi',
    role: 'Bocil Pirang',
    avatarType: 'bocil2',
    avatarColor: '#eab308',
    shirtColor: '#ffffff',
    greeting: 'Bang tahu kotaknya yang panas baru diangkat ya!',
    successQuote: 'Yummy! Beneran kotak bentuknya, renyah abis!',
    missQuote: 'Nyam nyam, sedap gurih tahunya!'
  },
  {
    name: 'Bocil Doni',
    role: 'Bocil Semangat',
    avatarType: 'bocil3',
    avatarColor: '#ef4444',
    shirtColor: '#f97316',
    greeting: 'Tahu kotakkk! Beli dong bang, buat cemilan sore!',
    successQuote: 'Juara banget tahu kotaknya, besok beli lagi!',
    missQuote: 'Tetap mantap bang gurihnya!'
  },
  {
    name: 'Bang Joko',
    role: 'Driver Ojol',
    avatarType: 'ojol',
    avatarColor: '#16a34a',
    shirtColor: '#15803d',
    greeting: 'Bang, tahu kotaknya 1 porsi, buru-buru mau antar pesanan!',
    successQuote: 'Mantap jiwa! Renyah banget tahu kotaknya, bintang 5!',
    missQuote: 'Gak papa agak gosong dikit, tetep gurih kenyang!'
  },
  {
    name: 'Bu Tejo',
    role: 'Ibu Dasteran',
    avatarType: 'ibu',
    avatarColor: '#ea580c',
    shirtColor: '#c2410c',
    greeting: 'Bang tahu kotak! Cabai rawit hijaunya yang banyak ya!',
    successQuote: 'Nah ini baru tahu kotak juara! Besok tak borong!',
    missQuote: 'Lumayan lah ya, tapi cabenya kurang nendang dikit.'
  },
  {
    name: 'Bocil Dimas',
    role: 'Anak SD',
    avatarType: 'pelajar',
    avatarColor: '#dc2626',
    shirtColor: '#b91c1c',
    greeting: 'Bang beli tahu kotak dong, uang saku sisa jajan nih!',
    successQuote: 'Horeee! Panas-panas gurih, tahunya beneran kotak!',
    missQuote: 'Hehe tetep enak kok bang, kriuk-kriuk!'
  },
  {
    name: 'Pak RT Slamet',
    role: 'Ketua RT',
    avatarType: 'pakrt',
    avatarColor: '#475569',
    shirtColor: '#334155',
    greeting: 'Permisi Mas, mau borong tahu kotak buat camilan ronda malam.',
    successQuote: 'Luar biasa renyah! Warga pasti pada betah ronda ini!',
    missQuote: 'Bagus bagus, masih hangat walau rada kematangan.'
  },
  {
    name: 'Mas Kevin',
    role: 'Anak Gaul',
    avatarType: 'gaul',
    avatarColor: '#7c3aed',
    shirtColor: '#6d28d9',
    greeting: 'Permisi bro, katanya tahu kotaknya lagi viral di fyp ya?',
    successQuote: 'Wah gila sih, crispy-nya legit banget no debat!',
    missQuote: 'It is okay bro, aesthetic-nya dapet kok!'
  },
  {
    name: 'Mbah Karto',
    role: 'Kakek Sepuh',
    avatarType: 'kakek',
    avatarColor: '#b45309',
    shirtColor: '#92400e',
    greeting: 'Le, kakek mau tahu kotak sing anget gurih nggih...',
    successQuote: 'Alhamdulillah, empuk di jero renyah di njobo!',
    missQuote: 'Tetep enak le, kakek masih kuat ngunyah kok.'
  },
  {
    name: 'Mbak Rina',
    role: 'Karyawati',
    avatarType: 'pekerja',
    avatarColor: '#0284c7',
    shirtColor: '#0369a1',
    greeting: 'Mas, beli tahu kotak garing buat temen ngopi sore di kantor.',
    successQuote: 'Pas banget renyahnya! Temen-temen kantor pasti suka!',
    missQuote: 'Oke kok mas, yang penting gurih bumbunya meresap.'
  }
];

export function generateRandomCustomer(): Customer {
  const preset = CUSTOMER_PRESETS[Math.floor(Math.random() * CUSTOMER_PRESETS.length)];
  // Random speed number strictly from 3 to 10 as specified by user
  const speedNumber = Math.floor(Math.random() * 8) + 3; // 3, 4, 5, 6, 7, 8, 9, 10
  
  return {
    id: 'cust_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    name: preset.name,
    role: preset.role,
    avatarColor: preset.avatarColor,
    shirtColor: preset.shirtColor,
    speedNumber,
    avatarType: preset.avatarType,
    greeting: preset.greeting,
    successQuote: preset.successQuote,
    missQuote: preset.missQuote
  };
}
