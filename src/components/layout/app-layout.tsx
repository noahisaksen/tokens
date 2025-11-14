import { Outlet } from 'react-router-dom'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'

const AppLayout = () => (
  <div className="flex min-h-screen flex-col bg-background text-foreground">
    <SiteHeader />
    <main className="flex-1 bg-background">
      <Outlet />
    </main>
    <SiteFooter />
  </div>
)

export { AppLayout }
