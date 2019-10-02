using System;
using System.Collections.Generic;

namespace SchoolManagement.DataAccess.Models
{
    public partial class User
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public long Contact { get; set; }
        public Guid? ProfileId { get; set; }
        public Guid RoleId { get; set; }
        public Guid StatusId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual Profile Profile { get; set; }
        public virtual Role Role { get; set; }
        public virtual Status Status { get; set; }
    }
}
