using Microsoft.IdentityModel.Tokens;
using Onlinelearningplat.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;



namespace Onlinelearningplat.Services
{
   
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;

        public TokenService(IConfiguration config)
        {
            _config = config;
        }

        public string GenerateToken(User user)
        {
            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier, user.UserID.ToString()),
            new Claim(ClaimTypes.Email, user.Email)
        };  // stored inside the token

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256); // digital signature

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,  // info about the user is,email
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds  // the digital signature
            );

            return new JwtSecurityTokenHandler().WriteToken(token);  //converts to string
        }
    }

}
