import { ReactElement, useContext } from 'react'
import { AuthContext } from './contexts/auth'
import { Navigate } from 'react-router-dom'

interface PrivateProps {
  children: ReactElement<any>
}

export function Private({ children, ...rest }: PrivateProps) {
  const { isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />
  }

  return children
}
