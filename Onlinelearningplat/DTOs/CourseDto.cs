namespace Onlinelearningplat.DTOs
{
    public class CourseDto
    {
        public int CourseID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int CategoryID { get; set; }
        public decimal Price { get; set; }
        public int Duration { get; set; }
        public string Instructor { get; set; }
        public double Rating { get; set; }
        public int PlatformID { get; set; }
        public string CategoryName { get; set; }
        public string SubscriptionStatus { get; set; }
    }
}
