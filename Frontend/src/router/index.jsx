import { createBrowserRouter } from "react-router-dom";
import GeussLayaout from "../Layouts/GeussLayaout";
import ProtectedLayout from "../Layouts/ProtectedLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashbord from "../Pages/Dashbord/Dashbord";
import NotFound from "../Pages/NotFound/NotFound";
import EmailVerification from '../Pages/EmailVerification/EmailVerification'
import Plaint from "../Pages/Plaint/Plaint";
import SeccessPlaint from "../Pages/SeccessPlaint/SeccessPlaint";

export const router = createBrowserRouter([
  {
    element: <GeussLayaout />,
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
      
      
    ],
  },
  {
    element: <ProtectedLayout />,
    children:[
      {
        path: "/verification",
        element: <EmailVerification />,
      },
      {
        path: "/dashbord",
        element: <Dashbord />,
      },
      {
        path: "/plaint",
        element: <Plaint />,
      },
      {
        path: "/seccess",
        element: <SeccessPlaint />,
      },
    ]

  },

  {
    path: "/*",
    element: <NotFound />,
  },
]);
