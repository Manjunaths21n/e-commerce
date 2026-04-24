import { types } from 'mobx-state-tree'
import { Product } from './ProductStore'

export const WishlistStore = types
  .model('WishlistStore', {
    items: types.array(types.safeReference(Product)),
  })
  .actions((self) => ({
    toggleItem(product: { id: string }) {
      const index = self.items.findIndex((item) => item?.id === product.id)
      if (index > -1) {
        self.items.splice(index, 1)
      } else {
        // We push the ID because it's a reference
        self.items.push(product.id as any)
      }
    },
  }))
