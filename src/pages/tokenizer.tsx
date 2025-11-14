import { TokenizerPanel } from '@/components/tokenizer-panel'

const TokenizerPage = () => (
  <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
    <header className="mb-10 space-y-3 text-center">
      <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Tokenizer</p>
      <h1 className="text-4xl font-bold">Tokenize text in style</h1>
      <p className="text-base text-muted-foreground">
        Break down prompts, docs, or datasets using the exact GPT tokenizer with vivid visualization.
      </p>
    </header>
    <TokenizerPanel />
  </div>
)

export { TokenizerPage }
