using System;
using System.Collections.Generic;

namespace SchoolManagement.DataAccess.Models
{
    public partial class StudentFeeDiscount
    {
        public Guid Id { get; set; }
        public Guid StudentTypeId { get; set; }
        public Guid FeeTypeId { get; set; }
        public int Amount { get; set; }
        public Guid StatusId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual FeeType FeeType { get; set; }
        public virtual Status Status { get; set; }
        public virtual StudentType StudentType { get; set; }
    }
}
