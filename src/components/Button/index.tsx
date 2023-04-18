import { ButtonHTMLAttributes, ReactNode } from 'react'
import { ButtonContainer } from './styles'

interface ButtonProps {
  children: ReactNode
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>
}

export function Button({ children, buttonProps }: ButtonProps) {
  return <ButtonContainer {...buttonProps}>{children}</ButtonContainer>
}
