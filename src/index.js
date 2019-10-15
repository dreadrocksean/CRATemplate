import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "unstated";

import "./index.css";
// import App from './App';
import App from "./layout/App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// serviceWorker.unregister();
serviceWorker.register();
