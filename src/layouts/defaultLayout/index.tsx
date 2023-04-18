import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { LayoutContainer, MainContainer } from './styles'
import { SideMenu } from '../../components/SideMenu'

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <MainContainer>
        <SideMenu />
        <Outlet />
      </MainContainer>
    </LayoutContainer>
  )
}
