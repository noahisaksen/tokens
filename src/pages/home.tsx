import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Sparkles, SplitSquareHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const features = [
  {
    title: 'Real-time tokenizer',
    description:
      'See every GPT token as you type, with instant stats for characters, words, and token totals.',
    icon: Sparkles,
    accent: 'from-violet-500/20 to-violet-500/0',
  },
  {
    title: 'Format studio',
    description:
      'Paste any dataset to benchmark CSV, JSON, Markdown, and TOML by actual tokenizer cost.',
    icon: SplitSquareHorizontal,
    accent: 'from-cyan-500/20 to-cyan-500/0',
  },
  {
    title: 'Client-side, private',
    description:
      'No API calls or uploads — everything runs locally, ready for GitHub Pages deployments.',
    icon: BarChart3,
    accent: 'from-emerald-500/20 to-emerald-500/0',
  },
]

const HomePage = () => {
  return (
    <div className="px-4 py-12 sm:px-6">
      <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        <span className="rounded-full border border-slate-800/60 bg-slate-900/60 px-4 py-1 text-sm font-semibold text-amber-200">
          Sleek GPT token intelligence
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Measure tokens like a pro.
        </h1>
        <p className="max-w-3xl text-lg text-slate-300">
          Tokens Codex pairs a luxurious shadcn UI with exact GPT token math. Explore prompts, audit
          datasets, and prepare content for deployment without leaving your browser.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/tokenizer">
              Launch Tokenizer
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link to="/compare">Open Format Studio</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-900/40 text-left text-slate-100"
          >
            <CardContent className="space-y-4 p-6">
              <div className={cn('inline-flex rounded-full p-3', feature.accent)}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{feature.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mx-auto mt-16 max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-left text-slate-200 shadow-xl">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Workflows</p>
            <h2 className="mt-4 text-3xl font-bold text-white">Built for prompt engineers</h2>
            <p className="mt-4 text-slate-400">
              Jump from ideation to implementation faster. Tokens Codex lets you evaluate prompt
              costs, find efficient formats, and present insights in a refined UI suitable for client
              demos or internal tooling.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {['Prompt design', 'Dataset cleaning', 'Cost estimates', 'Docs QA'].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-slate-700 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-slate-300"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
            <p className="text-sm text-slate-400">Inside the suite</p>
            <ul className="mt-4 space-y-4">
              <HomeListItem title="Tokenizer Playground">
                Fully client-side, golden-ratio colors, live token/char/word counts, and responsive layout.
              </HomeListItem>
              <HomeListItem title="Format Comparison">
                Upload CSV/JSON/Markdown/TOML, auto-parse with PapaParse, and compare tokens visually.
              </HomeListItem>
              <HomeListItem title="Dark-first aesthetic">
                Tailwind + shadcn styling with a theme toggle to stay comfortable in any setting.
              </HomeListItem>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

const HomeListItem = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <li className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4">
    <p className="text-base font-semibold text-white">{title}</p>
    <p className="text-sm text-slate-400">{children}</p>
  </li>
)

export { HomePage }
