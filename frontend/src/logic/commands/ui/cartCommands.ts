import { commandRegistry } from '../CommandRegistry'
import type { IRootStore } from '../../../stores/RootStore'

export const registerCartCommands = (rootStore: IRootStore) => {
  commandRegistry.register({
    id: 'cart.add',
    execute: (args: unknown) => {
      const { product, quantity } = args as { product: { id: string }; quantity?: number }
      rootStore.cart.addItem(product, quantity)
    },
  })

  commandRegistry.register({
    id: 'cart.remove',
    execute: (productId: unknown) => {
      if (typeof productId === 'string') {
        rootStore.cart.removeItem(productId)
      }
    },
  })

  commandRegistry.register({
    id: 'cart.updateQuantity',
    execute: (args: unknown) => {
      const { productId, quantity } = args as { productId: string; quantity: number }
      rootStore.cart.updateQuantity(productId, quantity)
    },
  })

  commandRegistry.register({
    id: 'cart.clear',
    execute: () => {
      rootStore.cart.clear()
    },
  })
}
