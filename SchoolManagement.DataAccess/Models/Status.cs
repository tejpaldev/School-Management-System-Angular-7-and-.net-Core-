using System;
using System.Collections.Generic;

namespace SchoolManagement.DataAccess.Models
{
    public partial class Status
    {
        public Status()
        {
            BusRoute = new HashSet<BusRoute>();
            Class = new HashSet<Class>();
            ClassFee = new HashSet<ClassFee>();
            ClassSection = new HashSet<ClassSection>();
            ClassStream = new HashSet<ClassStream>();
            FeeType = new HashSet<FeeType>();
            Location = new HashSet<Location>();
            Parent = new HashSet<Parent>();
            Profile = new HashSet<Profile>();
            Role = new HashSet<Role>();
            Section = new HashSet<Section>();
            Stream = new HashSet<Stream>();
            Student = new HashSet<Student>();
            StudentFeeDiscount = new HashSet<StudentFeeDiscount>();
            StudentType = new HashSet<StudentType>();
            User = new HashSet<User>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual ICollection<BusRoute> BusRoute { get; set; }
        public virtual ICollection<Class> Class { get; set; }
        public virtual ICollection<ClassFee> ClassFee { get; set; }
        public virtual ICollection<ClassSection> ClassSection { get; set; }
        public virtual ICollection<ClassStream> ClassStream { get; set; }
        public virtual ICollection<FeeType> FeeType { get; set; }
        public virtual ICollection<Location> Location { get; set; }
        public virtual ICollection<Parent> Parent { get; set; }
        public virtual ICollection<Profile> Profile { get; set; }
        public virtual ICollection<Role> Role { get; set; }
        public virtual ICollection<Section> Section { get; set; }
        public virtual ICollection<Stream> Stream { get; set; }
        public virtual ICollection<Student> Student { get; set; }
        public virtual ICollection<StudentFeeDiscount> StudentFeeDiscount { get; set; }
        public virtual ICollection<StudentType> StudentType { get; set; }
        public virtual ICollection<User> User { get; set; }
    }
}
