import styled from 'styled-components'

export const DashboardContainer = styled.div`
  h1 {
    text-align: center;
    font-size: 1.8rem;
  }
`

export const ClientsContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ul {
    width: 100%;

    li {
      list-style: none;

      &:not(:first-child) {
        margin-top: 0.75rem;
      }
    }
  }
`
