import { Card } from '../../components/Card'
import { Header, ResetPasswordContainer, ResetPasswordForm } from './styles'

import Logo from '../../assets/logo.png'
import { Button } from '../../components/Button'
import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingSpinner } from '../../components/LoadingSpiner'
import { useNavigate, useParams } from 'react-router-dom'
import { showErrorToast, showSuccessToast } from '../../providers/toastProvider'
import { api } from '../../lib/axios'

const formValidationSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'A senha deve conter no minimo 6 caracteres.' })
      .nonempty({ message: 'Campo obrigatório.' }),
    confirmPassword: z.string(),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  })

type PasswordFormData = z.infer<typeof formValidationSchema>

export function ResetPassword() {
  const { token } = useParams<{ token: string }>()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const { handleSubmit, reset, register, formState } =
    useForm<PasswordFormData>({
      resolver: zodResolver(formValidationSchema),
    })

  const { errors } = formState

  async function handleResetPassword({ password }: PasswordFormData) {
    try {
      setIsLoading(true)
      await api.patch('/users/reset-password', { newPassword: password, token })

      showSuccessToast('Senha alterada com sucesso.')
      reset()
      navigate('/')
    } catch (error: any) {
      if (error.response.status === 401) {
        reset()
        showErrorToast('Não foi possivel alterar a senha')
        navigate('/')
      } else {
        showErrorToast(
          'Ocorreu um erro ao alterar a senha. Tente novamente mais tarde.',
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ResetPasswordContainer>
      <Card>
        <Header>
          <img src={Logo} alt="Logo da Notiway" />
          <h1>Recuperar senha</h1>
        </Header>
        <ResetPasswordForm onSubmit={handleSubmit(handleResetPassword)}>
          <div className="input-container">
            <label htmlFor="password">Nova senha</label>
            <input
              type="password"
              id="password"
              className={errors.password ? 'error' : ''}
              {...register('password')}
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>
          <div className="input-container">
            <label htmlFor="confirmPassword">Confirme a senha</label>
            <input
              type="password"
              id="confirmPassword"
              className={errors.confirmPassword ? 'error' : ''}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword.message}</span>
            )}
          </div>
          <div className="actions">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <Button buttonProps={{ type: 'submit' }}>Salvar</Button>
            )}
          </div>
        </ResetPasswordForm>
      </Card>
    </ResetPasswordContainer>
  )
}
