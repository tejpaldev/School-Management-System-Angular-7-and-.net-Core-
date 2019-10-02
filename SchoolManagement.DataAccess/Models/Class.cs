using System;
using System.Collections.Generic;

namespace SchoolManagement.DataAccess.Models
{
    public partial class Class
    {
        public Class()
        {
            ClassFee = new HashSet<ClassFee>();
            ClassSection = new HashSet<ClassSection>();
            ClassStream = new HashSet<ClassStream>();
            Student = new HashSet<Student>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public Guid StatusId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual Status Status { get; set; }
        public virtual ICollection<ClassFee> ClassFee { get; set; }
        public virtual ICollection<ClassSection> ClassSection { get; set; }
        public virtual ICollection<ClassStream> ClassStream { get; set; }
        public virtual ICollection<Student> Student { get; set; }
    }
}
