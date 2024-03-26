using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CFN_ServerAdmin.Models
{
    public class Discussion
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public ICollection<Comment>? Comments { get; set; }
        public Discussion()
        {
            Comments = new List<Comment>();
        }
    }
}