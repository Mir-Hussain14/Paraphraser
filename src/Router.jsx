import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ParaphrasingTool from "./components/ParaphrasingTool";
import Home from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
