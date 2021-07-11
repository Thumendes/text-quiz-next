import React, { createContext, useContext, useState } from "react";
import { LoaderContextType } from "../types";
import { Loader } from "lib/ui";

const LoaderContext = createContext({} as LoaderContextType);

export const useLoader = () => useContext(LoaderContext);

const LoaderContextProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function open() {
    setIsLoading(true);
  }

  function close() {
    setIsLoading(false);
  }

  return (
    <LoaderContext.Provider value={{ open, close, isLoading }}>
      {isLoading && <Loader />}

      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderContextProvider;
