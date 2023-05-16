import styled from 'styled-components'

export const ConfirmationContainer = styled.div`
  background-color: ${({ theme }) => theme.white};
  padding: 2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 5rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.green};
  text-align: center;
  font-weight: bold;

  img {
    width: 200px;
  }

  .content {
    color: ${({ theme }) => theme['gray-800']};
    line-height: 1.8;

    small {
      font-size: 1rem;
      color: #444;
    }
  }

  .actions a {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    gap: 0.25rem;
  }

  @media (max-width: 500px) {
    margin-top: 0;
    padding: 1rem;
  }
`
