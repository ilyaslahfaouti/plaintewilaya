import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layouts/Layout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashbord from "../Pages/Dashbord/Dashbord";
import NotFound from "../Pages/NotFound/NotFound";
import EmailVerification from '../Pages/EmailVerification/EmailVerification'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashbord",
        element: <Dashbord />,
      },
      {
        path: "/verification",
        element: <EmailVerification />,
      },
    ],
  },

  {
    path: "/*",
    element: <NotFound />,
  },
]);
