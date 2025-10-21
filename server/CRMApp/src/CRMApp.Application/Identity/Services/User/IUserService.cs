using CRMApp.Application.Identity.Dtos.User;

namespace CRMApp.Application.Identity.Services.User
{
    public interface IUserService
    {
        /// <summary>
        /// Tüm kullanıcıları listeler (Admin için)
        /// </summary>
        Task<List<UserDto>> GetAllUsersAsync();

        /// <summary>
        /// Kullanıcıyı Id ile getirir
        /// </summary>
        Task<UserDto> GetUserByIdAsync(string userId);

        /// <summary>
        /// Kullanıcı bilgilerini günceller (kendi bilgisi veya Admin)
        /// </summary>
        Task<UserDto> UpdateUserAsync(string userId, UpdateUserDto dto);

        /// <summary>
        /// Kullanıcı silme (Admin)
        /// </summary>
        Task<bool> DeleteUserAsync(string userId);
        // Sadece Admin kullanıcı yeni user ekleyebilir
        Task<UserDto> RegisterUserAsync(RegisterUserDto registerUserDto);
    }
}
