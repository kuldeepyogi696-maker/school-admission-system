using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SchoolAPI.Models;

namespace SchoolAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AdminController(IConfiguration config)
        {
            _config = config;
        }

        // POST api/admin/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] AdminLoginRequest request)
        {
            var adminUsername = _config["AdminUser:Username"];
            var adminPassword = _config["AdminUser:Password"];

            if (request.Username != adminUsername || request.Password != adminPassword)
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            var token = GenerateJwtToken(request.Username);

            return Ok(new
            {
                token,
                username = request.Username
            });
        }

        private string GenerateJwtToken(string username)
        {
            var jwtKey = _config["Jwt:Key"] ?? "ThisIsASecretKeyForDevOnlyPleaseChange123!";
            var jwtIssuer = _config["Jwt:Issuer"] ?? "SchoolAPI";

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtIssuer,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(8),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}