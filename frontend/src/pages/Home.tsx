import { Link } from 'react-router-dom'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'ESSENTIAL SERIF WATCH',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    category: 'Electronics',
    description: 'A masterpiece of timing.',
  },
  {
    id: '2',
    name: 'MINIMALIST LEATHER BAG',
    price: 149.5,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    category: 'Accessories',
    description: 'Form meets function.',
  },
  {
    id: '3',
    name: 'STRUCTURAL FLASK',
    price: 35.0,
    imageUrl: 'https://images.unsplash.com/photo-1602143307185-84e05b399230?w=800&q=80',
    category: 'Lifestyle',
    description: 'Perfectly balanced.',
  },
  {
    id: '4',
    name: 'ARCHITECTURAL TEE',
    price: 45.0,
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
    category: 'Apparel',
    description: 'The foundation of a wardrobe.',
  },
]

const Home = () => {
  return (
    <div className="space-y-0 pb-12 bg-background overflow-hidden">
      {/* EDITORIAL HERO SECTION */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-20%,#F2F2F2,transparent_70%)] opacity-50" />
        
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out flex flex-col items-center">
          <Badge variant="outline" className="mb-10 border-primary/20 px-4 py-1 text-[10px] font-bold tracking-[0.4em] uppercase">
            Curated Collection 2026
          </Badge>
          <h1 className="max-w-5xl font-serif text-7xl md:text-9xl leading-[1.05] tracking-tighter uppercase">
            Elevate Your <br /> 
            <span className="italic opacity-60 underline decoration-1 underline-offset-[12px] lowercase font-medium">Everyday</span>
          </h1>
          <p className="mx-auto mt-12 max-w-lg text-lg text-muted-foreground/80 leading-relaxed font-sans font-light tracking-wide">
            A meticulous selection of premium items designed for the modern lifestyle.
            Timeless aesthetics meet exceptional craftsmanship.
          </p>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-10">
            <Button size="lg" asChild className="h-16 px-12 text-[11px] font-bold tracking-[0.25em] rounded-none shadow-2xl hover:translate-y-[-2px] transition-transform duration-300">
              <Link to="/products">SHOP THE COLLECTION</Link>
            </Button>
            <Button variant="link" className="group flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] h-auto p-0">
              EXPLORE EDITORIAL
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS (Editorial Grid) */}
      <section className="container mx-auto px-6 py-32 border-t border-border/40">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
          <div className="space-y-4">
            <h2 className="font-serif text-5xl md:text-6xl tracking-tight">Featured Pieces</h2>
            <p className="text-muted-foreground tracking-[0.2em] text-[10px] font-bold uppercase">Our current favorites from the studio</p>
          </div>
          <Button variant="ghost" asChild className="text-[11px] font-bold tracking-widest underline underline-offset-8 decoration-border/40 hover:decoration-primary/40 transition-colors h-auto p-0 pb-2">
            <Link to="/products">VIEW ALL COLLECTIONS</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CATEGORY EXPLORATION (Minimalist Blocks) */}
      <section className="bg-secondary/20 py-32">
        <div className="container mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-serif tracking-tight">Shop by Category</h2>
            <p className="text-muted-foreground tracking-[0.2em] text-[10px] font-bold uppercase">Fine items for every corner of your life</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40">
            {['ELECTRONICS', 'APPAREL', 'ACCESSORIES', 'LIFESTYLE'].map((category) => (
              <div key={category} className="group relative aspect-square bg-background flex items-center justify-center p-12 overflow-hidden transition-colors hover:bg-primary duration-500">
                <span className="text-[11px] font-bold tracking-[0.3em] group-hover:text-primary-foreground transition-colors z-10">{category}</span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <ArrowRight className="absolute bottom-8 right-8 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-[-4px] transition-all text-primary-foreground z-10" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
