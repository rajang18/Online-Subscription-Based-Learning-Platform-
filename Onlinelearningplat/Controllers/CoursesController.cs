
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Onlinelearningplat.Data;
using Onlinelearningplat.DTOs;
using Onlinelearningplat.Model;

namespace Onlinelearningplat.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CoursesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetCourses()
        {
            var courses = await _context.Courses
                .Select  (c => new CourseDto
                {
                    CourseID = c.CourseID,
                    Title = c.Title,
                    Description = c.Description,
                    CategoryID = c.CategoryID,
                     Price = c.Price,
                    Duration = c.Duration,
                    Instructor = c.Instructor,
                    Rating = c.Rating
                }).ToListAsync();

            return Ok(courses);
        }


        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetCoursesByUser(int userId)
        {
            var userCourses = await _context.Subscriptions
                .Where(s => s.UserID == userId && s.Status != "Cancelled")  
                .Include(s => s.Course)
                .Select(s => new CourseDto
                {
                    CourseID = s.Course.CourseID,
                    Title = s.Course.Title,
                    Description = s.Course.Description,
                    CategoryID = s.Course.CategoryID,
                    Price = s.Course.Price,
                    Duration = s.Course.Duration,
                    Instructor = s.Course.Instructor,
                    Rating = s.Course.Rating
                }).ToListAsync();

            return Ok(userCourses);
        }


        [HttpPost]
        public async Task<ActionResult> AddCourse([FromBody] CourseDto dto)
        {
            if (dto == null)
            {
                return BadRequest("Course data is required.");
            }

            var course = new Course
            {
                Title = dto.Title,
                Description = dto.Description,
                CategoryID = dto.CategoryID,
                PlatformID = dto.PlatformID,
                Price = dto.Price,
                Duration = dto.Duration,
                Instructor = dto.Instructor,
                Rating = dto.Rating
            };

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Course created successfully", courseID = course.CourseID });
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<CourseDto>> GetCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null) return NotFound();

            return new CourseDto
            {
                CourseID = course.CourseID,
                Title = course.Title,
                Description = course.Description,
                CategoryID = course.CategoryID,
                Price= course.Price,
                Duration = course.Duration,
                Instructor = course.Instructor,
                Rating = course.Rating

            };
        }

        [HttpPut("{id}")]
        
        public async Task<ActionResult> UpdateCourse(int id, [FromBody] CourseDto dto)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null) return NotFound();

            course.Title = dto.Title;
            course.Description = dto.Description;
            course.CategoryID = dto.CategoryID;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Course updated successfully" });
        }


        [HttpDelete("{id}")]
      
        public async Task<ActionResult> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null) return NotFound();

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Course deleted successfully" });
        }


        [HttpGet("count")]
        public async Task<ActionResult<int>> GetCourseCount()
        {
            var count = await _context.Courses.CountAsync();
            return Ok(new { totalCourses = count });
        }

    }

}
