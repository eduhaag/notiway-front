import styled from 'styled-components'

export const TermsContainer = styled.div`
  background-color: ${({ theme }) => theme.white};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 70vh;
  border: 1px solid ${({ theme }) => theme['gray-500']};
  line-height: 1.8;

  overflow-y: scroll;

  h1 {
    text-align: center;
  }

  li {
    list-style-position: inside;

    span {
      font-weight: bold;
    }

    &:not(:first-child) {
      margin-top: 1rem;
    }

    p {
      text-align: justify;
      &:not(:first-child) {
        margin-top: 0.5rem;
      }
    }
  }
`
