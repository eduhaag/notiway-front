import { WarningCircle, X } from 'phosphor-react'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import {
  CancelButton,
  CloseContainer,
  ContentContainer,
  FormContainer,
  ValidationError,
} from './styles'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useState } from 'react'
import { LoadingSpinner } from '../../components/LoadingSpiner'
import { AuthContext } from '../../contexts/auth'
import { api } from '../../lib/axios'
import {
  showErrorToast,
  showSuccessToast,
  showWarnToast,
} from '../../providers/toastProvider'

const formValidationSchema = z
  .object({
    oldPassword: z.string().nonempty({ message: 'Digite a senha atual' }),
    newPassword: z
      .string()
      .min(6, { message: 'A senha precisa ter no minimo 6 digítos.' }),
    confirmPassword: z.string(),
  })
  .refine(
    ({ confirmPassword, newPassword }) => confirmPassword === newPassword,
    { message: 'As senhas não conferem.', path: ['confirmPassword'] },
  )

type PasswordFormData = z.infer<typeof formValidationSchema>

export function ChangePasswordModal() {
  const { refreshToken, token } = useContext(AuthContext)
  const [isLoading, setIsloading] = useState(false)

  const { handleSubmit, reset, register, formState } =
    useForm<PasswordFormData>({
      resolver: zodResolver(formValidationSchema),
    })

  const { errors } = formState

  async function handleChangePassword({
    newPassword,
    oldPassword,
  }: PasswordFormData) {
    setIsloading(true)
    try {
      await refreshToken()
      await api.patch(
        '/users/change-password',
        { newPassword, oldPassword },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      showSuccessToast('Senha alterada com sucesso.')
      reset()
    } catch (error: any) {
      if (error.response.status === 409) {
        showErrorToast('Senha atual inválida, verifique')
      } else {
        showWarnToast('Não foi possivel alterar a senha. Tente novamente')
      }
    } finally {
      setIsloading(false)
    }
  }

  return (
    <Modal>
      <CloseContainer>
        <CancelButton>
          <X size={20} />
        </CancelButton>
      </CloseContainer>
      <ContentContainer>
        <h3>Alterar Senha</h3>
        <FormContainer onSubmit={handleSubmit(handleChangePassword)}>
          <label>
            Senha atual
            <input
              type="password"
              placeholder="Digite sua senha atual"
              {...register('oldPassword')}
            />
            {errors.oldPassword && (
              <ValidationError>
                <WarningCircle />
                {errors.oldPassword?.message}
              </ValidationError>
            )}
          </label>
          <label>
            Nova senha
            <input
              type="password"
              placeholder="Digite a senha desejada"
              {...register('newPassword')}
            />
            {errors.newPassword && (
              <ValidationError>
                <WarningCircle />
                {errors.newPassword?.message}
              </ValidationError>
            )}
          </label>
          <label>
            Confirme a senha
            <input
              type="password"
              placeholder="Repita a nova senha"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <ValidationError>
                <WarningCircle />
                {errors.confirmPassword?.message}
              </ValidationError>
            )}
          </label>
          <div className="button">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <Button buttonProps={{ type: 'submit' }}>Alterar</Button>
            )}
          </div>
        </FormContainer>
      </ContentContainer>
    </Modal>
  )
}
