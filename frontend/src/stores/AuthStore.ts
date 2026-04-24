import { types, flow } from 'mobx-state-tree'
import api from '../logic/api'

export const AuthStore = types
  .model('AuthStore', {
    isAuthenticated: types.optional(types.boolean, false),
    user: types.maybeNull(types.frozen()),
    token: types.maybeNull(types.string),
    isLoading: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setToken(token: string | null) {
      self.token = token
      if (token) {
        localStorage.setItem('token', token)
        self.isAuthenticated = true
      } else {
        localStorage.removeItem('token')
        self.isAuthenticated = false
      }
    },
  }))
  .actions((self) => ({
    login: flow(function* (credentials: unknown) {
      self.isLoading = true
      try {
        const response = yield api.post('/auth/login', credentials)
        const { access_token } = response.data
        self.setToken(access_token)
        // Fetch profile after login
        yield (self as any).fetchProfile()
      } catch (error) {
        console.error('Login failed', error)
        throw error
      } finally {
        self.isLoading = false
      }
    }),
    fetchProfile: flow(function* () {
      try {
        const response = yield api.get('/auth/profile')
        self.user = response.data
        self.isAuthenticated = true
      } catch (error) {
        console.error('Fetch profile failed', error)
        self.setToken(null)
      }
    }),
    logout() {
      self.setToken(null)
      self.user = null
    },
  }))
