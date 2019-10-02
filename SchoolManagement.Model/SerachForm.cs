using System;

namespace SchoolManagement.Model
{
    public class SearchForm
    {
        public string AdmissionNo { get; set; }
        public Guid? ClassId { get; set; }
        public string StudentName { get; set; }
        public string RegistrationNo { get; set; }
        public DateTime? DateofBirth { get; set; }
        public long? Contact { get; set; }
    }
}