import { observer } from 'mobx-react-lite'
import { useStore } from '@/stores/useStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ChevronRight, CreditCard, Truck, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const Checkout = observer(() => {
  const { cart, checkout } = useStore()
  const navigate = useNavigate()

  const handleNext = () => {
    if (checkout.step < 3) {
      checkout.setStep(checkout.step + 1)
      window.scrollTo(0, 0)
    } else {
      toast.success('Order placed successfully!')
      cart.clear()
      checkout.setStep(1)
      navigate('/profile')
    }
  }

  const handleBack = () => {
    if (checkout.step > 1) {
      checkout.setStep(checkout.step - 1)
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className="bg-background min-h-screen font-sans pb-24">
      <div className="container mx-auto px-6 py-20 max-w-6xl">
        <h1 className="text-5xl font-serif tracking-tight mb-16 text-center uppercase underline decoration-1 underline-offset-[16px] decoration-border/60">Secure Checkout</h1>
        
        {/* Editorial Stepper */}
        <div className="max-w-xl mx-auto mb-20 flex justify-between relative px-4">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-border/60 -translate-y-1/2 -z-10" />
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center gap-3 bg-background px-4">
              <div
                className={`w-10 h-10 flex items-center justify-center border transition-all duration-500 ${
                  checkout.step >= s ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground'
                }`}
              >
                {checkout.step > s ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-[10px] font-bold">{s}</span>}
              </div>
              <span className={`text-[9px] font-bold tracking-[0.2em] uppercase ${checkout.step >= s ? 'text-primary' : 'text-muted-foreground/40'}`}>
                {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-7">
            {checkout.step === 1 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="space-y-2">
                   <h2 className="text-2xl font-serif tracking-tight flex items-center gap-3">
                     <Truck className="w-5 h-5 stroke-[1.5]" />
                     Shipping Details
                   </h2>
                   <p className="text-[11px] text-muted-foreground tracking-widest uppercase font-bold">Please provide your destination</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-[10px] font-bold tracking-widest uppercase">First Name</Label>
                    <Input id="firstName" placeholder="EX. JOHN" className="rounded-none border-border/60 h-12 text-xs focus-visible:ring-1 focus-visible:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-[10px] font-bold tracking-widest uppercase">Last Name</Label>
                    <Input id="lastName" placeholder="EX. DOE" className="rounded-none border-border/60 h-12 text-xs focus-visible:ring-1 focus-visible:ring-primary/20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-[10px] font-bold tracking-widest uppercase">Delivery Address</Label>
                  <Input id="address" placeholder="123 MAIN STREET, APARTMENT 4B" className="rounded-none border-border/60 h-12 text-xs focus-visible:ring-1 focus-visible:ring-primary/20" />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-[10px] font-bold tracking-widest uppercase">City</Label>
                    <Input id="city" placeholder="NEW YORK" className="rounded-none border-border/60 h-12 text-xs focus-visible:ring-1 focus-visible:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip" className="text-[10px] font-bold tracking-widest uppercase">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" className="rounded-none border-border/60 h-12 text-xs focus-visible:ring-1 focus-visible:ring-primary/20" />
                  </div>
                </div>
                
                <Button className="w-full h-14 rounded-none text-[11px] font-bold tracking-[0.25em] shadow-xl mt-4" onClick={handleNext}>
                  CONTINUE TO PAYMENT
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {checkout.step === 2 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="space-y-2">
                   <h2 className="text-2xl font-serif tracking-tight flex items-center gap-3">
                     <CreditCard className="w-5 h-5 stroke-[1.5]" />
                     Payment Information
                   </h2>
                   <p className="text-[11px] text-muted-foreground tracking-widest uppercase font-bold">Secure encrypted transaction</p>
                </div>

                <div className="space-y-8 bg-secondary/10 p-8 border border-border/40">
                  <div className="space-y-2">
                    <Label htmlFor="card" className="text-[10px] font-bold tracking-widest uppercase">Card Number</Label>
                    <Input id="card" placeholder="0000 0000 0000 0000" className="rounded-none border-border/60 h-12 text-xs bg-background" />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label htmlFor="expiry" className="text-[10px] font-bold tracking-widest uppercase">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" className="rounded-none border-border/60 h-12 text-xs bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-[10px] font-bold tracking-widest uppercase">CVV</Label>
                      <Input id="cvv" placeholder="123" className="rounded-none border-border/60 h-12 text-xs bg-background" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 pt-4">
                  <Button variant="outline" className="flex-1 h-14 rounded-none text-[10px] font-bold tracking-[0.2em] border-border/60 hover:bg-secondary/40" onClick={handleBack}>
                    GO BACK
                  </Button>
                  <Button className="flex-[2] h-14 rounded-none text-[11px] font-bold tracking-[0.25em] shadow-xl" onClick={handleNext}>
                    REVIEW ORDER
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {checkout.step === 3 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
                <div className="space-y-2">
                   <h2 className="text-2xl font-serif tracking-tight flex items-center gap-3">
                     <CheckCircle2 className="w-5 h-5 stroke-[1.5]" />
                     Final Review
                   </h2>
                   <p className="text-[11px] text-muted-foreground tracking-widest uppercase font-bold">Please confirm your selection</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4 p-8 border border-border/40">
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground underline decoration-1 underline-offset-4">Shipping to:</h3>
                    <div className="space-y-1">
                       <p className="text-[11px] font-bold tracking-wide uppercase">John Doe</p>
                       <p className="text-xs text-muted-foreground font-light leading-relaxed">123 Main Street<br />New York, NY 10001<br />United States</p>
                    </div>
                  </div>
                  <div className="space-y-4 p-8 border border-border/40">
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground underline decoration-1 underline-offset-4">Payment:</h3>
                    <div className="space-y-1">
                       <p className="text-[11px] font-bold tracking-wide uppercase">Visa Card</p>
                       <p className="text-xs text-muted-foreground font-light leading-relaxed">Ending in •••• 4242<br />Expires 12/28</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 pt-4">
                  <Button variant="outline" className="flex-1 h-14 rounded-none text-[10px] font-bold tracking-[0.2em] border-border/60 hover:bg-secondary/40" onClick={handleBack}>
                    EDIT DETAILS
                  </Button>
                  <Button className="flex-[2] h-14 rounded-none text-[11px] font-bold tracking-[0.25em] shadow-2xl" onClick={handleNext}>
                    CONFIRM & PLACE ORDER
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Order Summary */}
          <div className="lg:col-span-5">
            <Card className="rounded-none border-none bg-secondary/10 shadow-none sticky top-32 overflow-hidden">
              <div className="h-1 bg-primary w-full opacity-40" />
              <CardContent className="p-10 space-y-8">
                <h2 className="text-lg font-bold tracking-[0.2em] uppercase border-b border-border/60 pb-6">Summary</h2>
                
                <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <p className="text-[11px] font-bold tracking-tight uppercase leading-none">{item.product.name}</p>
                        <p className="text-[10px] text-muted-foreground tracking-widest uppercase font-medium">QTY: {item.quantity}</p>
                      </div>
                      <span className="font-serif text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator className="bg-border/60" />
                
                <div className="space-y-3">
                  <div className="flex justify-between text-[11px] tracking-widest uppercase text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-bold text-primary">${cart.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] tracking-widest uppercase text-muted-foreground">
                    <span>Shipping</span>
                    <span className="font-bold text-primary italic">FREE</span>
                  </div>
                  <Separator className="bg-border/20 mt-4" />
                  <div className="flex justify-between items-end pt-4">
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Total Amount</span>
                    <span className="text-3xl font-serif tracking-tighter">${cart.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Checkout
