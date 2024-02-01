import { Outlet } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';

export default function PublicRoute() {
  const { user } = useUser();

  return <Outlet />;
  
  if (user === undefined) {
    return null;
  }
  else if (user) {
    // return <Navigate to="/" />
    return <Outlet />;
  }
  else {
    return <Outlet />;
  }
}