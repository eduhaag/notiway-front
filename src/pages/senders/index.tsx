import { useContext, useEffect, useState } from 'react'
import { Sender, SenderItem } from './components/SenderItem'
import { SendersContainer } from './styles'
import { api } from '../../lib/axios'
import { AuthContext } from '../../contexts/auth'

export function Senders() {
  const { refreshToken, consumer, token } = useContext(AuthContext)
  const [senders, setSenders] = useState<Sender[]>([])

  useEffect(() => {
    try {
      refreshToken()
      api
        .get(`/consumers/${consumer?.id}/senders`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          setSenders(data.senders)
        })
    } catch (error) {
      console.log(error)
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
      <ul>
        {senders.map((sender) => (
          <li key={sender.id}>
            <SenderItem sender={sender} updateSender={updateSender} />
          </li>
        ))}
      </ul>
    </SendersContainer>
  )
}
