import { ReactNode, useState } from 'react'
import { SectionContainer, SectionContent, SectionHeader } from './styles'
import { CaretDown, CaretUp } from 'phosphor-react'

export const STATUS_TYPES = {
  bloqued: {
    title: 'Bloqueado',
    color: 'red',
  },
  processing: {
    title: 'Processando',
    color: 'yellow',
  },
  online: {
    title: 'online',
    color: 'green',
  },
  offline: {
    title: 'offline',
    color: 'yellow',
  },
} as const

interface ToggleSectionProps {
  title: string
  status?: keyof typeof STATUS_TYPES
  children: ReactNode
}

export function ToggleSection({
  children,
  title,
  status = 'processing',
}: ToggleSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  function handleSectionClick() {
    setIsOpen((state) => {
      return !state
    })
  }

  return (
    <SectionContainer>
      <SectionHeader
        statusColor={STATUS_TYPES[status].color}
        onClick={handleSectionClick}
      >
        <div>
          <h4>{title}</h4>
          <span>{STATUS_TYPES[status].title}</span>
        </div>

        {isOpen ? <CaretUp size={24} /> : <CaretDown size={24} />}
      </SectionHeader>
      {isOpen && <SectionContent>{children}</SectionContent>}
    </SectionContainer>
  )
}
