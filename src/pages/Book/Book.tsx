/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { Context } from "../..";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";

const Book = () => {
  const { store } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [bookIdToDelete, setBookIdToDelete] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth()
    }
  }, []);

  useEffect(()=>{
    store.getBooks();
  }, [store])
  
  if (store.isLoading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  const deleteHandler = async () => {
    if (bookIdToDelete) {
      await store.deleteBook(bookIdToDelete);
      setShowModal(false); 
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="mb-4">
        <Button
          onClick={() => {
            navigate("/create/book");
          }}
        >
          Добавить книгу
        </Button>
      </div>
      <div className="d-flex align-items-center flex-wrap">
        {store.books.map((book) => (
          <Card
            store={store}
            setBookIdToDelete={setBookIdToDelete}
            setShowModal={setShowModal}
            book={book}
          />
        ))}
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Подтверждение удаления</Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы уверены, что хотите удалить эту книгу?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Отмена
          </Button>
          <Button variant="danger" onClick={deleteHandler}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default observer(Book);
