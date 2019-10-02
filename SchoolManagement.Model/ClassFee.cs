using System;

namespace SchoolManagement.Model
{
    public class ClassFee
    {
        public Guid Id { get; set; }
        public int FeeAmount { get; set; }
        public int? FineAmount { get; set; }
        public int? DiscountAmount { get; set; }
        public DateTime FeeDueDate { get; set; }
        public string Description { get; set; }
        public Guid ClassId { get; set; }
        public string Class { get; set; }
        public Guid FeeTypeId { get; set; }
        public string FeeType { get; set; }
        public Guid StatusId { get; set; }
        public string Status { get; set; }
        public string FeePeriodName { get; set; }
        public int FeeOccurence { get; set; }
    }
}