import { Route, Routes } from 'react-router-dom'
import { SignIn } from './pages/sign-in'
import { Clients } from './pages/clients'
import { DefaultLayout } from './layouts/defaultLayout'
import { Private } from './PrivateRoute'
import { Senders } from './pages/senders'
import { ChangePassword } from './pages/change-password'
import { SignUp } from './pages/sign-Up'
import { SignUpConfirmation } from './pages/sign-up-confirmation'
import { MailVerify } from './pages/mail-verify'
import { ForgotPassword } from './pages/forgotPassword'
import { ResetPassword } from './pages/reset-password'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/reset/:token" element={<ResetPassword />} />
      <Route path="/signup/confirmation" element={<SignUpConfirmation />} />
      <Route path="/verify/:mailToken" element={<MailVerify />} />
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
