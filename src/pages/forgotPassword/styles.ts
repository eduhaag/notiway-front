import styled from 'styled-components'

export const ForgotPasswordContainer = styled.div`
  margin-top: 8rem;
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

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .input-container {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme['gray-800']};

    input {
      border: 0;
      padding: 0.2rem;
      width: 15rem;

      &::placeholder {
        color: ${({ theme }) => theme['gray-500']};
      }

      &:focus {
        box-shadow: 0 0 0 0;
      }
    }
  }

  .input-error {
    border: 2px solid ${({ theme }) => theme.red};
  }

  span {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.red};
    text-align: center;
    margin-top: -0.75rem;
  }
`
