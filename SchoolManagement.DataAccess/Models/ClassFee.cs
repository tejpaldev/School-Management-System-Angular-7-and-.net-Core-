using System;
using System.Collections.Generic;

namespace SchoolManagement.DataAccess.Models
{
    public partial class ClassFee
    {
        public Guid Id { get; set; }
        public int FeeAmount { get; set; }
        public int? FineAmount { get; set; }
        public int? DiscountAmount { get; set; }
        public DateTime FeeDueDate { get; set; }
        public string Description { get; set; }
        public Guid ClassId { get; set; }
        public Guid FeeTypeId { get; set; }
        public Guid StatusId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual Class Class { get; set; }
        public virtual FeeType FeeType { get; set; }
        public virtual Status Status { get; set; }
    }
}
