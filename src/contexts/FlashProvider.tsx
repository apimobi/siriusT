import { createContext, useContext, useState } from 'react';

interface FlashContext {
    flash: flashFunction ,
    hideFlash: any,
    flashMessage: {
        message: string,
        type: string
    },
    visible : boolean
};

interface flashFunction {
    (message: string,
    type: string,
    duration: number): void
};

const FlashContext = createContext<FlashContext>({} as FlashContext);
let flashTimer: NodeJS.Timeout | null = null;

export default function FlashProvider(children:any) {
  const [flashMessage, setFlashMessage] = useState({message:'', type:''});
  const [visible, setVisible] = useState(false);

  const flash = (message:string, type:string, duration = 10) => {
    if (flashTimer) {
      clearTimeout(flashTimer);
      flashTimer = null;
    }
    setFlashMessage({message, type});
    setVisible(true);
    if (duration) {
      flashTimer = setTimeout(hideFlash, duration * 1000);
    }
  };

  const hideFlash = () => {
    setVisible(false);
  };

  return (
    <FlashContext.Provider value={{flash, hideFlash, flashMessage, visible}}>
      {children}
    </FlashContext.Provider>
  );
}

export function useFlash() {
  return useContext(FlashContext);
}