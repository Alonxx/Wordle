import React from "react";
import { Board } from "src/pages";
import { useUserDataStore } from "./stores";

const App = () => {
  const { themeMode } = useUserDataStore();

  React.useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);

  return (
    <div>
      <Board />
    </div>
  );
};

export default App;
