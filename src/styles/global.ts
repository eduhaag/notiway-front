import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;


  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.green};
  }

  body {
    background-color: ${({ theme }) => theme['gray-200']};
    color: ${({ theme }) => theme['gray-900']};
    -webkit-font-smoothing: antialiased;
    display: flex;
    justify-content:center;
    padding: 1rem;
  }

  body, input, textarea, button {
    font: 400 1rem 'Open Sans', sans-serif
  }

`
