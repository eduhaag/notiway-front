import { CaretLeft, Warning } from 'phosphor-react'
import { Card } from '../../components/Card'
import { Container } from './styles'
import { Button } from '../../components/Button'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { defaultTheme } from '../../styles/themes/default'
import { api } from '../../lib/axios'
import { showErrorToast, showSuccessToast } from '../../providers/toastProvider'

export function EmailNotVerified() {
  const { mail } = useParams<{ mail: string }>()
  const navigate = useNavigate()

  async function handleResendMail() {
    try {
      await api.post('/users/resend-verification', { email: mail })
      showSuccessToast(
        `Enviamos um e-mail para ${mail}. Verifique sua caixa de entrada / spam e confirme seu e-mail.`,
      )
    } catch (error: any) {
      showErrorToast('Ocorreu um erro ao reenviar o e-mail.')
    } finally {
      navigate('/')
    }
  }

  return (
    <Container>
      <Card>
        <Warning size={50} color={defaultTheme.red} />
        <h2>Seu e-mail ainda não foi confirmado</h2>
        <p>
          Verifique sua caixa de entrada / spam e clique no link enviado para
          confirmar seu e-mail.
        </p>
        <p>
          Caso ainda não tenha recebido o e-mail, clique no botão abaixo para
          reenviar o link de confirmação
        </p>
        <Button buttonProps={{ type: 'button', onClick: handleResendMail }}>
          Reenviar confirmação
        </Button>
        <NavLink to="/">
          <CaretLeft size={20} weight="bold" />
          Voltar
        </NavLink>
      </Card>
    </Container>
  )
}
