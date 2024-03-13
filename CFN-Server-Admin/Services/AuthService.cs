namespace CFN_ServerAdmin.Services
{
    public class AuthService : IAuthService
    {
        public async Task<bool> ValidateCredentials(string username, string password)
        {
            if (username == "CFNAdmin" && password == "c5aw8ukilzb5hmy87w87")
            {
                return true;
            }

            return false;
        }

    }
}
