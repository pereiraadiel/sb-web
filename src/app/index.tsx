import "./app.css";
import {  createBrowserRouter, RouterProvider } from "react-router-dom";

import { LoginPage } from "@/presentation/pages/login.page";
import { PanelPage } from "@/presentation/pages/panel.page";
import { ErrorPage } from "@/presentation/pages/error.page";
import { StandDetailsPage } from "@/presentation/pages/standDetails.page";
import { ToastProviderMolecule } from "@/presentation/molecules/toastProvider.molecule";
import { PrivateRoute } from "./private.route";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage/>
  },
  {
    path: '/barraquinhas',
    element: (
      <PrivateRoute>
        <PanelPage/>
      </PrivateRoute>
    )
  },
  {
    path: '/barraquinhas/:code',
    element: (
      <PrivateRoute>
        <StandDetailsPage/>
      </PrivateRoute>
    )
  },
  {
    path: '/produtos',
    element: (
      <PrivateRoute>
        <PanelPage/>
      </PrivateRoute>
    )
  },
  {
    path: '/bilhetes',
    element: (
      <PrivateRoute>
        <PanelPage/>
      </PrivateRoute>
    )
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
