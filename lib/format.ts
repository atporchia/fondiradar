export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/\b[\wàèìòùáéíóú]/g, (c) => c.toUpperCase())
}

export function formatEur(value: number | null | undefined): string {
  if (value == null) return 'N/D'
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return 'non disponibile'
  return new Date(value).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
