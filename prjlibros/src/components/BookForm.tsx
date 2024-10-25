// BookForm.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Book } from '../types/book';
import { BaseAPIURL } from '../utils/constant';
import Swal from 'sweetalert2';

const BookForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book>({
    id: 0,
    title: '',
    description: '',
    excerpt: '',
    pageCount: 0,
    publishDate: '',
  });

  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        try {
          await axios.get<Book>(`${BaseAPIURL}/api/books/${id}`).then((res) => {
            setBook(res.data)
          }).catch((e) => {
            console.error(e);
            Swal.fire({
              title: 'Hubo un error',
              text: 'Error al intentar cargar el libro',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          }).finally(() => {
            Swal.hideLoading();
          });
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setBook({
      ...book,
      [name]: name == 'pageCount' ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      Swal.showLoading();
      if (id) {
        await axios.put(`${BaseAPIURL}/api/books/${id}`, book).then(() => {
          Swal.fire({
            title: 'Libro actualizado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        }).catch((e) => {
          console.error(e);
          Swal.fire({
            title: 'Hubo un error',
            text: 'Error al intentar actualizar el libro',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }).finally(() => {
          Swal.hideLoading();
        });
      } else {
        await axios.post(`${BaseAPIURL}/api/books`, book).then(() => {
          Swal.fire({
            title: 'Libro guardado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        }).catch((e) => {
          console.error(e);
          Swal.fire({
            title: 'Hubo un error',
            text: 'Error al intentar guardar el libro',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }).finally(() => {
          Swal.hideLoading();
        });
      }
      navigate('/books');
    } catch (error) {
      console.error(error);
      Swal.hideLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título:</label>
        <input type="text" id="title" name="title" value={book.title} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="description">Descripción:</label>
        <textarea id="description" name="description" value={book.description} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="excerpt">Extracto:</label>
        <textarea id="excerpt" name="excerpt" value={book.excerpt} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="pageCount">Número de páginas:</label>
        <input type="number" id="pageCount" name="pageCount" value={book.pageCount} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="publishDate">Fecha de publicación:</label>
        <input type="date" id="publishDate" name="publishDate" value={book.publishDate} onChange={handleChange} />
      </div>
      <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
    </form>
  );
};

export default BookForm;