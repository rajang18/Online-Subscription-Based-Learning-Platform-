namespace Onlinelearningplat.Model
{
    public class Category
    {
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }

        public ICollection<Course> Courses { get; set; }
    }
}
