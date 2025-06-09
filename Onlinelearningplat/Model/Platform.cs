namespace Onlinelearningplat.Model
{
    public class Platform
    {
        public int PlatformID { get; set; }
        public string PlatformName { get; set; }

        public ICollection<Course> Courses { get; set; }
    }
}
