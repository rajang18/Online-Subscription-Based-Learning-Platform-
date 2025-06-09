using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Onlinelearningplat.Data;     
using Onlinelearningplat.Model;   


[Route("api/[controller]")]
[ApiController]
public class PlatformsController : ControllerBase
{
    private readonly AppDbContext _context;

    public PlatformsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Platform>>> GetPlatforms()
    {
        var platforms = await _context.Platforms.ToListAsync();
        return Ok(platforms);
    }
}
