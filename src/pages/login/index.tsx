import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button, LoginContainer } from './styles'

import logo from '../../assets/logo.png'
import { TextBox } from './components/textbox'
import { AuthContext } from '../../contexts/auth'

export type LoginInputs = {
  email: string
  password?: string
}

export function Login() {
  const { login } = useContext(AuthContext)

  const loginForm = useForm<LoginInputs>()
  const { handleSubmit, register } = loginForm

  function handleLogin(data: LoginInputs) {
    console.log(data)
    // login(data.email, data.password)
  }

  return (
    <LoginContainer onSubmit={handleSubmit(handleLogin)}>
      <img src={logo} alt="" />
      <FormProvider {...loginForm}>
        <TextBox type="email" placeholder="Seu e-mail" {...register('email')} />
        <TextBox
          type="password"
          placeholder="Sua senha"
          {...register('password')}
        />
      </FormProvider>
      <Button type="submit">Entrar</Button>
    </LoginContainer>
  )
}
