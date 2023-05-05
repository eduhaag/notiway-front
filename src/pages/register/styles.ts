import styled from 'styled-components'

export const RegisterContainer = styled.section`
  margin-top: 1rem;
  padding: 1.125rem 0.875rem;
  max-width: 50rem;
  background-color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: #538a13;
  font-weight: bold;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`

export const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  h1 {
    font-size: 1.5rem;
  }

  img {
    max-width: 15rem;
  }

  @media (max-width: 700px) {
    flex-direction: column-reverse;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  div {
    display: flex;
    font-size: 1rem;
  }

  h2 {
    margin-top: 1rem;
    text-align: center;
  }

  .line-group {
    flex-direction: row;
    gap: 1rem;

    @media (max-width: 700px) {
      flex-direction: column;
    }
  }

  .input-group {
    flex: 1;
    flex-direction: column;

    span {
      color: ${({ theme }) => theme.red};
    }

    input,
    select {
      padding: 0 0.5rem;
      border: 1px solid ${({ theme }) => theme['gray-500']};
      font-size: 1.2rem;
      border-radius: 5px;
      color: ${({ theme }) => theme['gray-900']};
    }

    select {
      background-color: ${({ theme }) => theme.white};
      padding: 0.15rem 0.5rem;
    }

    small {
      margin-top: 0.5rem;
      font-size: 0.8rem;
      color: ${({ theme }) => theme['gray-900']};
      text-align: center;
    }
  }

  .input-error {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.red};
    border: none;
  }

  .check-group {
    margin-top: 1rem;
    gap: 0.5rem;
    display: flex;

    align-items: center;
    justify-content: center;

    input {
      width: 5%;
    }
  }

  .action-group {
    gap: 1rem;
    justify-content: center;
  }

  p {
    color: ${({ theme }) => theme['gray-900']};
    text-align: center;

    button {
      background: transparent;
      border: 0;
      text-decoration: underline;
      color: blue;
      cursor: pointer;
    }
  }
`

interface InputProps {
  width?: string
}

export const CustomInput = styled.input<InputProps>`
  padding: 0 0.5rem;
  border: 1px solid ${({ theme }) => theme['gray-500']};
  font-size: 1.2rem;
  border-radius: 5px;
  color: ${({ theme }) => theme['gray-900']};
  width: ${({ width }) => width};
`
