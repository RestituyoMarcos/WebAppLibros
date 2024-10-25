# BooksWebAPI

Tecnologías y herramientas

Este proyecto es una aplicación web que consume un API externo para gestionar una lista de libros. Se ha implementado utilizando las siguientes herramientas y tecnologías:

Backend:

.NET 8: Framework para desarrollo de aplicaciones web.
ASP.NET Core Web API: Framework para crear APIs RESTful.
C#: Lenguaje de programación principal.
MediatR: Librería para implementar el patrón CQRS (Command Query Responsibility Segregation).
HttpClientFactory: Para gestionar instancias de HttpClient y realizar solicitudes HTTP al API externo.
xUnit: Framework para escribir pruebas unitarias.
Moq: Librería para crear objetos mock en las pruebas unitarias.


Frontend:

ReactJS: Librería de JavaScript para construir interfaces de usuario.
TypeScript: Superset de JavaScript que agrega tipado estático.
React Router: Librería para gestionar la navegación en la aplicación React.
Axios: Librería para realizar solicitudes HTTP al backend.
DevExtreme: Libreria para gestionar las informaciones en una tabla
Material UI: Algunos componenetes
sweetalert2: Para los mensajes por pantalla y alertas

Patrones de diseño:

CQRS (Command Query Responsibility Segregation): Para separar las operaciones de lectura y escritura.
API externo:

Fake REST API: https://fakerestapi.azurewebsites.net/

Funcionalidades:
Listar libros.
Ver detalles de un libro.
Eliminar libros.
Crear libros.
Editar libros.
Consultar libros por ID.

