namespace CRMApp.Application.Identity.Dtos.User
{
    public class UpdateUserDto
    {
        /// <summary>
        /// Kullanıcının tam adı
        /// </summary>
        public string? Name { get; set; }

        /// <summary>
        /// Yeni şifre (opsiyonel)
        /// </summary>
        public string? Password { get; set; }

        /// <summary>
        /// Kullanıcının rolü (Admin tarafından güncellenebilir)
        /// </summary>
        public string? Role { get; set; }
    }
}
