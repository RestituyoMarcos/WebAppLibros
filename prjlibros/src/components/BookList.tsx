import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataGrid, { Column, ColumnChooser, Export, GroupPanel, Grouping, LoadPanel, Pager, Paging, Position, SearchPanel } from "devextreme-react/data-grid"
import { useNavigate } from 'react-router-dom';
import { Book } from '../types/book';
import { BaseAPIURL } from '../utils/constant';
import { Button } from '@mui/material';
import { LoadIndicator } from 'devextreme-react';
import Swal from 'sweetalert2';

const BookList = () => {
  const [books, setBooks] = useState<Array<Book>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navegador = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        await axios.get<Book[]>(`${BaseAPIURL}/api/books`).then((response) => {
          setBooks(response.data);
        }).catch((e) => {
          console.error(e);
          Swal.fire({
            title: 'Hubo un error',
            text: 'Error al obtener la lista de libros',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }).finally(() => {
          setLoading(false);
        });

      } catch (error) {
        console.error(error);
        Swal.fire({
          title: 'Hubo un error',
          text: 'Error al obtener la lista de libros',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id: number) => {
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
          await axios.delete(`${BaseAPIURL}/api/books/${id}`).then(() => {
            setBooks(books.filter((book) => book.id !== id));
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

  return (
    <div>

      <h1 className='text-3xl p-10 w-full h-20'>Lista de libros</h1>
      <Button variant='contained' color='success' className='m-' onClick={() => { navegador('/books/new') }}>Crear libro</Button>
      <div>
        {loading ? <LoadIndicator id="large-indicator" height={200} width={200} /> :

          <DataGrid
            dataSource={books}
            noDataText="Sin Datos"
            headerFilter={{ visible: true }}
            allowColumnReordering={true}
            rowAlternationEnabled={true}
            showBorders={true}>
            <ColumnChooser
              enabled={true}
              mode={"dragAndDrop"}>
              <Position
                my="right top"
                at="right bottom"
                of=".dx-datagrid-column-chooser-button"
              />

            </ColumnChooser>
            <LoadPanel shadingColor={"#c2c2c2"} text={"Cargando...."} />
            <Export enabled={false} />
            <SearchPanel visible={true} placeholder={"Filtrar..."} highlightCaseSensitive={true} />
            {/* <Selection mode={"multiple"} showCheckBoxesMode={"always"}/> */}
            <GroupPanel visible={true} emptyPanelText={"Arrastrar Columna aqui para agrupar"} />
            <Grouping autoExpandAll={true} />
            <Pager allowedPageSizes={[5, 10, 25, 50, 100]} showPageSizeSelector={true} showInfo={true} showNavigationButtons={true} />
            <Paging defaultPageSize={10} />


            <Column dataField="title" caption="Titulo" alignment="left" width={200} />
            <Column dataField="description" caption="Descripcion" width={400} alignment="left" />
            <Column dataField="publishDate" caption="Fecha de publicacion" alignment="right" dataType={"date"} width={"auto"} format={'dd/MM/yyyy'} />
            <Column dataField="pageCount" dataType="number" width={"auto"} caption="Paginas" alignment="right" />
            
            <Column dataField="id" caption="Ver" alignment="left" width={130} cellRender={(e) => <Button variant='contained' color='info' onClick={() => navegador("/books/" + e.value)}>Ver Detalle</Button>} />
            
            <Column dataField="id" caption="Editar" alignment="left" width={100} cellRender={(e) => <Button variant='contained' color='primary' onClick={() => navegador("/books/" + e.value + "/edit")}>Editar</Button>} />
            
            <Column dataField="id" caption="Eliminar" alignment="left" width={100} cellRender={(e) => <Button variant='contained' color='error' onClick={() => handleDelete(e.data.id)}>Eliminar</Button>} />

          </DataGrid>

        }


      </div>
    </div>
  );
};

export default BookList;