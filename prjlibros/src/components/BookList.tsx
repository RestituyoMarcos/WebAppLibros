import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Book } from '../types/book';
import { BaseAPIURL } from '../utils/constant';

const BookList = () => {
  const [books, setBooks] = useState<Array<Book>>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get<Book[]>(`${BaseAPIURL}/api/books`);
        setBooks(response.data);
      } catch (error) {
        console.error(error);
        alert('Error al obtener la lista de libros.');
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${BaseAPIURL}/api/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error(error);
      alert('Error al eliminar el libro.');
    }
  };

  return (
    <div>
      <h1>Lista de libros</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>{book.title}</Link>
            <button onClick={() => handleDelete(book.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <Link to="/books/new">Crear libro</Link>
    </div>
  );
};

export default BookList;