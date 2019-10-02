using System;
using System.Collections.Generic;

namespace SchoolManagement.DataAccess.Models
{
    public partial class Profile
    {
        public Profile()
        {
            User = new HashSet<User>();
        }

        public Guid Id { get; set; }
        public string Firstname { get; set; }
        public string Middlename { get; set; }
        public string Lastname { get; set; }
        public Guid GenderId { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public long Contact { get; set; }
        public Guid? PhotoId { get; set; }
        public Guid StatusId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual Gender Gender { get; set; }
        public virtual Status Status { get; set; }
        public virtual ICollection<User> User { get; set; }
    }
}
