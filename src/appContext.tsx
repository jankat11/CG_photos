import { createContext, useState } from "react";

interface props {
  children: React.ReactNode;
}
interface UnsplashContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const UnsplashContext = createContext<UnsplashContextType>({
  isDark: false,
  toggleTheme: () => {},
});

export const UnsplashContextProvider: React.FC<props> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const contextValue: UnsplashContextType = { isDark, toggleTheme };

  return (
    <UnsplashContext.Provider value={contextValue}>
      {children}
    </UnsplashContext.Provider>
  );
};

export default UnsplashContext;
