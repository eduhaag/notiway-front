import { HeaderContainer, UserContainer } from './styles'

import LogoVertical from '../../assets/logo_vertical.png'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'

export function Header() {
  const { consumer } = useContext(AuthContext)

  const nameParsed = consumer ? consumer.name.split(' ') : undefined

  return (
    <HeaderContainer>
      <UserContainer>
        <span>
          Olá <strong>{nameParsed && nameParsed[0]}</strong>, seja bem vindo(a)
        </span>
        <div>
          <a href="#">Mudar senha</a> |
          <a
            href="http://api.notiway.com.br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentação
          </a>
          | <a href="#">Sair</a>
        </div>
      </UserContainer>
      <img src={LogoVertical} alt="" />
    </HeaderContainer>
  )
}
