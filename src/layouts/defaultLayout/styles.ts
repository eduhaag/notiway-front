import styled from 'styled-components'

export const LayoutContainer = styled.main`
  width: 70vw;
  display: flex;
  flex-direction: column;

  @media (max-width: 860px) {
    width: 90vw;
  }
`

export const MainContainer = styled.div`
  margin-top: 2rem;
  gap: 3rem;

  @media (max-width: 860px) {
    margin-top: 0;
  }
`
