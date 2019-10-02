using System;

namespace SchoolManagement.Model
{
    public class StudentFeeDiscount
    {
        public int Amount { get; set; }
        public string FeeType { get; set; }
        public Guid FeeTypeId { get; set; }
        public Guid Id { get; set; }
        public object Status { get; set; }
        public Guid StatusId { get; set; }
        public string StudentType { get; set; }
        public Guid StudentTypeId { get; set; }
    }
}