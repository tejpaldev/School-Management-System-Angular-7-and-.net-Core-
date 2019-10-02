using System;

namespace SchoolManagement.Model
{
    public class FeeType
    {
        public string Description { get; set; }
        public string FeePeriod { get; set; }
        public Guid FeePeriodId { get; set; }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid StatusId { get; set; }
        public string Status { get; set; }
    }
}