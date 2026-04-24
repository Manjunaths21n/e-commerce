import { types, flow, type Instance } from 'mobx-state-tree'
import api from '../logic/api'

export const Category = types.model('Category', {
  id: types.identifier,
  name: types.string,
})

export const Product = types.model('Product', {
  id: types.identifier,
  name: types.string,
  description: types.string,
  price: types.number,
  imageUrl: types.string,
  category: types.maybe(Category),
})

export const ProductStore = types
  .model('ProductStore', {
    products: types.array(Product),
    categories: types.array(Category),
    selectedProduct: types.maybeNull(types.safeReference(Product)),
    isLoading: types.optional(types.boolean, false),
    searchQuery: types.optional(types.string, ''),
  })
  .actions((self) => ({
    fetchProducts: flow(function* () {
      self.isLoading = true
      try {
        const response = yield api.get('/products')
        self.products = response.data
      } catch (error) {
        console.error('Failed to fetch products', error)
      } finally {
        self.isLoading = false
      }
    }),
    fetchCategories: flow(function* () {
      try {
        const response = yield api.get('/categories')
        self.categories = response.data
      } catch (error) {
        console.error('Failed to fetch categories', error)
      }
    }),
    setSearchQuery(query: string) {
      self.searchQuery = query
    },
    setProducts(products: Instance<typeof Product>[]) {
      self.products.replace(products as any)
    },
  }))
