import styled from 'styled-components'

export const SendersContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -2rem;

  h2 {
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 1.5rem;
    margin-left: 1.5rem;
  }

  ul {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
  }

  li {
    list-style: none;
  }

  @media (max-width: 860px) {
    margin-top: 0;
    align-items: center;
    justify-content: center;
  }
`
