import { types } from 'mobx-state-tree'
import type { Instance, SnapshotOut } from 'mobx-state-tree'
import { AuthStore } from './AuthStore'
import { ProductStore } from './ProductStore'
import { WishlistStore } from './WishlistStore'
import { CartStore } from './CartStore'
import { CheckoutStore } from './CheckoutStore'

export const RootStore = types
  .model('RootStore', {
    auth: types.optional(AuthStore, {}),
    product: types.optional(ProductStore, {}),
    wishlist: types.optional(WishlistStore, {}),
    cart: types.optional(CartStore, {}),
    checkout: types.optional(CheckoutStore, {}),
  })
  .actions(() => ({
    // Global actions
  }))

export type IRootStore = Instance<typeof RootStore>
export type IRootStoreSnapshot = SnapshotOut<typeof RootStore>
