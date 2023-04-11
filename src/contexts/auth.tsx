import { ReactNode, createContext, useState } from 'react'
import { api } from '../lib/axios'

interface AuthContextProviderProps {
  children: ReactNode
}

interface Consumer {
  id: string
  name: string
  tax_id?: string
  email: string
  fone?: string
  whatsapp?: string
  zip_code?: string
  street?: string
  number?: string
  complement?: string
  district?: string
  city?: string
  province?: string
  country?: string
  accept_marketing_at: string | null
}

interface AuthContextType {
  consumer: Consumer | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => void
  refreshToken: () => void
  logout: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [consumer, setConsumer] = useState<Consumer | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/sessions', {
      email,
      password,
    })
    console.log(data)

    setToken(data.token)
    setConsumer(data.consumer)
  }

  const refreshToken = () => {
    // implements
  }

  const logout = () => {
    // implements
  }

  return (
    <AuthContext.Provider
      value={{
        consumer,
        token,
        isAuthenticated: !!consumer,
        login,
        refreshToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
