import { Check, ClipboardText, Eye, EyeSlash } from 'phosphor-react'
import { ToggleSection } from '../../../../components/ToggleSection'
import { ApiKeyGroup, ClientContent, GenerateButton, KeyField } from './styles'
import { useContext, useState } from 'react'
import { defaultTheme } from '../../../../styles/themes/default'
import { AuthContext } from '../../../../contexts/auth'
import { api } from '../../../../lib/axios'
import { Root, Trigger } from '@radix-ui/react-alert-dialog'
import { GenerateKeyModal } from '../../../../modals/GenerateKeyModal'

export interface Client {
  id: string
  name: string
  status: 'ready' | 'processing' | 'bloqued'
  ClientToken: {
    token: string
  }
  sender?: {
    name: string
  } | null
}

interface ClientItemProps {
  client: Client
  updateClient: (client: Client) => void
}

export function ClientItem({ client, updateClient }: ClientItemProps) {
  const { refreshToken, token } = useContext(AuthContext)
  const { ClientToken, name, status, sender } = client
  const [showKey, setShowKey] = useState(false)
  const [coppied, setCoppied] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  function handleShowKeyClick() {
    setShowKey(!showKey)
  }

  function handleCopyButtonClick() {
    navigator.clipboard.writeText(ClientToken.token)
    setCoppied(true)
    setTimeout(() => {
      setCoppied(false)
    }, 5000)
  }

  function handleKeyFieldFocus() {
    setIsFocused(true)
  }

  function handleKeyFieldBlur() {
    setIsFocused(false)
  }

  async function handleGenerateNewKey() {
    try {
      await refreshToken()
      const { data } = await api.patch(
        `/clients/${client.id}/generate-token`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      )

      updateClient({
        ...client,
        ClientToken: { token: data.token },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ToggleSection title={name} status={status}>
      <ClientContent>
        <div className="sender-info">
          <label>Sender:</label>
          <span>{sender ? sender.name : 'sem sender vinculado.'}</span>
        </div>

        <ApiKeyGroup>
          <div className="input-line">
            <label>API-KEY</label>
            <KeyField className={isFocused ? 'focused' : ''}>
              <input
                type={showKey ? 'text' : 'password'}
                readOnly
                value={ClientToken.token}
                onFocus={handleKeyFieldFocus}
                onBlur={handleKeyFieldBlur}
              />
              {showKey ? (
                <i title="Ocultar a chave">
                  <EyeSlash size={20} onClick={handleShowKeyClick} />
                </i>
              ) : (
                <i title="Exibir a chave">
                  <Eye size={20} onClick={handleShowKeyClick} />
                </i>
              )}

              {coppied ? (
                <i title="Chave copiada!">
                  <Check size={20} color={defaultTheme.green} />
                </i>
              ) : (
                <i title="Copiar a chave">
                  <ClipboardText size={20} onClick={handleCopyButtonClick} />
                </i>
              )}
            </KeyField>
          </div>
          <Root>
            <Trigger asChild>
              <GenerateButton>Gerar nova chave</GenerateButton>
            </Trigger>
            <GenerateKeyModal generateNewKey={handleGenerateNewKey} />
          </Root>
        </ApiKeyGroup>
      </ClientContent>
    </ToggleSection>
  )
}
