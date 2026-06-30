export interface FundingCall {
  external_id: string
  source: string
  title: string
  description: string | null
  program: string | null
  categories: string[]
  regions: string[]   // empty = national / EU-wide
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
  // ── Agriculture — national ────────────────────────────────────────────────
  {
    external_id: 'ismea-prima-installazione-2024',
    source: 'seed',
    title: 'ISMEA — Prima Installazione Giovani Agricoltori',
    description:
      'Finanziamenti agevolati e contributi a fondo perduto per giovani agricoltori (under 41) che si insediano per la prima volta in un\'azienda agricola. Copre l\'acquisto di terreni, fabbricati, macchine, impianti e scorte. Cofinanziato dal PSP/FEASR 2023-2027.',
    program: 'PSP / FEASR 2023-2027',
    categories: ['agricoltura', 'giovani'],
    regions: [],
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
    categories: ['agricoltura', 'innovazione', 'startup'],
    regions: [],
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
    categories: ['agricoltura', 'innovazione', 'sostenibilità', 'ue'],
    regions: [],
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
    categories: ['agricoltura', 'giovani'],
    regions: [],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.reterurale.it/PSN',
  },

  // ── Imprenditoria e PMI — national ────────────────────────────────────────
  {
    external_id: 'invitalia-smart-start-2024',
    source: 'seed',
    title: 'Smart&Start Italia — Startup Innovative',
    description:
      'Finanziamento agevolato (mutuo a tasso zero) e contributo a fondo perduto fino al 30% per startup innovative con un piano d\'impresa su digitale, economia verde, manifattura avanzata o valorizzazione della ricerca pubblica. Fino a 1,5 milioni di euro.',
    program: 'Invitalia',
    categories: ['startup', 'innovazione', 'digitale'],
    regions: [],
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
    categories: ['pmi', 'digitale'],
    regions: [],
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
    categories: ['startup', 'giovani'],
    regions: ['Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Molise', 'Puglia', 'Sardegna', 'Sicilia'],
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
    categories: ['pmi', 'innovazione'],
    regions: [],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.mimit.gov.it/it/incentivi/brevetti',
  },

  // ── Transizione digitale e green — national ───────────────────────────────
  {
    external_id: 'mimit-transizione-5-0-2024',
    source: 'seed',
    title: 'Transizione 5.0 — Credito d\'Imposta Green + Digital',
    description:
      'Credito d\'imposta per investimenti in beni strumentali materiali e immateriali che generano risparmi energetici attraverso la transizione digitale e verde. Aliquote dal 15% al 45% in base alla riduzione dei consumi energetici. Valido fino al 31 dicembre 2025.',
    program: 'PNRR — MIMIT',
    categories: ['digitale', 'sostenibilità', 'pmi'],
    regions: [],
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
    categories: ['internazionalizzazione', 'pmi'],
    regions: [],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.simest.it/strumenti-finanziari/fondo-394',
  },

  // ── Ambiente e clima — EU ──────────────────────────────────────────────────
  {
    external_id: 'eu-life-programme-2025',
    source: 'seed',
    title: 'Programma LIFE — Ambiente, Natura e Clima',
    description:
      'Bandi europei per progetti di protezione dell\'ambiente, conservazione della natura e adattamento al cambiamento climatico. Aperti a enti pubblici, ONG, università e imprese private. Finanziamento fino al 60-95% dei costi di progetto.',
    program: 'LIFE — Commissione Europea',
    categories: ['sostenibilità', 'ue'],
    regions: [],
    open_date: null,
    deadline: '2025-09-12',
    budget_total: null,
    status: 'open',
    url: 'https://cinea.ec.europa.eu/programmes/life_en',
  },

  // ── Giovani e formazione — EU ─────────────────────────────────────────────
  {
    external_id: 'eu-erasmus-plus-2025',
    source: 'seed',
    title: 'Erasmus+ — Formazione, Istruzione, Giovani e Sport',
    description:
      'Finanziamenti europei per mobilità internazionale, partenariati strategici e progetti di innovazione nel campo dell\'istruzione, formazione professionale, istruzione degli adulti, giovani e sport. Aperti a organizzazioni, enti locali, scuole, università e associazioni.',
    program: 'Erasmus+ — Commissione Europea',
    categories: ['formazione', 'giovani', 'ue'],
    regions: [],
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
    categories: ['startup', 'innovazione', 'ue'],
    regions: [],
    open_date: null,
    deadline: '2025-10-08',
    budget_total: null,
    status: 'open',
    url: 'https://eic.ec.europa.eu/eic-funding-opportunities/eic-accelerator_en',
  },

  // ── Programmi regionali ───────────────────────────────────────────────────
  {
    external_id: 'pr-fesr-lombardia-digitale-2024',
    source: 'seed',
    title: 'PR FESR Lombardia — Digitale e Innovazione per le PMI',
    description:
      'Voucher e contributi a fondo perduto per PMI lombarde che investono in digitalizzazione, e-commerce, software gestionali, cybersecurity e consulenza specialistica. Gestito da Regione Lombardia tramite bandi aperti durante l\'anno.',
    program: 'PR FESR Lombardia 2021-2027',
    categories: ['digitale', 'pmi', 'innovazione'],
    regions: ['Lombardia'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.regione.lombardia.it/wps/portal/istituzionale/HP/DettaglioRedazionale/servizi-e-informazioni/imprese/supporto-alle-imprese/finanziamenti-europei',
  },
  {
    external_id: 'lazioinnova-pmi-lazio-2024',
    source: 'seed',
    title: 'Lazio Innova — Incentivi PMI Lazio',
    description:
      'Contributi a fondo perduto per micro, piccole e medie imprese del Lazio per investimenti in innovazione tecnologica, efficienza energetica, internazionalizzazione e sviluppo prodotti. Gestito da Lazio Innova per conto di Regione Lazio.',
    program: 'PR FESR Lazio 2021-2027',
    categories: ['pmi', 'innovazione', 'sostenibilità'],
    regions: ['Lazio'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.lazioinnova.it/bandi/',
  },
  {
    external_id: 'campania-fesr-pmi-2024',
    source: 'seed',
    title: 'PO FESR Campania — Competitività PMI e Sviluppo Locale',
    description:
      'Agevolazioni per PMI campane: contributi per innovazione di processo e di prodotto, acquisto di macchinari, digitalizzazione, efficienza energetica e sviluppo commerciale sui mercati nazionali ed esteri.',
    program: 'PR FESR Campania 2021-2027',
    categories: ['pmi', 'innovazione', 'digitale'],
    regions: ['Campania'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.regione.campania.it/regione/it/tematiche/fesr',
  },
  {
    external_id: 'sicilia-fesr-mpmi-2024',
    source: 'seed',
    title: 'PR FESR Sicilia — Micro e Piccole Imprese 2021-2027',
    description:
      'Contributi a fondo perduto e finanziamenti agevolati per micro e piccole imprese siciliane che investono in innovazione, digitale, sostenibilità ambientale e ampliamento della capacità produttiva.',
    program: 'PR FESR Sicilia 2021-2027',
    categories: ['pmi', 'innovazione', 'digitale'],
    regions: ['Sicilia'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.euroinfosicilia.it/po-fesr-sicilia-2021-2027/',
  },
  {
    external_id: 'puglia-fesr-agritech-2024',
    source: 'seed',
    title: 'PR FESR Puglia — Innovazione e Agritech',
    description:
      'Bandi regionali per imprese agricole e agroalimentari pugliesi che investono in tecnologie di precision farming, tracciabilità, IoT in campo agricolo e soluzioni di economia circolare.',
    program: 'PR FESR/FEASR Puglia 2021-2027',
    categories: ['agricoltura', 'innovazione', 'digitale'],
    regions: ['Puglia'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.regione.puglia.it/web/fesr',
  },
  {
    external_id: 'veneto-innovazione-pmi-2024',
    source: 'seed',
    title: 'Bando Veneto Innovazione — PMI e Artigianato',
    description:
      'Contributi regionali per PMI e imprese artigiane venete che avviano progetti di innovazione tecnologica, ricerca applicata, prototipazione e sviluppo di nuovi prodotti e processi produttivi.',
    program: 'PR FESR Veneto 2021-2027',
    categories: ['pmi', 'innovazione'],
    regions: ['Veneto'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.regione.veneto.it/web/economia-e-sviluppo/bandi',
  },
  {
    external_id: 'piemonte-manifatturiero-40-2024',
    source: 'seed',
    title: 'Bando Piemonte — Manifatturiero 4.0',
    description:
      'Finanziamenti per imprese manifatturiere piemontesi che investono in tecnologie Industria 4.0: robotica collaborativa, stampa 3D, realtà aumentata, integrazione di sistemi cyber-fisici e intelligenza artificiale applicata alla produzione.',
    program: 'PR FESR Piemonte 2021-2027',
    categories: ['pmi', 'innovazione', 'digitale'],
    regions: ['Piemonte'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.regione.piemonte.it/web/temi/fondi-europei/fesr-2021-2027',
  },
  {
    external_id: 'toscana-fondo-crescita-pmi-2024',
    source: 'seed',
    title: 'Fondo Crescita Toscana — Sviluppo PMI',
    description:
      'Fondo rotativo e contributi a fondo perduto per PMI toscane che investono in crescita aziendale: sviluppo commerciale, efficientamento produttivo, innovazione digitale e sostenibilità ambientale.',
    program: 'PR FESR Toscana 2021-2027',
    categories: ['pmi', 'innovazione', 'sostenibilità'],
    regions: ['Toscana'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.regione.toscana.it/imprese/fondi-europei',
  },
  {
    external_id: 'emilia-romagna-fesr-alta-tech-2024',
    source: 'seed',
    title: 'ER Programma FESR — Alta Tecnologia e Ricerca Industriale',
    description:
      'Contributi per imprese emiliano-romagnole che collaborano con centri di ricerca per sviluppare prodotti e processi innovativi. Focus su meccatronica, motorsport, agroalimentare, life sciences e tecnologie ambientali.',
    program: 'PR FESR Emilia-Romagna 2021-2027',
    categories: ['innovazione', 'pmi'],
    regions: ['Emilia-Romagna'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://fesr.regione.emilia-romagna.it/bandi',
  },
  {
    external_id: 'calabria-fesr-agri-sostenibile-2024',
    source: 'seed',
    title: 'PR FESR/FEASR Calabria — Agricoltura Sostenibile',
    description:
      'Incentivi per agricoltori e aziende agroalimentari calabresi che adottano pratiche di agricoltura sostenibile, biologica e a basso impatto ambientale. Include misure per l\'efficienza idrica, l\'agriturismo e la trasformazione di prodotti locali.',
    program: 'PR FESR/FEASR Calabria 2021-2027',
    categories: ['agricoltura', 'sostenibilità'],
    regions: ['Calabria'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.regione.calabria.it/website/portaltemplates/view/view.cfm?32649',
  },
  {
    external_id: 'sardegna-fesr-turismo-cultura-2024',
    source: 'seed',
    title: 'PR FESR Sardegna — Turismo, Cultura e Attrattività',
    description:
      'Contributi per imprese sarde del settore turistico, culturale e dell\'ospitalità che investono in valorizzazione del patrimonio, destagionalizzazione, turismo sostenibile e digitale.',
    program: 'PR FESR Sardegna 2021-2027',
    categories: ['turismo', 'sostenibilità'],
    regions: ['Sardegna'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.regione.sardegna.it/argomenti/economia/fondi-europei/',
  },
  {
    external_id: 'abruzzo-psr-giovani-agri-2024',
    source: 'seed',
    title: 'PSR Abruzzo — Giovani Agricoltori e Primo Insediamento',
    description:
      'Contributo a fondo perduto fino a 70.000 euro per giovani under 41 che avviano per la prima volta un\'azienda agricola in Abruzzo. Priorità a zone di montagna, aree Natura 2000 e pratiche di agricoltura biologica.',
    program: 'PSR Abruzzo 2023-2027',
    categories: ['agricoltura', 'giovani'],
    regions: ['Abruzzo'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.regione.abruzzo.it/content/psr-2023-2027',
  },
  {
    external_id: 'basilicata-feasr-biologico-2024',
    source: 'seed',
    title: 'PSR Basilicata — Conversione all\'Agricoltura Biologica',
    description:
      'Premi annuali per agricoltori lucani che convertono i loro terreni all\'agricoltura biologica certificata. Copertura per 5 anni dalla conversione, con importi variabili per coltura (cereali, ortaggi, vite, olivo).',
    program: 'PSR Basilicata 2023-2027',
    categories: ['agricoltura', 'sostenibilità'],
    regions: ['Basilicata'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.regione.basilicata.it/giunta/site/giunta/department.jsp?dep=100088&area=3009',
  },
  {
    external_id: 'molise-psr-investimenti-agri-2024',
    source: 'seed',
    title: 'PSR Molise — Investimenti nelle Aziende Agricole',
    description:
      'Contributi a fondo perduto (40-60% della spesa) per aziende agricole molisane che effettuano investimenti in macchinari, impianti, strutture e tecnologie per migliorare le prestazioni e la sostenibilità dell\'azienda.',
    program: 'PSR Molise 2023-2027',
    categories: ['agricoltura'],
    regions: ['Molise'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.regione.molise.it/appsrv/pubblica.nsf/0/PSR',
  },
  {
    external_id: 'marche-fesr-agrifood-2024',
    source: 'seed',
    title: 'PR FESR Marche — Agrifood e Agroalimentare di Qualità',
    description:
      'Incentivi per imprese marchigiane del settore agroalimentare che investono in innovazione di processo, certificazioni di qualità (DOP, IGP, biologico), packaging sostenibile e sviluppo di nuovi mercati.',
    program: 'PR FESR Marche 2021-2027',
    categories: ['agricoltura', 'pmi', 'innovazione'],
    regions: ['Marche'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.regione.marche.it/Regione-Utile/Fondi-Europei/FESR',
  },
  {
    external_id: 'umbria-fesr-startup-green-2024',
    source: 'seed',
    title: 'PR FESR Umbria — Startup e Imprese Green',
    description:
      'Finanziamenti per la nascita e lo sviluppo di startup e PMI umbre con un modello di business orientato alla sostenibilità ambientale, all\'economia circolare, all\'energia rinnovabile e alla green economy.',
    program: 'PR FESR Umbria 2021-2027',
    categories: ['startup', 'sostenibilità', 'innovazione'],
    regions: ['Umbria'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.regione.umbria.it/economia/fondi-europei',
  },
  {
    external_id: 'pat-giovani-artigiani-2024',
    source: 'seed',
    title: 'PAT — Incentivi Giovani Artigiani Trentino',
    description:
      'Contributi della Provincia Autonoma di Trento per giovani under 40 che avviano o rilevano un\'impresa artigiana. Include agevolazioni su mutui, contributi a fondo perduto sull\'investimento iniziale e supporto per la formazione professionale.',
    program: 'Provincia Autonoma di Trento',
    categories: ['giovani', 'pmi'],
    regions: ['Trentino-Alto Adige'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.provincia.tn.it/Argomenti/Lavoro-e-impresa/Artigianato',
  },
  {
    external_id: 'fvg-fesr-innovazione-2024',
    source: 'seed',
    title: 'PR FESR FVG — Innovazione e Internazionalizzazione PMI',
    description:
      'Bandi regionali del Friuli Venezia Giulia per PMI che investono in ricerca applicata, sviluppo di nuovi prodotti, digitalizzazione e accesso a mercati internazionali. Contributi dal 30% al 50% della spesa ammissibile.',
    program: 'PR FESR Friuli Venezia Giulia 2021-2027',
    categories: ['pmi', 'innovazione', 'internazionalizzazione'],
    regions: ['Friuli-Venezia Giulia'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.regione.fvg.it/rafvg/cms/RAFVG/economia-imprese/incentivi-agevolazioni/',
  },
  {
    external_id: 'filse-liguria-pmi-2024',
    source: 'seed',
    title: 'FILSE — Agevolazioni PMI Liguria',
    description:
      'Finanziamenti agevolati e contributi a fondo perduto per PMI liguri gestiti da FILSE (Finanziaria Ligure per lo Sviluppo Economico). Coprono investimenti produttivi, digitalizzazione, turismo e servizi alle imprese.',
    program: 'PR FESR Liguria 2021-2027',
    categories: ['pmi', 'innovazione'],
    regions: ['Liguria'],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.filse.it/bandi-e-agevolazioni/',
  },
  {
    external_id: 'vda-fondo-sviluppo-pmi-2024',
    source: 'seed',
    title: 'Valle d\'Aosta — Fondo Sviluppo PMI e Artigianato',
    description:
      'Agevolazioni finanziarie per micro, piccole e medie imprese e imprese artigiane valdostane che investono in sviluppo aziendale, innovazione, turismo alpino e valorizzazione delle risorse locali.',
    program: 'PR FESR Valle d\'Aosta 2021-2027',
    categories: ['pmi', 'turismo'],
    regions: ["Valle d'Aosta"],
    open_date: null,
    deadline: null,
    budget_total: null,
    status: 'open',
    url: 'https://www.regione.vda.it/economia/sviluppo_economico/default_i.aspx',
  },
]

// ─── EU F&T Portal ─────────────────────────────────────────────────────────
// grantsTenders.json is the EU Funding & Tenders Portal's authoritative source.
// It's 125 MB but open/forthcoming calls are always in the last ~7 MB, so a
// single HTTP Range request is enough — no full download required.
const EU_GRANTS_TENDERS_URL =
  'https://ec.europa.eu/info/funding-tenders/opportunities/data/referenceData/grantsTenders.json'

// Maps EU framework programme abbreviation → our category tags
const FWP_CATEGORIES: Record<string, string[]> = {
  HORIZON:    ['ue', 'innovazione'],
  CREA2027:   ['ue'],
  ERASMUS2027:['ue', 'formazione', 'giovani'],
  JTM:        ['ue', 'sostenibilità'],
  AGRIP2027:  ['ue', 'agricoltura'],
  LIFE:       ['ue', 'sostenibilità'],
  EMFAF:      ['ue', 'agricoltura'],
  COSME:      ['ue', 'pmi'],
}

async function fetchEuGrantsTenders(): Promise<FundingCall[]> {
  try {
    // Step 1: get current file size (file grows as new calls are added)
    const head = await fetch(EU_GRANTS_TENDERS_URL, { method: 'HEAD' })
    const fileSize = parseInt(head.headers.get('content-length') ?? '124992211', 10)
    // Step 2: fetch only the last 8 MB — that's where open/forthcoming records live
    const rangeStart = Math.max(0, fileSize - 8_000_000)
    const res = await fetch(EU_GRANTS_TENDERS_URL, {
      headers: { Range: `bytes=${rangeStart}-${fileSize - 1}` },
      signal: AbortSignal.timeout(25_000),
    })
    if (!res.ok && res.status !== 206) {
      console.warn('[fetchEuGrantsTenders] range fetch failed:', res.status)
      return []
    }

    const raw = await res.text()
    const now = Date.now()
    // Records are separated by this exact string in the pretty-printed JSON
    const SEP = '\n    }, {\n'
    const firstSep = raw.indexOf(SEP)
    if (firstSep < 0) return []

    const calls: FundingCall[] = []
    const parts = raw.slice(firstSep + SEP.length).split(SEP)

    for (const part of parts) {
      try {
        // Strip trailing array/object close that appears at end of file
        const clean = part.replace(/\s*\]\s*\}\s*$/, '').trimEnd()
        const obj = JSON.parse('{' + clean + '}') as Record<string, unknown>

        const abbr = (obj.status as { abbreviation?: string } | undefined)?.abbreviation
        if (abbr !== 'Open' && abbr !== 'Forthcoming') continue

        const deadlines = (obj.deadlineDatesLong as number[] | undefined) ?? []
        const maxDl = deadlines.length ? Math.max(...deadlines) : null
        // Skip if all deadlines are past
        if (maxDl !== null && maxDl < now) continue

        const fwp =
          ((obj.frameworkProgramme as { abbreviation?: string } | undefined)?.abbreviation) ?? ''
        const identifier = obj.identifier as string
        const callTitle = obj.callTitle as string | undefined
        const title = obj.title as string | undefined

        calls.push({
          external_id: identifier,
          source: 'eu-grants-tenders',
          title: title ?? '',
          description: callTitle && callTitle !== title ? callTitle : null,
          program: fwp || null,
          categories: FWP_CATEGORIES[fwp] ?? ['ue'],
          regions: [],
          open_date: obj.publicationDateLong
            ? new Date(obj.publicationDateLong as number).toISOString().slice(0, 10)
            : null,
          deadline: maxDl ? new Date(maxDl).toISOString().slice(0, 10) : null,
          budget_total: null,
          status: abbr === 'Open' ? 'open' : 'forthcoming',
          url: `https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/${identifier}`,
        })
      } catch {
        // Malformed record at chunk boundary — skip
      }
    }

    return calls
  } catch (err) {
    console.warn('[fetchEuGrantsTenders] failed:', (err as Error).message)
    return []
  }
}

// MIMIT RSS feeds: new incentivi are published here and remain in the feed for ~2 months.
// Bando detail pages live at /it/incentivi/... — news articles at /it/notizie-stampa/...
const MIMIT_FEEDS = [
  'https://www.mimit.gov.it/it/component/tags/tag/incentivi?format=feed&type=rss',
]

async function fetchMimitRss(): Promise<FundingCall[]> {
  const Parser = (await import('rss-parser')).default
  const parser = new Parser({ timeout: 10_000 })
  const calls: FundingCall[] = []

  for (const feedUrl of MIMIT_FEEDS) {
    try {
      const feed = await parser.parseURL(feedUrl)
      for (const item of feed.items ?? []) {
        const link = item.link ?? ''
        // Only real bando pages, not news articles
        if (!link.includes('/incentivi/')) continue
        const slug = link.split('/').pop() ?? link
        calls.push({
          external_id: `mimit-${slug}`,
          source: 'mimit-rss',
          title: item.title ?? '',
          description: item.contentSnippet ?? item.content ?? null,
          program: 'MIMIT',
          categories: ['pmi', 'innovazione'],
          regions: [],
          open_date: item.pubDate ? new Date(item.pubDate).toISOString().slice(0, 10) : null,
          deadline: null,
          budget_total: null,
          status: 'open',
          url: link || null,
        })
      }
    } catch (err) {
      console.warn('[fetchMimitRss] failed to fetch', feedUrl, (err as Error).message)
    }
  }

  return calls
}

export async function fetchCalls(): Promise<FundingCall[]> {
  const [live, euCalls] = await Promise.all([fetchMimitRss(), fetchEuGrantsTenders()])
  // Deduplicate seed: skip any seed entry whose source:external_id is already in live sources
  const seenIds = new Set([...live, ...euCalls].map((c) => `${c.source}:${c.external_id}`))
  const filtered = SEED_CALLS.filter((c) => !seenIds.has(`${c.source}:${c.external_id}`))
  return [...live, ...euCalls, ...filtered]
}
