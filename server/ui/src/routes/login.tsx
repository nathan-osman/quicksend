import Button from '../components/form/Button'
import Input from '../components/form/Input'
import TitleSvg from '../img/title.svg'

export default function Login() {
  return (
    <div className="flex flex-col flex-1 w-full items-center justify-center">
      <div className="bg-background p-4 rounded">
        <div className="text-lg">
          <form>
            <div className="mb-4">
              <img src={TitleSvg} />
            </div>
            <Input
              placeholder="Username"
              autoFocus
            />
            <Input
              type="password"
              placeholder="Password"
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
