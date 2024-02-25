import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Header from "./components/Header/Header";
import { observer } from "mobx-react-lite";
import Book from "./pages/Book/Book";
import CreateBook from "./pages/CreateBook/CreateBook";
import Toast from "./components/Toast/Toast";
import EditBook from "./pages/EditBook/EditBook";

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
          <Route element={<Book />} path="/" />
          <Route element={<Register />} path="/register" />
          <Route element={<CreateBook />} path="/create/book" />
          <Route element={<EditBook />} path="/edit/book/:id" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default observer(App);
