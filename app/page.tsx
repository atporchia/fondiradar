export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      {/* Wordmark */}
      <p className="mb-3 text-sm font-semibold tracking-widest text-emerald-600 uppercase">
        MyComune
      </p>

      {/* Tagline */}
      <h1 className="mb-4 max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        I soldi pubblici del tuo Comune,{" "}
        <span className="text-emerald-600">spiegati in modo semplice.</span>
      </h1>

      <p className="mb-10 max-w-xl text-lg text-gray-500">
        Cerca il tuo Comune e scopri i progetti PNRR finanziati con denaro pubblico.
        Dati ufficiali, spiegati da un assistente AI in italiano chiaro.
      </p>

      {/* Search bar — placeholder until Comune routing is built in Phase 2 */}
      <form className="flex w-full max-w-md gap-2">
        <input
          type="text"
          placeholder="Cerca il tuo Comune..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          disabled
        />
        <button
          type="submit"
          disabled
          className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-medium text-white opacity-50 cursor-not-allowed"
        >
          Cerca
        </button>
      </form>

      <p className="mt-4 text-xs text-gray-400">
        La ricerca sarà disponibile nella prossima versione. Dati: OpenPNRR · ItaliaDomani.
      </p>

      {/* Data freshness note */}
      <div className="mt-16 rounded-xl border border-gray-100 bg-gray-50 px-6 py-5 text-left max-w-md">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
          Trasparenza sui dati
        </p>
        <p className="text-sm text-gray-600">
          MyComune controlla le fonti ufficiali ogni giorno e aggiorna i dati ogni settimana.
          Ogni pagina mostra sempre la data dell&apos;ultimo aggiornamento e la fonte originale.
        </p>
      </div>
    </main>
  );
}
