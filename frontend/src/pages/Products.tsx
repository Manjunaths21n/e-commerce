import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/stores/useStore'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

const MOCK_PRODUCTS = [
  { id: '1', name: 'Wireless Headphones', price: 299.99, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', category: 'Electronics', description: 'High-quality wireless headphones.' },
  { id: '2', name: 'Leather Watch', price: 149.50, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', category: 'Accessories', description: 'Elegant leather watch.' },
  { id: '3', name: 'Water Bottle', price: 35.00, imageUrl: 'https://images.unsplash.com/photo-1602143307185-84e05b399230?w=500&q=80', category: 'Lifestyle', description: 'Durable water bottle.' },
  { id: '4', name: 'Cotton T-Shirt', price: 45.00, imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80', category: 'Apparel', description: 'Comfortable cotton t-shirt.' },
  { id: '5', name: 'Smartphone', price: 899.00, imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80', category: 'Electronics', description: 'Powerful smartphone.' },
  { id: '6', name: 'Backpack', price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80', category: 'Accessories', description: 'Spacious backpack.' },
]

const Products = observer(() => {
  const { product } = useStore()

  useEffect(() => {
    if (product.products.length === 0) {
      product.setProducts(MOCK_PRODUCTS)
    }
  }, [product])

  const filteredProducts = product.products.filter(p => 
    p.name.toLowerCase().includes(product.searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(product.searchQuery.toLowerCase())
  )

  return (
    <div className="bg-background min-h-screen font-sans">
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="space-y-4 text-left">
            <Badge variant="outline" className="border-primary/20 text-[10px] tracking-[0.3em] uppercase px-3 py-0.5">
              Catalogue
            </Badge>
            <h1 className="text-5xl md:text-6xl font-serif tracking-tight">Our Collection</h1>
            <p className="text-muted-foreground max-w-md text-sm tracking-wide leading-relaxed font-sans">
              A curated selection of high-performance items, blending timeless aesthetics with modern functionality.
            </p>
          </div>
          
          <div className="flex items-center gap-6 pb-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold tracking-widest text-muted-foreground">SORT BY</span>
              <Select id="sort" className="w-[160px] border-none bg-transparent text-[11px] font-bold tracking-wider focus:ring-0 cursor-pointer">
                <option value="featured">FEATURED</option>
                <option value="newest">NEWEST</option>
                <option value="price-low">PRICE: LOW TO HIGH</option>
                <option value="price-high">PRICE: HIGH TO LOW</option>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-10">
            <div className="space-y-6">
              <h3 className="text-[11px] font-bold tracking-[0.2em] flex items-center gap-2 border-b border-border/60 pb-3">
                CATEGORIES
              </h3>
              <div className="space-y-3">
                {['ALL', 'ELECTRONICS', 'APPAREL', 'ACCESSORIES', 'LIFESTYLE'].map(cat => (
                  <label key={cat} className="flex items-center gap-3 group cursor-pointer">
                    <div className="h-4 w-4 border border-border group-hover:border-primary transition-colors flex items-center justify-center">
                      <div className="h-2 w-2 bg-primary scale-0 group-has-[:checked]:scale-100 transition-transform" />
                    </div>
                    <input type="checkbox" className="hidden" />
                    <span className="text-[11px] font-medium tracking-widest text-muted-foreground group-hover:text-primary transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-[11px] font-bold tracking-[0.2em] border-b border-border/60 pb-3 uppercase">
                Price Range
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-muted-foreground tracking-widest">MIN</span>
                  <Input type="number" placeholder="0" className="h-10 rounded-none border-border/60 bg-transparent text-xs focus-visible:ring-1 focus-visible:ring-primary/20" />
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-muted-foreground tracking-widest">MAX</span>
                  <Input type="number" placeholder="1000" className="h-10 rounded-none border-border/60 bg-transparent text-xs focus-visible:ring-1 focus-visible:ring-primary/20" />
                </div>
              </div>
            </div>

            <Button className="w-full h-12 rounded-none text-[10px] font-bold tracking-[0.2em] mt-4 shadow-xl hover:translate-y-[-2px] transition-transform">
              APPLY FILTERS
            </Button>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-16 gap-x-8">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 border border-dashed border-border/60">
                <p className="font-serif text-2xl italic text-muted-foreground">No matches found</p>
                <Button 
                  variant="link" 
                  className="text-[10px] font-bold tracking-widest mt-4 underline underline-offset-4"
                  onClick={() => product.setSearchQuery('')}
                >
                  CLEAR SEARCH
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

export default Products
