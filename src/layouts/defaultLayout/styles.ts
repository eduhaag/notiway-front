import styled from 'styled-components'

export const LayoutContainer = styled.main`
  width: 70vw;
  display: flex;
  flex-direction: column;
`

export const MainContainer = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 10rem 1fr;
  gap: 3rem;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    margin-top: 0;
  }
`
