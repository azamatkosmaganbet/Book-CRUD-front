import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await store.registration(email, password, name, surname);

      setEmail("");
      setName("");
      setSurname("");
      setPassword("");

      navigate("/login");
    } catch (error) {
      alert("Что то пошло не так");
    }
  };

  return (
    <div>
      <Container>
        <div className="d-flex justify-content-center">
          <div className="border rounded mb-4 custom-forms mt-5 mb-0 p-5">
            <div className="mx-auto my-2 text-center">
              <a href="/">
                <h3>Программа отпусков</h3>
              </a>
            </div>
            <h6 className="text-secondary mt-2 mb-4 mx-auto text-center">
              Зарегистрируйтесь, чтобы получить более широкие возможности
              приложения
            </h6>
            <form onSubmit={submitHandler}>
              <Form.FloatingLabel
                label="Email"
                className="mb-3"
                controlId="floatingInput"
              >
                <Form.Control
                  required={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                />
              </Form.FloatingLabel>
              <Form.Group>
                <Form.FloatingLabel
                  label="Пароль"
                  className="mb-3"
                  controlId="floatingInput"
                >
                  <Form.Control
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Пароль"
                  />
                </Form.FloatingLabel>
              </Form.Group>
              <Form.FloatingLabel
                label="Имя"
                className="mb-3"
                controlId="floatingInput"
              >
                <Form.Control
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Имя"
                />
              </Form.FloatingLabel>
              <Form.FloatingLabel
                label="Фамилия"
                className="mb-3"
                controlId="floatingInput"
              >
                <Form.Control
                  required
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  type="text"
                  placeholder="Фамилия"
                />
              </Form.FloatingLabel>
              <Button variant="primary" type="submit">
                Зарегистрироваться
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default observer(Register);
