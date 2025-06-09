namespace Onlinelearningplat.Model
{
    public class Subscription
    {
        public int SubscriptionID { get; set; }
        public int UserID { get; set; }
        public int CourseID { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; } 

        public User User { get; set; }
        public Course Course { get; set; }
        
    }
}
