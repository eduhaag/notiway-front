import { ReactNode, useState } from 'react'
import { SectionContainer, SectionContent, SectionHeader } from './styles'
import { CaretDown, CaretUp } from 'phosphor-react'

const STATUS_TYPES = {
  ready: {
    title: 'Ativo',
    color: 'green',
  },
  processing: {
    title: 'Processamento',
    color: 'yellow',
  },
  bloqued: {
    title: 'Bloqueado',
    color: 'red',
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
  status: keyof typeof STATUS_TYPES
  children: ReactNode
}

export function ToggleSection({ children, title, status }: ToggleSectionProps) {
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
