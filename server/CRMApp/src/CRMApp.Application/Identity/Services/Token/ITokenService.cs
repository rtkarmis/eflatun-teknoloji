using System.Security.Claims;
using CRMApp.Application.Identity.Dtos.Auth;
using CRMApp.Domain.Entities.Identity;

namespace CRMApp.Application.Identity.Services.Token
{
    public interface ITokenService
    {
        /// <summary>
        /// Kullanıcı ve rollerine göre access ve refresh token üretir
        /// </summary>
        Task<AuthResponseDto> GenerateTokensAsync(AppUser user, IList<string> roles);

        /// <summary>
        /// Refresh token üretir
        /// </summary>
        string GenerateRefreshToken();
    }
}
