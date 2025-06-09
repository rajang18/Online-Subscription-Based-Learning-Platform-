using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Onlinelearningplat.Data;
using Onlinelearningplat.DTOs;
using Onlinelearningplat.Model;

namespace Onlinelearningplat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SubscriptionController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubscriptionDto>>> GetAllSubscriptions()
        {
            var subscriptions = await _context.Subscriptions
                .Select(s => new SubscriptionDto
                {
                    SubscriptionID = s.SubscriptionID,
                    UserID = s.UserID,
                    UserName = s.User.FullName,
                    CourseID = s.CourseID,
                    StartDate = s.StartDate,
                    EndDate = s.EndDate,
                    Status = s.Status
                })
                .ToListAsync();

            return Ok(subscriptions);
        }


        [HttpGet("by-user")]
        public async Task<ActionResult<IEnumerable<SubscriptionDto>>> GetByUserID(int userID)
        {
            var subscriptions = await _context.Subscriptions
                .Where(s => s.UserID == userID)
                .Select(s => new SubscriptionDto
                {
                    SubscriptionID = s.SubscriptionID,
                    UserID = s.UserID,
                    UserName = s.User.FullName,
                    CourseID = s.CourseID,
                    StartDate = s.StartDate,
                    EndDate = s.EndDate,
                    Status = s.Status,
                      Title = s.Course.Title,
                })
                .ToListAsync();

            if (subscriptions == null || subscriptions.Count == 0)
                return NotFound($"No subscriptions found for user ID: {userID}");

            return Ok(subscriptions);
        }



        [HttpPost]
        
        public async Task<ActionResult> Subscribe(SubscriptionDto dto)
        {
            var sub = new Subscription
            {
                UserID = dto.UserID,
                CourseID = dto.CourseID,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Status = dto.Status
            };

            _context.Subscriptions.Add(sub);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Subscription created", subscriptionId = sub.SubscriptionID });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SubscriptionDto>> GetSubscription(int id)
        {
            var sub = await _context.Subscriptions.FindAsync(id);
            if (sub == null) return NotFound();

            return new SubscriptionDto
            {
                SubscriptionID = sub.SubscriptionID,
                UserID = sub.UserID,
                CourseID = sub.CourseID,
                StartDate = sub.StartDate,
                EndDate = sub.EndDate,
                Status = sub.Status
            };
        }


      
        [HttpPut("cancel/{id}")]
        public async Task<ActionResult> CancelSubscription(int id)
        {
            var sub = await _context.Subscriptions.FindAsync(id);
            if (sub == null) return NotFound();

            sub.Status = "Cancelled";
            await _context.SaveChangesAsync();

            return Ok(new { message = "Subscription cancelled" });
        }

        [HttpPut("extend/{id}")]
        public async Task<ActionResult<SubscriptionDto>> ExtendSubscription(int id)
        {
            var sub = await _context.Subscriptions.FindAsync(id);
            if (sub == null) return NotFound();

            sub.EndDate = sub.EndDate.AddDays(30);
            await _context.SaveChangesAsync();

            return Ok(new SubscriptionDto
            {
                SubscriptionID = sub.SubscriptionID,
                UserID = sub.UserID,
                CourseID = sub.CourseID,
                StartDate = sub.StartDate,
                EndDate = sub.EndDate,
                Status = sub.Status
            });
        }


        [HttpGet("count")]
        public async Task<ActionResult<int>> GetSubscriptionCount()
        {
            var count = await _context.Subscriptions.CountAsync();
            return Ok(new { totalSubscriptions = count });
        }

    }

}
