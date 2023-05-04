import styled from 'styled-components'

export const ClientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -2rem;
  gap: 1rem;

  h2 {
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 1.5rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
  }

  li {
    list-style: none;
  }

  p {
    text-align: center;
  }

  @media (max-width: 860px) {
    margin-top: 0;
    align-items: center;
    justify-content: center;
  }
`
