import { FormatComparison } from '@/components/format-comparison'

const FormatStudioPage = () => (
  <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
    <header className="mb-10 space-y-3 text-center text-slate-200">
      <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Format Studio</p>
      <h1 className="text-4xl font-bold text-white">Benchmark structured formats</h1>
      <p className="text-base text-slate-400">
        Paste any dataset and instantly compare CSV, JSON, Markdown, and TOML token counts with
        beautiful cards and charts.
      </p>
    </header>
    <FormatComparison />
  </div>
)

export { FormatStudioPage }
