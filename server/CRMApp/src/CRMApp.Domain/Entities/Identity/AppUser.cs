using Microsoft.AspNetCore.Identity;

namespace CRMApp.Domain.Entities.Identity
{
    public class AppUser :IdentityUser
    {
        public string Name { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiredDate { get; set; }
    }
}
