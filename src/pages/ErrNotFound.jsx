import { Link, useRouteError } from 'react-router-dom'
import Navbar from '../components/navbar'
import { HomeIcon } from '@heroicons/react/24/solid'
import GoBack from '../components/GoBack'

export default function ErrNotFound() {
  const customErr = useRouteError()

  return (
    <div>
      
      <h1>oh no!, something wrong happened</h1>
      <p>{customErr.message}</p>
      <div className="flex-md">
        <GoBack />
        <Link to={"/"} className='btn btn--dark'>
          <HomeIcon width={20} />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  )
}
