import { createBrowserRouter } from "react-router-dom";
import GeussLayaout from "../Layouts/GeussLayaout";
import ProtectedLayout from "../Layouts/ProtectedLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashbord from "../Pages/Dashbord/Dashbord";
import NotFound from "../Pages/NotFound/NotFound";
import EmailVerification from "../Pages/EmailVerification/EmailVerification";
import PlaintForm from "../Pages/PlaintForm/PlaintForm";
import Plaints from "../Pages/Plaints/Plaints";
import SeccessPlaint from "../Pages/SeccessPlaint/SeccessPlaint";
import PlaintDetails from "../Pages/PlaintDetails/PlaintDetails";

export const router = createBrowserRouter([
  {
    element: <GeussLayaout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      { path: "/verification", element: <EmailVerification /> },
      { path: "/dashbord", element: <Dashbord /> },
      { path: "/plaint/create", element: <PlaintForm /> },
      { path: "/seccess", element: <SeccessPlaint /> },
      { path: "/plaints", element: <Plaints /> },
      { path: "/plaint/detail", element: <PlaintDetails /> },
    ],
  },

  { path: "/*", element: <NotFound /> },
]);
