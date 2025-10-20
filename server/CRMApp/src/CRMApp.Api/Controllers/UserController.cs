using CRMApp.Application.Identity.Dtos.User;
using CRMApp.Application.Identity.Services.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace CRMApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpGet]
        public async Task<List<UserDto>> GetAll()
        {
            return await _userService.GetAllUsersAsync();
        }

        [HttpGet("{id}")]
        public async Task<UserDto> GetById(string id)
        {
            return await _userService.GetUserByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<UserDto> Update(string id, [FromBody] UpdateUserDto dto)
        {
            return await _userService.UpdateUserAsync(id, dto);
        }
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            return await _userService.DeleteUserAsync(id);
        }

        [HttpPost("register")]
        public async Task<UserDto> Register([FromBody] RegisterUserDto dto)
        {
            return await _userService.RegisterUserAsync(dto);
        }
    }
}
