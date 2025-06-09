using Onlinelearningplat.Model;

namespace Onlinelearningplat.DTOs
{
    public class SubscriptionDto
    {
        public int SubscriptionID { get; set; }
        public int UserID { get; set; }
        public string UserName { get; set; }
        public int CourseID { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; }
        public Course Course { get; set; }
        public string Title { get; set; }

    }
}
