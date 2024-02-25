import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Placeholder from "../UI/Placeholder/Placeholder";

const Header = () => {
  const { store } = useContext(Context);

  //   useEffect(() => {
  //     if (localStorage.getItem("token")) {f
  //       store.checkAuth();
  //     }
  //   }, []);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkAuthentication() {
      if (localStorage.getItem("token")) {
        try {
          await store.checkAuth();
        } catch (e) {
          console.log(e);
        }
      }
      setIsLoading(false);
    }

    checkAuthentication();
  }, [store]);

  if (isLoading) {
    return <Placeholder />;
  }

  return (
    <header>
      <nav
        b-p8argd8r70=""
        className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3"
      >
        <div b-p8argd8r70="" className="container-fluid">
          <a className="navbar-brand" href="/">
            Book web app
          </a>
          <button
            b-p8argd8r70=""
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span b-p8argd8r70="" className="navbar-toggler-icon"></span>
          </button>
          <div
            b-p8argd8r70=""
            className="navbar-collapse collapse d-sm-inline-flex justify-content-between"
          >
            <ul b-p8argd8r70="" className="navbar-nav flex-grow-1">
              <li b-p8argd8r70="" className="nav-item">
                <Link to={"/"} className="nav-link text-dark">
                  Главная
                </Link>
              </li>
            </ul>
            <ul
              b-p8argd8r70=""
              className="navbar-nav flex-grow-1 justify-content-end align-items-center"
            >
              <li b-p8argd8r70="" className="nav-item">
                {store.isAuth ? (
                  <Link
                    to={`/`}
                    className="nav-link text-dark"
                  >
                    {store.user.email}
                  </Link>
                ) : (
                  <a className="nav-link text-dark" href="/login">
                    Войти
                  </a>
                )}
              </li>
              {store.isAuth && (
                <li b-p8argd8r70="" className="nav-item">
                  <Button
                    className="btn-sm btn-dark"
                    onClick={() => store.logout()}
                  >
                    Выход
                  </Button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default observer(Header);
