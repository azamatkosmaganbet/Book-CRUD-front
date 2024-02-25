import React from "react";
import { Toast } from "react-bootstrap";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Header from "./components/Header/Header";
import { observer } from "mobx-react-lite";

function App() {
  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        <Route
          element={
            <>
              <Header />
              <Outlet />
            </>
          }
        >
          <Route element={<Login />} path="/login" />
          <Route element={<></>} path="/" />
          <Route element={<Register />} path="/register" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default observer(App);
