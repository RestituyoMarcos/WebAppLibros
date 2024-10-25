import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Book } from '../types/book';
import { BaseAPIURL } from '../utils/constant';
import { CardContent, Typography, CardActions, Button } from '@mui/material';
import { formatDateLocaleString } from '../utils/helper';
import Swal from 'sweetalert2';

const BookDetails = () => {
  const { id } = useParams();
  const navegador = useNavigate();
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
      Swal.fire({
        title: 'Esta seguro que desea eliminar el libro?',
        icon: 'info',
        confirmButtonText: 'Si',
        showCancelButton: true,
        cancelButtonText: "No, volver"
      }).then(async (res) => {
        if (res.isConfirmed) {
          Swal.showLoading();
          await axios.delete(`${BaseAPIURL}/api/books/${book!.id}`).then(() => {
            navegador('/books')
          }).then(() => {
            Swal.close();
          }).catch((e) => {
            console.error(e);
            Swal.fire({
              title: 'Hubo un error',
              text: 'Error al intentar eliminar el libro',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          }).finally(() => {
            Swal.hideLoading();
          });
        } else {
          Swal.close();
        }
      })

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
      <CardContent>
        <Typography variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography className='text-slate-300' sx={{ color: 'text.secondary', mb: 1.5 }}>{formatDateLocaleString(book.publishDate)}</Typography>
        <Typography variant="body2">
          {book.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' size="small" onClick={()=> navegador('/books')}>Volver</Button>
        <Button variant='contained' color='error' size="small" onClick={()=>handleDelete()}>Eliminar</Button>
      </CardActions>
    </div>
  );
};

export default BookDetails;