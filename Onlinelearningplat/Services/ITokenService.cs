using Onlinelearningplat.Model;

namespace Onlinelearningplat.Services
{
    public interface ITokenService
    {
        string GenerateToken(User user);
    }

}
