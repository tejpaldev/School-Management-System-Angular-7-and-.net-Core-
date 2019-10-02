using System;

namespace SchoolManagement.Model
{
    public class ClassSection
    {
        public Guid Id { get; set; }
        public Guid ClassId { get; set; }
        public string Class { get; set; }
        public Guid SectionId { get; set; }
        public string Section { get; set; }
        public Guid StatusId { get; set; }
        public string Status { get; set; }
    }
}