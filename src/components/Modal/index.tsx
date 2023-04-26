import { Portal } from '@radix-ui/react-alert-dialog'
import { Content, Overlay } from './sytles'
import { ReactNode } from 'react'

interface ModalParams {
  children: ReactNode
}

export function Modal({ children }: ModalParams) {
  return (
    <Portal>
      <Overlay />
      <Content>{children}</Content>
    </Portal>
  )
}
