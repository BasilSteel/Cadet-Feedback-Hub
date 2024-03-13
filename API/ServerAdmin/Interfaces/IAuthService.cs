namespace CFN_ServerAdmin.Services
{
    public interface IAuthService
    {
        Task<bool> ValidateCredentials(string username, string password);
    }
}