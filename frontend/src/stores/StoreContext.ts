import { createContext } from 'react'
import type { IRootStore } from './RootStore'

export const StoreContext = createContext<IRootStore | null>(null)
