import { Spinner, SpinnerContainer } from './styles'

export function LoadingSpinner() {
  return (
    <SpinnerContainer title="carregando">
      <Spinner />
    </SpinnerContainer>
  )
}
