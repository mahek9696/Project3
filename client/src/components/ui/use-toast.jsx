import * as React from "react";

const ToastContext = React.createContext({
  toasts: [],
  toast: () => {},
});

export function ToastProviderContext({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const toast = React.useCallback((toast) => {
    setToasts((prev) => [...prev, { id: Date.now(), ...toast }]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProviderContext");
  }
  return context;
}
