import { useApi } from '../lib/api'

export default function Index() {

  const api = useApi()

  function handleLogout(e: React.MouseEvent) {
    e.preventDefault()
    api.logout()
  }

  return (
    <>
      <a
        href="#"
        onClick={handleLogout}
      >
        Logout
      </a>
    </>
  )
}
