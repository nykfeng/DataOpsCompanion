using System.ComponentModel.DataAnnotations;

namespace DataOpsCompanion.Models
{
    public class RuleUsedHistory
    {
        [Key]
        public int Id { get; set; }
        public int RuleId { get; set; }

        [Required]
        public string RuleText { get; set; }

        public string? Site { get; set; }

        public DateTime DateAdded { get; set; }

        public DateTime DateLastUsed { get; set; }

        public int UsageCount { get; set; }
    }
}
