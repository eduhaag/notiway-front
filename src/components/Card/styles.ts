import styled from 'styled-components'

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;

  background-color: ${({ theme }) => theme.white};
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 2rem 3rem;
  gap: 1rem;

  @media (max-width: 860px) {
    padding: 1rem;
  }
`
