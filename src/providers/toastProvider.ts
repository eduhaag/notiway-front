import { toast } from 'react-toastify'

export function showInfoToast(message: string) {
  toast.info(message)
}

export function showSuccessToast(message: string) {
  toast.success(message)
}

export function showWarnToast(message: string) {
  toast.warn(message)
}

export function showErrorToast(message: string) {
  toast.error(message)
}
