import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
//alert context provider
import { AppAlertProvider } from "./contexts/alertContext";

//styles
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./index.css";

//React Dom
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppAlertProvider>
        <App />
      </AppAlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
