using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CFN_ServerAdmin.Models;
using CFN_ServerAdmin.Services;
using Microsoft.AspNetCore.Authorization;



namespace CFN_ServerAdmin.Controllers
{
    [ApiController]
    [Route("api/[controller]")]


    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        private readonly IAuthService _authService;

        public AuthController(IConfiguration configuration, IAuthService authService)
        {
            _configuration = configuration;
            _authService = authService;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            // Проверка модели на корректность
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model");
            }

            var isValid = await _authService.ValidateCredentials(model.Username, model.Password);

            if (!isValid)
            {
                return Unauthorized("Invalid credentials");
            }

            // Создание токена
            var token = GenerateToken(model.Username);

            return Ok(new LoginResponse { Token = token, Expiry = DateTime.UtcNow.AddHours(1) });
        }


        private string GenerateToken(string username)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, username) }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
