import { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google"

import { MainPage } from "./pages/main/main";
import { AppContext, defaultAppContext, IAppContext } from "./app/context";
import { Auth } from "./modules";

import "./index.css";

const storageKey = "SOMEAMAZINGKEY";
const storageData = localStorage.getItem(storageKey);
const parsedData = storageData && JSON.parse(storageData) as typeof defaultAppContext | null;

function App() {
  const [appContext, setAppContext] = useState<IAppContext>(parsedData || defaultAppContext);

  window.addEventListener("unload", () => {
    localStorage.setItem(storageKey, JSON.stringify(appContext));
  }, { once: true });

  return (
    <div className="App">
      <AppContext.Provider value={{...appContext, setContext: setAppContext }}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_KEY || ""}> 
        <header>
          <Auth />
        </header>
        <div className="app-content">
          <MainPage />
        </div>
        </GoogleOAuthProvider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
