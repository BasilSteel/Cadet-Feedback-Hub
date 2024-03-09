using CFN_Server.Models;

namespace CFN_Server.Services
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
