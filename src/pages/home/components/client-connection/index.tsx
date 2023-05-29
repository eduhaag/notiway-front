import { useContext, useEffect, useState } from 'react'
import { LoadingSpinner } from '../../../../components/LoadingSpiner'
import { Client } from '../client-card'
import { Button, ConnectionContainer } from './styles'
import dayjs from 'dayjs'
import socket from '../../../../lib/socket'
import {
  showErrorToast,
  showSuccessToast,
  showWarnToast,
} from '../../../../providers/toastProvider'
import { AuthContext } from '../../../../contexts/auth'
import { api } from '../../../../lib/axios'
import { Root, Trigger } from '@radix-ui/react-alert-dialog'
import { DisconnectSenderModal } from '../../../../modals/DisconnectSenderModal'

interface ClientConnectionProps {
  client: Client
  clientStatus?: string
  updateClient: (client: Client) => void
}

export function ClientConnection({
  client,
  clientStatus = 'processing',
  updateClient,
}: ClientConnectionProps) {
  const { token, refreshToken } = useContext(AuthContext)
  const [isQrLoading, setIsQrLoading] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [finishTime, setFinishTime] = useState<Date | null>(null)
  const [currentCounter, setCurrentCounter] = useState<number>(0)

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
    if (currentCounter <= 0) {
      setFinishTime(null)
      setCurrentCounter(0)
      setQrCode(null)
    }
  }, [currentCounter])

  const startCounter = () => {
    setCurrentCounter(51)
    setFinishTime(dayjs(new Date()).add(51, 'seconds').toDate())
  }

  const handleConnectClick = async () => {
    setIsQrLoading(true)

    try {
      await refreshToken()

      await api.post(
        `/senders/${client.sender?.id}/connect`,
        {},
        { headers: { Authorization: `Bearer ${token} ` } },
      )

      socket
        .off(`sender-qrcode:${client.sender?.name}`)
        .on(`sender-qrcode:${client.sender?.name}`, (data) => {
          setQrCode(data.base64Qr)
          setIsQrLoading(false)
          startCounter()

          socket.off(`sender-qrcode:${client.sender?.name}`)
        })

      const socketFeed = `sender-status:${client.sender?.name}`

      socket.off(socketFeed).on(socketFeed, async ({ status }) => {
        if (status === 'qrReadSuccess') {
          setQrCode(null)
          setIsQrLoading(true)
        }
        if (status === 'inChat') {
          await updateClient({
            ...client,
            sender: { ...client.sender!, paread_at: new Date() },
          })

          setIsQrLoading(false)

          socket.off(socketFeed)

          showSuccessToast('Client conectado com sucesso.')
        }
        if (status === 'qrReadError') {
          socket.off(socketFeed)
          setQrCode(null)

          setIsQrLoading(false)

          showWarnToast('Falha na leitura do QR code. Tente novamente')
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleDisconnectClick = async () => {
    setIsQrLoading(true)

    try {
      await refreshToken()

      await api.patch(
        `/senders/${client.sender?.id}/disconnect`,
        {},
        { headers: { Authorization: `Bearer ${token} ` } },
      )

      updateClient({
        ...client,
        sender: { ...client.sender!, paread_at: null },
      })
      showSuccessToast('Desconectado com sucesso')

      setIsQrLoading(false)
    } catch (error) {
      showErrorToast('Não foi possivel desconectar. Tente novamente.')

      setIsQrLoading(false)
    }
  }

  return (
    <ConnectionContainer>
      {isQrLoading ? (
        <LoadingSpinner />
      ) : qrCode ? (
        <>
          <img src={qrCode} alt="um código QR" />
          <span>{`Aguardando leitura... ${currentCounter}s`}</span>
        </>
      ) : clientStatus === 'offline' ? (
        <Button color="green" onClick={handleConnectClick}>
          Conectar
        </Button>
      ) : (
        clientStatus === 'online' && (
          <Root>
            <Trigger asChild>
              <Button color="red">Desconectar</Button>
            </Trigger>
            <DisconnectSenderModal disconnectSender={handleDisconnectClick} />
          </Root>
        )
      )}
    </ConnectionContainer>
  )
}
