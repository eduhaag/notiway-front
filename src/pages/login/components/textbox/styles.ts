import styled from 'styled-components'

export const TextBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  height: 2rem;
  background-color: ${({ theme }) => theme.white};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme['gray-400']};
  margin-top: 1rem;
`

export const IconContainer = styled.div`
  background-color: ${({ theme }) => theme['gray-300']};
  width: 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  svg {
    display: block;
  }
`

export const Input = styled.input`
  padding-left: 2.5rem;
  margin-left: -2rem;
  border: 0;
  height: 100%;
  flex: 1;
`
