using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using CFN_Server.Data;
using CFN_Server.Models;

namespace CFN_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly DbContextCFN _context;

        public FeedbackController(DbContextCFN context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Feedback>> GetFeedback()
        {
            return _context.Feedback.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Feedback> GetFeedback(int id)
        {
            var feedback = _context.Feedback.Find(id);

            if (feedback == null)
            {
                return NotFound();
            }

            return feedback;
        }

        [HttpPost]
        public ActionResult<Feedback> PostFeedback(Feedback feedback)
        {
            _context.Feedback.Add(feedback);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetFeedback), new { id = feedback.Id }, feedback);
        }

        [HttpPut("{id}")]
        public IActionResult PutFeedback(int id, Feedback feedback)
        {
            if (id != feedback.Id)
            {
                return BadRequest();
            }

            _context.Entry(feedback).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteFeedback(int id)
        {
            var feedback = _context.Feedback.Find(id);

            if (feedback == null)
            {
                return NotFound();
            }

            _context.Feedback.Remove(feedback);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
