import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row-reverse;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;

  img {
    width: 15.62rem;
  }

  @media (max-width: 860px) {
    flex-direction: column-reverse;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 1rem;
  }
`

export const UserContainer = styled.div`
  display: flex;
  align-items: end;
  flex-direction: column;

  span {
    font-size: 1.2rem;
    text-align: right;
  }

  div {
    margin-top: 0.5rem;
    display: flex;
    gap: 0.25rem;

    a {
      color: ${({ theme }) => theme['gray-900']};
    }
  }

  @media (max-width: 860px) {
    span {
      text-align: center;
    }

    div {
      width: 100%;
    }
  }
`
