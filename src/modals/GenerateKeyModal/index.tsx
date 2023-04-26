import { Cancel, Action } from '@radix-ui/react-alert-dialog'

import {
  AcceptButton,
  CancelButton,
  Description,
  ModalContent,
  Title,
} from './styles'
import { Modal } from '../../components/Modal'

interface ModalParams {
  generateNewKey: () => void
}

export function GenerateKeyModal({ generateNewKey }: ModalParams) {
  return (
    <Modal>
      <ModalContent>
        <Title>Gerar nova chave?</Title>
        <Description>
          Ao gerar uma nova chave, a chave anterior é invalidada, sendo
          necessário que substitua a <em>API-KEY</em> em sua aplicação.
        </Description>
        <div>
          <Cancel asChild>
            <CancelButton>cancelar</CancelButton>
          </Cancel>
          <Action asChild>
            <AcceptButton onClick={generateNewKey}>
              Gerar nova chave
            </AcceptButton>
          </Action>
        </div>
      </ModalContent>
    </Modal>
  )
}
