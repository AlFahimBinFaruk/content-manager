import * as React from "react";
import { useState, useContext, useEffect } from "react";

//children interface
interface LayoutProps {
  children: React.ReactNode;
}
//alert context
const AppAlertContext = React.createContext<any | null>(null);

//alert provider
const AppAlertProvider = (props: LayoutProps) => {
  //show alert state
  const [showAlert, setShowAlert] = useState(false);

  //use effect to to listen for any change in show alert.
  useEffect(() => {
    if (showAlert) {
      const alertTimeOut = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return () => clearTimeout(alertTimeOut);
    }
  }, [showAlert]);

  return (
    <AppAlertContext.Provider value={{ showAlert, setShowAlert }}>
      {props.children}
    </AppAlertContext.Provider>
  );
};
// export global context
export const useGlobalAlertContext = () => {
  return useContext(AppAlertContext);
};

//export alert context and provider
export { AppAlertContext, AppAlertProvider };
