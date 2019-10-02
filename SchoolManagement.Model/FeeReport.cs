using System;

namespace SchoolManagement.Model
{
    public class FeeReport
    {
        public string AdmissionNo { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Class { get; set; }
        public string FeeType { get; set; }
        public DateTime Date { get; set; }
        public int Amount { get; set; }
        public int? Discount { get; set; }
        public int? Fine { get; set; }
        public string Comment { get; set; }
        public string PaymentMode { get; set; }
    }
}