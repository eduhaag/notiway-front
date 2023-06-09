import { Route, Routes } from 'react-router-dom'
import { SignIn } from './pages/sign-in'
import { DefaultLayout } from './layouts/defaultLayout'
import { Private } from './PrivateRoute'
import { ChangePassword } from './pages/change-password'
import { SignUp } from './pages/sign-Up'
import { SignUpConfirmation } from './pages/sign-up-confirmation'
import { MailVerify } from './pages/mail-verify'
import { ForgotPassword } from './pages/forgotPassword'
import { ResetPassword } from './pages/reset-password'
import { EmailNotVerified } from './pages/mail-not-verified'
import { Home } from './pages/home'
import { Documentation } from './pages/documentations'
import { Terms } from './pages/terms'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/reset/:token" element={<ResetPassword />} />
      <Route path="/signup/confirmation" element={<SignUpConfirmation />} />
      <Route path="/verify/:mailToken" element={<MailVerify />} />
      <Route path="/mail-not-verified/:mail" element={<EmailNotVerified />} />
      <Route
        path="/"
        element={
          <Private>
            <DefaultLayout />
          </Private>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/api/terms" element={<Terms />} />
      </Route>
      <Route
        path="/api/docs"
        element={
          <Private>
            <Documentation />
          </Private>
        }
      ></Route>
    </Routes>
  )
}
