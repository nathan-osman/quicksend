import { FormEvent, useState } from 'react'
import { useApi } from '../lib/api'
import Button from '../components/form/Button'
import Input from '../components/form/Input'
import TitleSvg from '../img/title.svg'

export default function Login() {

  const api = useApi()

  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    api.login(email, password)
      .catch((e: Error) => {
        setError(e.message)
      })
  }

  return (
    <div className="flex flex-col flex-1 w-full items-center justify-center">
      <div className="bg-background p-4 rounded">
        <div className="text-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <img src={TitleSvg} />
            </div>
            {
              error !== null &&
              <div className="text-danger">
                Error: {error}
              </div>
            }
            <Input
              placeholder="Username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <div className="text-right">
              <Button primary={true}>Login</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
