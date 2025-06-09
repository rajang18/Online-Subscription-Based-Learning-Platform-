using Onlinelearningplat.Model;
using Microsoft.EntityFrameworkCore;

namespace Onlinelearningplat.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // DbSet properties for each model
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Course> Courses { get; set; }
        
        public DbSet<Subscription> Subscriptions { get; set; }
        
        public DbSet<Platform> Platforms { get; set; }
        public DbSet<UserCart> UserCart { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure Subscription relationship
            modelBuilder.Entity<Subscription>()
                .HasOne(s => s.User)
                .WithMany(u => u.Subscriptions)
                .HasForeignKey(s => s.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Subscription>()
                .HasOne(s => s.Course)
                .WithMany(c => c.Subscriptions)
                .HasForeignKey(s => s.CourseID)
                .OnDelete(DeleteBehavior.Cascade);

            

            // Configure Course -> Category
            modelBuilder.Entity<Course>()
                .HasOne(c => c.Category)
                .WithMany(cat => cat.Courses)
                .HasForeignKey(c => c.CategoryID)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<UserCart>()
                .HasOne(uc => uc.User)
                .WithMany(u => u.UserCart)
                .HasForeignKey(uc => uc.UserID)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<Course>()
                 .HasOne(c => c.Platform)
                 .WithMany(p => p.Courses)
                 .HasForeignKey(c => c.PlatformID)
                 .OnDelete(DeleteBehavior.Cascade);


        }
    }
}
