
using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;
using Stripe;
using Onlinelearningplat.Data;
using Onlinelearningplat.DTOs;
using Onlinelearningplat.Model;
using Microsoft.EntityFrameworkCore;

namespace Onlinelearningplat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StripeController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly AppDbContext _context;
        public StripeController(IConfiguration config, AppDbContext context)
        {
            _config = config;
            _context = context;

        }
        [HttpPost("create-checkout-session")]
        public async Task<IActionResult> CreateCheckoutSession([FromBody] CheckoutCourseRequest request)
        {
            StripeConfiguration.ApiKey = _config["Stripe:SecretKey"];

            var domain = "http://localhost:4200";
            var lineItems = new List<SessionLineItemOptions>();
            var sessionId = Guid.NewGuid().ToString(); //  Generate unique sessionId

            foreach (var courseId in request.CourseIDs)
            {
                var course = await _context.Courses.FindAsync(courseId);
                if (course == null)
                    return NotFound($"Course ID {courseId} not found");

                //  Save to UserCart
                _context.UserCart.Add(new UserCart
                {
                    UserID = request.UserID,
                    CourseID = courseId,
                    SessionID = sessionId
                });

                // Stripe LineItem  converts cource data into stripe format

                lineItems.Add(new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        Currency = "inr",
                        UnitAmount = (long)(course.Price * 100),
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = course.Title
                        }
                    },
                    Quantity = 1
                });
            }

            await _context.SaveChangesAsync();

            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                LineItems = lineItems,
                Mode = "payment",
                SuccessUrl = $"{domain}/dashboard/subscription?success=true&sid={sessionId}",
                CancelUrl = $"{domain}/dashboard/subscription?canceled=true"
            };

            var service = new SessionService();
            var session = service.Create(options);

            return Ok(new { id = session.Id });
        }


        [HttpPost("ConfirmPayment")]
        public async Task<IActionResult> ConfirmPayment([FromQuery] string sessionId)
        {
            var cartItems = await _context.UserCart
                .Where(c => c.SessionID == sessionId)
                .ToListAsync();

            if (!cartItems.Any())
                return NotFound("No cart found for this session.");

            foreach (var item in cartItems)
            {
                var exists = await _context.Subscriptions
                    .AnyAsync(s => s.UserID == item.UserID && s.CourseID == item.CourseID);

                if (!exists)
                {
                    _context.Subscriptions.Add(new Model.Subscription
                    {
                        UserID = item.UserID,
                        CourseID = item.CourseID,
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(30),
                        Status = "Active"
                    });
                }
            }

            await _context.SaveChangesAsync();

            _context.UserCart.RemoveRange(cartItems);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Subscriptions created and cart cleared." });
        }


    }
}