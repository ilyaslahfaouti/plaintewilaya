import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";
import "./i18n";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
