import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

// تعریف نوع داده‌های Context
interface AppContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

// ایجاد Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// هوک برای دسترسی به Context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

// Provider برای Context
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </AppContext.Provider>
  );
};
