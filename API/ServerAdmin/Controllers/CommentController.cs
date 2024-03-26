using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CFN_ServerAdmin.Data;
using CFN_ServerAdmin.Models;
using Microsoft.AspNetCore.Authorization;


namespace CFN_ServerAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class CommentController : ControllerBase
    {
        private readonly DbContextCFN _context;

        public CommentController(DbContextCFN context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Comment>> GetComments()
        {
            return _context.Comments.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Comment> GetComment(int id)
        {
            var comment = _context.Comments.Find(id);

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }

        [HttpPost]
        public ActionResult<Comment> PostComment(Comment comment)
        {
            _context.Comments.Add(comment);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetComment), new { id = comment.Id }, comment);
        }

        [HttpPut("{id}")]
        public IActionResult PutComment(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _context.Entry(comment).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteComment(int id)
        {
            var comment = _context.Comments.Find(id);

            if (comment == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(comment);
            _context.SaveChanges();

            return NoContent();
        }
        [HttpGet("/api/Discussion/{discussionId}/comments")]
        public ActionResult<IEnumerable<Comment>> GetCommentsForDiscussion(int discussionId)
        {
            var comments = _context.Comments.Where(c => c.DiscussionId == discussionId).ToList();

            if (comments == null || comments.Count == 0)
            {
                return NotFound();
            }

            return comments;
        }
        [HttpPost("/api/Discussion/{discussionId}/comments")]
        public ActionResult<Comment> PostCommentForDiscussion(int discussionId, Comment comment)
        {
            var discussion = _context.Discussions.Find(discussionId);

            if (discussion == null)
            {
                return NotFound("Discussion not found");
            }

            comment.DiscussionId = discussionId;
            _context.Comments.Add(comment);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetComment), new { id = comment.Id }, comment);
        }


    }
}
