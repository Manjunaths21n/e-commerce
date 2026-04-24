import type { ReactNode } from 'react'
import { RootStore } from './RootStore'
import { StoreContext } from './StoreContext'
import { initializeApp } from '../initializer'

const rootStore = RootStore.create({})
initializeApp(rootStore)

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
}
