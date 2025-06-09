using System.ComponentModel.DataAnnotations;

namespace Onlinelearningplat.DTOs
{
    public class UserUpdateDto
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }

}
