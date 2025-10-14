import { User } from '../types'
import { loadUsers } from './localStorageHelpers'

const CURRENT = 'currentUserId'

export const getCurrentUserId = (): string | null => localStorage.getItem(CURRENT)
export const setCurrentUserId = (id: string | null) => {
  if (id) localStorage.setItem(CURRENT, id)
  else localStorage.removeItem(CURRENT)
}

export const getCurrentUser = (): User | null => {
  const id = getCurrentUserId()
  if (!id) return null
  const users = loadUsers()
  return users.find(u => u.id === id) || null
}

export const login = (email: string, password: string): User | null => {
  const users = loadUsers()
  const u = users.find(x => x.email === email && x.password === password) || null
  if (u) setCurrentUserId(u.id)
  return u
}

export const logout = () => setCurrentUserId(null)
