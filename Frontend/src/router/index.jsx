import { createBrowserRouter } from "react-router-dom";
import GeussLayaout from "../Layouts/GeussLayaout";
import ProtectedLayout from "../Layouts/ProtectedLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import NotFound from "../Pages/NotFound/NotFound";
import EmailVerification from "../Pages/EmailVerification/EmailVerification";
import PlaintForm from "../Pages/PlaintForm/PlaintForm";
import Plaints from "../Pages/Plaints/Plaints";
import SeccessPlaint from "../Pages/SeccessPlaint/SeccessPlaint";
import PlaintDetails from "../Pages/PlaintDetails/PlaintDetails";
import Links from "./Links";

export const router = createBrowserRouter([
  {
    element: <GeussLayaout />,
    children: [
      { path: Links.home, element: <Home /> },
      { path: Links.login, element: <Login /> },
      { path: Links.register, element: <Register /> },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      { path: Links.verification, element: <EmailVerification /> },
      { path: Links.dashboard, element: <Dashboard /> },
      { path: Links.complaint.create, element: <PlaintForm /> },
      { path: Links.complaint.success, element: <SeccessPlaint /> },
      { path: Links.complaint.index, element: <Plaints /> },
      { path: Links.complaint.show, element: <PlaintDetails /> },
    ],
  },

  { path: "/*", element: <NotFound /> },
]);
