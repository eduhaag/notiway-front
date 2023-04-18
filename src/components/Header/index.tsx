import { HeaderContainer, UserContainer } from './styles'

import LogoVertical from '../../assets/logo_vertical.png'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { NavLink } from 'react-router-dom'

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
          <a href="#">Mudar senha</a> |
          <NavLink
            to="http://api.notiway.com.br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentação
          </NavLink>
          |{' '}
          <NavLink to={'/login'} onClick={logout}>
            Sair
          </NavLink>
        </div>
      </UserContainer>
      <img src={LogoVertical} alt="" />
    </HeaderContainer>
  )
}
