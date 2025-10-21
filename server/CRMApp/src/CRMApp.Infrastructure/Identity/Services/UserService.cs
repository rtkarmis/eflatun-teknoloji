using CRMApp.Application.Identity.Dtos.User;
using CRMApp.Application.Identity.Services.User;
using CRMApp.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CRMApp.Infrastructure.Identity.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppRole> _roleManager;

        public UserService(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<List<UserDto>> GetAllUsersAsync()
        {
            var users = await _userManager.Users.ToListAsync();
            var userDtos = new List<UserDto>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                userDtos.Add(new UserDto(user.Id,user.UserName,user.Name, roles.FirstOrDefault() ?? ""));
            }

            return userDtos;
        }

        public async Task<UserDto> GetUserByIdAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) throw new Exception("Kullanıcı bulunamadı.");

            var roles = await _userManager.GetRolesAsync(user);
            return new UserDto(user.Id, user.UserName, user.Name, roles.FirstOrDefault() ?? "");
        }

        public async Task<UserDto> UpdateUserAsync(string userId, UpdateUserDto dto)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) throw new Exception("Kullanıcı bulunamadı.");

            if (!string.IsNullOrWhiteSpace(dto.Name)) user.Name = dto.Name;
            if (!string.IsNullOrWhiteSpace(dto.Password))
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                await _userManager.ResetPasswordAsync(user, token, dto.Password);
            }

            if (!string.IsNullOrWhiteSpace(dto.Role))
            {
                var currentRoles = await _userManager.GetRolesAsync(user);
                await _userManager.RemoveFromRolesAsync(user, currentRoles);
                if (!await _roleManager.RoleExistsAsync(dto.Role))
                    await _roleManager.CreateAsync(new AppRole { Name = dto.Role });
                await _userManager.AddToRoleAsync(user, dto.Role);
            }

            await _userManager.UpdateAsync(user);

            var rolesAfter = await _userManager.GetRolesAsync(user);
            return new UserDto(user.Id,user.UserName,user.Name,rolesAfter.FirstOrDefault() ?? "");
        }

        public async Task<bool> DeleteUserAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) throw new Exception("Kullanıcı bulunamadı.");
            await _userManager.DeleteAsync(user);
            return true;
        }

        public async Task<UserDto> RegisterUserAsync(RegisterUserDto dto)
        {
            var user = new AppUser
            {
                UserName = dto.UserName,
                Name = dto.Name
            };

            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded) throw new Exception("Kullanıcı oluşturulamadı: " +
                                                       string.Join(", ", result.Errors.Select(e => e.Description)));

            if (!await _roleManager.RoleExistsAsync(dto.Role))
            {
                await _roleManager.CreateAsync(new AppRole { Name = dto.Role });
            }

            await _userManager.AddToRoleAsync(user, dto.Role);

            return new UserDto(user.Id, user.UserName, user.Name, dto.Role);
        }
    }
}
