namespace Onlinelearningplat.Model
{
    public class User
    {
        public int UserID { get; set; }              
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }

        public ICollection<Subscription> Subscriptions { get; set; }
        
        public ICollection<UserCart> UserCart { get; set; }
    }
}
