import React, { FC, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import { Spinner } from "react-bootstrap";

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth().then(() => {
        navigate("/");
      });
    }
  }, [navigate, store]);

  if (store.isLoading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    store.login(email, password, navigate);
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="border rounded mb-4 custom-forms mt-5 mb-0 p-5">
          <div className="mx-auto my-2 text-center">
            <h1>Book web app</h1>
          </div>
          <h6 className="text-secondary mt-2 mb-4 mx-auto text-center">
            Войдите, чтобы использовать полный функционал приложения
          </h6>
          <form onSubmit={submitHandler}>
            <Form.FloatingLabel
              label="Email"
              className="mb-3"
              controlId="floatingInput"
            >
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                value={email}
              />
            </Form.FloatingLabel>

            <Form.FloatingLabel
              label="Пароль"
              className="mb-3"
              controlId="floatingInput"
            >
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
            </Form.FloatingLabel>
            <Button variant="primary" type="submit">
              Войти
            </Button>
          </form>
        </div>
      </div>
      <div className="d-flex justify-content-center my-0">
        <div className="border rounded my-0 custom-forms p-3">
          <div className="mx-auto my-2 text-center">
            <p>
              У вас ещё нет аккаунта? <a href="/register">Зарегистрироваться</a>
            </p>
          </div>
        </div>
      </div>
      {/* <div className="d-flex justify-content-center my-4">
        <div className="border rounded my-0 custom-forms p-3">
          <div className="mx-auto my-2 text-center">
            <p>
              Забыли пароль? <a href="/recovery">Восстановить аккаунт</a>
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default observer(Login);
