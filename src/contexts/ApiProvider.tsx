import { createContext, useContext } from 'react';
import ApiClient from '../services/ApiClient';
import { ReactNode } from 'react';


interface ApiContext {
    api: ApiClient,
    // isAuthenticated: () => boolean,
    // login: (username: string, password: string) => Promise<'ok' | 'fail' | 'error'>,
    // logout: () => Promise<void>,
    // get: (path: string) => Promise<any>,
};

const ApiContext = createContext<ApiContext>({} as ApiContext);

export default function ApiProvider({children}: { children: ReactNode }) {
  const api = new ApiClient();

  return (
    <ApiContext.Provider value={{api}}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  return useContext(ApiContext);
}