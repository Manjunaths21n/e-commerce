import { observer } from 'mobx-react-lite'
import { useStore } from '@/stores/useStore'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { Heart, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Wishlist = observer(() => {
  const { wishlist } = useStore()

  if (wishlist.items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-32 text-center space-y-8 font-sans bg-background min-h-screen">
        <div className="flex justify-center opacity-20">
          <Heart className="w-24 h-24 stroke-[1]" />
        </div>
        <div className="space-y-3">
           <h2 className="text-4xl font-serif tracking-tight uppercase">Wishlist Empty</h2>
           <p className="text-muted-foreground font-light tracking-wide italic">Save your favorite pieces to keep them in view.</p>
        </div>
        <Button asChild size="lg" className="h-14 px-12 rounded-none text-[11px] font-bold tracking-[0.25em] mt-6 shadow-xl">
          <Link to="/products">BROWSE COLLECTION</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen font-sans pb-24">
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-serif tracking-tight uppercase">My Wishlist</h1>
            <p className="text-muted-foreground tracking-[0.2em] text-[10px] font-bold uppercase">Your curated selection of personal favorites</p>
          </div>
          <Button variant="ghost" asChild className="text-[11px] font-bold tracking-widest underline underline-offset-8 decoration-border/40 hover:decoration-primary/40 transition-colors h-auto p-0 pb-2">
            <Link to="/products" className="flex items-center gap-2">
              Continue Shopping
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
          {wishlist.items.map((product) => {
            if (!product) return null
            return (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  imageUrl: product.imageUrl,
                  category: product.category,
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
})

export default Wishlist
