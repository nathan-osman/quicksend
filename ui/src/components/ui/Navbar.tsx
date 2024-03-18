import { useApi } from '../../lib/api'

export default function Navbar() {

  const api = useApi()

  function handleLogout(e: React.MouseEvent) {
    e.preventDefault()
    api.logout()
  }

  return (
    <div className="bg-background rounded px-4 py-2 flex gap-4 items-center">
      <div className="text-danger">
        quicksend
      </div>
      <div className="grow flex gap-4 justify-end">
        <a
          href="#"
          onClick={handleLogout}
        >
          Logout
        </a>
      </div>
    </div>
  )
}
