import "./app.css";

import { LoginPage } from "@/presentation/pages/login.page";
import { PanelPage } from "../presentation/pages/panel.page";
import {  createBrowserRouter, RouterProvider } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage/>
  },
  {
    path: '/barraquinhas',
    element: <PanelPage/>
  },
  {
    path: '/produtos',
    element: <PanelPage/>
  },
  {
    path: '/bilhetes',
    element: <PanelPage/>
  }
])

const App = () => {
  return (
    <>
      <RouterProvider router={routes}/>
    </>
  );
}

export default App;
