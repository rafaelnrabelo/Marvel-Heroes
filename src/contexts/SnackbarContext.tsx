import { createContext, ReactNode, useContext, useRef, useState } from "react";

import Snackbar from "../components/Snackbar";

interface SnackbarContextProps {
  showSnackbar: (message: string) => void;
}

interface SnackbarProviderProps {
  children: ReactNode;
}

const SnackbarContext = createContext({} as SnackbarContextProps);

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const timeout = useRef<NodeJS.Timeout>();

  const showSnackbar = (message: string) => {
    clearTimeout(timeout.current);
    setMessage(message);
    setShow(true);

    timeout.current = setTimeout(function () {
      setShow(false);
      setMessage("");
    }, 3000);
  };

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
      }}
    >
      <Snackbar show={show} message={message} />
      {children}
    </SnackbarContext.Provider>
  );
}

export const useSnackbar = () => useContext(SnackbarContext);
