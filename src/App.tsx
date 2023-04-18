import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyles } from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './Router'
import { AuthContextProvider } from './contexts/auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <AuthContextProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable={false}
            pauseOnHover={false}
            theme="light"
          />
          <AppRouter />
        </AuthContextProvider>
      </BrowserRouter>
      <GlobalStyles />
    </ThemeProvider>
  )
}
