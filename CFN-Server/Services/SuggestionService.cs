using CFN_Server.Models;
using CFN_Server.Data;
using Microsoft.EntityFrameworkCore;

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

        public void UpdateSuggestion(int id, Suggestion suggestion)
        {
            _context.Entry(suggestion).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void DeleteSuggestion(int id)
        {
            var suggestion = _context.Suggestion.Find(id);
            _context.Suggestion.Remove(suggestion);
            _context.SaveChanges();
        }
    }
}



