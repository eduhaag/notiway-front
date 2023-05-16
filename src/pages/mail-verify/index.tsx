import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../lib/axios'
import { showErrorToast, showSuccessToast } from '../../providers/toastProvider'

import { LoadingSpinner } from '../../components/LoadingSpiner'

export function MailVerify() {
  const { mailToken } = useParams<{ mailToken: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    verifyToken()
  })

  async function verifyToken() {
    try {
      await api.patch(`/users/mail-verify/${mailToken}`)
      showSuccessToast('E-mail verificado com sucesso!')
    } catch (error) {
      showErrorToast(
        'Ocorreu um erro ao tentar validar seu e-mail. Tente novamente.',
      )
    } finally {
      navigate('/')
    }
  }

  return <LoadingSpinner />
}
