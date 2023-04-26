import { Button } from '../../components/Button'
import { FormContainer, PasswordContainer } from './styles'

export function ChangePassword() {
  return (
    <PasswordContainer>
      <h2>Alterar a senha</h2>
      <FormContainer>
        <label>
          Senha atual
          <input type="password" />
        </label>

        <label>
          Nova senha
          <input type="password" />
        </label>

        <label>
          Repetir a nova senha
          <input type="password" />
        </label>
        <Button buttonProps={{ type: 'submit' }}>Salvar</Button>
      </FormContainer>
    </PasswordContainer>
  )
}
