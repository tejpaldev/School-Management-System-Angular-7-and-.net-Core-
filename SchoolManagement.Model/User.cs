using System;

namespace SchoolManagement.Model
{
    public class User
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public long Contact { get; set; }
        public string Role { get; set; }
        public Guid RoleId { get; set; }
        public Guid? ProfileId { get; set; }
        public Guid StatusId { get; set; }
        public string Status { get; set; }
        public string Token { get; set; }
    }
}
