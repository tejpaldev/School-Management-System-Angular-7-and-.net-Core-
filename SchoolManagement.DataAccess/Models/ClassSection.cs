using System;
using System.Collections.Generic;

namespace SchoolManagement.DataAccess.Models
{
    public partial class ClassSection
    {
        public Guid Id { get; set; }
        public Guid ClassId { get; set; }
        public Guid SectionId { get; set; }
        public Guid StatusId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual Class Class { get; set; }
        public virtual Section Section { get; set; }
        public virtual Status Status { get; set; }
    }
}
