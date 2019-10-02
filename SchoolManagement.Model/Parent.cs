using System;

namespace SchoolManagement.Model
{
    public class Parent
    {
        public Guid Id { get; set; }
        public Guid StudentId { get; set; }
        public string Address { get; set; }
        public long Contact { get; set; }
        public string Email { get; set; }
        public bool IsPrimaryContact { get; set; }
        public string Name { get; set; }
        public string Occupation { get; set; }
        public Guid ParentTypeId { get; set; }
        public string ParentType { get; set; }
    }
}