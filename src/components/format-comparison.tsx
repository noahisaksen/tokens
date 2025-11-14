import { useMemo, useState } from 'react'
import Papa from 'papaparse'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { countTokens, getColorForIndex, tokenize, type TokenSegment } from '@/lib/token-helpers'

type RecordData = Record<string, string | number | boolean | null>

type FormatResult = {
  name: string
  content: string
  tokens: number
  segments: TokenSegment[]
}

const DEFAULT_DATA = `name,age,team
Ada Lovelace,32,Analytical Engines
Alan Turing,41,Bletchley Park
Margaret Hamilton,35,Apollo`

const FormatComparison = () => {
  const [input, setInput] = useState(DEFAULT_DATA)

  const { results, error } = useMemo(() => {
    const text = input.trim()
    if (!text) {
      return { results: [] as FormatResult[], error: '' }
    }

    const format = detectFormat(text)
    const parsed = parseData(text, format)

    if (!parsed || parsed.length === 0) {
      return {
        results: [] as FormatResult[],
        error: 'We could not parse the input. Please double-check the structure.',
      }
    }

    const formats = [
      { name: 'CSV', content: dataToCSV(parsed) },
      { name: 'JSON', content: dataToJSON(parsed) },
      { name: 'Markdown Table', content: dataToMarkdown(parsed) },
      { name: 'TOML', content: dataToTOML(parsed) },
    ]

    const enriched = formats.map((format) => ({
      ...format,
      tokens: countTokens(format.content),
      segments: tokenize(format.content),
    }))

    return { results: enriched, error: '' }
  }, [input])

  const chartResults = useMemo(() => {
    if (!results.length) return []
    return [...results].sort((a, b) => a.tokens - b.tokens)
  }, [results])

  const largestTokenValue = chartResults.length
    ? Math.max(...chartResults.map((entry) => entry.tokens))
    : 0

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card">
        <CardHeader className="space-y-2">
          <Badge variant="secondary" className="w-fit text-xs uppercase tracking-wide">
            Dataset
          </Badge>
          <CardTitle className="text-2xl">Format Comparison Lab</CardTitle>
          <CardDescription>
            Drop in CSV, JSON, Markdown, or TOML. We&apos;ll normalize it and show how many tokens each format uses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Paste CSV, JSON, Markdown table, or TOML data..."
            className="min-h-[240px]"
          />
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>

      {results.length === 0 && !error ? (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center text-muted-foreground">
          Provide a dataset above to generate comparisons.
        </div>
      ) : null}

      {results.length > 0 && (
        <div className="grid gap-4 lg:grid-cols-2">
          {results.map((result) => (
            <Card key={result.name} className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-xl">{result.name}</CardTitle>
                  <CardDescription>Token-friendly view of your dataset.</CardDescription>
                </div>
                <Badge>{result.tokens.toLocaleString()} tokens</Badge>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[260px] rounded-lg border border-border bg-muted/40 p-4">
                  <pre className="whitespace-pre-wrap text-sm font-mono leading-6 text-foreground">
                    {result.segments.map((segment, index) => {
                      const colors = getColorForIndex(index)
                      return (
                        <span
                          key={`${result.name}-${index}`}
                          style={{
                            backgroundColor: colors.background,
                            borderColor: colors.border,
                            color: colors.text,
                          }}
                          className="rounded border px-1 py-0.5"
                        >
                          {segment.text}
                        </span>
                      )
                    })}
                  </pre>
                </ScrollArea>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {chartResults.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader className="space-y-2">
            <CardTitle>Token usage by format</CardTitle>
            <CardDescription>Find the most efficient storage format for your dataset.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {chartResults.map((item) => {
              const width =
                largestTokenValue === 0 ? 0 : Math.max((item.tokens / largestTokenValue) * 100, 5)
              return (
                <div
                  key={item.name}
                  className="flex items-center gap-4 text-sm font-medium text-foreground"
                >
                  <div className="w-32 text-muted-foreground">{item.name}</div>
                  <div className="flex flex-1 items-center gap-3">
                    <div className="h-2 flex-1 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                    <span className="w-24 text-right text-xs text-muted-foreground">
                      {item.tokens.toLocaleString()} tokens
                    </span>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

const detectFormat = (text: string) => {
  const trimmed = text.trim()
  try {
    JSON.parse(trimmed)
    return 'json'
  } catch {
    // not JSON
  }

  if ((trimmed.includes('[[') && trimmed.includes(']]')) || /\w+\s*=\s*/.test(trimmed)) {
    return 'toml'
  }

  if (trimmed.includes('|') && trimmed.split('\n').some((line) => line.includes('---'))) {
    return 'markdown'
  }

  return 'csv'
}

const parseData = (text: string, format: string): RecordData[] | null => {
  switch (format) {
    case 'json':
      return parseJSON(text)
    case 'toml':
      return parseTOML(text)
    case 'markdown':
      return parseMarkdown(text)
    case 'csv':
    default:
      return parseCSV(text)
  }
}

const parseCSV = (text: string): RecordData[] | null => {
  const result = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
  })

  if (result.errors.length > 0 || result.data.length === 0) {
    return null
  }

  return result.data
}

const parseJSON = (text: string): RecordData[] | null => {
  try {
    const data = JSON.parse(text)
    if (Array.isArray(data)) {
      return data as RecordData[]
    }
    return [data as RecordData]
  } catch {
    return null
  }
}

const parseMarkdown = (text: string): RecordData[] | null => {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length < 3) return null

  const headers = lines[0]
    .split('|')
    .map((header) => header.trim())
    .filter(Boolean)

  const entries: RecordData[] = []
  for (let index = 2; index < lines.length; index += 1) {
    const cells = lines[index]
      .split('|')
      .map((cell) => cell.trim())
      .filter((cell) => cell !== '')

    if (cells.length === headers.length) {
      const row: RecordData = {}
      headers.forEach((header, headerIndex) => {
        row[header] = cells[headerIndex]
      })
      entries.push(row)
    }
  }

  return entries.length ? entries : null
}

const parseTOML = (text: string): RecordData[] | null => {
  const blocks = text.split('[[records]]').map((block) => block.trim())
  const entries: RecordData[] = []

  blocks.forEach((block) => {
    if (!block) return
    const row: RecordData = {}
    block.split('\n').forEach((line) => {
      const match = line.match(/^(\w+)\s*=\s*(.+)$/)
      if (match) {
        const [, key, rawValue] = match
        let value: string | number = rawValue.trim()
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1)
        } else if (!Number.isNaN(Number(value))) {
          value = Number(value)
        }
        row[key] = value
      }
    })
    if (Object.keys(row).length) {
      entries.push(row)
    }
  })

  return entries.length ? entries : null
}

const dataToCSV = (data: RecordData[]) => {
  const headers = Object.keys(data[0] ?? {})
  const rows = data.map((row) => headers.map((header) => row[header] ?? '').join(','))
  return [headers.join(','), ...rows].join('\n')
}

const dataToJSON = (data: RecordData[]) => JSON.stringify(data, null, 2)

const dataToMarkdown = (data: RecordData[]) => {
  const headers = Object.keys(data[0] ?? {})
  const headerRow = `| ${headers.join(' | ')} |`
  const dashedRow = `| ${headers.map(() => '---').join(' | ')} |`
  const rows = data.map(
    (row) => `| ${headers.map((header) => row[header] ?? '').join(' | ')} |`,
  )
  return [headerRow, dashedRow, ...rows].join('\n')
}

const dataToTOML = (data: RecordData[]) =>
  data
    .map((row) => {
      const entries = Object.entries(row)
        .map(([key, value]) => {
          if (typeof value === 'number') {
            return `${key} = ${value}`
          }
          return `${key} = "${value ?? ''}"`
        })
        .join('\n')
      return `[[records]]\n${entries}`
    })
    .join('\n\n')

export { FormatComparison }
