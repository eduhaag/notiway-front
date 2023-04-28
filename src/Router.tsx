import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/login'
import { Clients } from './pages/clients'
import { DefaultLayout } from './layouts/defaultLayout'
import { Private } from './PrivateRoute'
import { Senders } from './pages/senders'
import { ChangePassword } from './pages/change-password'
import { Register } from './pages/register'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <Private>
            <DefaultLayout />
          </Private>
        }
      >
        <Route path="/clients" element={<Clients />} />
        <Route path="/senders" element={<Senders />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Route>
    </Routes>
  )
}
