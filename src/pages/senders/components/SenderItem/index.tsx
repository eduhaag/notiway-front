import { useContext, useEffect, useState } from 'react'
import { ToggleSection } from '../../../../components/ToggleSection'
import { Button, QrContainer, SenderContent, SenderInfo } from './styles'
import { LoadingSpinner } from '../../../../components/LoadingSpiner'
import { api } from '../../../../lib/axios'
import { AuthContext } from '../../../../contexts/auth'
import socket from '../../../../lib/socket'
import {
  showErrorToast,
  showSuccessToast,
  showWarnToast,
} from '../../../../providers/toastProvider'
import dayjs from 'dayjs'
import { Root, Trigger } from '@radix-ui/react-alert-dialog'
import { DisconnectSenderModal } from '../../../../modals/DisconnectSenderModal'

export interface Sender {
  id: string
  name: string
  company: string | null
  region: string | null
  full_number: string
  paread_at: Date | null
  disabled_at: Date | null
}

interface SenderItemProps {
  sender: Sender
  updateSender: (sender: Sender) => void
}

export function SenderItem({ sender, updateSender }: SenderItemProps) {
  const { token, refreshToken } = useContext(AuthContext)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [isQrLoading, setIsQrLoading] = useState(false)
  const [finishTime, setFinishTime] = useState<Date | null>(null)
  const [currentCounter, setCurrentCounter] = useState<number>(60)

  async function HandleConnectClick() {
    try {
      setIsQrLoading(true)

      await refreshToken()

      await api.post(
        `/senders/${sender.id}/connect`,
        {},
        { headers: { Authorization: `Bearer ${token} ` } },
      )

      socket
        .off(`sender-qrcode:${sender.name}`)
        .on(`sender-qrcode:${sender.name}`, (data) => {
          setQrCode(data.base64Qr)

          socket.off(`sender-qrcode:${sender.name}`)

          startCounter()
        })

      const socketFeed = `sender-status:${sender.name}`

      socket.off(socketFeed).on(socketFeed, async ({ status }) => {
        if (status === 'qrReadSuccess') {
          setQrCode(null)
          setFinishTime(null)
          setCurrentCounter(0)
        }
        if (status === 'inChat') {
          await updateSender({ ...sender, paread_at: new Date() })
          setIsQrLoading(false)
          socket.off(socketFeed)
          showSuccessToast('Sender conectado com sucesso.')
        }
        if (status === 'qrReadError') {
          socket.off(socketFeed)
          setIsQrLoading(false)
          showWarnToast('Falha na leitura do QR code. Tente novamente')
        }
      })
    } catch (error) {
      setIsQrLoading(false)
      showErrorToast('Ocorreu um erro. Tente novamente mais tarde.')
    }
  }

  useEffect(() => {
    let interval: any

    if (finishTime) {
      interval = setInterval(() => {
        setCurrentCounter(dayjs(new Date()).diff(finishTime, 'seconds') * -1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [finishTime])

  useEffect(() => {
    if (!currentCounter ?? (currentCounter && currentCounter <= 0)) {
      setFinishTime(null)
      setCurrentCounter(0)
      setQrCode(null)
    }
  }, [currentCounter])

  function startCounter() {
    setCurrentCounter(51)
    setFinishTime(dayjs(new Date()).add(51, 'seconds').toDate())
  }

  async function handleDisconnectSender() {
    const tmp = sender

    setIsQrLoading(true)
    updateSender({ ...sender, paread_at: null })

    try {
      await refreshToken()

      await api.patch(
        `/senders/${sender.id}/disconnect`,
        {},
        { headers: { Authorization: `Bearer ${token} ` } },
      )

      showSuccessToast('Sender disconectado')
    } catch (error) {
      updateSender(tmp)
    } finally {
      setIsQrLoading(false)
    }
  }

  const senderStatus = sender.disabled_at
    ? 'bloqued'
    : sender.paread_at
    ? 'online'
    : 'offline'

  return (
    <ToggleSection title={sender.name} status={senderStatus}>
      <SenderContent>
        <SenderInfo>
          <div>
            <label>Operadora:</label>
            <span>{sender.company ?? ''}</span>
          </div>
          <div>
            <label>Região:</label>
            <span>{sender.region ?? ''}</span>
          </div>
          <div>
            <label>Fone:</label>
            <span>{sender.full_number}</span>
          </div>
        </SenderInfo>

        {senderStatus === 'offline' ? (
          <QrContainer>
            {}
            {qrCode ? (
              <>
                <img src={qrCode} alt="um código QR" />
                <span>{`Aguardando leitura... ${currentCounter}s`}</span>
              </>
            ) : isQrLoading ? (
              <LoadingSpinner />
            ) : (
              <Button color="green" onClick={HandleConnectClick}>
                Conectar
              </Button>
            )}
          </QrContainer>
        ) : (
          <QrContainer>
            <Root>
              <Trigger asChild>
                <Button color="red">Desconectar</Button>
              </Trigger>
              <DisconnectSenderModal
                disconnectSender={handleDisconnectSender}
              />
            </Root>
          </QrContainer>
        )}
      </SenderContent>
    </ToggleSection>
  )
}
