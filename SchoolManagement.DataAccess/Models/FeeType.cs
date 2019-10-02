using System;
using System.Collections.Generic;

namespace SchoolManagement.DataAccess.Models
{
    public partial class FeeType
    {
        public FeeType()
        {
            ClassFee = new HashSet<ClassFee>();
            Fee = new HashSet<Fee>();
            StudentFeeDiscount = new HashSet<StudentFeeDiscount>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid FeePeriodId { get; set; }
        public Guid StatusId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual FeePeriod FeePeriod { get; set; }
        public virtual Status Status { get; set; }
        public virtual ICollection<ClassFee> ClassFee { get; set; }
        public virtual ICollection<Fee> Fee { get; set; }
        public virtual ICollection<StudentFeeDiscount> StudentFeeDiscount { get; set; }
    }
}
