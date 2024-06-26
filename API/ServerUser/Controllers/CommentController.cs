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
