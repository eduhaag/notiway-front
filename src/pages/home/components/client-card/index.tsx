import { Root, Trigger } from '@radix-ui/react-alert-dialog'
import {
  STATUS_TYPES,
  ToggleSection,
} from '../../../../components/ToggleSection'
import {
  ApiKeyGroup,
  ClientContent,
  ClientInformation,
  GenerateNewKeyIcon,
  KeyField,
} from './styles'
import { useContext, useEffect, useState } from 'react'
import {
  ArrowsClockwise,
  Check,
  ClipboardText,
  Eye,
  EyeSlash,
} from 'phosphor-react'
import { defaultTheme } from '../../../../styles/themes/default'
import { GenerateKeyModal } from '../../../../modals/GenerateKeyModal'
import { AuthContext } from '../../../../contexts/auth'
import { api } from '../../../../lib/axios'
import { ClientConnection } from '../client-connection'

export interface Client {
  id: string
  name: string
  status: 'ready' | 'processing' | 'bloqued'
  ClientToken: {
    token: string
  }
  sender?: {
    id: string
    type: string
    paread_at: Date | null
    full_number: string
    name: string
  } | null
}

interface ClientItemProps {
  client: Client
  updateClient: (client: Client) => void
}

export function ClientCard({ client, updateClient }: ClientItemProps) {
  const { token, refreshToken } = useContext(AuthContext)
  const [isKeyFocused, setIsKeyFocused] = useState(false)
  const [isKeyDisplayed, setIsKeyDisplayed] = useState(false)
  const [isKeyCopied, setIsKeyCopied] = useState(false)
  const [isNewKeyGenerating, setIsNewKeyGenerating] = useState(false)
  const [clientStatus, setClientStatus] = useState<keyof typeof STATUS_TYPES>()

  useEffect(() => {
    if (client.status === 'bloqued' || client.status === 'processing') {
      setClientStatus(client.status)
    } else if (!client.sender) {
      setClientStatus('processing')
    } else if (client.sender.paread_at) {
      setClientStatus('online')
    } else {
      setClientStatus('offline')
    }
  }, [client.sender, client])

  const handleToggleKeyFieldFocus = (isFocused: boolean) => {
    setIsKeyFocused(isFocused)
  }

  const handleDisplayKey = () => {
    setIsKeyDisplayed((state) => !state)
  }

  const handleCopyButtonClick = () => {
    navigator.clipboard.writeText('ClientToken.token')

    setIsKeyCopied(true)

    setTimeout(() => {
      setIsKeyCopied(false)
    }, 5000)
  }

  const handeGenerateNewKey = async () => {
    setIsNewKeyGenerating(true)

    try {
      await refreshToken()

      const { data } = await api.patch(
        `/clients/${client.id}/generate-token`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      )

      updateClient({
        ...client,
        ClientToken: { ...client.ClientToken, token: data.token },
      })

      setIsNewKeyGenerating(false)
    } catch (error) {
      console.log(error)
      setIsNewKeyGenerating(false)
    }
  }

  return (
    client && (
      <ToggleSection status={clientStatus} title={client.name}>
        <ClientContent>
          <ClientInformation>
            <ApiKeyGroup>
              <label htmlFor="">Api-key</label>
              <KeyField className={isKeyFocused ? 'focused' : ''}>
                <input
                  type={isKeyDisplayed ? 'text' : 'password'}
                  readOnly
                  value={client.ClientToken.token}
                  onFocus={() => {
                    handleToggleKeyFieldFocus(true)
                  }}
                  onBlur={() => {
                    handleToggleKeyFieldFocus(false)
                  }}
                />
                {isKeyDisplayed ? (
                  <i title="Ocultar a chave">
                    <EyeSlash size={20} onClick={handleDisplayKey} />
                  </i>
                ) : (
                  <i title="Exibir a chave">
                    <Eye size={20} onClick={handleDisplayKey} />
                  </i>
                )}

                {isKeyCopied ? (
                  <i title="Chave copiada!">
                    <Check size={20} color={defaultTheme.green} />
                  </i>
                ) : (
                  <i title="Copiar a chave">
                    <ClipboardText size={20} onClick={handleCopyButtonClick} />
                  </i>
                )}
                <Root>
                  <Trigger asChild>
                    <GenerateNewKeyIcon
                      title="Gerar nova chave"
                      isGenerating={isNewKeyGenerating}
                    >
                      <ArrowsClockwise size={20} />
                    </GenerateNewKeyIcon>
                  </Trigger>
                  {isNewKeyGenerating || (
                    <GenerateKeyModal generateNewKey={handeGenerateNewKey} />
                  )}
                </Root>
              </KeyField>
            </ApiKeyGroup>
            <div className="info" style={{ marginTop: '1rem' }}>
              <label>Fone:</label>
              <span>{client.sender?.full_number}</span>
            </div>
            <div className="info">
              <label>Tipo:</label>
              <span>{client.sender?.type}</span>
            </div>
          </ClientInformation>
          <ClientConnection
            client={client}
            clientStatus={clientStatus}
            updateClient={updateClient}
          />
        </ClientContent>
      </ToggleSection>
    )
  )
}
