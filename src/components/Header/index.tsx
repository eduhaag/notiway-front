import { HeaderContainer, UserContainer } from './styles'

import LogoVertical from '../../assets/logo_vertical.png'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { NavLink } from 'react-router-dom'
import { Root, Trigger } from '@radix-ui/react-alert-dialog'
import { ChangePasswordModal } from '../../modals/changePasswordModal'

export function Header() {
  const { consumer, logout } = useContext(AuthContext)

  const nameParsed = consumer ? consumer.name.split(' ') : undefined

  return (
    <HeaderContainer>
      <UserContainer>
        <span>
          Olá <strong>{nameParsed && nameParsed[0]}</strong>, seja bem vindo(a)
        </span>
        <div>
          <NavLink to="/" rel="noopener noreferrer">
            Meus clients
          </NavLink>
          |
          <NavLink to="/api/docs" rel="noopener noreferrer">
            Documentação
          </NavLink>
          |
          <NavLink to="/api/terms" rel="noopener noreferrer">
            Termos
          </NavLink>
          |{' '}
          <Root>
            <Trigger asChild>
              <NavLink to="">Mudar senha</NavLink>
            </Trigger>
            <ChangePasswordModal />
          </Root>{' '}
          |
          <NavLink to={'/signin'} onClick={logout}>
            Sair
          </NavLink>
        </div>
      </UserContainer>
      <NavLink to="/">
        <img src={LogoVertical} alt="Logo da Notiway" />
      </NavLink>
    </HeaderContainer>
  )
}
