import { Sparkles, SplitSquareHorizontal } from 'lucide-react'

import { FormatComparison } from '@/components/format-comparison'
import { TokenizerPanel } from '@/components/tokenizer-panel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6">
        <header className="space-y-4 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1 text-sm font-medium text-slate-600 shadow-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            Tokens Codex
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Sleek token visualizer for GPT workflows
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg">
              Explore how GPT tokenizes your text and compare dataset formats with a polished shadcn-powered UI.
            </p>
          </div>
        </header>

        <Tabs defaultValue="tokenizer" className="w-full">
          <TabsList className="mx-auto grid w-full max-w-lg grid-cols-2 bg-white shadow-sm">
            <TabsTrigger value="tokenizer" className="gap-2 text-sm">
              <Sparkles className="h-4 w-4" />
              Tokenizer
            </TabsTrigger>
            <TabsTrigger value="compare" className="gap-2 text-sm">
              <SplitSquareHorizontal className="h-4 w-4" />
              Format Studio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tokenizer">
            <TokenizerPanel />
          </TabsContent>

          <TabsContent value="compare">
            <FormatComparison />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App
