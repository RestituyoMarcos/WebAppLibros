import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Book } from '../types/book';
import { BaseAPIURL } from '../utils/constant';

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book>({
    Id: 0,
    Title: '',
    Description: '',
    Excerpt: '',
    PageCount: 0,
    PublishDate: '',
  });

  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        try {
          const response = await axios.get<Book>(`${BaseAPIURL}/api/books/${id}`);
          setBook(response.data);
        } catch (error) {
          console.error(error);
          alert('Error al obtener el libro.');
        }
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (id) {
        await axios.put(`/api/books/${id}`, book);
      } else {
        await axios.post('/api/books', book);
      }
      navigate('/books');
    } catch (error) {
      console.error(error);
      alert('Error al guardar el libro.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título:</label>
        <input type="text" id="title" name="Title" value={book.Title} onChange={handleChange} />
      </div>
      {/* ... otros campos del formulario ... */}
      <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
    </form>
  );
};

export default BookForm;