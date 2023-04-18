import styled from 'styled-components'

export const SpinnerContainer = styled.div``

export const Spinner = styled.div`
  width: 2rem;
  height: 2rem;
  border: 8px solid ${({ theme }) => theme['gray-400']};
  border-top: 8px solid ${({ theme }) => theme.green};
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
