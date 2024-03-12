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


        [HttpPost]
        public ActionResult<Feedback> PostFeedback(Feedback feedback)
        {
            _context.Feedback.Add(feedback);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetFeedback), new { id = feedback.Id }, feedback);
        }

    }
}
