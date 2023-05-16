import styled from 'styled-components'

export const ButtonContainer = styled.button`
  margin-top: 0.75rem;

  background-color: ${({ theme }) => theme.green};
  border-radius: 5px;
  padding: 0.65rem 2rem;

  color: ${({ theme }) => theme.white};
  font-family: Montserrat, sans-serif;
  font-weight: bold;
  font-size: 1.2rem;

  border: 0;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }
`
