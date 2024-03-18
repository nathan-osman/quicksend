import { clsx } from 'clsx'
import Input from '../form/Input'
import VDivider from './VDivider'
import LogoSvg from '../../img/logo.svg'
import Button from '../form/Button'

type Props = {
  to: string[]
  from: string
  subject: string
  onToChange: (to: string[]) => void
  onFromChange: (from: string) => void
  onSubjectChange: (subject: string) => void
  onSend: () => void
}

export default function Controls(props: Props) {

  const className = clsx(
    'grow',
    'grid',
    'gap-2',
    'grid-cols-[auto_minmax(0,_1fr)]',
    'items-center',
  )

  return (
    <div className="bg-background rounded p-2">
      <div className="flex gap-4 items-start">
        <Button
          type="button"
          onClick={props.onSend}
        >
          <img
            src={LogoSvg}
          />
          Send
        </Button>
        <VDivider />
        <div className={className}>

          {/* Recipient(s) */}
          <div className="text-right">To:</div>
          <div>
            <Input
              value={props.to}
              onChange={e => props.onToChange([e.target.value])}
              placeholder="recipient@example.com"
            />
          </div>

          {/* Sender */}
          <div className="text-right">From:</div>
          <div>
            <Input
              value={props.from}
              onChange={e => props.onFromChange(e.target.value)}
              placeholder="sender@example.com"
            />
          </div>

          {/* Subject */}
          <div className="text-right">Subject:</div>
          <div>
            <Input
              value={props.subject}
              onChange={e => props.onSubjectChange(e.target.value)}
            />
          </div>

        </div>
      </div>
    </div>
  )
}
