import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import MongoDB from "./providers/mongodb"
import RealmApp from "./providers/realm"

ReactDOM.render(
  <React.StrictMode>
     <RealmApp>
     <MongoDB>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </MongoDB>
    </RealmApp>
  </React.StrictMode>,
  document.getElementById("root")
);