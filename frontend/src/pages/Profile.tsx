import { observer } from 'mobx-react-lite'
import { useStore } from '@/stores/useStore'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { RotateCcw, XCircle, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'

const MOCK_ORDERS = [
  {
    id: 'ORD-12345',
    date: '2026-04-20',
    total: 344.99,
    status: 'Delivered',
    items: ['ESSENTIAL SERIF WATCH', 'ARCHITECTURAL TEE'],
  },
  {
    id: 'ORD-67890',
    date: '2026-04-24',
    total: 149.50,
    status: 'Processing',
    items: ['MINIMALIST LEATHER BAG'],
  },
]

const Profile = observer(() => {
  const { auth } = useStore()

  const handleCancelOrder = (id: string) => {
    toast.info(`Order ${id} cancellation request submitted.`)
  }

  const handleReturnItem = (id: string) => {
    toast.info(`Return request for Order ${id} submitted.`)
  }

  return (
    <div className="bg-background min-h-screen font-sans pb-24">
      <div className="container mx-auto px-6 py-20 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-8 mb-20">
          <div className="w-24 h-24 rounded-none bg-primary flex items-center justify-center text-primary-foreground text-4xl font-serif">
            {auth.user?.name?.[0] || 'G'}
          </div>
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-5xl font-serif tracking-tight uppercase">My Account</h1>
            <p className="text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase">{auth.user?.email || 'GUEST@EXAMPLE.COM'}</p>
          </div>
        </div>

        <Tabs defaultValue="orders" className="space-y-12">
          <TabsList className="bg-transparent border-b border-border/40 w-full justify-start rounded-none h-auto p-0 gap-10">
            <TabsTrigger 
              value="orders" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-0 pb-4 text-[10px] font-bold tracking-[0.2em] uppercase"
            >
              Order History
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-0 pb-4 text-[10px] font-bold tracking-[0.2em] uppercase"
            >
              Personal Details
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-0 pb-4 text-[10px] font-bold tracking-[0.2em] uppercase"
            >
              Preferences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {MOCK_ORDERS.map((order) => (
              <div key={order.id} className="group border border-border/40 bg-secondary/5 overflow-hidden transition-all hover:border-primary/20">
                <div className="p-8 md:p-10 space-y-8">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="space-y-1">
                         <p className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase">Order reference</p>
                         <h3 className="text-lg font-serif tracking-tight">#{order.id}</h3>
                      </div>
                      <div className="flex items-center gap-10">
                         <div className="space-y-1 text-right">
                            <p className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase">Date placed</p>
                            <p className="text-xs font-bold tracking-tighter uppercase">{order.date}</p>
                         </div>
                         <Badge variant={order.status === 'Delivered' ? 'outline' : 'secondary'} className="rounded-none text-[9px] font-bold tracking-widest px-4 py-1 uppercase">
                            {order.status}
                         </Badge>
                      </div>
                   </div>

                   <Separator className="bg-border/40" />

                   <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                      <div className="space-y-3">
                         <p className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase">Items in this piece</p>
                         <ul className="space-y-1">
                            {order.items.map((item, idx) => (
                               <li key={idx} className="text-xs font-medium tracking-tight uppercase flex items-center gap-3">
                                  <ChevronRight className="w-2.5 h-2.5 text-primary/40" />
                                  {item}
                               </li>
                            ))}
                         </ul>
                      </div>
                      <div className="text-right space-y-1">
                         <p className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase">Total value</p>
                         <p className="text-3xl font-serif tracking-tighter">${order.total.toFixed(2)}</p>
                      </div>
                   </div>

                   <div className="flex flex-wrap gap-4 pt-4">
                      <Button variant="outline" size="sm" className="rounded-none border-border/60 text-[9px] font-bold tracking-widest px-6 h-10 hover:bg-primary hover:text-primary-foreground transition-all uppercase">
                         Review Details
                      </Button>
                      {order.status === 'Processing' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="rounded-none text-muted-foreground/60 hover:text-destructive text-[9px] font-bold tracking-widest gap-2 uppercase hover:bg-transparent h-10"
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Cancel Request
                        </Button>
                      )}
                      {order.status === 'Delivered' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="rounded-none text-muted-foreground/60 hover:text-primary text-[9px] font-bold tracking-widest gap-2 uppercase hover:bg-transparent h-10"
                          onClick={() => handleReturnItem(order.id)}
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Initiate Return
                        </Button>
                      )}
                   </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="profile" className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Card className="rounded-none border-border/40 shadow-none bg-transparent">
              <CardHeader className="p-10 pb-0">
                <CardTitle className="text-2xl font-serif uppercase tracking-tight">Personal Information</CardTitle>
                <CardDescription className="text-[10px] font-bold tracking-widest uppercase">Secure identity management</CardDescription>
              </CardHeader>
              <CardContent className="p-10 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans">
                  <div className="space-y-2 group">
                    <h3 className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase group-hover:text-primary transition-colors">Full Legal Name</h3>
                    <p className="text-sm font-bold tracking-tight uppercase border-b border-border/40 pb-2">Guest User</p>
                  </div>
                  <div className="space-y-2 group">
                    <h3 className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground uppercase group-hover:text-primary transition-colors">Verified Email</h3>
                    <p className="text-sm font-bold tracking-tight uppercase border-b border-border/40 pb-2">guest@example.com</p>
                  </div>
                </div>
                <Button className="rounded-none h-12 px-8 text-[10px] font-bold tracking-[0.2em] shadow-xl">EDIT PROFILE</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="animate-in fade-in slide-in-from-bottom-4 duration-700">
             <Card className="rounded-none border-border/40 shadow-none bg-transparent">
               <CardHeader className="p-10 pb-0">
                 <CardTitle className="text-2xl font-serif uppercase tracking-tight">Preferences</CardTitle>
                 <CardDescription className="text-[10px] font-bold tracking-widest uppercase">Tailor your boutique experience</CardDescription>
               </CardHeader>
               <CardContent className="p-10 space-y-10">
                 <div className="flex items-center justify-between py-6 border-b border-border/40 group cursor-pointer">
                   <div className="space-y-1">
                     <h3 className="text-[11px] font-bold tracking-widest uppercase group-hover:text-primary transition-colors">Email Communications</h3>
                     <p className="text-[10px] text-muted-foreground font-light tracking-wide italic uppercase">Receive updates about your curated pieces</p>
                   </div>
                   <Button variant="outline" size="sm" className="rounded-none text-[9px] font-bold tracking-widest px-6 h-9 uppercase">Configure</Button>
                 </div>
                 <div className="flex items-center justify-between py-6 border-b border-border/40 group cursor-pointer">
                   <div className="space-y-1">
                     <h3 className="text-[11px] font-bold tracking-widest uppercase group-hover:text-primary transition-colors">Security Credentials</h3>
                     <p className="text-[10px] text-muted-foreground font-light tracking-wide italic uppercase">Update your access password</p>
                   </div>
                   <Button variant="outline" size="sm" className="rounded-none text-[9px] font-bold tracking-widest px-6 h-9 uppercase">Update</Button>
                 </div>
               </CardContent>
             </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
})

export default Profile
