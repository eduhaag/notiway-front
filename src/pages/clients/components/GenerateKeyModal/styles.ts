import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-alert-dialog'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  border-radius: 6px;
  padding: 1rem;
  background: ${({ theme }) => theme.white};

  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  div {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    gap: 0.5rem;
  }

  @media (max-width: 860px) {
    width: calc(100vw - 1rem);
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
  background-color: ${({ theme }) => theme.green};
`
