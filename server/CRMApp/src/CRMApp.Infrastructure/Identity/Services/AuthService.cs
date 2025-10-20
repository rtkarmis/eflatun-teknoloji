using CRMApp.Application.Identity.Dtos.Auth;
using CRMApp.Application.Identity.Services.Auth;
using CRMApp.Application.Identity.Services.Token;
using CRMApp.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CRMApp.Infrastructure.Identity.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;

        public AuthService(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            ITokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        public async Task<AuthResponseDto> LoginAsync(string username, string password)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null) throw new Exception("Kullanıcı bulunamadı.");

            var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);
            if (!result.Succeeded) throw new Exception("Kullanıcı adı veya şifre hatalı.");

            var roles = await _userManager.GetRolesAsync(user);
            var tokens = await _tokenService.GenerateTokensAsync(user, roles);

            user.RefreshToken = tokens.RefreshToken;
            user.RefreshTokenExpiredDate = tokens.RefreshTokenExpiryTime;
            await _userManager.UpdateAsync(user);

            return tokens;
        }

        public async Task<AuthResponseDto> RefreshTokenAsync(string refreshToken)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);
            if (user == null || user.RefreshTokenExpiredDate <= DateTime.UtcNow)
                throw new Exception("Oturum süreniz dolmuştur.Tekrar giriş yapınız.");

            var roles = await _userManager.GetRolesAsync(user);
            var tokens = await _tokenService.GenerateTokensAsync(user, roles);

            user.RefreshToken = tokens.RefreshToken;
            user.RefreshTokenExpiredDate = tokens.RefreshTokenExpiryTime;
            await _userManager.UpdateAsync(user);

            return tokens;
        }

        public async Task LogoutAsync(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user != null)
            {
                user.RefreshToken = null;
                user.RefreshTokenExpiredDate = null;
                await _userManager.UpdateAsync(user);
            }
        }
        
    }
}
