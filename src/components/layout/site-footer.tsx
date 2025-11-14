import { Github, Sparkles } from 'lucide-react'

const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-muted/40 text-muted-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2 text-foreground">
          <Sparkles className="h-4 w-4 text-amber-300" />
          Tokens Codex
        </div>
        <p>Real-time GPT token insights, client-side, ready for GitHub Pages.</p>
        <a
          href="https://github.com/noah/tokens-codex"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-slate-300 transition-colors hover:text-white"
        >
          <Github className="h-4 w-4" />
          Star on GitHub
        </a>
      </div>
    </footer>
  )
}

export { SiteFooter }
