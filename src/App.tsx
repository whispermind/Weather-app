import { useState } from "react";

import { MainPage } from "./pages/main/main";
import { AppContext, defaultAppContext, IAppContext } from "./app/context";

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
        <MainPage />
      </AppContext.Provider>
    </div>
  );
}

export default App;
