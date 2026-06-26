import { formatDate } from '@/lib/format'

type Props = {
  watchdogCheck: string | null | undefined
  officialUpdate: string | null | undefined
  sourceUrl?: string
}

export default function FreshnessBadge({ watchdogCheck, officialUpdate, sourceUrl }: Props) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 mb-8 text-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
        Trasparenza sui dati
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Ultimo controllo Comune Watchdog</p>
          <p className="font-medium text-gray-700">{formatDate(watchdogCheck)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Ultimo aggiornamento fonte ufficiale</p>
          <p className="font-medium text-gray-700">
            {officialUpdate ? formatDate(officialUpdate) : 'non disponibile dalla fonte'}
          </p>
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-400">
        Fonte:{' '}
        {sourceUrl ? (
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
            OpenPNRR
          </a>
        ) : (
          'OpenPNRR'
        )}{' '}
        · I dati PNRR sono aggiornati settimanalmente. Le fonti ufficiali possono aggiornarsi con frequenze diverse. Questo strumento non fornisce dati in tempo reale.
      </p>
    </div>
  )
}
