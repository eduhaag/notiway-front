import { Cancel, Action } from '@radix-ui/react-alert-dialog'

import { Modal } from '../../components/Modal'
import {
  AcceptButton,
  CancelButton,
  Description,
  ModalContent,
  Title,
} from './styles'

interface ModalParams {
  disconnectSender: () => void
}

export function DisconnectSenderModal({ disconnectSender }: ModalParams) {
  return (
    <Modal>
      <ModalContent>
        <Title>Disconectar o sender?</Title>
        <Description>
          <p>
            Ao disconectar o sender não será possivel enviar mensagens através
            do mesmo.
          </p>
          <p>Deseja continuar?</p>
        </Description>
        <div>
          <Cancel asChild>
            <CancelButton>cancelar</CancelButton>
          </Cancel>
          <Action asChild>
            <AcceptButton onClick={disconnectSender}>Desconectar</AcceptButton>
          </Action>
        </div>
      </ModalContent>
    </Modal>
  )
}
