import * as Dialog from '@radix-ui/react-alert-dialog'
import styled from 'styled-components'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  z-index: 888;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  border-radius: 6px;
  z-index: 999;
  padding: 1rem;
  background: ${({ theme }) => theme.white};

  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  min-width: 300px;
`
