using CFN_Server.Models;
using CFN_Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CFN_Server
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuggestionController : ControllerBase
    {
        private readonly ISuggestionService _suggestionService;

        public SuggestionController(ISuggestionService suggestionService)
        {
            _suggestionService = suggestionService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Suggestion>> GetSuggestions()
        {
            return Ok(_suggestionService.GetAllSuggestions());
        }

        [HttpGet("{id}")]
        public ActionResult<Suggestion> GetSuggestion(int id)
        {
            var suggestion = _suggestionService.GetSuggestionById(id);
            if (suggestion == null)
            {
                return NotFound();
            }
            return suggestion;
        }

        [HttpPost]
        public ActionResult<Suggestion> CreateSuggestion(Suggestion suggestion)
        {
            var newSuggestion = _suggestionService.CreateSuggestion(suggestion);
            return CreatedAtAction(nameof(GetSuggestion), new { id = newSuggestion.Id }, newSuggestion);
        }


    }

}
