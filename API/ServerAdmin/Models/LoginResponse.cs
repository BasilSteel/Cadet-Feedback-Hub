namespace CFN_ServerAdmin.Models
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public DateTime Expiry { get; set; }
    }
}