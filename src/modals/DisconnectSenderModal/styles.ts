import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-alert-dialog'

export const ModalContent = styled.div`
  div {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    gap: 0.5rem;
  }
`

export const Title = styled(Dialog.Title)`
  font-family: 'Monteserrat', sans-serif;
  font-size: 1.4rem;
`
export const Description = styled(Dialog.Description)`
  margin-top: 0.5rem;
`

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 0;
  padding: 0.5rem 0.9rem;
  font-size: 0.9rem;
  line-height: 1;
  font-weight: 500;

  cursor: pointer;

  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`

export const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme['gray-400']};
`

export const AcceptButton = styled(Button)`
  background-color: ${({ theme }) => theme.red};
`
