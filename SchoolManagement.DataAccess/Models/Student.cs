using System;
using System.Collections.Generic;

namespace SchoolManagement.DataAccess.Models
{
    public partial class Student
    {
        public Student()
        {
            Fee = new HashSet<Fee>();
            Parent = new HashSet<Parent>();
        }

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
        public Guid? SectionId { get; set; }
        public Guid? StreamId { get; set; }
        public Guid StatusId { get; set; }
        public string PreviousSchoolName { get; set; }
        public string PreviousSchoolClass { get; set; }
        public string Nationality { get; set; }
        public Guid StudentTypeId { get; set; }
        public string Reference { get; set; }
        public bool IsNew { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual BloodGroup BloodGroup { get; set; }
        public virtual BusRoute BusRoute { get; set; }
        public virtual Category Category { get; set; }
        public virtual Class Class { get; set; }
        public virtual Gender Gender { get; set; }
        public virtual Religion Religion { get; set; }
        public virtual Section Section { get; set; }
        public virtual Status Status { get; set; }
        public virtual Stream Stream { get; set; }
        public virtual StudentType StudentType { get; set; }
        public virtual ICollection<Fee> Fee { get; set; }
        public virtual ICollection<Parent> Parent { get; set; }
    }
}
