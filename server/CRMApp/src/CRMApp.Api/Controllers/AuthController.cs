using CRMApp.Application.Identity.Dtos.Auth;
using CRMApp.Application.Identity.Dtos.User;
using CRMApp.Application.Identity.Services.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace CRMApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }


        [HttpPost("login")]
        public async Task<AuthResponseDto> Login([FromBody] LoginDto dto)
        {
            var result = await _authService.LoginAsync(dto.Username, dto.Password);

            // Refresh token'ı httpOnly cookie olarak set et

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true, // Cross-origin ve SameSite=None için zorunlu
                SameSite = SameSiteMode.None, // Cross-origin için zorunlu
                Expires = result.RefreshTokenExpiryTime
            };
            if (!string.IsNullOrEmpty(result.RefreshToken))
            {
                Response.Cookies.Append("refreshToken", result.RefreshToken, cookieOptions);
            }

            // RefreshToken'ı body'de göndermiyoruz
            return result with { RefreshToken = null };
        }


        [HttpPost("refresh-token")]
        public async Task<AuthResponseDto> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
            {
                // Return a specific error object for missing refresh token cookie
                return new AuthResponseDto(null, null, null, null);
            }
            var result = await _authService.RefreshTokenAsync(refreshToken);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true, // Cross-origin ve SameSite=None için zorunlu
                SameSite = SameSiteMode.None, // Cross-origin için zorunlu
                Expires = result.RefreshTokenExpiryTime
            };
            if (!string.IsNullOrEmpty(result.RefreshToken))
            {
                Response.Cookies.Append("refreshToken", result.RefreshToken, cookieOptions);
            }

            return result with { RefreshToken = null };
        }

        [HttpPost("logout")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<bool> Logout()
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrWhiteSpace(userName))
                return false;

            await _authService.LogoutAsync(userName);

            // Refresh token cookie'sini sil

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true, // Cross-origin ve SameSite=None için zorunlu
                SameSite = SameSiteMode.None, // Cross-origin için zorunlu
                Expires = DateTime.UtcNow.AddDays(-1)
            };
            Response.Cookies.Append("refreshToken", "", cookieOptions);

            return true;
        }
    }
}
