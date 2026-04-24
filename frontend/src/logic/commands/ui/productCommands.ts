import { commandRegistry } from '../CommandRegistry'
import type { IRootStore } from '../../../stores/RootStore'

export const registerProductCommands = (rootStore: IRootStore) => {
  commandRegistry.register({
    id: 'product.search',
    execute: (query: unknown) => {
      if (typeof query === 'string') {
        rootStore.product.setSearchQuery(query)
      }
    },
  })
}
