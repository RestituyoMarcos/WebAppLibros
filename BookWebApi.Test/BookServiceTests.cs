using BooksWebAPI.Commands;
using BooksWebAPI.Handlers;
using BooksWebAPI.Models;
using MediatR;
using Microsoft.Extensions.Configuration;
using Moq;
using Moq.Protected;
using System.Net;
using System.Text.Json;

namespace BookWebApi.Test
{
    public class CreateBookServiceTests : IClassFixture<TestConnection>
    {
        private readonly TestConnection _connection;
        
        public CreateBookServiceTests(TestConnection connection)
        {
            _connection = connection;
        }

        [Fact]
        public async Task Handle_CreatesBook()
        {
            System.Diagnostics.Debugger.Launch();
            // Arrange
            var newBook = new Book
            {
                Id = 1073,
                Title = "Test",
                Description = "Test Descripcion",
                PageCount = 5555,
                Excerpt = "Test Excerpt",
                PublishDate = DateTime.Now
            };
            var expectedResponse = new HttpResponseMessage(HttpStatusCode.Created)
            {
                Content = new StringContent(JsonSerializer.Serialize(newBook), System.Text.Encoding.UTF8, "application/json")
            };

            _connection.MockHttpMessageHandler.Protected()
                .Setup<Task<HttpResponseMessage>>("SendAsync", ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<CancellationToken>())
                .ReturnsAsync(expectedResponse);

            var handler = new CreateBookHandler(_connection.HttpClientFactory.Object);
            var command = new CreateBook(newBook);

            var result = await handler.Handle(command, CancellationToken.None);

            Assert.NotNull(result);
        }

        [Fact]
        public async Task Handle_UpdateBookTest()
        {
            System.Diagnostics.Debugger.Launch();
            int bookId = 2;
            var newBook = new Book
            {
                Id = bookId,
                Title = "Test",
                Description = "Test Descripcion",
                PageCount = 5555,
                Excerpt = "Test Excerpt",
                PublishDate = DateTime.Now
            };
            var expectedResponse = new HttpResponseMessage(HttpStatusCode.NoContent); // PUT request typically returns 204 No Content

            _connection.MockHttpMessageHandler.Protected()
                .Setup<Task<HttpResponseMessage>>("SendAsync",
                    ItExpr.Is<HttpRequestMessage>(req =>
                        req.Method == HttpMethod.Put &&
                        req.RequestUri.ToString().EndsWith($"api/Books/{bookId}")),

                    ItExpr.IsAny<CancellationToken>())
                .ReturnsAsync(expectedResponse);

            _connection.MockHttpMessageHandler.Protected()
                .Setup<Task<HttpResponseMessage>>("SendAsync", ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<CancellationToken>())
                .ReturnsAsync(expectedResponse);

            var handler = new UpdateBookHandler(_connection.HttpClientFactory.Object);
            var command = new UpdateBook(bookId, newBook);

            var result = await handler.Handle(command, CancellationToken.None);

            Assert.IsType<Unit>(result); // Verify that the handler returns Unit.Value
            _connection.MockHttpMessageHandler.Protected().Verify(
                "SendAsync",
                Times.Exactly(1),
                ItExpr.Is<HttpRequestMessage>(req =>
                    req.Method == HttpMethod.Put &&
                    req.RequestUri.ToString().EndsWith($"api/Books/{bookId}")),

                ItExpr.IsAny<CancellationToken>());
        }

    }

    public class TestConnection
    {
        private readonly IConfiguration _configuration;
        public Mock<HttpMessageHandler> MockHttpMessageHandler { get; }
        public Mock<IHttpClientFactory> HttpClientFactory { get; }

        public TestConnection()
        {
            
            MockHttpMessageHandler = new Mock<HttpMessageHandler>();
            HttpClientFactory = new Mock<IHttpClientFactory>();

            var configurationBuilder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            _configuration = configurationBuilder.Build();

            // Obtener la BaseURL del appsettings.json
            var apiBaseUrl = _configuration.GetSection("ExternalApi:BaseUrl").Value;

            HttpClientFactory.Setup(_ => _.CreateClient(It.IsAny<string>())).Returns(new HttpClient(MockHttpMessageHandler.Object)
            {
                BaseAddress = new Uri(apiBaseUrl)
            });

        }
    }

}
