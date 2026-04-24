import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Plus } from 'lucide-react'
import { commandExecutor } from '@/logic/commands/CommandExecutor'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/stores/useStore'

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    imageUrl: string
    category: string
  }
}

const ProductCard = observer(({ product }: ProductCardProps) => {
  const { wishlist } = useStore()
  const isWishlisted = wishlist.items.some((item) => item?.id === product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    commandExecutor.execute('cart.add', { product })
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    wishlist.toggleItem(product)
  }

  return (
    <Card className="group border-none bg-transparent shadow-none overflow-visible font-sans">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary/30">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          
          {/* Action Overlay */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <Button 
            variant="ghost"
            size="icon"
            className={`absolute top-4 right-4 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background ${isWishlisted ? 'text-red-500' : ''}`}
            onClick={handleToggleWishlist}
          >
            <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
          </Button>

          <Button 
            size="icon" 
            className="absolute bottom-6 right-6 h-12 w-12 rounded-none bg-background text-primary opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-primary hover:text-primary-foreground shadow-xl"
            onClick={handleAddToCart}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        
        <CardContent className="px-0 pt-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase leading-none">
                {product.category}
              </p>
              <h3 className="text-[13px] font-bold tracking-tight uppercase leading-tight group-hover:underline underline-offset-4 decoration-border/60">
                {product.name}
              </h3>
            </div>
            <span className="font-serif text-lg leading-none pt-1">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
})

export default ProductCard
