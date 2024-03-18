import { clsx } from 'clsx'
import Input from '../form/Input'
import VDivider from './VDivider'
import LogoSvg from '../../img/logo.svg'

export default function Controls() {

  const sendClassName = clsx(
    'hover:bg-background-light',
    'rounded',
    'shadow',
    'p-2',
    'flex',
    'flex-col',
    'items-center',
    'cursor-pointer',
  )

  const controlClassName = clsx(
    'grow',
    'grid',
    'gap-2',
    'grid-cols-[auto_minmax(0,_1fr)]',
    'items-center',
  )

  return (
    <div className="bg-background rounded p-2">
      <div className="flex gap-4 items-start">
        <div className={sendClassName}>
          <img
            src={LogoSvg}
          />
          Send
        </div>
        <VDivider />
        <div className={controlClassName}>

          {/* Recipient(s) */}
          <div className="text-right">To:</div>
          <div>
            <Input
              placeholder="recipient@example.com"
            />
          </div>

          {/* Sender */}
          <div className="text-right">From:</div>
          <div>
            <Input
              placeholder="sender@example.com"
            />
          </div>

          {/* Subject */}
          <div className="text-right">Subject:</div>
          <div>
            <Input />
          </div>

        </div>
      </div>
    </div>
  )
}