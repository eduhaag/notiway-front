import { X } from 'phosphor-react'
import { Modal } from '../../components/Modal'
import {
  CancelButton,
  Description,
  HeaderContainer,
  ModalContent,
  Title,
} from './styles'

export function PrivacityTermsModal() {
  return (
    <Modal>
      <ModalContent>
        <HeaderContainer>
          <Title>POLÍTICA DE PRIVACIDADE</Title>
          <CancelButton>
            <X size={20} />
          </CancelButton>
        </HeaderContainer>
        <Description>
          <p>
            Esta Política de Privacidade descreve como coletamos, usamos e
            compartilhamos suas informações pessoais quando você utiliza nosso
            site e serviços.
          </p>
          <ol>
            <li>
              <h3>Informações coletadas</h3>
              <p>
                Ao se inscrever em nosso site, podemos coletar as seguintes
                informações pessoais:
              </p>
              <ul>
                <li>Nome completo;</li>
                <li>Endereço de e-mail;</li>
                <li>CPF ou CNPJ;</li>
                <li>Número de telefone;</li>
                <li>Endereço postal;</li>
                <li>Informações de pagamento.</li>
              </ul>
              <p>
                Também podemos coletar informações não pessoais, como dados
                demográficos e de uso do site.
              </p>
            </li>
            <li>
              <h3>Uso das informações</h3>
              <p>
                Usamos as informações pessoais que coletamos para fornecer e
                melhorar nossos serviços, processar pagamentos e enviar
                comunicações de marketing. Podemos usar informações não pessoais
                para fins de análise e desenvolvimento de negócios.
              </p>
            </li>
            <li>
              <h3>Compartilhamento de informações</h3>
              <p>
                Não compartilhamos suas informações pessoais com terceiros,
                exceto quando necessário para cumprir requisitos legais ou para
                prestar serviços em nosso nome, como processamento de pagamentos
                e entrega de comunicações de marketing.
              </p>
            </li>
            <li>
              <h3>Segurança de informações</h3>
              <p>
                Temos medidas de segurança em vigor para proteger suas
                informações pessoais contra acesso não autorizado, uso,
                alteração ou divulgação. No entanto, não podemos garantir que
                todas as transmissões de dados pela Internet sejam 100% seguras.
              </p>
            </li>
            <li>
              <h3>Alterações nesta política</h3>
              <p>
                Podemos atualizar esta Política de Privacidade de tempos em
                tempos. Notificaremos os usuários de quaisquer alterações
                significativas por meio de nosso site ou outras formas
                apropriadas.
              </p>
            </li>
          </ol>
          <p>
            Ao se inscrever em nosso site, você concorda com os termos desta
            Política de Privacidade e consente com a coleta, uso e
            compartilhamento de suas informações pessoais conforme descrito
            acima.
          </p>
        </Description>
      </ModalContent>
    </Modal>
  )
}
