import { CaretLeft } from 'phosphor-react'
import { ConfirmationContainer } from './styles'
import { NavLink } from 'react-router-dom'

import Logo from '../../assets/logo.png'

export function SignUpConfirmation() {
  return (
    <ConfirmationContainer>
      <img src={Logo} alt="Logo da Notiway" />
      <h1>Confirme seu e-mail</h1>
      <div className="content">
        <p>Finalize seu cadastro através do link que enviamos no seu e-mail.</p>
        <small>
          Lembre-se: caso não encontre em sua caixa de entrada, verifique a
          caixa de spam.
        </small>
      </div>

      <div className="actions">
        <NavLink to="/signin">
          <CaretLeft size={22} weight="bold" />
          <span>Voltar para login</span>
        </NavLink>
      </div>
    </ConfirmationContainer>
  )
}
