import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/login'
import { Home } from './pages/home'
import { DefaultLayout } from './layouts/defaultLayout'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}
