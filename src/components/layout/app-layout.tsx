import { Outlet } from 'react-router-dom'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'

const AppLayout = () => (
  <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
    <SiteHeader />
    <main className="flex-1 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Outlet />
    </main>
    <SiteFooter />
  </div>
)

export { AppLayout }
