import styled from 'styled-components'

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.white};

  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

interface HeaderProps {
  statusColor: 'green' | 'red' | 'yellow'
}

export const SectionHeader = styled.header<HeaderProps>`
  display: flex;
  flex: 1;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;

  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    h4 {
      font-family: 'Open Sans', sans-serif;
      font-size: 1.2rem;
      font-weight: normal;
    }

    span {
      font-family: 'Montserrat', sans-serif;
      font-size: 1rem;
      font-weight: bold;
      color: ${(props) => props.theme[props.statusColor]};
    }
  }
`

export const SectionContent = styled.div`
  display: flex;
`
