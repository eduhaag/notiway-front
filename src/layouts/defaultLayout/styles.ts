import styled from 'styled-components'

export const LayoutContainer = styled.main`
  width: calc(70vw);
  display: flex;
  flex-direction: column;

  @media (max-width: 860px) {
    width: 100%;
  }
`
