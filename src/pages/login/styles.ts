import styled from 'styled-components'

export const LoginContainer = styled.form`
  margin-top: 3rem;
  padding: 1.125rem 0.875rem;
  background-color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 1rem;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  img {
    width: 200px;
  }
`

export const Input = styled.input`
  padding-left: 2.5rem;
  margin-left: -2rem;
  border: 0;
  height: 100%;
  flex: 1;
`
