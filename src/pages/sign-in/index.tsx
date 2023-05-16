import { useContext } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Input, SignInContainer } from './styles'

import logo from '../../assets/logo.png'
import { TextBox } from './components/textbox'
import { AuthContext } from '../../contexts/auth'
import { LoadingSpinner } from '../../components/LoadingSpiner'
import { Button } from '../../components/Button'
import { NavLink } from 'react-router-dom'

const signInFormValidationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type SignInFormData = z.infer<typeof signInFormValidationSchema>

export function SignIn() {
  const { login, isLoading } = useContext(AuthContext)

  const { handleSubmit, register } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormValidationSchema),
  })

  async function handleLogin({ email, password }: SignInFormData) {
    login(email, password)
  }

  return (
    <SignInContainer onSubmit={handleSubmit(handleLogin)}>
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
          <div className="acc-actions">
            <NavLink to="/forgot">Esqueci minha senha</NavLink>
            <NavLink to="/signup">Não tenho conta</NavLink>
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </SignInContainer>
  )
}
