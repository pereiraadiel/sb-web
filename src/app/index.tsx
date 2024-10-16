import "./app.css";
import {  createBrowserRouter, RouterProvider } from "react-router-dom";

import { LoginPage } from "@/presentation/pages/login.page";
import { PanelPage } from "@/presentation/pages/panel.page";
import { ErrorPage } from "@/presentation/pages/error.page";
import { StandDetailsPage } from "@/presentation/pages/standDetails.page";
import { ToastProviderMolecule } from "@/presentation/molecules/toastProvider.molecule";

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
    path: '/barraquinhas/:code',
    element: <StandDetailsPage/>
  },
  {
    path: '/produtos',
    element: <PanelPage/>
  },
  {
    path: '/bilhetes',
    element: <PanelPage/>
  },
  {
    path: '*',
    element: <ErrorPage/>
  }
])

const App = () => {
  return (
    <>
      <RouterProvider router={routes}/>
      <ToastProviderMolecule/>
    </>
  );
}

export default App;
