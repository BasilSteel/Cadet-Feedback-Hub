using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using CFN_Server.Models;
using CFN_Server.Services;

namespace CFN_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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


    }
}
