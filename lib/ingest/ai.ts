import Groq from 'groq-sdk'
import { formatEur } from '../format'

const MODEL = 'llama-3.3-70b-versatile'

function getClient() {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) throw new Error('GROQ_API_KEY is not set')
  return new Groq({ apiKey })
}

export interface ProjectAI {
  explanation: string
  questions: string[]
}

export interface ComuneAI {
  summary: string
}

export async function generateProjectExplanation(project: {
  title: string
  description?: string | null
  amount_total?: number | null
  implementing_entity?: string | null
  status?: string | null
  category?: string | null
  mission?: string | null
  comune?: string | null
  watch_signals?: string[] | null
}): Promise<ProjectAI> {
  const signalNote =
    project.watch_signals && project.watch_signals.length > 0
      ? `\nNote sui dati: ${project.watch_signals.join(', ')}.`
      : ''

  const prompt = `Sei un assistente per la trasparenza dei fondi PNRR in Italia. Spiega in italiano semplice (come se stessi parlando a un cittadino curioso, senza tecnicismi) il seguente progetto PNRR.

Titolo: ${project.title}
Descrizione: ${project.description || 'non disponibile'}
Importo: ${formatEur(project.amount_total)}
Ente attuatore: ${project.implementing_entity || 'non disponibile'}
Stato: ${project.status || 'non disponibile'}
Categoria/Missione: ${project.category || project.mission || 'non disponibile'}
Comune: ${project.comune || 'non disponibile'}${signalNote}

Rispondi SOLO con questo JSON:
{
  "explanation": "Descrizione in italiano semplice di cosa fa questo progetto, a chi serve e perché è importante per i cittadini. Max 150 parole.",
  "questions": ["Una domanda utile che un cittadino potrebbe porre al Comune", "seconda domanda utile", "terza domanda utile"]
}`

  const res = await getClient().chat.completions.create({
    model: MODEL,
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  })

  const parsed = JSON.parse(res.choices[0].message.content ?? '{}') as ProjectAI

  return {
    explanation: String(parsed.explanation ?? ''),
    questions: Array.isArray(parsed.questions)
      ? parsed.questions.slice(0, 3).map(String)
      : [],
  }
}

export interface CallAI {
  explanation: string
  tips: string[]
  amountMin: number | null
  amountMax: number | null
  eligibility: string[]
}

export async function generateCallExplanation(call: {
  title: string
  description?: string | null
  program?: string | null
  budget_total?: number | null
  deadline?: string | null
  categories?: string[] | null
}): Promise<CallAI> {
  const prompt = `Sei un assistente per i finanziamenti pubblici italiani ed europei. Spiega in italiano semplice (come se stessi parlando a un cittadino o piccolo imprenditore senza esperienza burocratica) il seguente bando o incentivo.

Titolo: ${call.title}
Programma: ${call.program || 'non disponibile'}
Descrizione: ${call.description || 'non disponibile'}
Budget totale: ${call.budget_total ? `€${call.budget_total.toLocaleString('it-IT')}` : 'non specificato'}
Scadenza: ${call.deadline || 'aperto senza scadenza fissa'}
Categorie: ${call.categories?.join(', ') || 'non specificate'}

Rispondi SOLO con questo JSON:
{
  "explanation": "Spiegazione in italiano semplice: cosa finanzia questo bando, chi può fare domanda (persona fisica, impresa, startup, agricoltore...), a cosa serve il contributo. Max 150 parole.",
  "tips": ["Primo passo concreto per iniziare a candidarsi", "Secondo consiglio pratico", "Terzo consiglio utile (es. documenti necessari, scadenze da tenere d'occhio, enti a cui rivolgersi)"],
  "amountMin": "Importo minimo in euro che un singolo candidato può ricevere, come numero senza simboli (es. 10000). Se la descrizione non lo specifica, stima un valore plausibile in base al tipo di bando, oppure usa null se è impossibile stimarlo.",
  "amountMax": "Importo massimo in euro che un singolo candidato può ricevere, come numero senza simboli (es. 75000). Stessa logica di amountMin.",
  "eligibility": ["Criterio di ammissibilità 1 (es. 'Under 41 anni')", "Criterio 2 (es. 'Imprese con sede in una delle regioni del Sud Italia')", "Criterio 3 (es. 'Startup costituite da meno di 5 anni')"]
}`

  const res = await getClient().chat.completions.create({
    model: MODEL,
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  })

  const parsed = JSON.parse(res.choices[0].message.content ?? '{}') as Record<string, unknown>

  const toAmount = (v: unknown): number | null => {
    const n = typeof v === 'number' ? v : parseFloat(String(v))
    return isNaN(n) ? null : n
  }

  return {
    explanation: String(parsed.explanation ?? ''),
    tips: Array.isArray(parsed.tips)
      ? parsed.tips.slice(0, 3).map(String)
      : [],
    amountMin: toAmount(parsed.amountMin),
    amountMax: toAmount(parsed.amountMax),
    eligibility: Array.isArray(parsed.eligibility)
      ? parsed.eligibility.slice(0, 5).map(String)
      : [],
  }
}

export async function generateComuneSummary(comune: {
  nome: string
  province?: string | null
  region?: string | null
  total_projects: number
  total_funding?: number | null
  avg_project_value?: number | null
}): Promise<ComuneAI> {
  const prompt = `Sei un assistente per la trasparenza dei fondi PNRR in Italia. Scrivi un breve riassunto in italiano semplice della situazione PNRR nel Comune.

Comune: ${comune.nome}
Provincia: ${comune.province || 'non disponibile'}
Regione: ${comune.region || 'non disponibile'}
Totale progetti PNRR: ${comune.total_projects}
Finanziamento totale: ${formatEur(comune.total_funding)}
Valore medio per progetto: ${formatEur(comune.avg_project_value)}

Rispondi SOLO con questo JSON:
{
  "summary": "Riassunto in italiano semplice (max 120 parole) della situazione PNRR nel comune. Spiega cosa significano questi numeri per i cittadini locali, quali opportunità di sviluppo rappresentano e cosa possono aspettarsi."
}`

  const res = await getClient().chat.completions.create({
    model: MODEL,
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  })

  const parsed = JSON.parse(res.choices[0].message.content ?? '{}') as ComuneAI

  return {
    summary: String(parsed.summary ?? ''),
  }
}
