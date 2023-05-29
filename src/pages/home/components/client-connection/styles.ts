import styled from 'styled-components'

export const ConnectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 10rem;
  gap: 0.7rem;

  img {
    width: 8rem;
  }

  span {
    text-align: center;
    font-size: 0.86rem;
  }
`

interface ButtonProps {
  color: 'red' | 'green'
}

export const Button = styled.button<ButtonProps>`
  padding: 0.5rem 2rem;
  background-color: ${({ color, theme }) => theme[color]};
  color: ${({ theme }) => theme.white};
  border: 0;
  border-radius: 5px;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
    transition: opacity 0.2s;
  }
`
