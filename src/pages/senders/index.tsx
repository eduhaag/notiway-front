import { useContext, useEffect, useState } from 'react'
import { Sender, SenderItem } from './components/SenderItem'
import { SendersContainer } from './styles'
import { api } from '../../lib/axios'
import { AuthContext } from '../../contexts/auth'
import { NavLink } from 'react-router-dom'
import { Card } from '../../components/Card'
import { showErrorToast } from '../../providers/toastProvider'
import { LoadingSpinner } from '../../components/LoadingSpiner'

export function Senders() {
  const { refreshToken, consumer, token } = useContext(AuthContext)
  const [senders, setSenders] = useState<Sender[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    try {
      setIsLoading(true)
      refreshToken()
      api
        .get(`/consumers/${consumer?.id}/senders`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          setSenders(data.senders)
          setIsLoading(false)
        })
    } catch (error) {
      setIsLoading(false)
      showErrorToast(
        'Não foi possível carregar a lista de senders. Tente novamente mais tarde.',
      )
    }
  }, [consumer?.id])

  async function updateSender(sender: Sender) {
    const sendersEdited = senders.map((item) => {
      if (item.id === sender.id) {
        return { ...item, paread_at: sender.paread_at }
      } else {
        return item
      }
    })

    setSenders(sendersEdited)
  }

  return (
    <SendersContainer>
      <h2>Meus senders</h2>
      {isLoading ? (
        <Card>
          <LoadingSpinner />
        </Card>
      ) : senders.length > 0 ? (
        <ul>
          {senders.map((sender) => (
            <li key={sender.id}>
              <SenderItem sender={sender} updateSender={updateSender} />
            </li>
          ))}
        </ul>
      ) : (
        <Card>
          <p>
            Não existem <strong>senders</strong> cadastrados para este usuário
            no momento.
          </p>
          <p>
            Em caso de dúvidas entre em contato conosco através do e-mail{' '}
            <NavLink target="_blank" to="mailto:atendimento@notiway.com.br">
              atendimento@notiway.com.br
            </NavLink>{' '}
            ou atráves do Whatsapp{' '}
            <NavLink target="_blank" to="https://wa.me/5547996788597">
              clicando aqui.
            </NavLink>
          </p>
        </Card>
      )}
    </SendersContainer>
  )
}
