import styled from 'styled-components'

export const ClientContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 650px) {
    flex-direction: column;
    gap: 1rem;
  }
`

export const ClientInformation = styled.div`
  width: 100%;
  padding-right: 1rem;

  .info {
    margin-top: 0.75rem;

    span {
      margin-left: 0.8rem;
    }
  }
`

export const ApiKeyGroup = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme['gray-900']};
  gap: 0.8rem;

  .focused {
    outline: 0;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.green};
  }
`

export const KeyField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme['gray-200']};
  border: 1px solid ${({ theme }) => theme['gray-400']};
  border-radius: 5px;
  padding: 0.3rem;
  gap: 0.2rem;

  input {
    width: 33rem;
    font-size: 0.9rem;
    background: transparent;
    border: 0;

    &:focus {
      box-shadow: none;
    }
  }

  i {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    cursor: pointer;
  }

  @media (max-width: 1230px) {
    width: 100%;

    input {
      width: 100%;
    }
  }
`

interface GenerateNewKeyIconProps {
  isGenerating: boolean
}

export const GenerateNewKeyIcon = styled.i<GenerateNewKeyIconProps>`
  svg {
    animation: ${({ isGenerating }) =>
      isGenerating && 'spinner 1.5s linear infinite'};
    cursor: ${({ isGenerating }) => (isGenerating ? 'not-allowed' : 'pointer')};
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
