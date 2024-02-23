import { useState } from "react";

import { MainPage } from "./pages/main/main";
import { AppContext, defaultAppContext, IAppContext } from "./app/context";

function App() {
  const [appContext, setAppContext] = useState<IAppContext>(defaultAppContext);

  return (
    <div className="App">
      <AppContext.Provider value={{...appContext, setContext: setAppContext }}>
        <MainPage />
      </AppContext.Provider>
    </div>
  );
}

export default App;
