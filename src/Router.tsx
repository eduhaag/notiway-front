import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/login'
import { Clients } from './pages/clients'
import { DefaultLayout } from './layouts/defaultLayout'
import { Private } from './PrivateRoute'
import { Senders } from './pages/senders'

export function AppRouter() {
  return (
    <Routes>
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
      </Route>
    </Routes>
  )
}
