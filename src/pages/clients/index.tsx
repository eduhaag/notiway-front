import { ClientsContainer } from './styles'
import { Client, ClientItem } from './components/ClientItem'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import { api } from '../../lib/axios'
import produce from 'immer'

export function Clients() {
  const { consumer, token, refreshToken } = useContext(AuthContext)
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    try {
      refreshToken()
      api
        .get(`/consumers/${consumer?.id}/clients`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          setClients(data.clients)
        })
    } catch (error) {
      console.log(error)
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
      {clients.length > 0 && (
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              <ClientItem client={client} updateClient={updateClient} />
            </li>
          ))}
        </ul>
      )}
    </ClientsContainer>
  )
}
