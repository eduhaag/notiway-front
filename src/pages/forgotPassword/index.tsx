import { Card } from '../../components/Card'
import { ForgotPasswordContainer, FormContainer, Header } from './styles'

import Logo from '../../assets/logo.png'
import { EnvelopeSimple } from 'phosphor-react'
import { Button } from '../../components/Button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../../lib/axios'
import {
  showErrorToast,
  showSuccessToast,
  showWarnToast,
} from '../../providers/toastProvider'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const forgotPasswordFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Você deve inserir um e-mail válido' })
    .nonempty({ message: 'Você deve inserir um e-mail.' }),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>

export function ForgotPassword() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { handleSubmit, register, formState } = useForm<ForgotPasswordFormData>(
    {
      resolver: zodResolver(forgotPasswordFormSchema),
    },
  )

  const { errors } = formState

  async function handleForgotPassword({ email }: ForgotPasswordFormData) {
    try {
      setIsLoading(true)
      await api.post('/users/forgot-password', { email })

      showSuccessToast(
        `Foi enviado um e-mail de recuperação de senha para ${email}. `,
      )

      navigate('/')
    } catch (error: any) {
      if (error.response.status === 404) {
        showWarnToast('E-mail invalido.')
      } else {
        showErrorToast(
          'Ocorreu um erro durante a recuperação de senha. Tente novamente mais tarde.',
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ForgotPasswordContainer>
      <Card>
        <Header>
          <img src={Logo} alt="Logo da Notiway" />
          <h1>Recuperar senha</h1>
        </Header>
        <FormContainer onSubmit={handleSubmit(handleForgotPassword)}>
          <div className={`input-container ${errors.email && 'input-error'}`}>
            <EnvelopeSimple size={25} weight="light" />
            <input
              type="text"
              placeholder="Digite seu e-mail"
              {...register('email')}
            />
          </div>
          {errors.email && <span>{errors.email.message}</span>}
          <Button buttonProps={{ type: 'submit', disabled: isLoading }}>
            Recuperar
          </Button>
        </FormContainer>
      </Card>
    </ForgotPasswordContainer>
  )
}
