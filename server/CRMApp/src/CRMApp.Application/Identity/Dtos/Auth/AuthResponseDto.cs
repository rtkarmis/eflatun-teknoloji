namespace CRMApp.Application.Identity.Dtos.Auth
{
    public record AuthResponseDto(string? AccessToken, string? RefreshToken, DateTime? RefreshTokenExpiryTime, string? Username);
}
