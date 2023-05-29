import doc from './doc.html?raw'
import { IFrame } from './styles'

export function Documentation() {
  return <IFrame srcDoc={doc} />
}
