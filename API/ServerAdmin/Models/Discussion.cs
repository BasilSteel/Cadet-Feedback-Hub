using System.ComponentModel.DataAnnotations;

namespace CFN_ServerAdmin.Models
{
    public class Discussion
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        // public ICollection<Comment>? Comments { get; set; }
    }
}