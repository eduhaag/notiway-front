import styled from 'styled-components'

export const SenderContent = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`

export const SenderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  div {
    display: flex;
    gap: 1rem;
  }

  span {
    text-transform: uppercase;
  }
`

export const QrContainer = styled.div`
  display: flex;
  min-width: 10rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-right: 1rem;

  img {
    width: 8rem;
  }
`

export const Button = styled.button`
  padding: 0.5rem 3rem;
  background-color: ${({ theme }) => theme.green};
  color: ${({ theme }) => theme.white};
  border: 0;
  border-radius: 5px;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
    transition: opacity 0.2s;
  }
`
