import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import $api, { API_URL } from "../http";
import { toast } from "react-toastify";
import { IBook } from "../models/IBook";
import UserService from "../services/UserService";
import BookService from "../services/BookService";

export default class Store {
  user = {} as IUser;
  books = [] as IBook[];
  book = {} as IBook
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setBooks(books: IBook[]) {
    this.books = books;
  }

  setBook(book: IBook) {
    this.book = book;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string, navigate: any) {
    this.setLoading(true);
    try {
      const response = await AuthService.login(email, password);

      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      console.log(response.data.user);

      toast.success("Вы успешно вошли в аккаунт");
      navigate("/");

      this.setLoading(false);
    } catch (e: any) {
      toast.error(e.response?.data.message);
      this.setLoading(false);
    }
  }

  async registration(
    email: string,
    password: string,
    name: string,
    surname: string
  ) {
    try {
      const response = await AuthService.registration(
        email,
        password,
        name,
        surname
      );
      localStorage.setItem("token", response.data.accessToken);
      console.log(response);

      this.setAuth(true);
      this.setUser(response.data.user);

      toast.success("Вы успешно зарегистрировались!");
    } catch (e: any) {
      toast.error(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      console.log(response);
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    try {
      this.setLoading(true);
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });

      localStorage.setItem("token", response.data.accessToken);
      console.log(response);
      console.log(this.isLoading);

      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      toast.error(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async getBooks() {
    try {
      this.setLoading(true);
      const response = await BookService.fetchBooks();
      this.setBooks(response.data);
    } catch (e: any) {
      toast.error(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async createBook(bookData: IBook) {
    try {
      this.setLoading(true);
      const response = await BookService.createBook(bookData);
      toast.success("Вы успешно создали книгу!");
    } catch (e: any) {
      toast.error(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async deleteBook(bookId: string) {
    try {
      this.setLoading(true);
      await BookService.deleteBook(bookId);
      this.getBooks();
      toast.success("Книга успешно удалена!");
    } catch (e: any) {
      toast.error(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async updateBook(bookId: string, updatedBookData: Partial<IBook>) {
    try {
      this.setLoading(true);
      await BookService.updateBook(bookId, updatedBookData);

      toast.success("Книга успешно обновлена!");
    } catch (e: any) {
      toast.error(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async getBookByID(bookId: string) {
    try {
      this.setLoading(true);
      const response = await BookService.getBookById(bookId);
      this.setBook(response.data);
    } catch (e: any) {
      toast.error(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
