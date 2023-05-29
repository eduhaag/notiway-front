import { useContext, useEffect, useState } from 'react'
import { Client, ClientCard } from './components/client-card'
import { ClientsContainer, DashboardContainer } from './styles'
import { AuthContext } from '../../contexts/auth'
import { LoadingSpinner } from '../../components/LoadingSpiner'
import { Card } from '../../components/Card'
import { NavLink } from 'react-router-dom'
import { showErrorToast } from '../../providers/toastProvider'
import { api } from '../../lib/axios'

export function Home() {
  const { consumer, token, refreshToken } = useContext(AuthContext)
  const [clients, setClients] = useState<Client[]>([])
  const [isClientsLoading, setIsClientsLoading] = useState(false)

  useEffect(() => {
    try {
      setIsClientsLoading(true)

      refreshToken()
      api
        .get(`/consumers/${consumer?.id}/clients`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          setClients(data.clients)
          setIsClientsLoading(false)
        })
    } catch (error) {
      showErrorToast(
        'Não foi possível carregar a lista de clients. Tente novamente mais tarde.',
      )
      setIsClientsLoading(false)
    }
  }, [consumer?.id])

  const updateClient = (client: Client) => {
    console.log('chegou', client, clients[0])

    const clientsFiltered = clients.filter((item) => item.id !== client.id)

    setClients([...clientsFiltered, client])
  }

  return (
    <DashboardContainer>
      <h1>Meus clients</h1>

      <ClientsContainer>
        {isClientsLoading ? (
          <LoadingSpinner />
        ) : clients.length > 0 ? (
          <ul>
            {clients.map((client) => (
              <li key={client.id}>
                <ClientCard client={client} updateClient={updateClient} />
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
    </DashboardContainer>
  )
}
