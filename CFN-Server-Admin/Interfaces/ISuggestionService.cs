using CFN_ServerAdmin.Models;

namespace CFN_ServerAdmin.Services
{
    public interface ISuggestionService
    {
        IEnumerable<Suggestion> GetAllSuggestions();
        Suggestion GetSuggestionById(int id);
        Suggestion CreateSuggestion(Suggestion suggestion);
        void UpdateSuggestion(int id, Suggestion suggestion);
        void DeleteSuggestion(int id);
    }
}
