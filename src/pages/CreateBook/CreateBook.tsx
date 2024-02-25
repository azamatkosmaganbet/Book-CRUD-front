import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { IBook } from "../../models/IBook";
import { toast } from "react-toastify";

const CreateBook = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const [value, setValue] = useState<IBook>({
    name: "",
    author: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      store.checkAuth().then(() => {
        navigate("/");
      });
    }
  }, [navigate, store]);

  const changeHandler = (fields: Partial<IBook>) => {
    setValue((prev) => {
      return { ...prev, ...fields };
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    store.createBook(value);

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };



  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <Form.FloatingLabel
          label="Название книги"
          className="mb-3"
          controlId="floatingInput"
        >
          <Form.Control
            onChange={(e) => changeHandler({ name: e.target.value })}
            required
            type="text"
            value={value.name}
            name="name"
          />
        </Form.FloatingLabel>

        <Form.FloatingLabel
          label="Автор книги"
          className="mb-3"
          controlId="floatingInput"
        >
          <Form.Control
            value={value.author}
            onChange={(e) => changeHandler({ author: e.target.value })}
            type="text"
            required
            name="author"
          />
        </Form.FloatingLabel>

        <Form.FloatingLabel
          label="Описание книги"
          className="mb-3"
          controlId="floatingInput"
        >
          <Form.Control
            value={value.description}
            onChange={(e) => changeHandler({ description: e.target.value })}
            as={"textarea"}
            rows={3}
            name="description"
          />
        </Form.FloatingLabel>

        <Form.FloatingLabel
          label="Дата книги"
          className="mb-3"
          controlId="floatingInput"
        >
          <Form.Control
            value={value.date}
            onChange={(e) => changeHandler({ date: e.target.value })}
            type="date"
            name="date"
          />
        </Form.FloatingLabel>

        <Button className="w-100" variant="primary" type="submit">
          Создать
        </Button>
      </form>
    </div>
  );
};

export default CreateBook;
