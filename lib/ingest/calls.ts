export interface FundingCall {
  external_id: string
  source: string
  title: string
  description: string | null
  program: string | null
  categories: string[]
  open_date: string | null
  deadline: string | null
  budget_total: number | null
  status: 'open' | 'closed' | 'forthcoming'
  url: string | null
}

// Curated seed of real Italian and EU funding calls open to private citizens,
// farmers, and businesses. Extend by plugging in a live API (EU F&T Portal,
// Invitalia open data, etc.) and returning FundingCall[] from fetchCalls().
const SEED_CALLS: FundingCall[] = [
  // ── Agriculture ──────────────────────────────────────────────────────────
  {
    external_id: 'ismea-prima-installazione-2024',
    source: 'seed',
    title: 'ISMEA — Prima Installazione Giovani Agricoltori',
    description:
      'Finanziamenti agevolati e contributi a fondo perduto per giovani agricoltori (under 41) che si insediano per la prima volta in un\'azienda agricola. Copre l\'acquisto di terreni, fabbricati, macchine, impianti e scorte. Cofinanziato dal PSP/FEASR 2023-2027.',
    program: 'PSP / FEASR 2023-2027',
    categories: ['agricoltura', 'giovani', 'rurale', 'imprenditoria'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.ismea.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/3518',
  },
  {
    external_id: 'pnrr-agritech-2024',
    source: 'seed',
    title: 'PNRR Agritech — Centri Nazionali per lo Sviluppo di Tecnologie Agricole',
    description:
      'Finanziamenti per centri di ricerca, università, imprese e startup che sviluppano soluzioni tecnologiche per l\'agricoltura: precision farming, IoT, robotica, biotecnologie sostenibili. Investimento totale di 350 milioni di euro.',
    program: 'PNRR — Missione 2',
    categories: ['agricoltura', 'innovazione', 'ricerca', 'tecnologia', 'startup'],
    open_date: null,
    deadline: null,
    budget_total: 350_000_000,
    status: 'open',
    url: 'https://www.mur.gov.it/it/atti-e-normativa/decreto-ministeriale-n-1048-del-23-luglio-2022',
  },
  {
    external_id: 'horizon-cluster6-2025',
    source: 'seed',
    title: 'Horizon Europe — Cluster 6: Cibo, Bioeconomia e Agricoltura',
    description:
      'Bandi europei per ricerca e innovazione su sistemi alimentari sostenibili, agricoltura biologica, bioeconomia circolare e gestione sostenibile delle risorse naturali. Aperti a imprese, università, consorzi pubblico-privati in tutta Europa.',
    program: 'Horizon Europe',
    categories: ['agricoltura', 'ricerca', 'innovazione', 'sostenibilità', 'ue'],
    open_date: null,
    deadline: '2025-09-17',
    budget_total: null,
    status: 'open',
    url: 'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/calls-for-proposals;programmePeriod=2021-2027;programCcm2Id=43108390',
  },
  {
    external_id: 'feasr-giovani-agricoltori-2024',
    source: 'seed',
    title: 'PSP 2023-2027 — SRD07 Insediamento Giovani Agricoltori',
    description:
      'Contributo una tantum fino a 75.000 euro per giovani under 41 che si insediano per la prima volta come capo azienda agricola. Gestito dalle regioni italiane attraverso il Piano Strategico PAC.',
    program: 'PSP / FEASR 2023-2027',
    categories: ['agricoltura', 'giovani', 'rurale'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.reterurale.it/PSN',
  },

  // ── Imprenditoria e PMI ───────────────────────────────────────────────────
  {
    external_id: 'invitalia-smart-start-2024',
    source: 'seed',
    title: 'Smart&Start Italia — Startup Innovative',
    description:
      'Finanziamento agevolato (mutuo a tasso zero) e contributo a fondo perduto fino al 30% per startup innovative con un piano d\'impresa su digitale, economia verde, manifattura avanzata o valorizzazione della ricerca pubblica. Fino a 1,5 milioni di euro.',
    program: 'Invitalia',
    categories: ['startup', 'innovazione', 'digitale', 'imprenditoria'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.invitalia.it/cosa-facciamo/rafforziamo-le-startup/smart-start-italia',
  },
  {
    external_id: 'mimit-nuova-sabatini-2024',
    source: 'seed',
    title: 'Nuova Sabatini — Beni Strumentali per le PMI',
    description:
      'Contributo sugli interessi di finanziamenti bancari per l\'acquisto di macchinari, impianti, attrezzature, hardware, software e tecnologie digitali da parte di micro, piccole e medie imprese. Maggiorato per investimenti in tecnologie 4.0.',
    program: 'MIMIT',
    categories: ['pmi', 'investimento', 'digitale', 'macchinari', 'imprenditoria'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.mimit.gov.it/it/incentivi/nuova-sabatini',
  },
  {
    external_id: 'invitalia-resto-al-sud-2024',
    source: 'seed',
    title: 'Resto al Sud — Imprenditoria nel Mezzogiorno',
    description:
      'Finanziamenti per under 56 che avviano un\'attività imprenditoriale nelle regioni del Sud Italia (Abruzzo, Basilicata, Calabria, Campania, Molise, Puglia, Sardegna, Sicilia) e nelle Isole minori. Contributo a fondo perduto (50%) + mutuo agevolato (50%). Fino a 75.000 euro.',
    program: 'Invitalia',
    categories: ['imprenditoria', 'giovani', 'sud', 'startup'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.invitalia.it/cosa-facciamo/sosteniamo-limprenditoria-giovanile/resto-al-sud',
  },
  {
    external_id: 'mimit-brevetti-plus-2024',
    source: 'seed',
    title: 'Brevetti+ — Valorizzazione dei Brevetti per PMI',
    description:
      'Contributo a fondo perduto fino a 140.000 euro per micro, piccole e medie imprese che intendono sviluppare e valorizzare economicamente un brevetto. Copre studi di fattibilità, ricerca industriale, sviluppo sperimentale e organizzazione della produzione.',
    program: 'MIMIT',
    categories: ['pmi', 'innovazione', 'brevetti', 'ricerca', 'imprenditoria'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.mimit.gov.it/it/incentivi/brevetti',
  },

  // ── Transizione digitale e green ──────────────────────────────────────────
  {
    external_id: 'mimit-transizione-5-0-2024',
    source: 'seed',
    title: 'Transizione 5.0 — Credito d\'Imposta Green + Digital',
    description:
      'Credito d\'imposta per investimenti in beni strumentali materiali e immateriali che generano risparmi energetici attraverso la transizione digitale e verde. Aliquote dal 15% al 45% in base alla riduzione dei consumi energetici. Valido fino al 31 dicembre 2025.',
    program: 'PNRR — MIMIT',
    categories: ['digitale', 'sostenibilità', 'energia', 'pmi', 'investimento'],
    open_date: '2024-01-01',
    deadline: '2025-12-31',
    budget_total: 6_300_000_000,
    status: 'open',
    url: 'https://www.mimit.gov.it/it/incentivi/transizione-5-0',
  },
  {
    external_id: 'simest-fondo394-2024',
    source: 'seed',
    title: 'SIMEST Fondo 394 — Internazionalizzazione PMI',
    description:
      'Finanziamenti agevolati e contributi a fondo perduto per PMI italiane che vogliono espandersi sui mercati esteri: partecipazione a fiere internazionali, inserimento in mercati stranieri, e-commerce, certificazioni e-export, uffici e stabilimenti all\'estero.',
    program: 'SIMEST / MIMIT',
    categories: ['internazionalizzazione', 'pmi', 'export', 'imprenditoria'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.simest.it/strumenti-finanziari/fondo-394',
  },

  // ── Ambiente e clima ──────────────────────────────────────────────────────
  {
    external_id: 'eu-life-programme-2025',
    source: 'seed',
    title: 'Programma LIFE — Ambiente, Natura e Clima',
    description:
      'Bandi europei per progetti di protezione dell\'ambiente, conservazione della natura e adattamento al cambiamento climatico. Aperti a enti pubblici, ONG, università e imprese private. Finanziamento fino al 60-95% dei costi di progetto.',
    program: 'LIFE — Commissione Europea',
    categories: ['ambiente', 'clima', 'sostenibilità', 'natura', 'ue'],
    open_date: null,
    deadline: '2025-09-12',
    budget_total: null,
    status: 'open',
    url: 'https://cinea.ec.europa.eu/programmes/life_en',
  },

  // ── Giovani e formazione ──────────────────────────────────────────────────
  {
    external_id: 'eu-erasmus-plus-2025',
    source: 'seed',
    title: 'Erasmus+ — Formazione, Istruzione, Giovani e Sport',
    description:
      'Finanziamenti europei per mobilità internazionale, partenariati strategici e progetti di innovazione nel campo dell\'istruzione, formazione professionale, istruzione degli adulti, giovani e sport. Aperti a organizzazioni, enti locali, scuole, università e associazioni.',
    program: 'Erasmus+ — Commissione Europea',
    categories: ['formazione', 'giovani', 'istruzione', 'mobilità', 'ue'],
    open_date: null,
    deadline: '2025-10-01',
    budget_total: null,
    status: 'open',
    url: 'https://erasmus-plus.ec.europa.eu/it/calls-for-proposals',
  },
  {
    external_id: 'eic-accelerator-2025',
    source: 'seed',
    title: 'EIC Accelerator — Deeptech e Innovazione ad Alto Impatto',
    description:
      'Fino a 2,5 milioni di euro a fondo perduto + equity fino a 15 milioni per startup e PMI europee con innovazioni deeptech rivoluzionarie. Sostenuto dall\'European Innovation Council, è il principale programma EU per startup ad alto rischio e alto potenziale.',
    program: 'EIC — Commissione Europea',
    categories: ['startup', 'innovazione', 'tecnologia', 'deeptech', 'ue'],
    open_date: null,
    deadline: '2025-10-08',
    budget_total: null,
    status: 'open',
    url: 'https://eic.ec.europa.eu/eic-funding-opportunities/eic-accelerator_en',
  },
]

export async function fetchCalls(): Promise<FundingCall[]> {
  // Returns the curated static seed. Replace or extend this function with
  // a live API call (e.g. EU F&T Portal, Invitalia JSON export) to ingest
  // real-time data once a suitable public endpoint is identified.
  return SEED_CALLS
}
