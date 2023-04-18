import { Key, User } from 'phosphor-react'
import { IconContainer, TextBoxContainer } from './styles'
import { defaultTheme } from '../../../../styles/themes/default'
import React from 'react'

export function TextBox({
  type,
  children,
}: {
  type: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >['type']
  children: React.ReactNode
}) {
  return (
    <TextBoxContainer>
      <IconContainer>
        {type === 'email' ? (
          <User size={24} color={defaultTheme['gray-500']} />
        ) : (
          <Key size={24} color={defaultTheme['gray-500']} />
        )}
      </IconContainer>

      {children}
    </TextBoxContainer>
  )
}
