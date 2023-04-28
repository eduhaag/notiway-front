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

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  gap: 2rem;
`

export const Title = styled(Dialog.Title)`
  font-family: 'Monteserrat', sans-serif;
  font-size: 1.4rem;
  color: '#1A2523';
`

export const CancelButton = styled(Dialog.Cancel)`
  align-items: center;
  justify-content: center;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`

export const Description = styled(Dialog.Description)`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;

  ol {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    li {
      h3 {
        font-size: 1rem;
      }
    }
  }

  ul {
    padding: 1rem;
    list-style: disc;
  }
`
