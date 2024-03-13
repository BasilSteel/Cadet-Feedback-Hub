using Microsoft.AspNetCore.Mvc;
using CFN_ServerAdmin.Models;
using CFN_ServerAdmin.Services;
using Microsoft.AspNetCore.Authorization;


namespace CFN_ServerAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class DiscussionController : ControllerBase
    {
        private readonly IDiscussionService _discussionService;

        public DiscussionController(IDiscussionService discussionService)
        {
            _discussionService = discussionService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Discussion>> GetDiscussions()
        {
            var discussions = _discussionService.GetAllDiscussions();
            return Ok(discussions);
        }


        [HttpGet("{id}")]
        public ActionResult<Discussion> GetDiscussion(int id)
        {
            var discussion = _discussionService.GetDiscussionById(id);

            if (discussion == null)
            {
                return NotFound();
            }

            return discussion;
        }

        [HttpPost]
        public ActionResult<Discussion> PostDiscussion(Discussion discussion)
        {
            var createdDiscussion = _discussionService.CreateDiscussion(discussion);
            return CreatedAtAction(nameof(GetDiscussion), new { id = createdDiscussion.Id }, createdDiscussion);
        }

        [HttpPut("{id}")]
        public IActionResult PutDiscussion(int id, Discussion discussion)
        {
            if (id != discussion.Id)
            {
                return BadRequest();
            }

            _discussionService.UpdateDiscussion(id, discussion);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteDiscussion(int id)
        {
            _discussionService.DeleteDiscussion(id);
            return NoContent();
        }
    }
}
