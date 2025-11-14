import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, SplitSquareHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const HomePage = () => {
  return (
    <div className="px-4 py-12 sm:px-6">
      <section className="mx-auto flex max-w-4xl flex-col gap-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          GPT token utilities
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Practical tools. Zero fluff.</h1>
        <p className="text-lg text-muted-foreground">
          Tokens Codex keeps things simple: a tokenizer that mirrors GPT exactly and a comparison studio
          for structured data. Everything runs locally so you can trust the counts.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/tokenizer">
              Open Tokenizer
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link to="/compare">Go to Format Studio</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
        <ToolCard
          title="Tokenizer"
          description="Inspect prompts or docs with the official cl100k_base tokenizer. Instant stats, no API calls."
          icon={<Sparkles className="h-5 w-5 text-primary" />}
          link="/tokenizer"
        />
        <ToolCard
          title="Format Studio"
          description="Paste CSV/JSON/Markdown/TOML and benchmark token cost with consistent parsing."
          icon={<SplitSquareHorizontal className="h-5 w-5 text-primary" />}
          link="/compare"
        />
      </section>
    </div>
  )
}

const ToolCard = ({
  title,
  description,
  icon,
  link,
}: {
  title: string
  description: string
  icon: ReactNode
  link: string
}) => (
  <Card className="border-border bg-card">
    <CardHeader className="flex flex-row items-center gap-3">
      <div className="rounded-md bg-muted p-2 text-primary">{icon}</div>
      <div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </CardHeader>
    <CardContent>
      <Button asChild variant="outline" size="sm">
        <Link to={link}>Launch</Link>
      </Button>
    </CardContent>
  </Card>
)

export { HomePage }
