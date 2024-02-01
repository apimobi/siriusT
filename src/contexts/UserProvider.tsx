import { createContext, useContext, useState, useEffect, SetStateAction, Dispatch } from 'react';
import { useApi } from './ApiProvider';
import { ReactNode } from 'react';


interface UserContext {
    logout: () => Promise<void>,
    login: (username: string, password: string) => Promise<'ok' | 'fail' | 'error'>,
    user: User | null,
    setUser: Dispatch<SetStateAction<User | null>>
};

interface User{
    username: string,
    email: string,
    id: string|''
}

const UserContext = createContext<UserContext>({} as UserContext);


export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const apiCopntext = useApi();

  useEffect(() => {
    console.log('UserProvider useEffect');
    (async () => {
      if (apiCopntext.api.isAuthenticated()) {
        const response = await apiCopntext.api.get('users/me', null, null);
        setUser(response.ok ? response.body : null);
      }
      else {
        setUser(null);
      }
    })();
  }, [apiCopntext.api]);

  const login = async (username:string, password:string) => {
    const result = await apiCopntext.api.login(username, password);
    if (result.status === 200) {
      const response = await apiCopntext.api.get('users/me', null, null);
      setUser(response.ok ? response.body : null);
      return "ok";
    }
    if (result.status != 200) {
      return "fail";
    }
    return "error";
  };

  const logout = async () => {
    await apiCopntext.api.logout();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}