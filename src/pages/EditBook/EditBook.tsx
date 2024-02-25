import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../..";
import { IBook } from "../../models/IBook";
import BookService from "../../services/BookService";

const EditBook = () => {
  const { id } = useParams();
  const { store } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      store.checkAuth().then(() => {
        navigate("/");
      });
    }
  }, [navigate, store]);

  useEffect(() => {
    if (id) {
      store.getBookByID(id).then(() => {
        setValue(store.book);
      });
    }
  }, []);

  const [value, setValue] = useState<IBook>({
    name: " ",
    author: "",
    description: "",
    date: "",
  });

  const changeHandler = (fields: Partial<IBook>) => {
    setValue((prev) => {
      return { ...prev, ...fields };
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id) {
      store.updateBook(id, value);
    }

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

export default EditBook;
