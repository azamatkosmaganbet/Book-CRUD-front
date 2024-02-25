import { AxiosResponse } from "axios";
import $api from "../http";
import { IBook } from "../models/IBook";

export default class BookService {
  static fetchBooks(): Promise<AxiosResponse<IBook[]>> {
    return $api.get<IBook[]>("/books");
  }

  static createBook(bookData: IBook): Promise<AxiosResponse<IBook>> {
    return $api.post<IBook>("/create/book", bookData);
  }

  static deleteBook(bookId: string): Promise<AxiosResponse<void>> {
    return $api.delete<void>(`/delete/book/${bookId}`);
  }

  static updateBook(bookId: string, bookData: Partial<IBook>): Promise<AxiosResponse<IBook>> {
    return $api.put<IBook>(`/update/book/${bookId}`, bookData);
  }

  static getBookById(bookId: string): Promise<AxiosResponse<IBook>> {
    return $api.get<IBook>(`/books/${bookId}`);
  }
}
