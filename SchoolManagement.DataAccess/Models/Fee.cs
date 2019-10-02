using System;
using System.Collections.Generic;

namespace SchoolManagement.DataAccess.Models
{
    public partial class Fee
    {
        public Guid Id { get; set; }
        public Guid StudentId { get; set; }
        public Guid FeeTypeId { get; set; }
        public int Amount { get; set; }
        public int? Fine { get; set; }
        public int? Discount { get; set; }
        public DateTime FeeDate { get; set; }
        public string Comment { get; set; }
        public Guid PaymentModeId { get; set; }
        public string TransactionNo { get; set; }
        public int? CheckNumber { get; set; }
        public DateTime? ClearanceDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual FeeType FeeType { get; set; }
        public virtual PaymentMode PaymentMode { get; set; }
        public virtual Student Student { get; set; }
    }
}
