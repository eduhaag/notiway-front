import styled from 'styled-components'

export const ClientContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
  .sender-info {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;

    span {
      text-transform: uppercase;
    }
  }
`

export const ApiKeyGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  color: ${({ theme }) => theme['gray-900']};
  gap: 0.8rem;

  .input-line {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 0.5rem;
    flex-direction: row;
  }

  .focused {
    outline: 0;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.green};
  }

  @media (max-width: 860px) {
    .input-line {
      flex-direction: column;
    }
  }
`

export const KeyField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme['gray-200']};
  border: 1px solid ${({ theme }) => theme['gray-400']};
  border-radius: 5px;
  padding: 0.3rem;
  flex: 0.9;

  input {
    width: 100%;
    background: transparent;
    border: 0;
    font-size: 0.9rem;

    &:focus {
      box-shadow: none;
    }
  }

  i {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    cursor: pointer;
  }
`

export const GenerateButton = styled.button`
  padding: 0.2rem 1rem;
  border: 0;
  background-color: ${({ theme }) => theme.green};
  border-radius: 5px;
  color: ${({ theme }) => theme.white};

  cursor: pointer;

  transition: background-color 0.2s;

  &:hover {
    opacity: 0.8;
  }
`
