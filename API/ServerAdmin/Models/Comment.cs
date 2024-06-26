using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CFN_ServerAdmin.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        public string Text { get; set; }

        [ForeignKey("Discussion")]
        public int? DiscussionId { get; set; }

        public Discussion? Discussion { get; set; }
    }
}