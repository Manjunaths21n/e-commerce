import { Separator } from '../ui/separator'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-secondary/20 border-t border-border/40 py-24 font-sans">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 mb-20">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="font-serif text-3xl tracking-tight uppercase">E-COM</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-xs">
              A meticulously curated collection of high-performance items, blending timeless aesthetics with modern functionality for the discerning individual.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary/60">COLLECTIONS</h4>
            <ul className="text-[11px] space-y-4 font-bold tracking-widest uppercase text-muted-foreground">
              <li><Link to="/products" className="hover:text-primary transition-colors">NEW ARRIVALS</Link></li>
              <li><Link to="/products" className="hover:text-primary transition-colors">ACCESSORIES</Link></li>
              <li><Link to="/products" className="hover:text-primary transition-colors">EDITORIAL</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary/60">BOUTIQUE</h4>
            <ul className="text-[11px] space-y-4 font-bold tracking-widest uppercase text-muted-foreground">
              <li><Link to="/profile" className="hover:text-primary transition-colors">MY ACCOUNT</Link></li>
              <li><Link to="/wishlist" className="hover:text-primary transition-colors">WISHLIST</Link></li>
              <li><Link to="/cart" className="hover:text-primary transition-colors">SHOPPING BAG</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary/60">NEWSLETTER</h4>
            <p className="text-xs text-muted-foreground font-light italic">Subscribe to receive updates on new curated pieces and studio releases.</p>
            <div className="flex gap-4 border-b border-border/60 pb-2 group focus-within:border-primary transition-colors">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-none text-[10px] tracking-widest outline-none flex-grow placeholder:text-muted-foreground/40 font-bold"
              />
              <button className="text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-60 transition-opacity">JOIN</button>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <Separator className="bg-border/40" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[9px] font-bold tracking-[0.4em] text-muted-foreground uppercase leading-none">
              © 2026 BOUTIQUE CURATION. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-8 text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase leading-none">
               <a href="#" className="hover:text-primary transition-colors">PRIVACY POLICY</a>
               <a href="#" className="hover:text-primary transition-colors">TERMS OF SERVICE</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
