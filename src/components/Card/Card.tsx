import React, { FC } from "react";
import { IBook } from "../../models/IBook";
import { Link } from "react-router-dom";

interface CardProps {
  book: IBook;
  setBookIdToDelete: any;
  setShowModal: any;
  store: any;
}

const Card: FC<CardProps> = ({ book, setBookIdToDelete, setShowModal, store }) => {
  return (
    <div
      className="card w-24 me-2 mb-4"
      style={{ width: "18rem", cursor: "pointer" }}
    >
      <img
        src={"https://cdn.britannica.com/83/78183-004-345353F4/Stack-books.jpg"}
        className="card-img-top p-2"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{book.name}</h5>
        <p className="card-text">{book.description}</p>
        <p>{book.date && new Date(book.date).toLocaleDateString("ru-RU")}</p>
        {store.isAuth && (
          <>
            <Link to={`/edit/book/${book._id}`} className="btn btn-warning me-2">
              Редактировать
            </Link>
            <a
              onClick={() => {
                if (book._id) {
                  setBookIdToDelete(book._id);
                  setShowModal(true);
                }
              }}
              href="#"
              className="btn btn-danger"
            >
              Удалить
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
