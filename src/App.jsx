import { Navbar } from "./components/Navbar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Outlet context={{ darkMode, setDarkMode }} />
      </div>
  );
}
