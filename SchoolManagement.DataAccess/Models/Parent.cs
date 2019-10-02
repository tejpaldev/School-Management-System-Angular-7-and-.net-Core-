using System;
using System.Collections.Generic;

namespace SchoolManagement.DataAccess.Models
{
    public partial class Parent
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Occupation { get; set; }
        public string Address { get; set; }
        public long Contact { get; set; }
        public string Email { get; set; }
        public bool IsPrimary { get; set; }
        public Guid StudentId { get; set; }
        public Guid ParentTypeId { get; set; }
        public Guid StatusId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual ParentType ParentType { get; set; }
        public virtual Status Status { get; set; }
        public virtual Student Student { get; set; }
    }
}
