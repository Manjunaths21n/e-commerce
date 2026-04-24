import { Link } from 'react-router-dom'
import { Search, ShoppingBag, Heart, User } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { useStore } from '@/stores/useStore'
import { observer } from 'mobx-react-lite'
import { commandExecutor } from '@/logic/commands/CommandExecutor'

const Navbar = observer(() => {
  const { cart, wishlist } = useStore()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    commandExecutor.execute('product.search', e.target.value)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl font-sans">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* BRAND */}
        <div className="flex items-center gap-12">
          <Link to="/" className="font-serif text-3xl tracking-tight">
            E-COM
          </Link>
          <div className="hidden items-center gap-8 text-[11px] font-bold tracking-[0.2em] md:flex">
            <Link to="/products" className="hover:opacity-60 transition-opacity uppercase text-primary">Collections</Link>
            <Link to="/" className="hover:opacity-60 transition-opacity uppercase text-muted-foreground/60">Editorial</Link>
            <Link to="/" className="hover:opacity-60 transition-opacity uppercase text-muted-foreground/60">About</Link>
          </div>
        </div>

        {/* SEARCH & ACTIONS */}
        <div className="flex items-center gap-6">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="SEARCH CATALOGUE..." 
              className="h-9 w-64 border-none bg-secondary/50 pl-10 text-[10px] tracking-widest focus-visible:ring-1 focus-visible:ring-primary/20"
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-secondary">
              <Link to="/wishlist">
                <Heart className={`h-4 w-4 stroke-[1.5] ${wishlist.items.length > 0 ? 'fill-primary' : ''}`} />
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-secondary relative">
              <Link to="/cart">
                <ShoppingBag className="h-4 w-4 stroke-[1.5]" />
                {cart.totalItems > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-4 min-w-[16px] border-none bg-primary px-1 text-[9px] text-primary-foreground flex items-center justify-center">
                    {cart.totalItems}
                  </Badge>
                )}
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-secondary">
              <Link to="/profile">
                <User className="h-4 w-4 stroke-[1.5]" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
})

export default Navbar
