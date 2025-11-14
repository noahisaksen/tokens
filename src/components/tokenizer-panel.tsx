import { useMemo, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { getColorForIndex, tokenize } from '@/lib/token-helpers'

const DEFAULT_TEXT = `Welcome to Tokens Codex.

Paste any prompt, document, or dataset to visualize how GPT tokenizes your text in real time.`

const TokenizerPanel = () => {
  const [text, setText] = useState(DEFAULT_TEXT)

  const segments = useMemo(() => tokenize(text), [text])
  const charCount = text.length
  const wordCount = useMemo(() => {
    if (!text.trim()) return 0
    return text.trim().split(/\s+/).length
  }, [text])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="h-full border-slate-200">
        <CardHeader className="space-y-2">
          <Badge variant="secondary" className="w-fit text-xs uppercase tracking-wide">
            Input
          </Badge>
          <CardTitle className="text-2xl font-semibold">Tokenizer Playground</CardTitle>
          <CardDescription>
            Type or paste content to see how GPT&apos;s tokenizer interprets every symbol and whitespace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="min-h-[420px]"
            placeholder="Type or paste your text..."
          />
        </CardContent>
      </Card>

      <Card className="h-full border-slate-200">
        <CardHeader className="space-y-2">
          <Badge variant="secondary" className="w-fit text-xs uppercase tracking-wide">
            Tokens
          </Badge>
          <CardTitle className="flex flex-wrap items-center gap-3 text-2xl">
            {segments.length.toLocaleString()} tokens
            <span className="text-base font-normal text-muted-foreground">
              / {charCount.toLocaleString()} characters · {wordCount.toLocaleString()} words
            </span>
          </CardTitle>
          <CardDescription>
            Each token is color-coded based on its position, helping you understand how the tokenizer chunks your text.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <ScrollArea className="h-[420px] rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-4">
            {segments.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Tokens will show up here as soon as you start typing.
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {segments.map((segment, index) => {
                  const colors = getColorForIndex(index)
                  return (
                    <span
                      key={`${segment.id}-${index}`}
                      style={{
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                        color: colors.text,
                      }}
                      className="rounded-lg border px-3 py-1 text-sm font-semibold leading-relaxed tracking-tight"
                    >
                      {segment.text}
                    </span>
                  )
                })}
              </div>
            )}
          </ScrollArea>

          <div className="grid gap-3 sm:grid-cols-3">
            <Stat label="Tokens" value={segments.length} />
            <Stat label="Characters" value={charCount} />
            <Stat label="Words" value={wordCount} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const Stat = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
    <p className="text-2xl font-semibold text-slate-900">{value.toLocaleString()}</p>
  </div>
)

export { TokenizerPanel }
