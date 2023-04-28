import { useContext } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Input, LoginContainer } from './styles'

import logo from '../../assets/logo.png'
import { TextBox } from './components/textbox'
import { AuthContext } from '../../contexts/auth'
import { LoadingSpinner } from '../../components/LoadingSpiner'
import { Button } from '../../components/Button'
import { NavLink } from 'react-router-dom'

const loginFormValidationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type LoginFormData = z.infer<typeof loginFormValidationSchema>

export function Login() {
  const { login, isLoading } = useContext(AuthContext)

  const { handleSubmit, register } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormValidationSchema),
  })

  async function handleLogin({ email, password }: LoginFormData) {
    login(email, password)
  }

  return (
    <LoginContainer onSubmit={handleSubmit(handleLogin)}>
      <img src={logo} alt="" />
      <TextBox type="email">
        <Input type="email" placeholder="Seu e-mail" {...register('email')} />
      </TextBox>
      <TextBox type="password">
        <Input
          type="password"
          placeholder="Sua senha"
          {...register('password')}
        />
      </TextBox>
      {!isLoading ? (
        <>
          <Button buttonProps={{ type: 'submit' }}>Entrar</Button>
          <NavLink to="/register">Clique aqui para criar uma conta</NavLink>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </LoginContainer>
  )
}
