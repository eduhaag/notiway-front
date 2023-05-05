import { Cancel } from '@radix-ui/react-alert-dialog'
import styled from 'styled-components'

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.white};

  padding: 1rem;
`

export const FormContainer = styled.form`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  label {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    font-size: 1.2rem;
    color: ${({ theme }) => theme['gray-900']};

    input {
      padding: 0 0.5rem;
      border: 1px solid ${({ theme }) => theme['gray-500']};
      font-size: 1.3rem;
      border-radius: 5px;
    }
  }

  .button {
    display: flex;
    justify-content: center;
  }
`

export const CloseContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
`

export const CancelButton = styled(Cancel)`
  background-color: transparent;
  border: 0;
  cursor: pointer;
`

export const ValidationError = styled.span`
  color: ${({ theme }) => theme.red};
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`
