using System;

namespace SchoolManagement.Model
{
    public class Fee
    {
        public Guid Id { get; set; }
        public Guid StudentId { get; set; }
        public Guid FeeTypeId { get; set; }
        public int Amount { get; set; }
        public int? Fine { get; set; }
        public int? Discount { get; set; }
        public string Comment { get; set; }
        public DateTime FeeDate { get; set; }
        public Guid PaymentModeId { get; set; }
        public string TransactionNo { get; set; }
        public int? CheckNumber { get; set; }
        public DateTime? ClearenceDate { get; set; }
        public string FeeType { get; set; }
        public Guid FeePeriodId { get; set; }
        public string FeePeriod { get; set; }
        public string PaymentMode { get; set; }
        public int FeeOccurence { get; set; }
        public bool IsPaid { get; set; }
    }
}