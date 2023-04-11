import { Key, User } from 'phosphor-react'
import { IconContainer, Input, TextBoxContainer } from './styles'
import { defaultTheme } from '../../../../styles/themes/default'
import React from 'react'

export function TextBox(params: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <TextBoxContainer>
      <IconContainer>
        {params.type === 'email' ? (
          <User size={24} color={defaultTheme['gray-500']} />
        ) : (
          <Key size={24} color={defaultTheme['gray-500']} />
        )}
      </IconContainer>

      <Input {...params} />
    </TextBoxContainer>
  )
}
