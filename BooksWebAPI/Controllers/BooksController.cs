using BooksWebAPI.Commands;
using BooksWebAPI.Models;
using BooksWebAPI.Queries;
using BooksWebAPI.Services;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace BooksWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        //   private readonly IBookService _bookService;

        //   public BooksController(IBookService bookService)
        //   {
        //       _bookService = bookService;
        //   }

        //   [HttpGet]
        //   public async Task<ActionResult<IEnumerable<Book>>>
        //GetBooks()
        //   {
        //       return Ok(await _bookService.GetAllBooksAsync());
        //   }

        //   [HttpGet("{id}")]
        //   public async Task<ActionResult<Book>> GetBook(int id)
        //   {
        //       var book = await _bookService.GetBookByIdAsync(id);
        //       if (book == null)
        //       {
        //           return NotFound();
        //       }
        //       return Ok(book);

        //   }

        //   [HttpPost]
        //   public async Task<ActionResult<Book>> CreateBook(Book book)
        //   {
        //       var createdBook = await _bookService.CreateBookAsync(book);
        //       return CreatedAtAction(nameof(GetBook), new { id = createdBook.Id }, createdBook);
        //   }

        //   [HttpPut("{id}")]
        //   public async Task<IActionResult> UpdateBook(int id, Book book)
        //   {
        //       if (id != book.Id)
        //       {
        //           return BadRequest();
        //       }

        //       try
        //       {
        //           await _bookService.UpdateBookAsync(id, book);
        //       }
        //       catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
        //       {
        //           return NotFound();
        //       }

        //       return NoContent();
        //   }

        //   [HttpDelete("{id}")]
        //   public async Task<IActionResult> DeleteBook(int id)
        //   {
        //       try
        //       {
        //           await _bookService.DeleteBookAsync(id);
        //       }
        //       catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
        //       {
        //           return NotFound();
        //       }

        //       return NoContent();
        //   }

        private readonly IMediator _mediator;

        public BooksController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return Ok(await _mediator.Send(new GetAllBooks()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _mediator.Send(new GetBookById() { Id = id});
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPost]
        public async Task<ActionResult<Book>> CreateBook(Book book)
        {
            var createdBook = await _mediator.Send(new CreateBook(book));
            return CreatedAtAction(nameof(GetBook), new { id = createdBook.Id }, createdBook);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, Book book)
        {
            if (id != book.Id)
            {
                return BadRequest("El Id  con coincide con el del libro seleccionado");
            }

            try
            {
                await _mediator.Send(new UpdateBook(id, book));
            }
            catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            try
            {
                await _mediator.Send(new DeleteBook(id));
            }
            catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
