using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolAPI.Models
{
    [Table("Fullfrom")]
    public class Admission
    {
        public int Id { get; set; }

        public string? StudentName { get; set; }

        public DateTime? DOB { get; set; }

        public string? Gender { get; set; }

        public string? FatherName { get; set; }

        public string? MotherName { get; set; }

        public string? MobileNumber { get; set; }

        public string? Email { get; set; }

        public string? FullAddress { get; set; }

        public string? SelectClass { get; set; }
    }
}