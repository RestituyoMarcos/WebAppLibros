import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Book } from '../types/book';
import { BaseAPIURL } from '../utils/constant';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get<Book>(`${BaseAPIURL}/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error(error);
        alert('Error al obtener el libro.');
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      if (id) {
        await axios.delete(`/api/books/${id}`);
        navigate('/books');
      }
    } catch (error) {
      console.error(error);
      alert('Error al eliminar el libro.');
    }
  };

  if (!book) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{book.Title}</h1>
      <p>{book.Description}</p>
      {/* ... otros detalles del libro ... */}
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

export default BookDetails;