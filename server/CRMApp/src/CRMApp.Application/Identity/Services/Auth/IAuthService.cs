using CRMApp.Application.Identity.Dtos.Auth;

namespace CRMApp.Application.Identity.Services.Auth
{
    public interface IAuthService
    {
        Task<AuthResponseDto> LoginAsync(string username, string password);
        Task<AuthResponseDto> RefreshTokenAsync(string refreshToken);
        Task LogoutAsync(string userName);
    }
}
