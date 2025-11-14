import { Route, Routes } from 'react-router-dom'

import { AppLayout } from '@/components/layout/app-layout'
import { FormatStudioPage } from '@/pages/compare'
import { HomePage } from '@/pages/home'
import { TokenizerPage } from '@/pages/tokenizer'

const App = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/tokenizer" element={<TokenizerPage />} />
      <Route path="/compare" element={<FormatStudioPage />} />
    </Route>
  </Routes>
)

export default App
