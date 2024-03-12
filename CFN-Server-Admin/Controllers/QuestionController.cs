using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using CFN_ServerAdmin.Models;
using CFN_ServerAdmin.Services;

namespace CFN_ServerAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly IQAService _questionService;

        public QuestionController(IQAService qaService)
        {
            _questionService = qaService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Question>> GetQuestions()
        {
            var questions = _questionService.GetAllQuestions();
            return Ok(questions);
        }

        [HttpGet("{id}")]
        public ActionResult<Question> GetQuestion(int id)
        {
            var question = _questionService.GetQuestionById(id);
            if (question == null)
            {
                return NotFound();
            }

            return Ok(question);
        }

        [HttpPost]
        public ActionResult<Question> PostQuestion(Question question)
        {
            var newQuestion = _questionService.CreateQuestion(question);
            return CreatedAtAction(nameof(GetQuestion), new { id = newQuestion.Id }, newQuestion);
        }

        [HttpPut("{id}")]
        public IActionResult PutQuestion(int id, Question question)
        {
            _questionService.UpdateQuestion(id, question);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteQuestion(int id)
        {
            var question = _questionService.GetQuestionById(id);
            if (question == null)
            {
                return NotFound();
            }

            _questionService.DeleteQuestion(id);
            return NoContent();
        }
    }
}
