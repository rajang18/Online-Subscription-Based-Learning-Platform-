using System.ComponentModel.DataAnnotations;

namespace Onlinelearningplat.Model
{
    public class UserCart
    {
        [Key] // ✅ This marks it as the primary key
        public int CartID { get; set; }

        public int UserID { get; set; }
        public int CourseID { get; set; }

        public string SessionID { get; set; }
        public DateTime AddedOn { get; set; } = DateTime.UtcNow;

        // Optional navigation properties
        public Course Course { get; set; }
        public User User { get; set; }

        
    }
}
