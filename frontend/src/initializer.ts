import type { IRootStore } from './stores/RootStore'
import { registerProductCommands } from './logic/commands/ui/productCommands'
import { registerCartCommands } from './logic/commands/ui/cartCommands'

export const initializeApp = (rootStore: IRootStore) => {
  registerProductCommands(rootStore)
  registerCartCommands(rootStore)

  // Initialize Auth
  const token = localStorage.getItem('token')
  if (token) {
    rootStore.auth.setToken(token)
    rootStore.auth.fetchProfile()
  }

  // Load initial data
  rootStore.product.fetchProducts()
  rootStore.product.fetchCategories()
}
