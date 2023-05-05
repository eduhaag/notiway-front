import { ClientsContainer } from './styles'
import { Client, ClientItem } from './components/ClientItem'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import { api } from '../../lib/axios'
import produce from 'immer'
import { NavLink } from 'react-router-dom'
import { Card } from '../../components/Card'
import { LoadingSpinner } from '../../components/LoadingSpiner'
import { showErrorToast } from '../../providers/toastProvider'

export function Clients() {
  const { consumer, token, refreshToken } = useContext(AuthContext)
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    try {
      setIsLoading(true)

      refreshToken()
      api
        .get(`/consumers/${consumer?.id}/clients`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          setClients(data.clients)
          setIsLoading(false)
        })
    } catch (error) {
      showErrorToast(
        'Não foi possível carregar a lista de clients. Tente novamente mais tarde.',
      )
      setIsLoading(false)
    }
  }, [consumer?.id, token])

  async function updateClient(client: Client) {
    const clientIndex = clients.findIndex((item) => item.id === client.id)

    if (clientIndex >= 0) {
      produce(clients, (draft) => {
        draft[clientIndex] = client
      })
    }
  }

  return (
    <ClientsContainer>
      <h2>Meus clients</h2>
      {isLoading ? (
        <Card>
          <LoadingSpinner />
        </Card>
      ) : clients.length > 0 ? (
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              <ClientItem client={client} updateClient={updateClient} />
            </li>
          ))}
        </ul>
      ) : (
        <Card>
          <p>
            Não existem <strong>clients</strong> cadastrados para este usuário
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
    </ClientsContainer>
  )
}
