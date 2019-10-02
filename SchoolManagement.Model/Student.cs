using System;

namespace SchoolManagement.Model
{
    public class Student
    {
        public Guid Id { get; set; }
        public string RegistrationNo { get; set; }
        public string AdmissionNo { get; set; }
        public long? AadharNumber { get; set; }
        public string Firstname { get; set; }
        public string Middlename { get; set; }
        public string Lastname { get; set; }
        public DateTime Dateofbirth { get; set; }
        public Guid GenderId { get; set; }
        public Guid BloodGroupId { get; set; }
        public Guid CategoryId { get; set; }
        public Guid ReligionId { get; set; }
        public string Cast { get; set; }
        public Guid? BusRouteId { get; set; }
        public int RollNumber { get; set; }
        public Guid ClassId { get; set; }
        public string ClassCode { get; set; }
        public Guid? SectionId { get; set; }
        public Guid? StreamId { get; set; }
        public Guid StatusId { get; set; }
        public string PreviousSchoolName { get; set; }
        public string PreviousSchoolClass { get; set; }
        public string Nationality { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string BloodGroup { get; set; }
        public string BusRoute { get; set; }
        public string Category { get; set; }
        public string Class { get; set; }
        public string Gender { get; set; }
        public string Religion { get; set; }
        public string Section { get; set; }
        public string Status { get; set; }
        public string Stream { get; set; }
        public Guid StudentTypeId { get; set; }
        public string StudentType { get; set; }
        public string Reference { get; set; }
        public bool IsNew { get; set; }
    }
}
