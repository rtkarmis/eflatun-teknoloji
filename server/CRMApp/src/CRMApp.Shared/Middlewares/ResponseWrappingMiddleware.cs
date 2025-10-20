using System.Text.Json;
using System.Text;
using CRMApp.Shared.Responses;
using Microsoft.AspNetCore.Http;

namespace CRMApp.Shared.Middlewares
{
    public class ResponseWrappingMiddleware
    {
        private readonly RequestDelegate _next;

        public ResponseWrappingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Swagger ve statik içerikleri sarmamayı tercih ediyoruz
            if (context.Request.Path.StartsWithSegments("/swagger"))
            {
                await _next(context);
                return;
            }

            var originalBody = context.Response.Body;
            await using var buffer = new MemoryStream();
            context.Response.Body = buffer;

            try
            {
                await _next(context);

                buffer.Seek(0, SeekOrigin.Begin);
                var raw = await new StreamReader(buffer).ReadToEndAsync();
                buffer.Seek(0, SeekOrigin.Begin);

                // İçerik JSON değilse (dosya indirme, html vs) sarmadan geçir
                var contentType = context.Response.ContentType ?? "";
                if (!contentType.StartsWith("application/json", StringComparison.OrdinalIgnoreCase)
                    && !string.IsNullOrEmpty(contentType))
                {
                    // Olduğu gibi kopyala
                    context.Response.Body = originalBody;
                    context.Response.Headers.ContentLength = null; // yeniden hesaplansın
                    await buffer.CopyToAsync(originalBody);
                    return;
                }

                // Zaten ResultResponse gibi görünüyorsa (success alanı var) sarmadan geçir
                if (LooksLikeWrappedJson(raw))
                {
                    context.Response.Body = originalBody;
                    context.Response.Headers.ContentLength = null;
                    await originalBody.WriteAsync(Encoding.UTF8.GetBytes(raw));
                    return;
                }

                // 204 veya boş/null body => Failure say
                var statusCode = context.Response.StatusCode;
                var isEmpty = string.IsNullOrWhiteSpace(raw) || raw.Trim().Equals("null", StringComparison.OrdinalIgnoreCase);

                object? payload = null;
                if (!isEmpty)
                {
                    try
                    {
                        payload = JsonSerializer.Deserialize<object>(raw, new JsonSerializerOptions
                        {
                            PropertyNameCaseInsensitive = true
                        });
                    }
                    catch
                    {
                        // JSON değilse düz metin olarak taşı
                        payload = raw;
                    }
                }

                var isSuccess = statusCode >= 200 && statusCode < 300;
                // 204’ü özellikle başarısız sayalım (client’ta 204 hatası çıkmasın)
                if (statusCode == StatusCodes.Status204NoContent || isEmpty)
                    isSuccess = false;

                var wrapped = isSuccess
                    ? ResultResponse<object>.SuccessResponse(payload, "Request successful")
                    : ResultResponse<object>.FailureResponse(
                        statusCode == 204 ? "No content" :
                        statusCode >= 500 ? "Internal server error" :
                        "An error occurred"
                      );

                // Her zaman 200 ile tek tip JSON dön
                context.Response.Body = originalBody;
                context.Response.StatusCode = StatusCodes.Status200OK;
                context.Response.ContentType = "application/json";
                context.Response.Headers.ContentLength = null; // yeniden hesaplansın

                var json = JsonSerializer.Serialize(wrapped);
                await context.Response.WriteAsync(json, Encoding.UTF8);
            }
            finally
            {
                // Body’yi geri al
                context.Response.Body = originalBody;
            }
        }

        private static bool LooksLikeWrappedJson(string raw)
        {
            if (string.IsNullOrWhiteSpace(raw)) return false;
            try
            {
                using var doc = JsonDocument.Parse(raw);
                var root = doc.RootElement;
                return root.ValueKind == JsonValueKind.Object &&
                       root.TryGetProperty("success", out _); // ResultResponse’ın imzası
            }
            catch
            {
                return false;
            }
        }
    }
}
