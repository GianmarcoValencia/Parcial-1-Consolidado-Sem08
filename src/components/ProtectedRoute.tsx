import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../utils/auth'
import { UserRole } from '../types'

export default function ProtectedRoute({ children, roles }: { children: ReactNode, roles?: UserRole[] }) {
  const current = getCurrentUser()
  if (!current) return <Navigate to="/login" replace />
  if (roles && !roles.includes(current.role)) return <div className="card">Acceso denegado — no tienes permisos.</div>
  return <>{children}</>
}
