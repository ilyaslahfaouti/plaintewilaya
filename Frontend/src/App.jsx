import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";
import "./i18n";
import { Provider } from "react-redux";
import store from './store/index'
import { persistor } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

          <RouterProvider router={router} />

        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
