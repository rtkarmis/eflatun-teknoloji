using System.Text.Json;
using CRMApp.Shared.Exceptions; // senin BusinessException vb. burada tanımlıysa
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace CRMApp.Shared.Middlewares
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (BusinessException bex) // örneğin CustomerNotFoundException bundan türeyebilir
            {
                _logger.LogWarning(bex, "Business exception");

                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                context.Response.ContentType = "application/json";

                var result = JsonSerializer.Serialize(new
                {
                    success = false,
                    message = bex.Message
                });

                await context.Response.WriteAsync(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception");

                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                context.Response.ContentType = "application/json";

                var result = JsonSerializer.Serialize(new
                {
                    success = false,
                    message = ex.Message,
                    detail = ex.StackTrace
                });

                await context.Response.WriteAsync(result);
            }
        }
    }
}
