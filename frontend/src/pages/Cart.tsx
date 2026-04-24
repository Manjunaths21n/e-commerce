import { observer } from 'mobx-react-lite'
import { useStore } from '@/stores/useStore'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { commandExecutor } from '@/logic/commands/CommandExecutor'
import { Link } from 'react-router-dom'

interface CartItemRowProps {
  item: {
    product: {
      id: string
      name: string
      price: number
      imageUrl: string
      category: string
    }
    quantity: number
  }
}

const CartItemRow = observer(({ item }: CartItemRowProps) => {
  return (
    <div className="flex gap-8 py-10 first:pt-0 group font-sans">
      <div className="w-32 h-40 bg-secondary/30 overflow-hidden shrink-0">
        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex-grow flex flex-col justify-between py-1">
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-4">
             <div className="space-y-1">
                <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase leading-none">
                  {item.product.category}
                </p>
                <h3 className="text-sm font-bold tracking-tight uppercase leading-tight group-hover:underline underline-offset-4 decoration-border/60">
                  {item.product.name}
                </h3>
             </div>
             <p className="font-serif text-lg">${(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center border border-border/60">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-none hover:bg-secondary/50"
              onClick={() =>
                commandExecutor.execute('cart.updateQuantity', {
                  productId: item.product.id,
                  quantity: item.quantity - 1,
                })
              }
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-none hover:bg-secondary/50"
              onClick={() =>
                commandExecutor.execute('cart.updateQuantity', {
                  productId: item.product.id,
                  quantity: item.quantity + 1,
                })
              }
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground/60 hover:text-destructive text-[10px] font-bold tracking-widest uppercase gap-2 hover:bg-transparent"
            onClick={() => commandExecutor.execute('cart.remove', item.product.id)}
          >
            <Trash2 className="w-3.5 h-3.5" />
            REMOVE
          </Button>
        </div>
      </div>
    </div>
  )
})

const Cart = observer(() => {
  const { cart } = useStore()

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-32 text-center space-y-8 font-sans">
        <div className="flex justify-center opacity-20">
          <ShoppingBag className="w-24 h-24 stroke-[1]" />
        </div>
        <div className="space-y-3">
           <h2 className="text-4xl font-serif tracking-tight">Your bag is empty</h2>
           <p className="text-muted-foreground font-light tracking-wide italic">Discover our latest arrivals and find your next piece.</p>
        </div>
        <Button asChild size="lg" className="h-14 px-12 rounded-none text-[11px] font-bold tracking-[0.25em] mt-6">
          <Link to="/products">START EXPLORING</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen font-sans pb-24">
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-20 text-center uppercase underline decoration-1 underline-offset-[16px] decoration-border/60">Shopping Bag</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 xl:gap-32 max-w-7xl mx-auto">
          {/* Cart Items List */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-border/40">
              {cart.items.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>
            <div className="pt-10 border-t border-border/40 flex justify-between items-center">
               <Button variant="ghost" asChild className="pl-0 hover:bg-transparent text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60 hover:text-primary">
                  <Link to="/products" className="flex items-center gap-2">
                     <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                     Continue Shopping
                  </Link>
               </Button>
               <Button 
                  variant="ghost" 
                  className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60 hover:text-destructive"
                  onClick={() => commandExecutor.execute('cart.clear')}
                >
                  Clear All
               </Button>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-5">
            <Card className="rounded-none border-none bg-secondary/20 shadow-none sticky top-32">
              <CardContent className="p-10 space-y-8">
                <h2 className="text-xl font-bold tracking-[0.2em] uppercase border-b border-border/60 pb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm tracking-wide">
                    <span className="text-muted-foreground font-light">Subtotal</span>
                    <span className="font-bold">${cart.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm tracking-wide">
                    <span className="text-muted-foreground font-light">Shipping</span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-primary/60 italic pt-1">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-sm tracking-wide">
                    <span className="text-muted-foreground font-light">Tax</span>
                    <span className="font-bold">$0.00</span>
                  </div>
                </div>

                <Separator className="bg-border/60" />
                
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold tracking-[0.1em] uppercase">Total</span>
                  <span className="text-3xl font-serif tracking-tight">${cart.totalPrice.toFixed(2)}</span>
                </div>

                <div className="space-y-4 pt-4">
                  <Button className="w-full h-14 rounded-none text-[11px] font-bold tracking-[0.25em] shadow-xl hover:translate-y-[-2px] transition-transform" size="lg" asChild>
                    <Link to="/checkout">PROCEED TO CHECKOUT</Link>
                  </Button>
                  <p className="text-[10px] text-center text-muted-foreground tracking-widest font-light italic uppercase">
                    Tax & discounts calculated in next steps
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Cart
