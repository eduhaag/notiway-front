import { useNavigate } from 'react-router-dom'
import { Button } from '../Button'
import { MenuContent } from './styles'

export function SideMenu() {
  const navigate = useNavigate()

  return (
    <MenuContent>
      <Button
        buttonProps={{
          onClick: () => {
            navigate('/clients')
          },
        }}
      >
        Clients
      </Button>
      <Button
        buttonProps={{
          onClick: () => {
            navigate('/senders')
          },
        }}
      >
        Senders
      </Button>
    </MenuContent>
  )
}
