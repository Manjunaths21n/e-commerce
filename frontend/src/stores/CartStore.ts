import { types, flow } from 'mobx-state-tree'
import { Product } from './ProductStore'
import api from '../logic/api'

export const CartItem = types.model('CartItem', {
  product: types.reference(Product),
  quantity: types.optional(types.number, 1),
})

export const CartStore = types
  .model('CartStore', {
    items: types.array(CartItem),
    isPlacingOrder: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get totalItems() {
      return self.items.reduce((acc, item) => acc + item.quantity, 0)
    },
    get totalPrice() {
      return self.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    },
  }))
  .actions((self) => ({
    removeItem(productId: string) {
      const index = self.items.findIndex((item) => item.product.id === productId)
      if (index > -1) {
        self.items.splice(index, 1)
      }
    },
    clear() {
      self.items.clear()
    },
  }))
  .actions((self) => ({
    addItem(product: { id: string }, quantity = 1) {
      const existingItem = self.items.find((item) => item.product.id === product.id)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        self.items.push({ product: product.id, quantity })
      }
    },
    updateQuantity(productId: string, quantity: number) {
      const item = self.items.find((item) => item.product.id === productId)
      if (item) {
        item.quantity = quantity
        if (item.quantity <= 0) {
          self.removeItem(productId)
        }
      }
    },
    placeOrder: flow(function* () {
      self.isPlacingOrder = true
      try {
        const orderData = {
          items: self.items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        }
        yield api.post('/orders', orderData)
        self.clear()
        return true
      } catch (error) {
        console.error('Failed to place order', error)
        throw error
      } finally {
        self.isPlacingOrder = false
      }
    }),
  }))
