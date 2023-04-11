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

export const Button = styled.button`
  margin-top: 0.75rem;

  background-color: ${({ theme }) => theme.green};
  border-radius: 5px;
  height: 2.5rem;
  width: 200px;

  color: ${({ theme }) => theme.white};
  font-family: Montserrat, sans-serif;
  font-weight: bold;
  font-size: 1.2rem;

  border: 0;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
    transition: opacity 0.2s;
  }
`
