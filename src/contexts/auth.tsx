import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { useNavigate } from 'react-router-dom'
import { showErrorToast, showWarnToast } from '../providers/toastProvider'

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
  isLoading: boolean
  login: (email: string, password: string) => void
  logout: () => void
  refreshToken: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [consumer, setConsumer] = useState<Consumer | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const storageInformations = localStorage.getItem('@notiway-login-data')

    if (storageInformations) {
      const { consumer, token } = JSON.parse(storageInformations) as {
        consumer: Consumer
        token: string
      }

      setConsumer(consumer)
      setToken(token)
      refreshToken().then((isLogged) => {
        if (isLogged) {
          navigate('/')
        } else {
          showWarnToast('Sua sessão expirou.')
          logout()
        }
      })
    }
  }, [])

  async function login(email: string, password: string) {
    setIsLoading(true)
    try {
      const { data } = await api.post('/sessions', {
        email,
        password,
      })
      setToken(data.token)
      setConsumer(data.consumer)

      localStorage.setItem(
        '@notiway-login-data',
        JSON.stringify({ token: data.token, consumer: data.consumer }),
      )
      navigate('/')
    } catch (error: any) {
      if (error.response.status === 400) {
        showErrorToast('E-mail e/ou senha inválidos!')
      } else if (error.response.status === 401) {
        navigate(`/mail-not-verified/${email}`)
      } else {
        showErrorToast('Ops! Algo deu errado. Tente novamente mais tarte')
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function logout() {
    try {
      await api.patch('/sessions/logout').then(() => {
        setConsumer(null)
        setToken(null)
        localStorage.removeItem('@notiway-login-data')
        navigate('/signin')
      })
    } catch (error) {
      showWarnToast('Falha ao realizar o logout.')
    }
  }

  async function refreshToken() {
    try {
      const { data } = await api.patch('/token/refresh')

      setToken(data.token)
      return true
    } catch (error: any) {
      console.log(error)
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{
        consumer,
        token,
        isAuthenticated: !!consumer,
        login,
        logout,
        isLoading,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
