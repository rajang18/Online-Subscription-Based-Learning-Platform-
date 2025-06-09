
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Onlinelearningplat.Data;
using Onlinelearningplat.DTOs;
using Onlinelearningplat.Model;


namespace Onlinelearningplat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _context.Users
                .Select(u => new UserDto
                {
                    UserID = u.UserID,
                    FullName = u.FullName,
                    Email = u.Email
                })
                .ToListAsync();

            return Ok(users);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            return new UserDto
            {
                UserID = user.UserID,
                FullName = user.FullName,
                Email = user.Email
            };
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserUpdateDto dto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            user.FullName = dto.FullName;
            user.Email = dto.Email;

            await _context.SaveChangesAsync();
            return Ok(new { message = "User updated" });
        }


      


        [HttpGet("count")]
        public async Task<ActionResult<int>> GetUserCount()
        {
            var count = await _context.Users.CountAsync();
            return Ok(new { totalUsers = count });
        }

    }

}
