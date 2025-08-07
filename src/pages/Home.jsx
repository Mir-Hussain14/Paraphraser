import { useOutletContext } from "react-router-dom"; 
import ParaphrasingTool from "../components/ParaphrasingTool";

export default function Home() {
  const { darkMode, setDarkMode } = useOutletContext(); 

  return (
    <div className={`min-h-screen ${darkMode ? "bg-[#101214]" : "bg-white"}`}>
      <ParaphrasingTool darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}
