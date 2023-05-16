import styled from 'styled-components'

export const ResetPasswordContainer = styled.div`
  margin-top: 5rem;
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  img {
    width: 9.5rem;
  }

  h1 {
    font-size: 1.8rem;
  }
`

export const ResetPasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;

    input {
      border: 1px solid ${({ theme }) => theme['gray-500']};
      border-radius: 5px;
      padding: 0.2rem 0.5rem;
    }

    span {
      color: ${({ theme }) => theme.red};
      font-size: 0.9rem;
    }

    .error {
      border-color: ${({ theme }) => theme.red};
    }
  }

  .actions {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
