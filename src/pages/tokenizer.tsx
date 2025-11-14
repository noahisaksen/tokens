import { TokenizerPanel } from '@/components/tokenizer-panel'

const TokenizerPage = () => (
  <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
    <header className="mb-10 space-y-3 text-center text-slate-200">
      <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Tokenizer</p>
      <h1 className="text-4xl font-bold text-white">Tokenize text in style</h1>
      <p className="text-base text-slate-400">
        Break down prompts, docs, or datasets using the exact GPT tokenizer with vivid visualization.
      </p>
    </header>
    <TokenizerPanel />
  </div>
)

export { TokenizerPage }
