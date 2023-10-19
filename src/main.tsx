import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import rootStore from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={rootStore.store}>
    <PersistGate persistor={rootStore.persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
