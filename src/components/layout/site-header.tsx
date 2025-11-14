import { Link, NavLink } from 'react-router-dom'

import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'

const SiteHeader = () => (
  <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
      <Link to="/" className="text-lg font-semibold tracking-tight text-foreground">
        Tokens
      </Link>

      <nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
        <HeaderLink to="/">Home</HeaderLink>
        <HeaderLink to="/tokenizer">Tokenizer</HeaderLink>
        <HeaderLink to="/compare">Format Studio</HeaderLink>
      </nav>

      <ThemeToggle />
    </div>
  </header>
)

const HeaderLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        'transition-colors hover:text-foreground',
        isActive ? 'text-foreground' : 'text-muted-foreground',
      )
    }
  >
    {children}
  </NavLink>
)

export { SiteHeader }
