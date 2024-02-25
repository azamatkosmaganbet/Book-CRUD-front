import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Store from "./store/store";
import { createContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({ store });
root.render(
  <Context.Provider value={{ store }}>
    <App />
  </Context.Provider>
);
