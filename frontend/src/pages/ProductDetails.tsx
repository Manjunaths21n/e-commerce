import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/stores/useStore'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ShoppingBag, Heart, ChevronLeft, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react'
import { commandExecutor } from '@/logic/commands/CommandExecutor'

const ProductDetails = observer(() => {
  const { id } = useParams()
  const { product, wishlist } = useStore()

  useEffect(() => {
    const foundProduct = product.products.find(p => p.id === id)
    if (foundProduct) {
      product.selectedProduct = foundProduct
    }
  }, [id, product])

  const selectedProduct = product.selectedProduct

  if (!selectedProduct) {
    return (
      <div className="container mx-auto px-6 py-32 text-center font-sans">
        <h2 className="text-3xl font-serif mb-6">Piece not found</h2>
        <Button asChild variant="link" className="text-[10px] font-bold tracking-widest uppercase underline underline-offset-8">
          <Link to="/products">Return to Collection</Link>
        </Button>
      </div>
    )
  }

  const isWishlisted = wishlist.items.some((item) => item?.id === selectedProduct.id)

  const handleAddToCart = () => {
    commandExecutor.execute('cart.add', { product: selectedProduct })
  }

  const handleToggleWishlist = () => {
    wishlist.toggleItem(selectedProduct)
  }

  return (
    <div className="bg-background min-h-screen font-sans pb-24">
      <div className="container mx-auto px-6 py-12">
        <Button variant="ghost" asChild className="pl-0 hover:bg-transparent text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground/60 hover:text-primary transition-colors mb-12">
          <Link to="/products" className="flex items-center gap-2">
            <ChevronLeft className="w-3.5 h-3.5" />
            Back to Collection
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          {/* Product Image Gallery Placeholder */}
          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-[4/5] bg-secondary/30 overflow-hidden group">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
               <div className="aspect-square bg-secondary/20" />
               <div className="aspect-square bg-secondary/20" />
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <Badge variant="outline" className="border-primary/20 text-[9px] tracking-[0.3em] uppercase px-3 py-0.5 rounded-none font-bold">
                {selectedProduct.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif tracking-tight leading-tight uppercase">
                {selectedProduct.name}
              </h1>
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-1 text-primary">
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <Star className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground underline underline-offset-4 cursor-pointer hover:text-primary transition-colors">
                  128 REVIEWS
                </span>
              </div>
            </div>

            <div className="text-3xl font-serif tracking-tight">
              ${selectedProduct.price.toFixed(2)}
            </div>

            <div className="space-y-6">
              <p className="text-muted-foreground text-sm leading-relaxed tracking-wide font-light border-l-2 border-border/40 pl-6 py-1">
                {selectedProduct.description || "This premium piece is designed to provide exceptional quality and value. Crafted with meticulous attention to detail, it's the perfect addition to a refined collection."}
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="flex-grow h-14 rounded-none text-[11px] font-bold tracking-[0.2em] shadow-2xl hover:translate-y-[-2px] transition-transform" 
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  ADD TO CART
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className={`h-14 w-14 rounded-none border-border/60 hover:bg-secondary/50 ${isWishlisted ? 'text-red-500 border-red-200' : ''}`}
                  onClick={handleToggleWishlist}
                >
                  <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
                </Button>
              </div>
              <p className="text-[9px] text-center text-muted-foreground tracking-[0.1em] font-medium">
                ESTIMATED DELIVERY: 3-5 BUSINESS DAYS
              </p>
            </div>

            <Separator className="bg-border/40" />

            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4 group">
                <div className="mt-1 p-2 bg-secondary/40 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold tracking-widest uppercase">Complimentary Shipping</p>
                  <p className="text-[11px] text-muted-foreground font-light tracking-wide leading-relaxed">
                    Enjoy free standard delivery on all orders over $150.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="mt-1 p-2 bg-secondary/40 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold tracking-widest uppercase">Seamless Returns</p>
                  <p className="text-[11px] text-muted-foreground font-light tracking-wide leading-relaxed">
                    30-day window for hassle-free returns and exchanges.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="mt-1 p-2 bg-secondary/40 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold tracking-widest uppercase">Secure Transaction</p>
                  <p className="text-[11px] text-muted-foreground font-light tracking-wide leading-relaxed">
                    Your payment information is processed securely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default ProductDetails
