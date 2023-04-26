import styled from 'styled-components'

export const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -2rem;

  h2 {
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 1.5rem;
  }
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 40%;
  margin-top: 1rem;

  label {
    display: flex;
    flex-direction: column;
  }
`
