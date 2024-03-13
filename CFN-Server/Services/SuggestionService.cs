using CFN_Server.Data;
using CFN_Server.Models;
namespace CFN_Server.Services
{
    public class SuggestionService : ISuggestionService
    {
        private readonly DbContextCFN _context;

        public SuggestionService(DbContextCFN context)
        {
            _context = context;
        }

        public IEnumerable<Suggestion> GetAllSuggestions()
        {
            return _context.Suggestion.ToList();
        }

        public Suggestion GetSuggestionById(int id)
        {
            return _context.Suggestion.Find(id);
        }

        public Suggestion CreateSuggestion(Suggestion suggestion)
        {
            _context.Suggestion.Add(suggestion);
            _context.SaveChanges();
            return suggestion;
        }


    }
}



