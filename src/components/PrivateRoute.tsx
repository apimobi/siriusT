import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';

// export default function PrivateRoute(children:any) {
export default function PrivateRoute() {
  const { user } = useUser();
  const location = useLocation();

  // if(user){
  //   return <Outlet />;
  // }
  if (user === undefined || user == null) {
    if(localStorage.getItem('token') != null){
      return <Outlet />;
    }
    return null;
  }
  else if (user) {
    // return children;
    return <Outlet />;
  }
  else {
    const url = location.pathname + location.search + location.hash;
    return <Navigate to="/login" state={{next: url}} />
  }
}